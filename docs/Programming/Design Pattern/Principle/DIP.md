# DIP (Dependency Inversion Principle)
- High-level modules should not depend on low-level modules. Both should depend on abstractions.
- Abstractions should not depend on details. Details should depend on abstractions.
- It is different from the Dependency Injection.
- Why we call it an inversion because in a traditional way, a higher level module depends on the lower level module. However, we invert this to let both depend on an abstraction layer.

## Example
```java
enum Relationship
{
  PARENT,
  CHILD,
  SIBLING
}

class Person
{
  public String name;
  // dob etc.


  public Person(String name) {
    this.name = name;
  }
}
```
By defining a interface `RelationshipBrowser`, the higher class `Research` only has to call the defined method and the implementation is hidden in the `Relationships` class.
```java
interface RelationshipBrowser
{
  List<Person> findAllChildrenOf(String name);
}

class Relationships implements RelationshipBrowser
{
  public List<Person> findAllChildrenOf(String name) {

    return relations.stream()
      .filter(x -> Objects.equals(x.getValue0().name, name)
              && x.getValue1() == Relationship.PARENT)
      .map(Triplet::getValue2)
      .collect(Collectors.toList());
  }

  // Triplet class requires javatuples
  private List<Triplet<Person, Relationship, Person>> relations =
    new ArrayList<>();

  public List<Triplet<Person, Relationship, Person>> getRelations() {
    return relations;
  }

  public void addParentAndChild(Person parent, Person child)
  {
    relations.add(new Triplet<>(parent, Relationship.PARENT, child));
    relations.add(new Triplet<>(child, Relationship.CHILD, parent));
  }
}

class Research
{
  public Research(Relationships relationships)
  {
    // high-level: find all of john's children
    List<Triplet<Person, Relationship, Person>> relations = relationships.getRelations();
    relations.stream()
      .filter(x -> x.getValue0().name.equals("John")
              && x.getValue1() == Relationship.PARENT)
      .forEach(ch -> System.out.println("John has a child called " + ch.getValue2().name));
  }

  public Research(RelationshipBrowser browser)
  {
    List<Person> children = browser.findAllChildrenOf("John");
    for (Person child : children)
      System.out.println("John has a child called " + child.name);
  }
}

class DIPDemo
{
  public static void main(String[] args)
  {
    Person parent = new Person("John");
    Person child1 = new Person("Chris");
    Person child2 = new Person("Matt");

    // low-level module
    Relationships relationships = new Relationships();
    relationships.addParentAndChild(parent, child1);
    relationships.addParentAndChild(parent, child2);

    new Research(relationships);
  }
}
```
## References
- https://www.udemy.com/course/design-patterns-java/