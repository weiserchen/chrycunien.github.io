# ISP (Interface Segregation Principle)

- Split a big interfaces into several smaller interface to limit the range when you want to modify some of the interface in the future.

## Example
In this example, we find that `Machine` interface has 3 methods. Thus once you have to implement this interface, you have to implement all 3 methods.
```java
class Document
{
}

interface Machine
{
  void print(Document d);
  void fax(Document d) throws Exception;
  void scan(Document d) throws Exception;
}

// ok if you need a multifunction machine
class MultiFunctionPrinter implements Machine
{
  public void print(Document d)
  {
    //
  }

  public void fax(Document d)
  {
    //
  }

  public void scan(Document d)
  {
    //
  }
}

class OldFashionedPrinter implements Machine
{
  public void print(Document d)
  {
    // yep
  }

  public void fax(Document d) throws Exception
  {
    throw new Exception();
  }

  public void scan(Document d) throws Exception
  {
    throw new Exception();
  }
}
```
However, in some situations you may want to only implement some of the functionality like `Print()` only. An easy soluton is to split this interface into 3 differenct interface and then you can implement each interface separately.
```java
interface Printer
{
  void Print(Document d) throws Exception;
}

interface IScanner
{
  void Scan(Document d) throws Exception;
}

class JustAPrinter implements Printer
{
  public void Print(Document d)
  {

  }
}

class Photocopier implements Printer, IScanner
{
  public void Print(Document d) throws Exception
  {
    throw new Exception();
  }

  public void Scan(Document d) throws Exception
  {
    throw new Exception();
  }
}
```

In addition, you can use `extends` to combine several interface into a larger interface for convenience. This will not cause a problem in the multiple inheritance in class because interfaces only defines the method signature instead of the actual implementation. 
- If two interface have different method signature, it may be a totally different methods or method overloading. 
- If two interface have the same method signature, it just fine because they actually means the same method based on the java definition.
- But it is a different question when you refer to whether this is what you actually want in your program to let a method that can be used as two interfaces' method. The actual behavior may not be what you want.
```java
interface MultiFunctionDevice extends Printer, IScanner //
{

}

class MultiFunctionMachine implements MultiFunctionDevice
{
  // compose this out of several modules
  private Printer printer;
  private IScanner scanner;

  public MultiFunctionMachine(Printer printer, IScanner scanner)
  {
    this.printer = printer;
    this.scanner = scanner;
  }

  public void Print(Document d) throws Exception
  {
    printer.Print(d);
  }

  public void Scan(Document d) throws Exception
  {
    scanner.Scan(d);
  }
}
```

## References
- https://www.udemy.com/course/design-patterns-java/