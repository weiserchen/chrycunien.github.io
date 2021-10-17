# Builder Pattern Overview

Builder is one of design patterns that is useful in creating objects.

## Motivation
- Having an object with 10 constructor arguments is not productive (easy to make mistake and hard to make modification)
- Builder provides an API for constructing an object step-by-step
- Another reason to user builder pattern is to reuse the construction process that you'd already created.

## Goals

> When piecewise object construction is complicated, builder provides an API to do it succintly.

- It creates an object using piecewise fashion
- It reduces the number of arguments (arity) passed in a single function
- It provides more flexibility when creating an object

## Patterns
- Fluent Interface: 
    - Mostly, builder will implement a chain-like pattern
    - It will return the builder itself internally so each return argument is itselt and you can call all builder functions. 
    - In some languages, use `return this`. In Python, `return self`. In go, use value receiver `return b`, where b is `func (*b)`.
    - Example: `Builder().AddName("name").AddAddress("myaddress")`
- Usually you will make a builder first, then use this builder to construct the target.
    - The builder has the target as one of its field, builder call the target's setter directly to set target's fields.
    - Some builder class will be a inner class of the target class itself, so it can set the attributes directly without exposing the setters.
- Lastly, you will call `build()` or `construct()` method as a signal of the end of construction and to return a target with the attributes you given.
- You can use the same builder over and over to simplify the construction process without the need to call constructor.

## Builders

These are some builders example, but not all language can implement every type of builder. You can find implementation in different files in this folder.

### String Builder
- String builder is a built-in component for many languages like Java, Go, ... 
- You can import it from the standard library
- It helps you build a string conveniently, like concatenation, reverse, ...
- It also accept different types of arguments like byte, char, string, byte array, char array, ...
- It use a byte buffer internally to help you achieve some complex operations
- Although it's very powerful, it's still too raw for further use case. For example, you want to add some indentation to form a valid yaml. You'd better find another tool or write your own one instead of this basic string builder.

### Wrapper Builder
- An example in this category is html builder
- This builder is a wrapper using string builder behind the scene
- It construct html document more easily than simply using string builder
- You can see Java and Go example

### Multifacet Builder
- The pattern is also called aggregated builder
- It utilizes several sub-builders to construct the object
- It is a more advanced builder and normaly used in a large object construction

### Functional Builder
- This builder allows easy extension of the builder
- It delays the execution of initialization (i.e. in a lazy way).
- It registers a function in each setter, then invoke them when calling `build()` method.

### Force to use builder
- There are some way to force user to use builder instead of using the regular initialization
- A simple way is to add a wrapper function that takes a builder and it will perform some action internally
- See Go example for more information.

### Code Reuse
- Another scenario to use builder is for similar object construction
- You only take an interface and then calling the construct method to initialize.
- See Go example.

## References
- Anghel Leonard - Java Coding Problems
- https://www.udemy.com/course/design-patterns-java/
- https://www.udemy.com/course/design-patterns-go
- https://github.com/PacktPublishing/Go-Design-Patterns/blob/master/Chapter02/builder.go
- https://github.com/PacktPublishing/Go-Design-Patterns/blob/master/Chapter02/builder_test.go