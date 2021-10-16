
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
- Check the go version you have already installed.
```bash
$ go version
```
- If the command not found, check the installation path:
```bash
$ which go
```
- Add path to `~/.zshrc` 
```bash title="~/.zshrc"
export PATH="$PATH:$HOME/go/bin"
```
- Install go dependency
```bash
# If you not specify the @latest (or some version tag), it will not work in global
# You can omit the version tag if you have `go.mod` in the directory
$ go install golang.org/x/tools/cmd/godoc@latest

# Verify
$ godoc --help
```

The correct path is: `/usr/local/bin/go` (install using brew).
## Package
- Using `go install` to install third-party package on your local machine. 
- If you want to want to install globally, you have to specify the version, or it will be installed in a package.
```bash
# If you not specify the @latest (or some version tag), it will not work in global
# You can omit the version tag if you have `go.mod` in the directory
$ go install golang.org/x/tools/cmd/godoc@latest

# Verify
$ godoc --help
```

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
- `go run`: build the binary but will delete the binary after the program finishes.
```bash
$ go run hello.go
```

- `go build`: create an executable and you can run it. 
```bash
# Build the binary
$ go build hello.go

# Use `-o` to change the name. 
# The binary name is `hello_world` in this case.
$ go build -o hello_word hello.go
```
- `go install`: install packages under `$HOME/go/bin`.
- `go fmt`: format the source code.
- `go lint`: provides linting capabilities. You have to first install it:
```bash
$ go install golang.org/x/lint/golint@latest
```
- `go vet`: detect some uninteded errors.
- `go doc`: View the documentation of a package or function
```bash
$ go doc fmt.Printf
```
- `godoc`: A web-based documentation on your local machine (including your own pacakge.)
```bash
$ godoc -http=:6060
```


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