# Go Struct

Struct is a way in Go to represent a collection of different types, just like you see in C/C++. It functions like a class in many OOP language, but the underlying mechanism is different.

In this article, I write down some challenge features that you may face when reading go struct.

## Interface and Struct
Typically, to decouple the details, we would separate the interface and the implementation. In Go, which means separate `interface` and `struct`. We will create a general interface for a specific purpose, then create multiple structs that implements this interface and sometimes we will swap different implementation for different use.

## Struct Pointer
```go
p := &Person{}
```
Instead of binding `p` to a concrete `Person`, we bind it to a reference of a `Person`. This allows us to have a unique reference to pass around several functions, which can be helpful if you want to maintain the state of a struct.

By the way, Go allows user to use `p.x` as a short cut of `(*p).x`.

## Embedded Struct
You can embed type directly without supplying their name, this is called anonymous or embedded field. 
```go
type ReadWriter interface {
    Reader
    Writer
}
```

## Duplicated Field
This code snippet will not compile because there are duplicated field in a struct.
```go
type T struct {
    http.Request // field name is "Request"
    Request // field name is "Request"
}
```

## Prompted field
The field that belongs to the embedded element will be **prompted** if it doesn't duplicate with a field in the parent struct.(Compile error) Basic types like `string` have no "prompted field" to expose ,but it still valid to use `obj.string` to access the field , see https://stackoverflow.com/a/28014640

However, in the initialization, you have to **explicitly** specify the embedded object.
```go
// https://medium.com/golangspec/promoted-fields-and-methods-in-go-4e8d7aefb3e3
type Person struct {
    name string
    age  int32
}

func (p Person) IsAdult() bool {
    return p.age >= 18
}

type Employee struct {
    position string
}

func (e Employee) IsManager() bool {
    return e.position == "manager"
}

type Record struct {
    Person
    Employee
}

func main() {

    fmt.Printf("%+v", record)
}
```
```go
func main() {
    // Not compile!
    record := Record{
        name:     "record",
        age:      29,
        position: "software engineer",
    }

    fmt.Printf("%+v", record)

    // Correct!
    record := Record{}
    record.name = "record"
    record.age = 29
    record.position = "software engineer"

    fmt.Printf("%+v", record)

    // Correct!
    record := Record{
        Person: Person{
            name: "record",
            age:  29,
        },
        Employee: Employee{
            position: "software engineer",
        },
    }

    fmt.Printf("%+v", record)
}


```
```go
func main() {
    record := Record{
        Person: Person{
            name: "record",
            age:  29,
        },
        Employee: Employee{
            position: "software engineer",
        },
    }

    fmt.Println("name", record.name)             // 29
    fmt.Println("Person.age", record.Person.age) // 29

    fmt.Println("position", record.position)                   // software engineer
    fmt.Println("Employee.position", record.Employee.position) // software engineer
}
```

## References
- https://stackoverflow.com/questions/28014591/nameless-fields-in-go-structs
- https://pjchender.dev/golang/structs/
- https://ithelp.ithome.com.tw/articles/10227592
- http://www.hydrogen18.com/blog/golang-embedding.html