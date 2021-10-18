# Overview

## Motivation
- Objects use other object's fields or methods through embedding
- Composition lets us make compound objects
- It is used to treat both single and composite objects uniformly

## Goals
> Composite: A mechanism for treating individual objects and compositions of object in an uniform manner.

- Objects can use objects via composition
- Some singular and composed objects need similar behaviors
- Composite pattern lets us treat both types uniformly
- Iteration supported with the Iterator design pattern

## Composite Patterns

### Embeddee
- By embedded a pointer of itself or other classes, you can create a very complex chain with a single entry point
- Ex: linked list, recursive structure (tree, hierarchy, like html document)

### Uniform interface
- By using an interface, you can combine different types using a single function

## References
- https://www.udemy.com/course/design-patterns-go