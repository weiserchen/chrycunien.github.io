# Overview

Kubernetes is an open-source orchestration tool designed to automate, deploying, scaling and operizing containerized applications.


## Similar Technology
- DCOS
- Amazon ECS/EKS
- Docker swarm

## Single-Node k8s clusters
- Options
    - Docker (may be deprecated)
    - minikube
    - kubeadm
- Create ephemeral clusters that start quickly and are in pristine state for testing applications in Kubernetes

## Multi-Node k8s clusters
- For production workloads
- Horizontal scaling
- Tolerate node failure
- Fully-managed
    - Amazon EKS
    - AKS (Azure)
    - GKE (GCP)
- Full control
    - kubespray
    - kops
    - kubeadm

## Architecture
- Distributed System
- `Cluster` refers to all the machines collectively (the entire system)
- `Node`s are machines in the cluster (VM or real one)
- `Node`s can be categorized as `worker`s and `master`s
- `Worker` nodes includes software to run containers managed by `Master` node
- `Master` nodes run the control plane 
- The control plane is a set of APIs and software that Kubernetes users interact with
- The APIs and software are referred to **master components**

### Control plane
- Schedules containers to nodes
- Consider multiple factor like CPU, memory, disk, ...

### Pods
- Groups of containers
- The smallest building blocks in Kubernetes
- Usually used in tightly-coupled containers
- Have other complex abstraction on top of pods

### Services
- Define networking rules for exposing groups of Pods
    - Other pods
    - Public network

### Deployment
- Manage deploying configuration changes to running Pods
- Horizontal Scaling
- Rollout and Rollback

## Kubernetes API Server
- Client modifys cluster state by sending request to API server
- The API server is a master component that as the frontend for the cluster

### REST API
- Possible but not uncommon
- Use if no client library for your programming language

### Client Libraries
- Handles authenticating and managing individual REST API request and response
- Official and community

### kubectl
- kube control
- Issue high-level commands that are translated into API calls
- Works with local and remote clusters
- Manages all types of Kubernetes resources, and provides debugging and introspection feature.

### Dashboard
- Provide an visual way to view the state of the cluster

## Manifest file
- Declare desired properties
- Manifests can describe all kinds of resources
- The `spec` contains resource-specific properties
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mypod
spec:
  containers:
  - name: mycontainer
    image: nginx:latest

```



