# Pods Patterns

- Pods are a higher level abstraction of containers
- Kubernetes need additional information information to manage workloads (restart policy, probe, ...)
- Simplifies using different underlying container runtimes (Docker, rkt, ...)
- Co-locate tightly-coupled containers without packaging them as a single container image

## Side-Car Pattern
- Uses a helper container to assist the primary container
- Commonly used for logging, file syncing, or watchers
- Benefits include leaner main container, failure isolation, independent update cycles

### File-Sync sidecar
- Primary: web server
    - Server content
- Sidecar: content puller
    - Syncs with content management system (CMS)
- The content is synced using a shared volume (pod)

## Ambassador Pattern
- Ambassador container is a proxy for communicating to and from the primary container (container share the same network)
- Commonly used for communicating with database
- Streamlined development experience, potential to reuse ambassador across different languages

### Database Ambassador
- Primary: webapp
    - Handle requests
    - Database requests are sent to proxy over localhost 
- Ambassador: Database proxy
    - Forward requests to the appropriate database
    - Possibly sharding the requests

## Adaptor Pattern
- Adapters present a standardize interfaces across multiple Pods
- Commonly used for normalizing output logs and monitoring data
- Adapts third-party software to meet your needs

### 
- Primary: metrics
    - Write metrics to a file with native format
- Adaptor: 
    - Another container that read the merics 
    - And then transform to json format