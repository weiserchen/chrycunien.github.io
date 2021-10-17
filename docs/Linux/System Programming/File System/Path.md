# Path

## Get Working Directory
- https://golang.org/pkg/os/#Getwd
```go
func Getwd() (dir string, err error)
```
```go
wd, err := os.Getwd()
if err != nil {
    fmt.Println(err)
    return
}
fmt.Println("Current Directory:", wd)
```

## Change Directory
- https://golang.org/pkg/os/#Chdir
```go
func Chdir(dir string) error
```
```go
if err := os.Chdir("/"); err != nil {
    fmt.Println(err)
    return
}

if wd, err = os.Getwd(); err != nil {
    fmt.Println(err)
    return
}
```

## `filepath` package
There are many other functions to use in the `path/filepath` package.
- https://golang.org/pkg/path/filepath/
```go
func Abs(path string) (string, error)
func Base(path string) string
func Clean(path string) string
func Dir(path string) string
func EvalSymlinks(path string) (string, error)
func Ext(path string) string
func FromSlash(path string) string
func Glob(pattern string) (matches []string, err error)
func HasPrefix(p, prefix string) bool
func IsAbs(path string) bool
func Join(elem ...string) string
func Match(pattern, name string) (matched bool, err error)
func Rel(basepath, targpath string) (string, error)
func Split(path string) (dir, file string)
func SplitList(path string) []string
func ToSlash(path string) string
func VolumeName(path string) string
func Walk(root string, fn WalkFunc) error
func WalkDir(root string, fn fs.WalkDirFunc) error
type WalkFunc func(path string, info os.FileInfo, err error) error
```

## Simple Program
```go
package main

import (
    "fmt"
    "os"
    "path/filepath"
)

func main() {
    if len(os.Args) != 2 { // ensure path is specified
        fmt.Println("Please specify a path.")
        return
    }
    root, err := filepath.Abs(os.Args[1]) // get absolute path
    if err != nil {
        fmt.Println("Cannot get absolute path:", err)
        return
    }
    pathInfo, err := os.Stat(root)
	if err != nil {
		fmt.Println("Path does not exist!")
		return
	}
	if !pathInfo.IsDir() {
		fmt.Println("The path is not a directory!")
		return
	}
    fmt.Println("Listing files in", root)
    var c struct {
        files int
        dirs int
    }
    filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
        // walk the tree to count files and folders
        if info.IsDir() {
            c.dirs++
        } else {
            c.files++
        }
        fmt.Println("-", path)
        return nil
    })
    fmt.Printf("Total: %d files in %d directories", c.files, c.dirs)
}
```