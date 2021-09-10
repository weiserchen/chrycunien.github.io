# Services Discovery

## Servies advantage
- Supports multi-pod design
- Provides static endpoints for each tier
- Handles Pod IP change
- Load balancing

## Mechanisms
- To discover services between each other, we have to use other method because they no longer share the same local network.
- Environment variables
    - Service address automatically inject into containers
    - Environment variables follow naming conventions based on service name
    - Only in the same namespace
- DNS
    - DNS records automatically created in cluster's DNS
    - Container automatically configure to query cluster DNS
    - Update dynamically between namespaces

## Source Code
```yaml title="4.1-namespace-yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: service-discovery
  labels:
    app: counter
```
```yaml title="4.2-data_tier.yaml"
apiVersion: v1
kind: Service
metadata:
  name: data-tier
  labels:
    app: microservices
spec:
  ports:
  - port: 6379
    protocol: TCP # default
    name: redis # optional when only 1 port
  selector:
    tier: data
  # Internal access within the cluster
  type: ClusterIP # default
---
apiVersion: v1
kind: Pod
metadata:
  name: data-tier
  labels:
    app: microservices
    tier: data
spec:
  containers:
    - name: redis
      image: redis:latest
      imagePullPolicy: IfNotPresent
      ports:
        - containerPort: 6379
```
```yaml title="4.3-app_tier.yaml"
apiVersion: v1
kind: Service
metadata:
  name: app-tier
  labels:
    app: microservices
spec:
  ports:
  - port: 8080
  selector:
    tier: app
---
apiVersion: v1
kind: Pod
metadata:
  name: app-tier
  labels:
    app: microservices
    tier: app
spec:
  containers:
    - name: server
      image: lrakai/microservices:server-v1
      ports:
        - containerPort: 8080
      env:
        - name: REDIS_URL
          # Environment variable service discovery
          # Naming pattern:
          #   IP address: <all_caps_service_name>_SERVICE_HOST
          #   Port: <all_caps_service_name>_SERVICE_PORT
          #   Named Port: <all_caps_service_name>_SERVICE_PORT_<all_caps_port_name>
          value: redis://$(DATA_TIER_SERVICE_HOST):$(DATA_TIER_SERVICE_PORT_REDIS)
          # In multi-container example value was
          # value: redis://localhost:6379
```
```yaml title="4.4-support_tier.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: support-tier
  labels:
    app: microservices
    tier: support
spec:
  containers:

    - name: counter
      image: lrakai/microservices:counter-v1
      env:
        - name: API_URL
          # DNS for service discovery
          # Naming pattern:
          #   IP address: <service_name>.<service_namespace>
          #   Port: needs to be extracted from SRV DNS record
          value: http://app-tier.service-discovery:8080

    - name: poller
      image: lrakai/microservices:poller-v1
      env:
        - name: API_URL
          # omit namespace to only search in the same namespace
          value: http://app-tier:$(APP_TIER_SERVICE_PORT)
```
- Create all resources
```bash
kubectl apply -f 4.1-namespace.yaml
kubectl apply -n service-discovery -f 4.2-data_tier.yaml
kubectl apply -n service-discovery -f 4.3-app_tier.yaml
kubectl apply -n service-discovery -f 4.4-support_tier.yaml
```
- Get pods
```bash
kubectl get pods -n service-discovery
```
- Get Pod information
```bash
kubectl get -n service-discovery pod <pod_name>
```
- Get more information
```bash
kubectl describe -n service-discovery pod <pod_name>
```
- Get logs of containers
```bash
# -f means follow, watch real-time logs
kubectl logs -n service-discovery support-tier poller -f
```
- Delete all resources
```bash
kubectl delete -n service-discovery -f 4.2-data_tier.yaml
kubectl delete -n service-discovery -f 4.3-app_tier.yaml
kubectl delete -n service-discovery -f 4.4-support_tier.yaml
kubectl delete -f 4.1-namespace.yaml
```

