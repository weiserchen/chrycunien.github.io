# Overview

## Motivation
- Just like electricity plugs, different countries support different types
- We cannot modify our gadgets to support every possible interface
- We use a special device (adaptor) to give us the interface we want

## Goals
> Adaptor: A construct which adapts an existing interface X to conform to another interface Y

- Determine the API you need and you want
- Create a component that adapt to adaptee
- Create intermediate representations like caching or other optimizations

## Adaptor Patterns

### Adapters
- Build a function that convert interface A to interface B
- It may need a lot of processing in between the conversion

### Caching
- In order to reuse the calculation, you can build a cache that stores previous results
- You may first serialize the object and use hash to determine whether they are the same or not

## References
- https://www.udemy.com/course/design-patterns-go