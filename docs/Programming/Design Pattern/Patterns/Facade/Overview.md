# Overview

## Motivation
- Balancing complexity and presentation/usability
- End user is not exposed to the internal, which are composed of may sub-systems
- We only wants some API that just work

## Goals
> Facade: Provides a simple, easy way to understand interface over a large and sophisticated body of code

- Build a facade to provides a simplified API over a set of components
- May wish to expose internals through the facade (optionally)
- May allow users to escalate to use more complex APIs if they need to

## Facade Patterns

- Facade is actually another form of encapsulation
- You can select which interface to expose to users
- In addition, you can choose to provides several levels of API to each target group
- You can use Facade to both limit access to internals and create a simple API for users


## References
- https://www.udemy.com/course/design-patterns-go