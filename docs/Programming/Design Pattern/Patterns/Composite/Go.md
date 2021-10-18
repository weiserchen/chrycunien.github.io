# Go Composite Pattern

## Geometry Composite
- This example demostrate how to embed itself to form a recursive structure
```go
type GraphicObject struct {
  Name, Color string
  Children []GraphicObject
}

func (g *GraphicObject) String() string {
  sb := strings.Builder{}
  g.print(&sb, 0)
  return sb.String()
}

func (g *GraphicObject) print(sb *strings.Builder, depth int) {
  sb.WriteString(strings.Repeat("*", depth))
  if len(g.Color) > 0 {
    sb.WriteString(g.Color)
    sb.WriteRune(' ')
  }
  sb.WriteString(g.Name)
  sb.WriteRune('\n')

  for _, child := range g.Children {
    child.print(sb, depth+1)
  }
}

func NewCircle(color string) *GraphicObject {
  return &GraphicObject{"Circle", color, nil}
}

func NewSquare(color string) *GraphicObject {
  return &GraphicObject{"Square", color, nil}
}

func main() {
  drawing := GraphicObject{"My Drawing", "", nil}
  drawing.Children = append(drawing.Children, *NewSquare("Red"))
  drawing.Children = append(drawing.Children, *NewCircle("Yellow"))

  group := GraphicObject{"Group 1", "", nil}
  group.Children = append(group.Children, *NewCircle("Blue"))
  group.Children = append(group.Children, *NewSquare("Blue"))
  drawing.Children = append(drawing.Children, group)

  fmt.Println(drawing.String())
}
```

## Neuron Network Composite
- This example is interesting, by utilizing a `NeuronInterface`, it can connect `Neuron` and `NeuronLayer`
- It forces two concrete type to conform to an interface, and because the underlying type (`Neuron`) is the same, they can concatenate seamlessly.
```go
type NeuronInterface interface {
  Iter() []*Neuron
}

type Neuron struct {
  In, Out []*Neuron
}

func (n *Neuron) Iter() []*Neuron {
  return []*Neuron{n}
}

func (n *Neuron) ConnectTo(other *Neuron) {
  n.Out = append(n.Out, other)
  other.In = append(other.In, n)
}

type NeuronLayer struct {
  Neurons []Neuron
}

func (n *NeuronLayer) Iter() []*Neuron {
  result := make([]*Neuron, 0)
  for i := range n.Neurons {
    result = append(result, &n.Neurons[i])
  }
  return result
}

func NewNeuronLayer(count int) *NeuronLayer {
  return &NeuronLayer{make([]Neuron, count)}
}

func Connect(left, right NeuronInterface) {
  for _, l := range left.Iter() {
    for _, r := range right.Iter() {
      l.ConnectTo(r)
    }
  }
}

func main() {
  neuron1, neuron2 := &Neuron{}, &Neuron{}
  layer1, layer2 := NewNeuronLayer(3), NewNeuronLayer(4)

  Connect(neuron1, neuron2)
  Connect(neuron1, layer1)
  Connect(layer2, neuron1)
  Connect(layer1, layer2)
}
```

## References
- https://www.udemy.com/course/design-patterns-go