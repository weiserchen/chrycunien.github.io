# Read 

## `ReadFile` function
This function in `io/ioutil` package use a small 512 bytes buffer to read a file, and it load the whole content into the memory. It may not be a good idea when reading large files. We will use buffer to address this problem.

```go
package main

import (
	"fmt"
	"io/ioutil"
	"os"
)

func main() {
	if len(os.Args) != 2 {
		fmt.Println("Please specify a path.")
		return
	}
	b, err := ioutil.ReadFile(os.Args[1])
	if err != nil {
		fmt.Println("Error:", err)
	}
	fmt.Println(string(b))
}

```

## `Reader` Interface
The reader interface define a method that is able to read file chunk by chunk. This make the `Reader` more memory-efficient than the `ReadFile` function. The `Read` function fill the given buffer and return how many bytes it read. One special error is `EOF` (End of File) (`io.EOF`).
```go
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

## Read by buffer
We use the buffer to read a file. In a long-run program, we have to close the unneed file to prevent reaching the file limit.

- `ulimit -u` shows how many files can be opened by a process.
- `lsof -p <PID>` shows the number of current opened files of a process.

```go
func main() {
    if len(os.Args) != 2 {
        fmt.Println("Please specify a file")
        return
    }
    f, err := os.Open(os.Args[1])
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    defer f.Close() // we ensure close to avoid leaks

    var (
        b = make([]byte, 1024)
    )
    for n := 0; err == nil; {
        n, err = f.Read(b)
        if err == nil {
            fmt.Print(string(b[:n])) // only print what's been read
        }
    }
    if err != nil && err != io.EOF { // we expect an EOF
        fmt.Println("\n\nError:", err)
    }
}
```

## Using buffer
```go
package main

import (
	"bytes"
	"fmt"
)

func main() {
	var b = bytes.NewBuffer([]byte{})
	var texts = []string{
		`As he came into the window`,
		`It was the sound of a crescendo
He came into her apartment`,
		`He left the bloodstains on the carpet`,
		`She ran underneath the table
He could see she was unable
So she ran into the bedroom
She was struck down, it was her doom`,
	}
	for i := range texts {
		b.Reset()
		b.WriteString(texts[i])
		fmt.Println("Length:", b.Len(), "\tCapacity:", b.Cap())
	}
}

```