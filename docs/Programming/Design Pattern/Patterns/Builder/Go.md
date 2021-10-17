# Go Builder Patterns

## String Builder
This code snippets use string builder to construct a html document.
```golang
func main() {
  hello := "hello"
  sb := strings.Builder{}
  sb.WriteString("<p>")
  sb.WriteString(hello)
  sb.WriteString("</p>")
  fmt.Printf("%s\n", sb.String())

  words := []string{"hello", "world"}
  sb.Reset()
  // <ul><li>...</li><li>...</li><li>...</li></ul>'
  sb.WriteString("<ul>")
  for _, v := range words {
    sb.WriteString("<li>")
    sb.WriteString(v)
    sb.WriteString("</li>")
  }
  sb.WriteString("</ul>")
  fmt.Println(sb.String())
}
```

## HTML builder
This code snippet create a html builder to create a html document. You can see that it's much more simpler to construct a html file that using the basix string builder (although it use string builder behind the scene).
```golang
const (
  indentSize = 2
)

type HtmlElement struct {
  name, text string
  elements []HtmlElement
}

func (e *HtmlElement) String() string {
  return e.string(0)
}

func (e *HtmlElement) string(indent int) string {
  sb := strings.Builder{}
  i := strings.Repeat(" ", indentSize * indent)
  sb.WriteString(fmt.Sprintf("%s<%s>\n",
    i, e.name))
  if len(e.text) > 0 {
    sb.WriteString(strings.Repeat(" ",
      indentSize * (indent + 1)))
    sb.WriteString(e.text)
    sb.WriteString("\n")
  }

  for _, el := range e.elements {
    sb.WriteString(el.string(indent+1))
  }
  sb.WriteString(fmt.Sprintf("%s</%s>\n",
    i, e.name))
  return sb.String()
}

type HtmlBuilder struct {
  rootName string
  root HtmlElement
}

func NewHtmlBuilder(rootName string) *HtmlBuilder {
  b := HtmlBuilder{rootName,
    HtmlElement{rootName, "", []HtmlElement{}}}
  return &b
}

func (b *HtmlBuilder) String() string {
  return b.root.String()
}

func (b *HtmlBuilder) AddChild(
  childName, childText string) {
  e := HtmlElement{childName, childText, []HtmlElement{}}
  b.root.elements = append(b.root.elements, e)
}

func (b *HtmlBuilder) AddChildFluent(
  childName, childText string) *HtmlBuilder {
  e := HtmlElement{childName, childText, []HtmlElement{}}
  b.root.elements = append(b.root.elements, e)
  return b
}

func main() {
  b := NewHtmlBuilder("ul")
  b.AddChildFluent("li", "hello").
    AddChildFluent("li", "world")
  fmt.Println(b.String())
}
```

## Faceted Builder
Sometimes we have many field to initialize, we can separate them into multiple builder to make the initialization easier.

