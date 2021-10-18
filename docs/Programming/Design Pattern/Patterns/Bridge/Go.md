# Go Bridge Pattern

The bridge pattern decouples interfaces and implementations.

- We have two implementation of renders
```go
type Renderer interface {
  RenderCircle(radius float32)
}

type VectorRenderer struct {

}

type RasterRenderer struct {
    Dpi int
}

func (v *VectorRenderer) RenderCircle(radius float32) {
  fmt.Println("Drawing a circle of radius", radius)
}


func (r *RasterRenderer) RenderCircle(radius float32) {
  fmt.Println("Drawing pixels for circle of radius", radius)
}
```
- We actually wants to create a Circle object. What we take in is an `Renderer` interface that implement `RenderCircle()`.
```go
type Circle struct {
  renderer Renderer
  radius float32
}

func (c *Circle) Draw() {
  c.renderer.RenderCircle(c.radius)
}

func NewCircle(renderer Renderer, radius float32) *Circle {
  return &Circle{renderer: renderer, radius: radius}
}

func (c *Circle) Resize(factor float32) {
  c.radius *= factor
}
```
- Then you can swap to different implementation
```go
func main() {
  raster := RasterRenderer{}
  vector := VectorRenderer{}
  circle := NewCircle(&vector, 5)
  circle.Draw()
}
```

## References
- https://www.udemy.com/course/design-patterns-go