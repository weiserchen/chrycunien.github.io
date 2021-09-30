# LSP (Kiskov Subsitution Principle)

- You are able to substitute a derived class for a base class. (The implementation of a derived class does not have a conflict with the behavior of the base class.)

## Example

We implement a `Rectangle` class as our base class.
```java
class Rectangle
{
  protected int width, height;

  public Rectangle() {
  }

  public Rectangle(int width, int height) {
    this.width = width;
    this.height = height;
  }

  public int getWidth() {
    return width;
  }

  public void setWidth(int width) {
    this.width = width;
  }

  public int getHeight() {
    return height;
  }

  public void setHeight(int height) {
    this.height = height;
  }

  public int getArea() { return width*height; }

  @Override
  public String toString() {
    return "Rectangle{" +
      "width=" + width +
      ", height=" + height +
      '}';
  }

  public boolean isSquare()
  {
    return width == height;
  }
}
```

We have a `Square` class as a child class. But for the implementation of `setWidth()` and `setHeight()` method, you implicitly change another attributes, which causes inconsistency in some situations.
```java
class Square extends Rectangle
{
  public Square() {
  }

  public Square(int size) {
    width = height = size;
  }

  @Override
  public void setWidth(int width) {
    super.setWidth(width);
    super.setHeight(width);
  }

  @Override
  public void setHeight(int height) {
    super.setHeight(height);
    super.setWidth(height);
  }
}
```
In this example, you find that you get an unexpected behavior when you call `getArea()` after one of the above-mentioned methods.
```java
class LSPDemo
{
  // maybe conform to ++
  static void useIt(Rectangle r)
  {
    int width = r.getWidth();
    r.setHeight(10);
    System.out.println("Expected area of " + (width*10) + ", got " + r.getArea());
  }

  public static void main(String[] args) {
    Rectangle rc = new Rectangle(2, 3);
    useIt(rc);

    Rectangle sq = new Square();
    sq.setHeight(5);
    sq.setWidth(10);
    useIt(sq);
  }
}
```

A possible solution is to add a factory for the `Rectangle` class, but it still cannot solve the basic problem.
```java
class RectangleFactory
{
  public static Rectangle newSquare(int side)
  {
    return new Rectangle(side, side);
  }

  public static Rectangle newRectangle(int width, int height)
  {
    return new Rectangle(width, height);
  }
}
```
Another possible solution is to add a `isSquare()` method to identify a square.
```java
  public boolean isSquare()
  {
    return width == height;
  }
```

## References
- https://www.udemy.com/course/design-patterns-java/