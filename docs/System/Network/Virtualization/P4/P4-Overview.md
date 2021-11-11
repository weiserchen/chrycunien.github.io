# P4 Overview

P4 = Protocol-Independent Packet Processors

## SDN
- Network devices are divided into control and data planes.
- The controller install rules into forwarding table in switches to control traffic routing

### Limitation
- The packet fields that can be matched are limited by OpenFlow protocol.
- The actions we can take on packets are also limited.
- OpenFlow switches reserve TCAM space for all possible fields --> waste TCAM space.
- The design of hardware (to support more actions) (limited by Openflow protocol) is also hard to change because it’s too expensive.

![SDN-match-fields](../../../../../static/img/network-virtualization/P4/SDN-match-fields.png) ![SDN-action-types](../../../../../static/img/network-virtualization/P4/SDN-action-types.png)



## P4
- P4 is a language to describe what a switch should do.
- Bottom-up design (SDN) V.S. a top-down design (P4)
- SDN --> programmable control plane
- P4 --> programmable data plane
- P4 is commonly used in network security or statistics because it is pretty flexible on manipulate and inspect packets.
- Goals:
    - Reconfigurability
    - Protocol-independence
    - Target Independence (Can run on any level (sw and hw), but this has not been achieved now)\
- Note: Since we still need a way to communicate between data plane and control plane, we need to define a protocol other than OpenFlow.

![SDN-vs-P4-1](../../../../../static/img/network-virtualization/P4/SDN-vs-P4-1.png)

### Version
- Before 2017: P414
- After 2017: P416
- They have very different syntax.

### Benefits
- **New Features** – Add new protocols
- **Reduce complexity** – Remove unused protocols
- **Efficient use of resources** – flexible use of tables
- **Greater visibility** – New diagnostic techniques, telemetry, etc.
- **SW style development** – rapid design cycle, fast innovation, fix data plane bugs in the field
- **You keep your own ideas**

### Hardwares
- Let control plane and data plane can be developed by the same person.
- New custom ASICs can achieve such flexibility at terabit speeds. (Kangaroo INFOCOM ’10, SDN Chip
SIGCOMM ’13, Intel FM6000 switch silicon)
- Some switches are more programmable than others:
    - FPGA (Xilinx, Altera, Corsa)
    - NPU (Ezchip, Netronome)
    - CPU (OVS, ...)

### Processing Steps
- In traditional switches, these 3 steps are bundled and can not modify.
- In the first step, the switch will fetch (actually tears out) the header from the packet.
- Then it will try to match a rule in the forwarding (or flow) table.
- Last, it takes action to forward, drop, ... the packet.

![P4-process-steps](../../../../../static/img/network-virtualization/P4/P4-process-steps.png)

## P4 Process Architecture
- The process model is just like iptables in Linux.
- You can choose to reconstruct which parts of header in the new one.
- You can even wrap ip header in tcp header (to only allow p4 switch to handle this packet)

![P4-process-architecture](../../../../../static/img/network-virtualization/P4/P4-process-architecture.png)

## P4 Language Elements

![P4-language-elements](../../../../../static/img/network-virtualization/P4/P4-language-elements.png)

## P4 Libraries
- P4 Target: An embodiment of a specific hardware implementation
- P4 Architecture: Provides an interface to program a target via some set of P4-programmable components, externs, fixed components
- The library of P4 can be divided into 2 parts: core and external
- The core library is target-independent.
- The external libraries have different architectural implementation. Different hardware provides different functions, so you need an external libraries for different targets.

## P4 Target Programming
- The control plan can also means data plane’s control plane, or a remote controller
- CPU port is for packet exchange between switch and controller (or another switch) (in or out switch)
- Send to CPU port is to perform packet-in operation, because CPU is used to connect to controller
- The compiler is usually provided by vendors

![P4-target-programming](../../../../../static/img/network-virtualization/P4/P4-target-programming.png)

## P4 V1Model Architecture
- Metadata is used to pass information between hardware and p4
- Hardware looks at metadata in each stage and perform corresponding operations
- Ingress determines which action to match to.
- Egress is responsible for how to process the packet again before actually send this packet out

![P4-V1Model](../../../../../static/img/network-virtualization/P4/P4-V1Model.png)

## P4 + SDN
- P4 program configures forwarding behavior (abstract forwarding model), and express serial dependencies (e.g. ARP/L3 Routing)
- P4 compiler translates into a target-specific representation
- OF can still be used to install and query rules once forwarding model is defined

![P4-SDN](../../../../../static/img/network-virtualization/P4/P4-SDN.png)
![P4-runtime](../../../../../static/img/network-virtualization/P4/P4-runtime.png)


## References
- This note is based on NTU course - [Network Virtualization and Security](https://nol.ntu.edu.tw/nol/coursesearch/print_table.php?course_id=942%20U0710&class=&dpt_code=9420&ser_no=50698&semester=110-1&lang=CH)