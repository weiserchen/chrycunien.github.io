# Istio Traffic

## Overview
- In order to direct traffic within your mesh, Istio needs to know where all your endpoints are, and which services they belong to. To populate its own service registry, Istio connects to a service discovery system. For example, if you’ve installed Istio on a Kubernetes cluster, then Istio automatically detects the services and endpoints in that cluster. Using this service registry, the Envoy proxies can then direct traffic to the relevant services.
- For more [information](https://istio.io/latest/docs/concepts/traffic-management/)

![k8s-istio-traffic](../../../../static/img/kubernetes/k8s-istio-traffic.drawio.png)

## Kubernetes Service
Kubernetes `Service` is a Kubernetes resource to expose anothor resources like pods, deployments, ... . It selects pods using labels and also checks for readiness probe(mount the pod is it is ready) and liveness probe (kill the pod if no reponse).

Each service is assigned an dedicated cluster ip so it will not effected by the removal of any pod (endpoint). Plus, it is `<service-name>.<namespace>.svc.cluster.local`, like `reviews.prod.svc.cluster.local`. Since Kubernetes implement a flat network model, each ip can establish a connection with any other ip if no further restriction is set. Hence, when a resource contact the service, an unchanged ip, then it route the traffic in a random way (equally distributed) to endpoints it references. 

`Service` has 3 basic types (and some other advanced types):
- `ClusterIP`
- `NodePort`
- `LoadBalancer`

### ClusterIP
- The default service type.
- It is used for communication within the cluster.
- The service will be assigned a dedicated ip.

### NodePort
- It also setup a `ClusterIP` behind the scene.
- It opens a random port (over 30000 unless you specify it) in each node in the cluster.
- Then when traffic arrive this port, traffic is redirected to the service (by manipulating the iptable).
- The connection between the NodePort and the ClusterIP is automatically established.

### LoadBalancer
- It also setup a `NodePort` and `ClusterIP` behind the scene.
- It requires the support of cloud infrastructure.
- It serves as a load balancer (usually L4) for all node ports.
- The connection between the LoadBalancer, the NodePort and the ClusterIP is automatically established.
- If the infrastructure doesn't support, the `External IP` field of the service will always be `Pending`.
```bash
$ minikube tunnel
```

## Ingress 
Ingress is another way to define routing rules other than load balancers. It supports url-based routing, which looks at the host field in the HTTP packet header (L7 load balancer).

### Kubernetes Ingress
- `Ingress`is an API object defined by Kubernetes Ingress API, which defines a simple way for routing rules.
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
- Ingress controller is a resource that implement the Kubernetes Ingress API. The most widely support one is Nginx controller.
    - It sets up a deployment, just as other default controllers in Kubernetes.
    - It still need support of load balancer. What it actually do is configure that load balancer to let it know how to route the traffic.
```bash
$ minikube addons enable ingress
```
```bash
$ kubectl get pods -n ingress-nginx
```

### Istio Ingress Gateway
- Instead of using Kubernetes native `Ingress` resource, Istio provides its own gateway with advanced monitoring and routing rules.
- It just another routing model defined by Istio, but with more flexibilities.
- By splitting the functionality of `Ingress` into several `CustomResource`: `Gateway`, `VirtualService`, and `DestinationRule`, it achieves a more powerful routing configuration.
- We describe it in detail in later sections.

## Ingress and Egress

## Istio Routing
Istio separate its routing model into 3 parts: `Gateway`, `VirtualService`, an `DestinationRule`.

### Ingress Gateway
- There are `isio-ingressgateway` and `istio-egressgateway` in the `istio-system` namespace, they are the Envoy proxy that can be configure for routing rules, acting as boundary of the service mesh.
- They are both a (service, deployment) pair. When traffic arrives the service, it comes to the underlying deployment pod, which is a configured Envoy proxy, having several rules defined the user on how to route traffic
- They just like a LoadBalancer but the underlying implementation used Envoy instead native service.
- You can also define your own Ingress and Egress resources.
- Ingress controls the inbound traffic from the external world, the Egress it the opposite.
```bash
$ kubectl get pods -n istio-system
```

### Gateway
- `Gateway` describes a load balancer operating at the edge of the mesh receiving incoming or outgoing HTTP/TCP connections. 
- The specification only describes a set of ports that should be exposed, the type of protocol to use, SNI configuration for the load balancer, etc.
- The gateway will be applied to the proxy running on a pod with labels `app: my-gateway-controller`. The default ingress gateway set up by `demo` profile has the label `istio: ingressgateway`
- The Gateway specification describes the L4-L6 properties of a load balancer. It only defines which traffic can enter the service mesh, but do not specify any routing rules.
- A `VirtualService` can then be bound to a gateway to control the forwarding of traffic arriving at a particular host or gateway port.
- The `host` means the `HOST: uk.bookinfo.com` in the HTTP header (the host url address used by a client when attempting to connect to a service), which is added by DNS automatically or manually by using `curl`.
- For more [information](https://istio.io/latest/docs/reference/config/networking/gateway/)
```yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: my-gateway
  namespace: some-config-namespace
spec:
  selector:
    app: my-gateway-controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - uk.bookinfo.com
    - eu.bookinfo.com
    tls:
      httpsRedirect: true # sends 301 redirect for http requests
  - port:
      number: 443
      name: https-443
      protocol: HTTPS
    hosts:
    - uk.bookinfo.com
    - eu.bookinfo.com
    tls:
      mode: SIMPLE # enables HTTPS on this port
      serverCertificate: /etc/certs/servercert.pem
      privateKey: /etc/certs/privatekey.pem
  - port:
      number: 9443
      name: https-9443
      protocol: HTTPS
    hosts:
    - "bookinfo-namespace/*.bookinfo.com"
    tls:
      mode: SIMPLE # enables HTTPS on this port
      credentialName: bookinfo-secret # fetches certs from Kubernetes secret
  - port:
      number: 9080
      name: http-wildcard
      protocol: HTTP
    hosts:
    - "*"
  - port:
      number: 2379 # to expose internal service via external port 2379
      name: mongo
      protocol: MONGO
    hosts:
    - "*"

```
```bash
$ kubectl get gateway
```

### Virtual Service
- Virtual services are attached to Istio `Gateway`, which is configuration affecting traffic routing.
- The traffic will be routed to subset, which is defined in the Destination Rule
- It can also define load balancing rules and traffic policies.
- You can specify Kubernetes `Service` in the `hosts` field, both for short and long name.
- As mentioned above, a gateway (`istio-ingressgateway`) is also a proxy without other containers
- `gateway` are the names of gateways and sidecars that should apply these routes.
- `mesh` is a special keyword to set rules to all (sidecar) proxies.
- It supports a great number of rules, such as cookie, prefix, ...
- The `route` field specify which detisnation rules to send to
- For more [information](https://istio.io/latest/docs/reference/config/networking/virtual-service/)

```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: bookinfo-rule
  namespace: bookinfo-namespace
spec:
  hosts:
  - reviews.prod.svc.cluster.local
  - uk.bookinfo.com
  - eu.bookinfo.com
  gateways:
  - some-config-namespace/my-gateway
  - mesh # applies to all the sidecars in the mesh
  http:
  - match:
    - headers:
        cookie:
          exact: "user=dev-123"
    route:
    - destination:
        port:
          number: 7777
        host: reviews.qa.svc.cluster.local
  - match:
    - uri:
        prefix: /reviews/
    route:
    - destination:
        port:
          number: 9080 # can be omitted if it's the only port for reviews
        host: reviews.prod.svc.cluster.local
      weight: 80
    - destination:
        host: reviews.qa.svc.cluster.local
      weight: 20
```    
- Another thing a virtual service can do is route traffic to several destination rules with different weight.
- All weight should sum up to 100 or it will fail. 
- It can be used in A/B testing (canary testing)
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

### Destination Rule
- It likes service, but a different abstration layer based on service.
- You specify a Kubernetes `Service`, and it use labels to select those pods (entrypoints) that are maintained by the service (I guess it will get endpoints information by inspecting the service resource)
- When the traffic coming, it routes to pods under the `ratings` service and having the label `version: v3`.
- It adds a traffic policy to configure the load balancer to use `LEAST_CONN` for normal and `ROUND_ROBIN` for a test version. 
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


### Service Entry
To talk to external service through egress gateway

### Sidecar
- By default, Istio configures every Envoy proxy to accept traffic on all the ports of its associated workload, and to reach every workload in the mesh when forwarding traffic.
A configuration like `Gateway` but apply on workloads (sidecar) in the mesh.
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: Sidecar
metadata:
  name: default
  namespace: bookinfo
spec:
  egress:
  - hosts:
    - "./*"
    - "istio-system/*"
```

## Resilience and Testing

### Timeout
- Is a service take too much time to respond, we must not keep the dependent server waiting forever, or the chain of request will get queued up and break the entire service
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
spec:
  hosts:
  - ratings
  http:
  - route:
    - destination:
        host: ratings
        subset: v1
    timeout: 10s
```

### Retries
- Attempt an operation again if it failed
- default: 
    - 25ms interval
    - 2 retries (total 3 requests) before returing errors
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
spec:
  hosts:
  - ratings
  http:
  - route:
    - destination:
        host: ratings
        subset: v1
    retries:
      attempts: 3
      perTryTimeout: 2s
```

### Circuit Breaker
- Limit the impact of failures and other network issues to prevent propagation of errors in the system
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
    trafficPolicy:
      connectionPool:
        tcp:
          maxConnections: 100
```
- `h2load` is a http2 benchmarking tool and can fire concurrent requests and then show some statistics of the traffic.
```bash
$ h2load -n1000 -c1 "http://$GATEWAY_URL/productpage"
```

### Fault Injection
- It injects some fault like delay or abort into the routing to simulate error conditions
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: ratings
spec:
  hosts:
  - ratings
  http:
  - fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    route:
    - destination:
        host: ratings
        subset: v1
```

## Example 1
We use the example of bookinfo to illustrate the whole routing process. You can reference the setup section.

### Gateway
```yaml
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: bookinfo-gateway
spec:
  selector:
    istio: ingressgateway # use istio default controller
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "bookinfo.app"
```

### Virtual Service
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: bookinfo
spec:
  hosts:
  - "bookinfo.app"
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

### Access
- Add the `Host` header
```bash
# You can not paste the url in the browser because you didn't configure the dns so
# it will not add Host field and Istio will not let the traffic come in
$ curl -H "Host: bookinfo.app" "http://$GATEWAY_URL/productpage"
```
- Or you can directly modify the dns entry in `/etc/hosts`
```bash
# Remember to delete the entry if you don't use again
$ echo -e "${INGRESS_HOST}\tbookinfo.app" | sudo tee -a /etc/hosts
$ curl "http://bookinfo.app:${INGRESS_PORT}/productpage"
```
- Change the gateway host back to `"*"` (wildcard) to allow all traffic coming. (we will use `"*"` for the later example)
```bash
$ curl "http://$GATEWAY_URL/productpage"
```
- another curl example
```bash
# -I == --header, show the header
# -s == --silent, show error messages it it fails
$ curl -s -I -HHost:httpbin.example.com "http://$INGRESS_HOST:$INGRESS_PORT/status/200"
```

### Weighted Traffic
- Apply some default virtual services
```bash
$ kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml 
```
- Add weighted rules for reviews virtual service
```yaml
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
  - reviews
  http:
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 75
    - destination:
        host: reviews
        subset: v2
      weight: 25
```
- Use this for sending traffic automatically
```bash
$ while sleep 0.01; do curl -sS "http://$GATEWAY_URL/productpage" &> /dev/null ; done
```
- Add user info filter (use sign in button on the top right corner to login and you'll see the change)
```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  hosts:
  - reviews
  http:
  - match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: reviews
        subset: v2
  - route:
    - destination:
        host: reviews
        subset: v3
```



## References
- https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/
- https://istio.io/latest/docs/setup/getting-started/
- https://istio.io/latest/docs/tasks/traffic-management/ingress/ingress-control/
- KodeKloud - Service Mesh with Istio
- https://istio.io/latest/docs/reference/config/networking/gateway/
- https://banzaicloud.com/blog/backyards-ingress/
- https://istio.io/latest/docs/reference/config/networking/sidecar/