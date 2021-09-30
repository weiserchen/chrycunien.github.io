# SRP (Single Responsibility Principle)

- A class only takes on responsibility, so there is only 1 reason to change the class details.


## Example
In the below `Journal` class, we can find that it not only have to handle the list of entries, but it also has some persisten methods to save content to disk. It violates the SRP principle on account of to many things that will lead to the change of this class.
```java
class Journal
{
  private final List<String> entries = new ArrayList<>();

  private static int count = 0;

  public void addEntry(String text)
  {
    entries.add("" + (++count) + ": " + text);
  }

  public void removeEntry(int index)
  {
    entries.remove(index);
  }

  @Override
  public String toString() {
    return String.join(System.lineSeparator(), entries);
  }

  // here we break SRP
  public void save(String filename) throws Exception
  {
    try (PrintStream out = new PrintStream(filename))
    {
      out.println(toString());
    }
  }

  public void load(String filename) {}
  public void load(URL url) {}
}
```

To solve this problem, we separate the persistence part to another `Persistence` class.
```java
// handles the responsibility of persisting objects
class Persistence
{
  public void saveToFile(Journal journal, 
    String filename, boolean overwrite) throws Exception
  {
    if (overwrite || new File(filename).exists())
      try (PrintStream out = new PrintStream(filename)) {
        out.println(journal.toString());
      }
  }

  public void load(Journal journal, String filename) {}
  public void load(Journal journal, URL url) {}
}
```

This code can be run on the Windows system.
```java
class SRPDemo
{
  public static void main(String[] args) throws Exception
  {
    Journal j = new Journal();
    j.addEntry("I cried today");
    j.addEntry("I ate a bug");
    System.out.println(j);

    Persistence p = new Persistence();
    String filename = "c:\\temp\\journal.txt";
    p.saveToFile(j, filename, true);

    // windows!
    Runtime.getRuntime().exec("notepad.exe " + filename);
  }
}
```

## References
- https://www.udemy.com/course/design-patterns-java/