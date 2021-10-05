# Java Generic

## PECS
PECS: "Producer Extends, Consumer Super".

In java generic, we sometimes want to set some boundary of our type parameter.

### Extends
```java
List<? extends T>
```
This snippet means we only need a type `T` for future use (we only need a "view" of `T`). When we want to read an element from the list, we only care about whether an element in the list can be **upcast** to `T`. Therefore, this is similiar to a producer to produce the values. (The list that produces the values.)

### Super
```java
List<? super T>
```
Similar to extends, this is the opposite version. The `super` means a consumer, you write a value into this list, and what you only care about is whether an `T` can be **upcast** and then put into the list.

### T
If a data structure need both producer and consumer, it should be declare as a normal type:
```java
List<T>
```

## Recursive Generic
```java
class Enum<E extends Enum<E>>
```
```java
interface HasAttributes<A extends HasAttributes<A, B>, 
                        B extends HasAttributesType<B>> extends Identification<B>
```

### Explanation
In the first sight, you may find these type parameter very confounding, but it's actually really easy to understand.

First, let we write a simple generic class.
```java
class Person<T>
```

In the above snippet, it means that some of the class body will use `T` as some return type or argument type. However, we do not impose any restriction on it. What if we want to limit the type? We can add some additional syntax:
```java
class Person<T extends SOME_CLASS>
```

This time, we only allow types that are the child. In other words, you set an upper bound of a type. What if we want `T` to be a child class of `Person`? It's fairly simple:
```java
class Person<T extends Person<T>>
```

What does it happen? Compared with the second snippet, we replace it to `Person<T>`, why? Because we just make a `Person` class to become `Person<T>` in the first snippet, this is just a plain replacement.


## References
- https://stackoverflow.com/questions/4343202/difference-between-super-t-and-extends-t-in-java
- https://stackoverflow.com/questions/211143/java-enum-definition
- https://stackoverflow.com/questions/1330901/generic-interface-takes-self-as-parameter-recursive-generic
- http://madbean.com/2004/mb2004-3/