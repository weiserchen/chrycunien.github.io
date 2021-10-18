# Go Prototype Pattern

### Deep Copying
- In this approach, you copy each fields directly from the old object.
```go
type Address struct {
  StreetAddress, City, Country string
}

type Person struct {
  Name string
  Address *Address
}

func main() {
  john := Person{"John",
    &Address{"123 London Rd", "London", "UK"}}

  jane := john
  jane.Address = &Address{
    john.Address.StreetAddress,
    john.Address.City,
    john.Address.Country  }

  jane.Name = "Jane" // ok

  jane.Address.StreetAddress = "321 Baker St"

  fmt.Println(john.Name, john.Address)
  fmt.Println(jane.Name, jane. Address)
}
```

### Copy Method
- In this approach, you create cascade `DeepCopy()` function to create a new object.
```go
type Address struct {
  StreetAddress, City, Country string
}

func (a *Address) DeepCopy() *Address {
  return &Address{
    a.StreetAddress,
    a.City,
    a.Country }
}

type Person struct {
  Name string
  Address *Address
  Friends []string
}

func (p *Person) DeepCopy() *Person {
  q := *p // copies Name
  q.Address = p.Address.DeepCopy()
  copy(q.Friends, p.Friends)
  return &q
}

func main() {
  john := Person{"John",
    &Address{"123 London Rd", "London", "UK"},
    []string{"Chris", "Matt"}}

  jane := john.DeepCopy()
  jane.Name = "Jane"
  jane.Address.StreetAddress = "321 Baker St"
  jane.Friends = append(jane.Friends, "Angela")

  fmt.Println(john, john.Address)
  fmt.Println(jane, jane.Address)
}
```

### Copy Through Serialization
- In this approach, you use some standard library function to serialize and deserialize an object
```go
import (
  "bytes"
  "encoding/gob"
  "fmt"
)

type Address struct {
  StreetAddress, City, Country string
}

type Person struct {
  Name string
  Address *Address
  Friends []string
}

func (p *Person) DeepCopy() *Person {
  // note: no error handling below
  b := bytes.Buffer{}
  e := gob.NewEncoder(&b)
  _ = e.Encode(p)

  d := gob.NewDecoder(&b)
  result := Person{}
  _ = d.Decode(&result)
  return &result
}

func main() {
  john := Person{"John",
    &Address{"123 London Rd", "London", "UK"},
    []string{"Chris", "Matt", "Sam"}}

  jane := john.DeepCopy()
  jane.Name = "Jane"
  jane.Address.StreetAddress = "321 Baker St"
  jane.Friends = append(jane.Friends, "Jill")

  fmt.Println(john, john.Address)
  fmt.Println(jane, jane.Address)
}
```

### Prototype Factory
- You can create some wrapper functions to build a convenient API for building a prototype.
```go
import (
  "bytes"
  "encoding/gob"
  "fmt"
)

type Address struct {
  Suite int
  StreetAddress, City string
}

type Employee struct {
  Name string
  Office Address
}

func (p *Employee) DeepCopy() *Employee {
  // note: no error handling below
  b := bytes.Buffer{}
  e := gob.NewEncoder(&b)
  _ = e.Encode(p)

  d := gob.NewDecoder(&b)
  result := Employee{}
  _ = d.Decode(&result)
  return &result
}

// employee factory
// either a struct or some functions
var mainOffice = Employee {
  "", Address{0, "123 East Dr", "London"}}
var auxOffice = Employee {
  "", Address{0, "66 West Dr", "London"}}

// utility method for configuring emp
func newEmployee(proto *Employee,
  name string, suite int) *Employee {
  result := proto.DeepCopy()
  result.Name = name
  result.Office.Suite = suite
  return result
}

func NewMainOfficeEmployee(
  name string, suite int) *Employee {
    return newEmployee(&mainOffice, name, suite)
}

func NewAuxOfficeEmployee(
  name string, suite int) *Employee {
    return newEmployee(&auxOffice, name, suite)
}

func main() {
  john := NewMainOfficeEmployee("John", 100)
  jane := NewAuxOfficeEmployee("Jane", 200)

  fmt.Println(john)
  fmt.Println(jane)
}
```

## References
- https://www.udemy.com/course/design-patterns-go

