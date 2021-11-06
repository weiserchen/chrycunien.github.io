# Overview

The service mesh architecture is an application infrastructure layer on top of cloud-native applications.

> A service mesh is a dedicated infrastructure layer for handling service-to-service communication. It's responsible for the reliable delivery of requests through the complex topology of services that comprise a modern, cloud-native application. In practice, the service mesh's implementation is an array of lightweight network proxies deployed alongside microservices, without the applications needing to be aware.

## Features
- Service Mesh has 3 main features: Reliability, Security, and Observability.
- Service meshes provide a developer-driven, services-first network.
- The value of the service mesh is that it provides us those features at the platform layer rather than at the application layer.
    - For example, developers no longer need to handle TLS encryption and decryption in a specific language. Instead, they delegate it to the service mesh.
- Service Mesh serves as a proxy service that talks to another service, which also contains data plane and control plane.
- It moves some responsibilities from Devs to Ops.


## Kubernetes Service Mesh

### Basic Service Mesh
- It is the `Service` resource.
- It used to connect pods in Kubernetes (by performing readiness check and liveness check).
- It also provides connection from outside of the cluster.

### Advanced Service Mesh
- Although the basic service mesh is power enough, we still can use third-party tools like Istio, Linkerd, Consul for more features.
- It contains retry, timeouts, circuit breaking, ...


## References
- Anjali Khatri, Vikram Khatri - Mastering Service Mesh_ Enhance, secure, and observe cloud-native applications with Istio, Linkerd, and Consul-Packt Publishing (2020)
- https:/​/​buoyant.​io/​2017/​04/​25/​whats-​a-​service-​mesh-​and- why-​do-​i-​need-​one
- https://www.edx.org/course/introduction-to-service-mesh-with-linkerd