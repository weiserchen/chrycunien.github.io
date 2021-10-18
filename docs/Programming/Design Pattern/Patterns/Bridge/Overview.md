# Overview

## Motivation
- Bridge pattern prevent a "Cartesian Product" complexity explosion
- Ex:
    - ThreadScheduler
    - Can be preemptive or cooperate
    - Can run on Windows or Unix
    - 2x2 = 4 scenarios

## Goals
> Bridge: A mechanism that decouples an interface (hierarchy) from an implementation (hierarchy)

- Decouple abstraction from implementation
- A stronger form of encapsulation

## Bridge Patterns

- It achieves decoupling with the help of interfaces
- By defining some interfaces, it decouples interfaces from implementation
- When creating a new object, what you only need to provide is some sub-interfaces that point to a concrete type that implement the interface.
- You can easily swap the implementation to another type that implements that interface


## References
- https://www.udemy.com/course/design-patterns-go