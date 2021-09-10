# Networking

## Networking Basics

### IP address
- Each pod is assigned an IP address in the cluster
- All containers in a pod share the same IP address (also share the same port space)
- Pod can communicate with each other using Pod IP (same or different node in the cluster)
- When a pod is killed and restarted, it may be allocated with another IP (ephemeral)

### Services
- The service maintain a logical set of pod replicas
- Identified with labels
- Services maintain a list of endpoints (pods IP address)
- Services can send request to any pods in the service
- Clients only need to know about the service rather than pods
- Pod can use environment variables or DNS to reach other services

#### Types
- `Cluster IP`
    - The default type of service
    - Only reachable within the cluster
    - `kube-proxy` cluster component that runs on each node is responsible for proxying request for the service to one of the service's endpoint
- `NodePort`
    - Allow service outside of the cluter to connect to the service in the cluster
    - Causes a given port to be opened on each node in the cluster
    - Still have `Cluster IP`
    - Any request to the port is routed to the `Cluster IP`
- `Load Balancer`
    - Expose the service externally through a cloud provider's load balancer
    - Also create `NodePort` and `Cluster IP` for the service
    - Some setting by different vendors can be used by annotations
- `External Name`
    - Enabled by DNS, not proxy
    - You configure an external name service with the DNS name and requests for the service return a CNAME record with the external DNS name.
    - Used for external resources such as database

## Network Policy
- Rules for controlling network access to Pods
- Similar to security groups controlling access to virtual machines 
- Scoped to namespace
- Caveat: Kubernetes network plugin must support Network Policy
- Non-isolated vs Isolated
    - Non-isolated allow traffic from any source
    - When applied with network policy, it becomes isolated
    - The network policy is selected by labels
- Policies are rules that are the union of rules, if one of the rule get past, the request can get past
- The policy rules apply to a connection, it you modify the rules in between the connection, it will not take effect


