# Idea

This file record some project ideas.

## Circuit
This is a concurrent (parallel) processing framework inspired by the Go context time limit.

### Hierarchy
- The `circuit` is the top level coordinator
- The `circuit` has several `ExecPlan`s
- Each `ExecPlan` contains several `Stage` s
- Each `Stage` contains several `Task`s
- Each `Task` represents a `executable` or `script` to complete
- A `Task` has several properties, either the normal `executor` or `examiner`
- A `examiner` is a special task, when it return false, then all the stage should stop

### Advanced
- We have a plan to support feature of DAG
- Allowing a fairly complex execution plan running in a concurrent way

### Communication
- Each `Stage` is isolated, they only communicate through tunnel
- A tunnel is actually a function parameter manage by a `Stage` (a mapping)
- This structure also can be used in `Task` and `ExecPlan` (not recommended)

### Report
- This project should include a real-time report for the execution 
- Including each tasks status, ...
- Use different color for higher readability

### Cache
- This program will cache the previously executed 
- But also allow force execution

## Resource Watch
This project will provide a convenient way to handle cpu and memory limit.
