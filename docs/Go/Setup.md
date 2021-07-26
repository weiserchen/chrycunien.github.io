
# Setup Guide

## Install

### Mac
Using brew to install Go. Copy the following command into terminal.
```
brew install go
```

### Windows
Using chocolate to install Go. Copy the following command into the command line.
```
choco install golang
```

### Others
Go to [go website](https://golang.org/dl/) and follow the instruction on the website.

### Check
Check the go version you have already installed.
```
go version
```

If the command not found, check the installation path:
```
which go
```

The correct path is: `/usr/local/bin/go` (install using brew).
## Package
Using `go install` to install third-party package on

## Tools

### Hello World
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}
```

### Commands
- `go run` build the binary but will delete the binary after the program finishes.
	```
	go run hello.go
	```

- `go build` create an executable and you can run it. 
	```
	go build hello.go
	```
	`-o` to change the name.
	```
	go build -o hello_word hello.go
	```
- `go install` install packages under `$HOME/go/bin`.
- `go fmt` format the source code.
- `go lint` provides linting capabilities. You have to first install it:
	```
	go install golang.org/x/lint/golint@latest
	```
- `go vet` detect some uninteded errors.

### Simple Makefile
```makefile
.DEFAULT_GOAL := build

fmt:
	go fmt ./...
.PHONY:fmt

lint: fmt
	golint ./...
.PHONY:lint

vet: fmt
	go vet ./...
	shadow ./...
.PHONY:vet

build: vet
	go build hello.go
.PHONY:build
```

## Reference
- [Learning Go](https://learning.oreilly.com/library/view/learning-go/9781492077206/)
- [Go Download Page](https://golang.org/doc/install)
- [Go install](https://iter01.com/572906.html)