First, we create a `Person` struct and a `PersonBuilder` and add some utility functions to it.
```golang
type Person struct {
  // Address
  StreetAddress, Postcode, City string

  // Job
  CompanyName, Position string
  AnnualIncome int
}

type PersonBuilder struct {
  person *Person // needs to be inited
}

func NewPersonBuilder() *PersonBuilder {
  return &PersonBuilder{&Person{}}
}

func (it *PersonBuilder) Build() *Person {
  return it.person
}

func (it *PersonBuilder) Works() *PersonJobBuilder {
  return &PersonJobBuilder{*it}
}

func (it *PersonBuilder) Lives() *PersonAddressBuilder {
  return &PersonAddressBuilder{*it}
}
```
And actually, because `PersonJobBuilder` and `PersonAddressBuilder` just like a `PersonBuilder` (see Go's struct prompted fields for further understanding.) They can use functions defined in `PersonBuilder`, which acts as inheritance features in OOP language.
```golang
type PersonJobBuilder struct {
  PersonBuilder
}

func (pjb *PersonJobBuilder) At(
  companyName string) *PersonJobBuilder {
  pjb.person.CompanyName = companyName
  return pjb
}

func (pjb *PersonJobBuilder) AsA(
  position string) *PersonJobBuilder {
  pjb.person.Position = position
  return pjb
}

func (pjb *PersonJobBuilder) Earning(
  annualIncome int) *PersonJobBuilder {
  pjb.person.AnnualIncome = annualIncome
  return pjb
}
```
```golang
type PersonAddressBuilder struct {
  PersonBuilder
}

func (it *PersonAddressBuilder) At(
  streetAddress string) *PersonAddressBuilder {
  it.person.StreetAddress = streetAddress
  return it
}

func (it *PersonAddressBuilder) In(
  city string) *PersonAddressBuilder {
  it.person.City = city
  return it
}

func (it *PersonAddressBuilder) WithPostcode(
  postcode string) *PersonAddressBuilder {
  it.person.Postcode = postcode
  return it
}
```
```golang
func main() {
  pb := NewPersonBuilder()
  pb.
    Lives().
      At("123 London Road").
      In("London").
      WithPostcode("SW12BC").
    Works().
      At("Fabrikam").
      AsA("Programmer").
      Earning(123000)
  person := pb.Build()
  fmt.Println(*person)
}
```

## Force to use builder
The email builder provides a `SendEmail` wrapper function to guard against the direct creation without using the builder.
```golang
type email struct {
	from, to, subject, body string
}

type EmailBuilder struct {
	email email
}

func (b *EmailBuilder) From(from string) *EmailBuilder {
	if !strings.Contains(from, "@") {
		panic("email should contain @")
	}
	b.email.from = from
	return b
}

func (b *EmailBuilder) To(to string) *EmailBuilder {
	b.email.to = to
	return b
}

func (b *EmailBuilder) Subject(subject string) *EmailBuilder {
	b.email.subject = subject
	return b
}

func (b *EmailBuilder) Body(body string) *EmailBuilder {
	b.email.body = body
	return b
}

func sendMailImpl(email *email) {
	// actually ends the email
}

type build func(*EmailBuilder)
func SendEmail(action build) {
	builder := EmailBuilder{}
	action(&builder)
	sendMailImpl(&builder.email)
}

func main() {
	SendEmail(func(b *EmailBuilder) {
		b.From("foo@bar.com").
			To("bar@baz.com").
			Subject("Meeting").
			Body("Hello, do you want to meet?")
	})
}
```

## Functional Builder
This builder demostrate the builder using functional style.
```golang
type Person struct {
  name, position string
}

type personMod func(*Person)
type PersonBuilder struct {
  actions []personMod
}

func (b *PersonBuilder) Called(name string) *PersonBuilder {
  b.actions = append(b.actions, func(p *Person) {
    p.name = name
  })
  return b
}

func (b *PersonBuilder) Build() *Person {
  p := Person{}
  for _, a := range b.actions {
    a(&p)
  }
  return &p
}

// extend PersonBuilder
func (b *PersonBuilder) WorksAsA(position string) *PersonBuilder {
  b.actions = append(b.actions, func(p *Person) {
    p.position = position
  })
  return b
}

func main() {
  b := PersonBuilder{}
  p := b.Called("Dmitri").WorksAsA("dev").Build()
  fmt.Println(*p)
}
```


## Code Reuse
Because Go does not support inheritance like in Java, its builder pattern will be slightly different. In addition, Go lacks constructor and access modifier, which makes it harder to encapsulate, so actually you have direct access to the field of a type. We still can break the instantiation process by adding several setters like we did in Java. If you want to achieve same effect in Java, you can use `sync.Once`.

Therefore, we will focus on how to reuse codes in the following examples.

### Examples
This example use an interface `BuildProcess` to abstract the construction of a vehicle. By adding a `ManufacturingDirector`, we reuse the construction process and only need to pass a different builder to this director. Then we can make a car in a simple way.

```golang
type BuildProcess interface {
	SetWheels() BuildProcess
	SetSeats() BuildProcess
	SetStructure() BuildProcess
	GetVehicle() VehicleProduct
}

//Director
type ManufacturingDirector struct {
	builder BuildProcess
}

func (f *ManufacturingDirector) Construct() {
	f.builder.SetSeats().SetStructure().SetWheels()
}

func (f *ManufacturingDirector) SetBuilder(b BuildProcess) {
	f.builder = b
}

//Product
type VehicleProduct struct {
	Wheels    int
	Seats     int
	Structure string
}

//A Builder of type car
type CarBuilder struct {
	v VehicleProduct
}

func (c *CarBuilder) SetWheels() BuildProcess {
	c.v.Wheels = 4
	return c
}

func (c *CarBuilder) SetSeats() BuildProcess {
	c.v.Seats = 5
	return c
}

func (c *CarBuilder) SetStructure() BuildProcess {
	c.v.Structure = "Car"
	return c
}

func (c *CarBuilder) GetVehicle() VehicleProduct {
	return c.v
}

//A Builder of type motorbike
type BikeBuilder struct {
	v VehicleProduct
}

func (b *BikeBuilder) SetWheels() BuildProcess {
	b.v.Wheels = 2
	return b
}

func (b *BikeBuilder) SetSeats() BuildProcess {
	b.v.Seats = 2
	return b
}

func (b *BikeBuilder) SetStructure() BuildProcess {
	b.v.Structure = "Motorbike"
	return b
}

func (b *BikeBuilder) GetVehicle() VehicleProduct {
	return b.v
}
```
Demo:
```golang title="builder_test.go"
manufacturingComplex := ManufacturingDirector{}

carBuilder := &CarBuilder{}
manufacturingComplex.SetBuilder(carBuilder)
manufacturingComplex.Construct()

car := carBuilder.GetVehicle()

if car.Wheels != 4 {
    t.Errorf("Wheels on a car must be 4 and they were %d\n", car.Wheels)
}

if car.Structure != "Car" {
    t.Errorf("Structure on a car must be 'Car' and was %s\n", car.Structure)
}

if car.Seats != 5 {
    t.Errorf("Seats on a car must be 5 and they were %d\n", car.Seats)
}

bikeBuilder := &BikeBuilder{}

manufacturingComplex.SetBuilder(bikeBuilder)
manufacturingComplex.Construct()

motorbike := bikeBuilder.GetVehicle()
motorbike.Seats = 1

if motorbike.Wheels != 2 {
    t.Errorf("Wheels on a motorbike must be 2 and they were %d\n", motorbike.Wheels)
}

if motorbike.Structure != "Motorbike" {
    t.Errorf("Structure on a motorbike must be 'Motorbike' and was %s\n", motorbike.Structure)
}
```

### Disadvatanges
In Go, it is not as flexible in Java because Go does not support some features. Thus, try to avoid using builder if the build interface is not stable, or it will affect a lot of existing code (in order to satisfy the interface).

## References
- https://www.udemy.com/course/design-patterns-go
- https://github.com/PacktPublishing/Go-Design-Patterns/blob/master/Chapter02/builder.go
- https://github.com/PacktPublishing/Go-Design-Patterns/blob/master/Chapter02/builder_test.go
