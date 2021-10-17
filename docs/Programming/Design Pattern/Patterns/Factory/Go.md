# Go Factory Pattern

## Factory 
This code snippet demostrate the use of factory function.
```golang
type Person struct {
  Name string
  Age int
}

func NewPerson(name string, age int) *Person {
  return &Person{name, age}
}

func main_() {
  // initialize directly
  p := Person{"John", 22}
  fmt.Println(p)

  // use a constructor
  p2 := NewPerson("Jane", 21)
  p2.Age = 30
  fmt.Println(p2)
}
```

## Factory Generator

### Functional
- This code snippet use closure to create a factory generator
- It's more succint and elegant
```golang
type Employee struct {
  Name, Position string
  AnnualIncome int
}

// functional approach
func NewEmployeeFactory(position string,
  annualIncome int) func(name string) *Employee {
  return func(name string) *Employee {
    return &Employee{name, position, annualIncome}
  }
}

func main() {
  developerFactory := NewEmployeeFactory("Developer", 60000)
  managerFactory := NewEmployeeFactory("Manager", 80000)

  developer := developerFactory("Adam")
  manager := managerFactory("Jane")

  fmt.Println(developer)
  fmt.Println(manager)
}
```
### Structure
- The code snippet use a new type to implement a factory generator
- However, it usually need an additional interface when passed into another function
- Because you still need to specify the concrete type, its use case is limited
```golang
type Employee struct {
  Name, Position string
  AnnualIncome int
}

// structural approach
type EmployeeFactory struct {
  Position string
  AnnualIncome int
}

interface EmployeeCreator {
    Create(string) *Employee
}

func NewEmployeeFactory(position string,
  annualIncome int) *EmployeeFactory {
  return &EmployeeFactory{position, annualIncome}
}

func (f *EmployeeFactory) Create(name string) *Employee {
  return &Employee{name, f.Position, f.AnnualIncome}
}

func main() {
  bossFactory := NewEmployeeFactory2("CEO", 100000)
  // can modify post-hoc
  bossFactory.AnnualIncome = 110000
  boss := bossFactory.Create("Sam")
  fmt.Println(boss)
}
```

## Prototype Factory
- This code snippet create an object by condition.
```golang
type Employee struct {
  Name, Position string
  AnnualIncome int
}

const (
  Developer = iota
  Manager
)

// functional
func NewEmployee(role int) *Employee {
  switch role {
  case Developer:
    return &Employee{"", "Developer", 60000}
  case Manager:
    return &Employee{"", "Manager", 80000}
  default:
    panic("unsupported role")
  }
}

func main() {
  m := NewEmployee(Manager)
  m.Name = "Sam"
  fmt.Println(m)
}
```

## References
- https://www.udemy.com/course/design-patterns-go
