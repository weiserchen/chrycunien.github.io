# Factory Pattern

## Motivation
- Object creation sometimes become too convoluted
- Struct has too many fields, need to initialize all correctly
- Wholesale object creation (non-piecewise, unlike Builder) can outsourced to a separate function 

## Goals

> Factory: A component responsible solely for the wholesale creation of objects

- A factory function (constructor) is a helper function for making structs
- A factory is any entity that take care of object creation
- It can be a function or dedicated struct

## Factory Patterns

### Factory Function
- Factory function delegate the creation of an object
- It may take only part of the arguments and set others as default values
- You can add some validation before actually create an object
- Some factory will return an interface rather than the concrete type

### Factory Generator
- Functional Approach
    - Return a function rather than a struct
    - This is more recommended and easier to implement
    - It uses closure in functional programming paradigm to achieve this
- Structure Approach
    - Return a type that is a struct
    - Usually you will have to incorporate some helper interface for later use

### Prototype Factory
- Another use case for factory pattern is to construct pre-defined objects
- Given an argument and the factory will construct an object for you automatically

## References
- https://www.udemy.com/course/design-patterns-go