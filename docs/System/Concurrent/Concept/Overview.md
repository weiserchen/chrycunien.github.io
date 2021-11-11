# Overview

Concurrency is difficult to get it right. We introduce several issues arise when designing a concurrent system. These issues sometimes are very related to each other.

## Critical Section
- A section of your program that needs exclusive access to a shared resource is called a critical section.

## Race Conditions
- A race condition occurs when two or more operations must execute in the correct order, but the program has not been written so that this order is guaranteed to be maintained.
- The pitfall is that developers think the code is run sequentially, not concurrently.
- For example, you want to two things at the same time. However, the second one depends on the state of the first one, but it will not wait the state to be fully synchronized. However, when you use 2 concurrent process, it does not guarantee that the first one will be executed before the second one, which cause a race condition.


## Atomicity
- When something is considered atomic, or to have the property of atomicity, this means that within the context that it is operating, it is indivisible, or uninterruptible.
- It means that an operation is either complete done or complete unexecuted.
- For example, you have 3 operation, which is bundled
    - Take out your phone
    - Open the text messenger
    - Send a photo to your girl friend
- Nevertheless, you are confronted with some situation that you need to handle a situation first for about 2 hours.
- You probably will rollback to your original state by just turning closing the messenger, and put you phone aside.
- You will not let the state of your sit in between the bundled operation (unless you don't care about your phone battery).
- You either completely send a photo, or just pretend as if nothing happened. You girl friend will either receive a photo or simply nothing.

## Memory Access Synchronization
- It means the state of two process does not synchronize in their view of memory.
- It commonly happens when we want to modify the state of a resource.
- To modify a resource, you will 
    - Fetch the value
    - Modify it
    - Store it back
- Since it is divided into 3 steps, you can not guarantee the modification is valid because the state of the resource may be change before you store it back. Therefore, the effect of some operations may disappeas. 
```bash
# For example, we have
# a = 0
# Then you want to increment it by 1
# There are 2 concurrent process to increment it. We expect the result to be 2.
# After the first one modify the value, but before we store it back, it is preempted by the second one, 
# which complete the whole process.
# Therefore, we expect 2 as a result but get 1 because the effect of the second one is shielded by the first one.
```

## Deadlock, Livelocks, Starvation

### Deadlock
- A deadlocked program is one in which all concurrent processes are waiting on one another. In this state, the program will never recover without outside intervention.
- Coffman Conditions (detect, prevent, correct deadlock)
    - Mutual Exclusion: A concurrent process holds exclusive rights to a resource at any one time.
    - Wait For Condition: A concurrent process must simultaneously hold a resource and be waiting for an additional resource.
    - No Preemption: A resource held by a concurrent process can only be released by that process, so it fulfills this condition.
    - Circular Wait: A concurrent process (P1) must be waiting on a chain of other concurrent processes (P2), which are in turn waiting on it (P1), so it fulfills this final condition too.

### Livelock
- Livelocks are programs that are actively performing concurrent operations, but these operations do nothing to move the state of the program forward.
- You can think of 2 person step right and left for a while but do not make any progress

### Starvation
- Starvation is any situation where a concurrent process cannot get all the resources it needs to perform work.
- It is related to a greedy process that lock many resources until all its work done.
- This is a trade-off: with coarse-grained synchronization, you increase performance, while with fine-grained synchronization, you opt for fairness.

## Misc
- Why mutex is considered expensive?
    - That's because it have to synchroize with the memory state so it takes more time than access to its own register or cache

## References
- Katherine Cox-Buday - Concurrency in Go_ Tools and Techniques for Developers - O’Reilly Media (2017)