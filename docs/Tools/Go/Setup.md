# Setup

## Installation
- Install go via brew (you can also download from the official website)
```bash
$ brew install go

# Verify (you need to restart the terminal)
$ go --version
```
- Add path to `~/.zshrc` 
```bash title="~/.zshrc"
export PATH="$HOME/go/bin:$PATH"
```
- Install go dependency
```bash
# If you not specify the @latest (or some version tag), it will not work in global
# You can omit the version tag if you have `go.mod` in the directory
$ go install golang.org/x/tools/cmd/godoc@latest

# Verify
$ godoc --help
```
