# CLI Basics

## Flag package
The `flag` package is a built-in library for Go to write CLI programs. It is simple to use and help you generate the help function automatically. The framework can be divided into 2 steps: binding and parsing.

```go
import "flag"
```

A common practice to decouple the flag options binding and the main function is to use `init` functions in Go. 
- The `init` functions will be executed at the moment when the package is loaded. 
- Because the binding happened in the package level, you can separate the binding and parsing of variables. 
- You have to declare the variables to be global variables.
- You only need to call `flag.Parse()` in the `main` function. 
- For more [information](https://pkg.go.dev/flag)
```go
var (
	masterURL  string
	kubeconfig string
)

func main() {
	flag.Parse()
    ...
}

func init() {
	flag.StringVar(&kubeconfig, "kubeconfig", "", "Path to a kubeconfig. Only required if out-of-cluster.")
	flag.StringVar(&masterURL, "master", "", "The address of the Kubernetes API server. Overrides any value in kubeconfig. Only required if out-of-cluster.")
}
```
```bash
$ ./sample-controller -kubeconfig "~/.kubeconfig"
```

The problem of the `flag` package is that the way it use to specify command-line flags is not standard. Usually, we use `--` for complete name, like `--incluster`, and `-` for short name, `-i`. However, the `flag` will compile to use `-incluster` and no short name.

## Cobra
Cobra is a third-party package for Go to write a CLI program. Since it's too complex, we spare it entirely to another note.

## References
- https://github.com/kubernetes/sample-controller/blob/master/main.go