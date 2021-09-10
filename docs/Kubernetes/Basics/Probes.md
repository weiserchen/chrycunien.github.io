# Probes

- Kubernetes assumes that the pod is ready when it is set up, but it's not always true.
- The pod may need some time for initialization, and in this period it becomes non-responsive.
- Kubernetes provides probes (health-check) to handle this situation.

## Types
- Readiness Probes
    - Used to check when a pod is ready to server the request (like loading configuration)
    - Useful after startup to check external dependency
    - Service only send traffic to ready pods
- Liveness Probes
    - Detect when a pod enters a broken state
    - Restart the pod
    - Declare in the same way as readiness probes

## Declaration
- Probes can be declared in Pods' containers
- All container probes must pass for a pod to pass
- Probe actions can be a command runs in the container, and HTTP request, or opening a TCP socket, ...

## Architecture
- Data Tier (redis)
    - Liveness: Open TCP Socket
    - Readiness: `redis-cli ping` commands
- App Tier (Server)
    - Liveness: HTTP GET /probe/liveness
    - Readiness: HTTP GET /probe/readiness

## Source Code
```yaml title="7.1-namespace.yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: probes
  labels:
    app: counter
```
```yaml title="7.2-data_tier.yaml"
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
            name: redis
        livenessProbe:
          tcpSocket:
            port: redis # named port
          initialDelaySeconds: 15
        readinessProbe:
          exec:
            command:
            - redis-cli
            - ping
          initialDelaySeconds: 5
```
```yaml title="7.3-app_tier.yaml"
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
            name: server
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
          - name: DEBUG
            value: express:*
        livenessProbe:
          httpGet:
            path: /probe/liveness
            port: server
          initialDelaySeconds: 5
        readinessProbe:
          httpGet:
            path: /probe/readiness
            port: server
          initialDelaySeconds: 3
```

## Commands
- Monitor
```bash
kubectl -n probes get deployments -w

# Or you can use the previous watch approach
```
- Get logs
```bash
kubectl -n probes logs <pod_name> | cut -d ' ' -f 5,8-11

# Get logs of a pod and then pipe to cut command
# cut -d: use ' ' as delimiter
# cut -f: after -d, select the position to display
```

## References
