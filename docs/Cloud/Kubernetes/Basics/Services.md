# Services

A service defines networking rules for accessing from Pods in the cluster and from the Internet.
- Use labels to select a group of Pods
- Service has a fixed IP address
- Distribute requests across Pods in the group (load-balancing)
- It is a concept of process group. The client send requests to the service, and then the service redirect requests to the Pods.

## Connectivity
- Pods' networks are internal network, you cannot access the container directly.
- Moreover, if a `Pod` fail, it will get a ip address from a pool. Therefore, we cannot guarantee the ip address is the same.
- You use `Service` to serve as a gateway to connect to pods.

## Example
This example follow the example of the `Pods` section.
```yaml title="2.1-web_service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: webserver
  labels:
    app: webserver
spec:
  ports:
  - port: 80 # The Pods' container port
  selector:
    app: webserver
  type: NodePort # Allocate port over this service on each node
```
- `NodePort`:
    - Create a mapping between `Pod` and `Node`
    - Use `kubectl get services` to find the service information
    - Like `<pod>:<node>/<protocol>` => `80:31635/TCP`
    - The range is between `32000 ~ 32767`
    - Each node will have the same port open for this service, and the traffic will be redirected to the service
    - This mapping allows each node to access the pod using this service
- Endpoints: all pods that are selected with the same label
```bash
kubectl describe service webserver
```
- The output of the above command
```
# Output:
Name:                     webserver
Namespace:                default
Labels:                   app=webserver
Annotations:              <none>
Selector:                 app=webserver
Type:                     NodePort
IP:                       10.100.79.120
Port:                     <unset>  80/TCP
TargetPort:               80/TCP
NodePort:                 <unset>  31635/TCP
Endpoints:                172.17.0.3:80
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <none>
```
- Get node ip
```bash
# -A specify print out another line after the result
kubectl describe nodes | grep -i address -A 1
```
- Verify you can access the pod
```bash
# curl <ip>:<port>
curl 172.16.85.5:31635
```

