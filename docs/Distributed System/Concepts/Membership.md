# Membership
It is crucial to maintain a membership list of a group when we want to do some mulicasting operation. To make sure the list is up-to-date, while some member may join or leave the group, we have to implement a failure detector.

There are a few solution, but the most popular one is using **heartbeat**. We also introduce another method called **SWIM**, but it is not yet widely adopted.

## Heartbeat
The essence of heartbeating is to send the alive signal to other member. Each process has to maintain a group list, where each entry contain a tuple `(id, counter, timestamp)`. Each process also has a local clock. When any of a process in the list left behind from local clock by a threshould, the process will mark that process as suspected. After a while, if the local process still not receive any update message from that process, the remote process is then marked as failed and the local process broadcast a message to tell all the other process to remove the failed process from the list. 

### Simple All-to-All

### Gossip-based All-to-All

## SWIM

## Conclusion



## Reference
- Cloud Computing Specialization, Coursera