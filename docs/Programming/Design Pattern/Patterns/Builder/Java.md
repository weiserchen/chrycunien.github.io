# Java Builder Patterns

## HTML Builder
A fluent builder is a builder that return `this`. This allows us to set attributes in a pipeline fashion. 

For brevity, we omit the implementation of the `HtmlElement`. This element is just a container for storing html elements.
```java
class HtmlBuilder
{
  private String rootName;
  private HtmlElement root = new HtmlElement();

  public HtmlBuilder(String rootName)
  {
    this.rootName = rootName;
    root.name = rootName;
  }

  // not fluent
  public void addChild(String childName, String childText)
  {
    HtmlElement e = new HtmlElement(childName, childText);
    root.elements.add(e);
  }

  // fluent
  public HtmlBuilder addChildFluent(String childName, String childText)
  {
    HtmlElement e = new HtmlElement(childName, childText);
    root.elements.add(e);
    return this;
  }

  public void clear()
  {
    root = new HtmlElement();
    root.name = rootName;
  }

  // delegating
  @Override
  public String toString()
  {
    return root.toString();
  }
}
```

## Recursive Builder
If you are not familiar with the recursive generic in Java, you can see my note in `Programming/Chanllenge/Java-Generic`. This note provides an quick introduction of Java generic. In this example, what it actually means is to limit the type parameter to be only its subtype of `Person`.


```java
class PersonBuilder<SELF extends PersonBuilder<SELF>>
{
  protected Person person = new Person();

  // critical to return SELF here
  // Because this method is own by PersonBuilder, it we return a Person type, then
  // the it makes order matters because a Person builder do not know any child method
  // By making the return type as SELF, it allows even when a child call this parent method,
  // it can return the right type (Employee builder example)
  public SELF withName(String name)
  {
    person.name = name;
    return self();
  }

  // This method is to allow the builder to return itself
  // We separate this to a method to make it can be inherited by its child
  protected SELF self()
  {
    // unchecked cast, but actually safe
    // proof: try sticking a non-PersonBuilder
    //        as SELF parameter; it won't work!
    return (SELF) this;
  }

  public Person build()
  {
    return person;
  }
}

class EmployeeBuilder
  extends PersonBuilder<EmployeeBuilder>
{
  public EmployeeBuilder worksAs(String position)
  {
    person.position = position;
    return self();
  }

  @Override
  protected EmployeeBuilder self()
  {
    return this;
  }
}
```
This is the demonstration:
```java
class RecursiveGenericsDemo
{
  public static void main(String[] args)
  {
    EmployeeBuilder eb = new EmployeeBuilder()
      .withName("Dmitri")
      .worksAs("Quantitative Analyst");
    System.out.println(eb.build());
  }
}
```

## Faceted Builder
```java
class Person
{
  // address
  public String streetAddress, postcode, city;

  // employment
  public String companyName, position;
  public int annualIncome;

  @Override
  public String toString()
  {
    return "Person{" +
      "streetAddress='" + streetAddress + '\'' +
      ", postcode='" + postcode + '\'' +
      ", city='" + city + '\'' +
      ", companyName='" + companyName + '\'' +
      ", position='" + position + '\'' +
      ", annualIncome=" + annualIncome +
      '}';
  }
}
```
This builder create a reference of a person. However, in comparison with the previous example, `Person` class has the complete attributes. What we do here is simple split several builder methods into various class to make the code cleaner. (We delegate some builder methods to subclasses, make it complete some predifined settings.)
```java
// builder facade
class PersonBuilder
{
  // the object we're going to build
  protected Person person = new Person(); // reference!

  public PersonJobBuilder works()
  {
    return new PersonJobBuilder(person);
  }

  public PersonAddressBuilder lives()
  {
    return new PersonAddressBuilder(person);
  }

  public Person build()
  {
    return person;
  }
}

class PersonAddressBuilder extends PersonBuilder
{
  public PersonAddressBuilder(Person person)
  {
    this.person = person;
  }

  public PersonAddressBuilder at(String streetAddress)
  {
    person.streetAddress = streetAddress;
    return this;
  }

  public PersonAddressBuilder withPostcode(String postcode)
  {
    person.postcode = postcode;
    return this;
  }

  public PersonAddressBuilder in(String city)
  {
    person.city = city;
    return this;
  }
}

class PersonJobBuilder extends PersonBuilder
{
  public PersonJobBuilder(Person person)
  {
    this.person = person;
  }

  public PersonJobBuilder at(String companyName)
  {
    person.companyName = companyName;
    return this;
  }

  public PersonJobBuilder asA(String position)
  {
    person.position = position;
    return this;
  }

  public PersonJobBuilder earning(int annualIncome)
  {
    person.annualIncome = annualIncome;
    return this;
  }
}
```
Demo:
```java
class BuilderFacetsDemo
{
  public static void main(String[] args)
  {
    PersonBuilder pb = new PersonBuilder();
    Person person = pb
      .lives()
        .at("123 London Road")
        .in("London")
        .withPostcode("SW12BC")
      .works()
        .at("Fabrikam")
        .asA("Engineer")
        .earning(123000)
      .build();
    System.out.println(person);
  }
}
```

## Extra Example
In this example, we use an inner class as a class builder. The benefit of using inner class is to provide stronger encapsulation. Since what we really care about is to create new `User` object, it doesn't matter how we can accomplish it. By encapsulating the builder class in the main class, it provides a single static interface for other classes to call.
```java 
public final class User {
    private final String nickname;
    private final String password;
    private final String firstname;
    private final String lastname;
    private final String email;
    private final Date created;

    private User(UserBuilder builder) {
        this.nickname = builder.nickname;
        this.password = builder.password;
        this.created = builder.created;
        this.firstname = builder.firstname;
        this.lastname = builder.lastname;
        this.email = builder.email;
    }

    public static UserBuilder getBuilder(
        String nickname, String password) {
        return new User.UserBuilder(nickname, password);
     }

    public static final class UserBuilder {
        private final String nickname;
        private final String password;
        private final Date created;
        private String email;
        private String firstname;
        private String lastname;
        
        public UserBuilder(String nickname, String password) {
            this.nickname = nickname;
            this.password = password;
            this.created = new Date();
        }

        public UserBuilder firstName(String firstname) {
            this.firstname = firstname;
            return this;
        }

        public UserBuilder lastName(String lastname) {
            this.lastname = lastname;
            return this;
        }

        public UserBuilder email(String email) {
            this.email = email;
            return this;
        }

        public User build() {
            return new User(this);
        } 
    }

    // omit getters and setters
    ...
}
```
Usage:
```java
import static modern.challenge.User.getBuilder;

User user1 = getBuilder("marin21", "hjju9887h").build();
// user with nickname, password and email
User user2 = getBuilder("ionk", "44fef22")
    .email("ion@gmail.com")
    .build();
// user with nickname, password, email, firstname and lastname
User user3 = getBuilder("monika", "klooi0988")
    .email("monika@gmail.com")
    .firstName("Monika")
    .lastName("Ghuenter")
    .build();
```

## References
- Anghel Leonard - Java Coding Problems
- https://www.udemy.com/course/design-patterns-java/
