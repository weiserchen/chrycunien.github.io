# Overview

## Components

### Control Plane
- `Galley`: configuration management
- `Pilot`: core traffic management
- `Citadel`: certificate management
- ...
- These components are now bundled into a single binary called `istiod` for simpler adminstration.
- All related Istio resources are deployed in the `istio-system` namespace

### Data Plane
- Istio inject a sidecar, which comprises Envoy and Istio Agent, for communicating between services.
- Envoy is a proxy used by Istio, which is lightweight and highly performant.
- This way these sidecars form a dedicated layers for network operations, forming a mesh to connect all services.


## References
- Anjali Khatri, Vikram Khatri - Mastering Service Mesh_ Enhance, secure, and observe cloud-native applications with Istio, Linkerd, and Consul-Packt Publishing (2020).pdf
- KodeKloud - Service Mesh with Istio