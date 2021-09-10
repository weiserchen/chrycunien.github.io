# Init Container

## Motivation
- Sometimes we need to wait for some initialization
- Prefer to separate initialization logic from the container
- Initialization is tightly-coupled to the main application
- Init containers allow you to run initialization tasks before starting main containers
- Does not need setup utilities when running the application

## Procedure
- Pods can declare any number of init containers
- Run in sequence until the previous one is complete
- Use their own image
- When all init containers complete, the main containers can start
- Easy way to block or delay staring an application
- Run every time when the pod is created (running more than once will have no additional effects)
- Init containers do not support readiness probe, because they are meant for completion

## Source code
```yaml title="8.1-app_tier.yaml"
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
      initContainers:
        - name: await-redis
          image: lrakai/microservices:server-v1
          env:
          - name: REDIS_URL
            value: redis://$(DATA_TIER_SERVICE_HOST):$(DATA_TIER_SERVICE_PORT_REDIS)
          command:
            - npm
            - run-script
            - await-redis
```

### Explanation
- We use the same image for simplicity
- We write a run-script in the source code that will test the redis connection

## Commands
- Get information
```bash
kubectl -n probes get pods

kubectl -n probes get pod <pod_name>

kubectl -n probes describe pod app-tier-84b5ffd8f4-8lsbf
```
- Get logs
```bash
kubectl -n probes logs <pod_name>
kubectl -n probes logs <pod_name> -c <container_name>
```

## References
