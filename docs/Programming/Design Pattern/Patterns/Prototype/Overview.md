# Overview

## Motivation
- Complicated object aren't designed from scratch. They reiterate existing designs
- An existing design is a prototype
- We make a copy of the prototype and customize it, which requires deep copy support
- We make the cloning convenient

## Goals
> Prototype: A partially or fully initialized that you copy and make use of

- We design a object step by step, and you can customize that object based on a prototype
- We also make some convenient API for making a prototype

## Prototype patterns

### Deep Copying
- You copy the whole object including value fields and pointer fields
- As a result, two object becomes different and change to an object does not propogate to the other object

### Copy Method
- Instead of copy each fields directly, you can wrap it into a `DeepCopy()` function to make copy easier
- In this approach, you have to apply copy method of each level of field, where each level of method take care of how to copy the child level copy method to copy the child's value

### Copy Through Serialization
- This method serializes an object into a bytes stream and then using deserialization to copy to a new object
- It usually requires standard library or third-party library support

### Prototype Factory
- You creates several pre-defined types of object to use.
- Plus, you make some factory function to construct the object instead of setting the fields directly
- That is, you invoke an function and passing some arguments for initialization, but the factory will use the prototypes created before as a background to construct the object


## References
- - https://www.udemy.com/course/design-patterns-go