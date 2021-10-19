# Go Decorator Pattern

## Aggregated Decorator
- The `Dragon` want to have functionalities of both `Bird` and `Lizard`
- We define an `Aged` interface to serve as an entry point for proxying
- The `Dragon` struct simply proxies `Bird` and `Lizard`

```go
type Aged interface {
  Age() int
  SetAge(age int)
}

type Bird struct {
  age int
}

func (b *Bird) Age() int { return b.age }
func (b *Bird) SetAge(age int) { b.age = age }

func (b *Bird) Fly() {
  if b.age >= 10 {
    fmt.Println("Flying!")
  }
}

type Lizard struct {
  age int
}

func (l *Lizard) Age() int { return l.age }
func (l *Lizard) SetAge(age int) { l.age = age }

func (l *Lizard) Crawl() {
  if l.age < 10 {
    fmt.Println("Crawling!")
  }
}

type Dragon struct {
  bird Bird
  lizard Lizard
}

func (d *Dragon) Age() int {
  return d.bird.age
}

func (d *Dragon) SetAge(age int) {
  d.bird.SetAge(age)
  d.lizard.SetAge(age)
}

func (d *Dragon) Fly() {
  d.bird.Fly()
}

func (d *Dragon) Crawl() {
  d.lizard.Crawl()
}

func NewDragon() *Dragon {
  return &Dragon{Bird{}, Lizard{}}
}

func main() {
  d := NewDragon()
  d.SetAge(10)
  d.Fly()
  d.Crawl()
}
```

## Embedded Decorator
- We have a `Shape` interface with a `Render()` method
- Both `Circle` and `Square` implement it
- We create another struct called `ColoredShape`, which add color functionality
- We can also add another functionality by embedding a `Shape` again
- In this example, because `ColoredShape` implements `Shape`, too. It can then being embedded as another struct's field
- The downside of this approach is that you may lose some native methods like `Resize()` in `Circle` because this method is not included in the `Shape` interface.

```go
type Shape interface {
  Render() string
}

type Circle struct {
  Radius float32
}

func (c *Circle) Render() string {
  return fmt.Sprintf("Circle of radius %f",
    c.Radius)
}

func (c *Circle) Resize(factor float32) {
  c.Radius *= factor
}

type Square struct {
  Side float32
}

func (s *Square) Render() string {
  return fmt.Sprintf("Square with side %f", s.Side)
}

// possible, but not generic enough
type ColoredSquare struct {
  Square
  Color string
}

type ColoredShape struct {
  Shape Shape
  Color string
}

func (c *ColoredShape) Render() string {
  return fmt.Sprintf("%s has the color %s",
    c.Shape.Render(), c.Color)
}

type TransparentShape struct {
  Shape Shape
  Transparency float32
}

func (t *TransparentShape) Render() string {
  return fmt.Sprintf("%s has %f%% transparency",
    t.Shape.Render(), t.Transparency * 100.0)
}

func main() {
  circle := Circle{2}
  fmt.Println(circle.Render())

  redCircle := ColoredShape{&circle, "Red"}
  fmt.Println(redCircle.Render())

  rhsCircle := TransparentShape{&redCircle, 0.5}
  fmt.Println(rhsCircle.Render())
}
```

## Functional Decorator
- In this example, it takes an `Effector` as an argument and return a decorated `Effector` with retry functionality
```go
type Effector func(context.Context) (string, error)

func Retry(effector Effector, retries int, delay time.Duration) Effector { 
    return func(ctx context.Context) (string, error) {
        for r:=0 ; ; r++ {
            response, err := effector(ctx) 
            if err == nil || r >= retries {
                return response, err 
            }
            
            log.Printf("Attempt %d failed; retrying in %v", r + 1, delay)
            
            select {
            case <-time.After(delay): 
            case <-ctx.Done():
                return "", ctx.Err() 
            }
        }    
    }
}

```

## References
- Matthews A. Titmus - Cloud Native Go
- https://www.udemy.com/course/design-patterns-go