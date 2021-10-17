# Multicast

> Last Modified: 2021-7-29
## Introduction
In this section, we introduce the concept of **multicasting**. Transport layer protocols like TCP, UDP provide a way to establish point-to-point communication. However, sometimes we want to send a message to several receivers. In this situation, we can still set up the same number of connections using TCP or UDP, but it may not be that efficient and reliable. We want an efficient way to send messages to a group of members, which is called **multicasting**. We will introduce several ways to add an additional layer on the existing communication layer.

## Basic Concepts
Multicasting is actually a superset of broadcasting. In the broadcasting scenario, the sender send a message to all members in the group. On the other hand, multicasting only send to a group of members inside the whole member set. 

In fact, multicasting can be abstracted to broadcasting in a logical way. You can assume that we can build reliable communication between each pair of nodes, no matter how many nodes the connection should pass. Therefore, we can regard multicasting as broadcasting in a logical group. The intermediate nodes are hidden from the logical layer. 

With this abstraction, we transform the mulicasting problem to the broadcasting problem. Our goal is to find an efficient way to send message to the whole logical group. It's worth noting that in this section we do not cope with the unreliability of the underlying network. We will address this problem in a separate note.

In this node, we introduced 3 basic means of broadcasting: tree-based, flooding-based, and gossip-based methods.

## Tree-based Method
Figure 1. Tree-based Multicast

![tree-based](../../../../static/img/dist-sys/tree-based.png)

In the tree-based multicasting, we build an minimal spanning tree for a message group, where root is the sender. When the sender want to multicast a messge, it has to first establish this tree. 

### Steps
There are several ways to do this thing. A simple way is to:  
1. The sender generates a message identifier `mid`, which is hashed to a `hash(mid)`. Then the `hash(mid)` is sent to the specific nodes based on the hashed result. We will use `m` as the node label.
2. If any node want to receive an message, we send a request to the target node. For example, `p` wants to receive the message of the target `m`, it send a request to `m`. The message will pass along multiple nodes. To make things simple, it will only pass a intermediate node `r`.
3. When node `r` receive the message, if it did not forward the message before, it will forward the message to the next node (in this case ,`m`) and mark `p` as a child. Otherwise, if another node `t` send request message through `r` that is not the first time, `r` will only mark `t` as a child, and will not forward the message to `m`.

4. Finally, the sender just send the `send` message to node `m`. As a result, the message will be passed along the tree, and each registered node will receive the message. 

### Advanced

#### Protocols


#### Switch tree


### Problems
There are several problems with the tree-based method:
- Tree setup and maintainence
- Only the leaf nodes belong to the message group
- It cannot withstand single node failure. Recall that in a tree, each pair of nodes has only 1 path between each other. Therefore, if an internal node fail, then all its children will not receive the message.




## Flooding Method
Tree-based method minimize the amount of message passing, but if suffers from single point of failure. To make the multicasting more reliable, we have to pass redundant information, and also send the message through more than one path to prevent message loss.   

To solve this problem, we introduce another method -- **flooding**. A flooding method is that when a node receive a message, it will send message to all its neighbor nodes. The actual implementation may vary, one can use the logical group described above, another can use some internal node for merely passing the message.

This type of method has a complexity of `O(N^2)` (`1/2 * N * (N-1)`)

### Algorithm

## Gossip-based Methods
Gossip-based method is also called epidemic protocol, simulating the distribution of a disease. We borrow this concept to distribute information as quickly as possible. 

Gossip-based method is similar to its flooding counterpart, with only a slightly variation. 

We assume we can send message to any member in the group. There are 3 types of scenario: push, pull, and hybrid. 

The complexity is `O(NlogN)`.


### Algorithm
The gossip-based method has several rounds, which will run periodically. In the following subsection, we only describe the behavior of each round. It's worth noting that we can assume a state is timestamped or versioned, so the node can correctly choose whether to update the local state based on the image. It is shown that push method has the worst performance, while pull and hybrid is nearly the same.

#### Push
1. We randomly choose a number of nodes as our message receiver.
2. We send our local version of state to the receivers.
3. We adjust our local version based on the received message.

#### Pull
1. Periodically, each node randomly choose a list of nodes as message source.
2. The node send a request to those nodes asking the state version.
3. Based on the response message, we will update the local state.

#### Hybrid
The hybrid type is the combination of push and pull method.

## Conclusion
Three types of multicasting -- tree, flooding, gossip -- has different advantage. 

- The tree-based method is simple but is not fault-tolerant.
- The flooding-based method is simple and easy to implement, but is not very efficient.
- The gossip-based method use a little more message to serve as redundancy to improve reliability and fault-tolerance.

One have to choose the correct method to implement, there is not one-size-fits-all solution. But for overall performance, I will recomment implement the gossip-based first because of its simplicity and efficiency.

## Reference
- Cloud Computing Specialization, Coursera
- Distributed Systems Principles and Paradigms, Andrew Tanenbaum
- Distributed Systems: Concepts and Design, George Coulouris