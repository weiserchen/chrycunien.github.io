# Pods

- Basic building blocks
- One or more containers
- All pods share a container networks
- One IP address per pod

## Declaration
- Container image
- Container ports
- Restart policy
- Resource limits

## Benefits
- Source control
- Easy to share
- Easy to work with

## Create
- `kubectl create` send manifest to API server
- Actions
    1. Select a node with sufficient resources
    2. Schedule pod onto node
    3. Node pulls Pod's container image
    4. Starts Pod's containers

## Commands

### Imperative
```bash
# Create file
kubectl create -f <file_name>

# List all pods
kubectl get pods

# Get pod information
kubectl describe pod <pod_name>

# Delete pod
kubectl delete pod <pod_name>
```

### Declarative
```bash
kubectl apply -f <file_name>
```

## Examples

## Example 1
```yaml title="mypod.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: mypod
  labels:
    app: webserver
spec:
  containers:
  - name: mycontainer
    image: nginx:latest
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "128Mi" # 128Mi = 128 mebibytes
        cpu: "500m" # 500m = 500 milliCPUs (1/2 CPU)
      limits:
        memory: "128Mi"
        cpu: "500m"
```


