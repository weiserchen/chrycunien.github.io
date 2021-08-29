# Docker Storage

## Modes
- `Bind Mounts`: bind host files into the container
- `Volumes`: bind mount + Docker manage the storage on the host
- `In-memory Storage (tmpfs)`: commonly used to hold sensitive information

The volume also have options to use driver like Amazon's S3, ..., other external drive as storage.

## Example 1

### Source Code
`writedata.go`
```go
package main

import (
	"fmt"
	"os"
	"time"
)

func main() {
	if len(os.Args) <= 1 {
		fmt.Println("Usage: writedata /path-to-file")
		panic("You are missing the file name.")
	}

	filename := os.Args[1]
	hostname, err := os.Hostname()

	if err != nil {
		panic("Cannot determine the hostname")
	}

	f, err := os.OpenFile(filename, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	defer f.Close()

	for i := 0; i < 50; i++ {
		data := fmt.Sprintf("Host: %s - Loop Number: %d\n", hostname, i)

		_, err = f.WriteString(data)
		if err != nil {
			panic("Cannot write to file")
		}

		time.Sleep(time.Millisecond * 100)
	}
}

// env GOOS=linux go build writedata.go
```

### Dockerfile
```dockerfile
FROM scratch
COPY writedata /
CMD ["./writedata", "/logs/myapp"]
```

### Build
```bash
docker build -t "scratch_volume" .
```

## Different Modes

### Bind Mount
```bash
mkdir -p /var/demo/logs/
docker run -d --mount type=bind,src="/var/demo/logs",dst="/logs" scratch_volume
```

### Volume
```bash
docker run -d --mount type=volume,src="logs",dst="/logs" scratch_volume
```

- List all volume
```bash
docker volume ls
```
- Get more information
```bash
docker volume inspect <volume_name>
```
- The actual file location: `/var/lib/docker/volumes/<volume_name>/_data/<file_name>`

### Tmpfs
This type of storage will be erased after each container session is closed.
```bash
docker run -d --mount type=tmpfs,dst="/logs" scratch_volume
```

## References
- https://cloudacademy.com/learning-paths/cloud-academy-docker-in-depth-129/