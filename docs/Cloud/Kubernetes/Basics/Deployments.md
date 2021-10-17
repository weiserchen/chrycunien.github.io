# Deployments

- Represend multiple replica of Pods
- Describe a desired state that Kubernetes needs to achieve
- Deployment Controller master component converge actual state to desired state

## Source Code
```yaml title="5.1-namespace.yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: deployments
  labels:
    app: counter
```
```yaml title="5.2-data_tier.yaml"
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
  type: ClusterIP # default
---
apiVersion: apps/v1 # apps API group
kind: Deployment
metadata:
  name: data-tier
  labels:
    app: microservices
    tier: data
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: data
  template:
    metadata:
      labels:
        app: microservices
        tier: data
    spec: # Pod spec
      containers:
      - name: redis
        image: redis:latest
        imagePullPolicy: IfNotPresent
        ports:
          - containerPort: 6379
```
```yaml title="5.3-app_tier.yaml"
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
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-tier
  labels:
    app: microservices
    tier: app
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: app
  template:
    metadata:
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
```yaml title="5.4-support_tier.yaml"
apiVersion: apps/v1
kind: Deployment
metadata:
  name: support-tier
  labels:
    app: microservices
    tier: support
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: support
  template:
    metadata:
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
              value: http://app-tier.deployments:8080

        - name: poller
          image: lrakai/microservices:poller-v1
          env:
            - name: API_URL
              # omit namespace to only search in the same namespace
              value: http://app-tier:$(APP_TIER_SERVICE_PORT)
```

### Explanation
- `replicas`: how many pods should this deployment maintains
- `template`: the pod specification
- Kubernetes will try to bring the number of Pods to the `replicas` to specify

## Commands
- Get deployments information
```bash
kubectl -n deployments get deployments
```
- Get pods information
```bash
kubectl -n deployments get pods
```
- Scale deployment (this will become permanent until you delete this deployment)
```bash
kubectl -n deployments scale deployments app-tier --replicas=5
kubectl -n deployments scale deployments support-tier --replicas=5
```
- Delete pods
```bash
# Can delete several pods in the same command
kubectl -n deployments delete pods <pod_name1> <pod_name2>

# Note that k8s will maintain the replica number, so you will find other new pods are up and running
```
- Monitor 
```bash
# Install watch using: brew install watch
watch kubectl -n deployments get pods
```


## References


