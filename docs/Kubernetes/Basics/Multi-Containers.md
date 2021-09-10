# Multi-Container Pods

## Namespaces
- Separate resources according to users, environment, or applications
- Role-based access control (RBAC) to secure access per namespace

## Application
- 3-tier architecture
    - Support tier: 
        - `counter`: HTTP Post, post random value to the server
        - `Poller`: HTTP Get, get the value from the server and print the value
    - App tier:
        - `Server`: Handle request from support tier and data tier, also incrementing the counter
    - Data tier:
        - `Redis`: storing the counter value
- Configured using environment variables
- Public image

## Source Code
```yaml title="3.1-namespace.yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: microservice
  labels:
    app: counter
```
```yaml title="3.2-multi_containers.yaml"
apiVersion: v1
kind: Pod
metadata:
  name: app
spec:
  containers:
    - name: redis
      image: redis:latest
      imagePullPolicy: IfNotPresent
      ports:
        - containerPort: 6379

    - name: server
      image: lrakai/microservices:server-v1
      ports:
        - containerPort: 8080
      env:
        - name: REDIS_URL
          # This will work because all containers share the same local network
          value: redis://localhost:6379

    - name: counter
      image: lrakai/microservices:counter-v1
      env:
        - name: API_URL
          value: http://localhost:8080

    - name: poller
      image: lrakai/microservices:poller-v1
      env:
        - name: API_URL
          value: http://localhost:8080
```
- Create the Pod
```bash
kubectl create -f 3.1-namespace.yaml
# Specify the namespace
kubectl create -n microservice -f 3.2-multi_containers.yaml

# Also, you can use apply -f (declarative way), like
# kubectl apply -n microservice -f 3.2-multi_containers.yaml
```
- Get Pod information
```bash
kubectl get -n microservice pod app
```
- Get more information
```bash
kubectl describe -n microservice pod app
```
- Get logs of containers
```bash
kubectl logs -n microservice app counter --tail 10

# -f means follow, watch real-time logs
kubectl logs -n microservice app poller -f
```
- Delete the Pod
```bash
kubectl delete -n microservice -f 3.2-multi_containers.yaml
```

## Issues
- Can only scale proportionately because the minimal unit in k8s is pods
- Usually used in tightly-coupled components
