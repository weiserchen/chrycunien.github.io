# Overview

## Motivation
- Want to augment object with additional functionalities
- Do not want to rewrite or alter existing object (OCP principle)
- Want to keep new functionality separate (SRP principle)
- Need to be able to interact with existing structures
- Solutions: embed the decorated object and provide additional functionalities

## Goals
> Decorator: Facilitates the addition of behavior to individual objects through embedding

- Add utility fields and methods to augment the object's features
- Often used to emulate multiple inheritance

## Decorator Patterns

### Aggregated Decorator
- This type of decorator extends the functionality of a struct by embedding several structs to a new one
- It is easy to implement with the support of multiple inheritance
- In those languages that do not support multiple inheritance, you may have to define some interfaces and the new struct just proxy objects that satisfy that interface

### Embedded decorator
- In this type of decorator, you usually use the inheritance features provides by your programming language
- By chaining decorators, you add additional functionalities step by step
- You need some interface feature in your language

### Functional Decorator
- Besides using inheritance on struct, you can also apply this concepts to functions
- By defining a interface, all you need to do is to conform to that interface
- You pass a function as an argument, and return a closure that add some functionalities and  call that function
- As a result, you get an higher-order function with chain-like structure.


## References
- https://www.udemy.com/course/design-patterns-go