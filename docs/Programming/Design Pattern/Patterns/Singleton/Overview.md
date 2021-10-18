# Overview

## Motivation
- For some components, it only makes sense to have one in the system
    - Database repository
    - Object factory
- The construction call is expensive
    - Only want to do it once
    - Want everybody has the same instance
- We want to prevent anyone creating additional copies
- Need to take care of lazy instantiation

## Goals
> Singleton: A component which is instantiated only once

- Lazy one-time initialization
- Adhere to DIP: depend on interfaces, not concrete types

## Singleton Patterns

### Creation
- Users create a singleton using a function, which makes sure only one instance will be created or initialization will be executed
- You can use some synchronization features provided by a langauge

### Problems
- It may cause performace issues because only one instance handles the logic
- If not carefully designed, it will make the code hard to test because it is tightly-coupled
- That is, if some functions depend on a singleton, it may let code hard to test
- A common solution is to make singleton depends on an interface rather than a concrete type to decouple the application

## References
- https://www.udemy.com/course/design-patterns-go