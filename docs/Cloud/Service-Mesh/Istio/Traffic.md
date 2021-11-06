# Istio Traffic

## Ingress Controller
- It has nothing to do with Ingress resources in Kubernetes, don't be confused.
- They send traffic from outside to the cluster.
- Usually is Nginx.

1. Enable ingress controller
```bash
$ minikube addons enable ingress
```
2. Verify (after 1.19)
```bash
$ kubectl get pods -n ingress-nginx
```

## Ingress and Egress
- There is an `isioingress` and `istioegress` in the `istio-system` namespace, serving as the edge of the service mesh.
- They contain a single proxy and Istio agent, no other containers.
- You can also define your own Ingress and Egress resources.
- Ingress controls the inbound traffic from the outside world 
- Egress controls the outbound traffic to the outside world.

```bash
$ kubectl get pods -n istio-system
```

## Gateway
- Instead of using Kubernetes native Ingress resource, Istio provides its own gateway for more features.
- Like Kubernetes Ingress, you can define several rules like host, protocol, port, ....
- However, it does not provide any configuration at default, so you need a `VirtualService` to be bind to.

### Kubernetes Ingress
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /$1
spec:
  rules:
    - host: hello-world.info
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 8080
```
```bash
$ kubectl get ingress
```

### Istio Gateway
- Defined in `samples/bookinfo/networking/bookinfo-gateway.yaml`
- It selects the ingressgateway as the default ingress to send traffic to
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  selector:
      istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:  
    - "*"
```
```bash
$ kubectl get gateway
```
### Set to specific host
```yaml
    hosts:
    - "bookinfo.app"
```

## Virtual Service
- Virtual services are attached to Istio Ingress.
- They can see the information of host, gateway and then to apply match rules.
- The traffic will be routed to subset, which is defined in the Destination Rule
- It can also define load balancing rules and traffic policies.

### Connect to Ingress
- This is used for configuring gateway.
- It connect to the gateway you specify.
- In the following example, it accept traffic from the `bookinfo-gateway`, but doesn't match any hosts, and all matched path will be routed to a `DestinationRule`, which is an abstraction on top of pods, just like a `Service`. 
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: bookinfo
spec:
  # The destination hosts to which traffic is being sent.
  # It means all traffic will be directed to this gateway
  hosts:
  - "*"
  # The names of gateways and sidecars that should apply these routes.
  gateways:
  - bookinfo-gateway
  http:
  - match:
    - uri:
        exact: /productpage
    - uri:
        prefix: /static
    - uri:
        exact: /login
    - uri:
        exact: /logout
    - uri:
        prefix: /api/v1/products
    route:
    - destination:
        host: productpage
        port:
          number: 9080
```
Set to specific host
```yaml
spec:
  # It means traffic sent to bookinfo.app will be redirected to the gateway
  hosts:
  - "bookinfo.app"
```

### Traffic Routing
- Another thing a virtual service can do is route traffic to several destination rules with different weight.
- All weight should sum up to 100 or it will fail.
```yaml
apiVersion: networking.istio.io/v1alpha3 
kind: VirtualService
metadata:
  name: reviews 
spec:
  # It means reviews.default.svc.cluster.local
  # So it means some traffic that is originally sent 
  # to reviews service will be replaced by this new rule
  hosts:
    - reviews
  http:
  - route:
    - destination: 
        # This host means it want to send traffic to pods
        # befine reviews service but using a desination rule
        # with subset v1 for more control
        host: reviews
        subset: v1
      # 99% of the traffic
      weight: 99
    - destination:
        host: reviews
        subset: v2 
      weight: 1
```

## Destination Rule
- It is used by virtual services
- It likes service, but a different abstration layer based on service.
- You specify a Kubernetes service, and it use labels to select those pods (entrypoints) that are maintained by the service (I guess it will get endpoints information by inspecting the service resource)

### Examples
- The labels `version: v1` is actually the review pods' labels. 
- When the traffic coming, it routes to pods under the `reviews` service and having the label `version: v1`.
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: reviews
spec:
  host: reviews
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
  - name: v3
    labels:
      version: v3
```
- It adds a traffic policy to configure the load balancer to use `LEAST_CONN` for normal and `ROUND_ROBIN` for a test version. The default is random.
```yaml
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: bookinfo-ratings
spec:
  host: ratings.prod.svc.cluster.local
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
  subsets:
  - name: testversion
    labels:
      version: v3
    trafficPolicy:
      loadBalancer:
        simple: ROUND_ROBIN
```
## Service Entry

## References
- https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/
- https://istio.io/latest/docs/setup/getting-started/
- https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/
- KodeKloud - Service Mesh with Istio