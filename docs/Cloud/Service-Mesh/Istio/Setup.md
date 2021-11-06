# Istio Setup

## Envivronment
- `minikube`: v1.23.0
- `Kubernetes`: v1.22.1
- `Istio`: v1.11.4

## Install Istio
1. Install Istio
```bash
$ curl -L https://istio.io/downloadIstio | sh -
```
2. Change into the istio directory
```bash
$ cd istio-1.11.4
```
3. Update the `PATH` environment variable (you can add the path in `~/.zshrc` or `~/.bashrc` as well)
```bash
$ export PATH=$PWD/bin:$PATH
```
4. Install a demo Istio profile (the basic structure of Istio in the cluster, you can select different profile)
```bash
$ istioctl install --set profile=demo -y
```
5. Verify installation.
```bash
$ istioctl verify-install
```

## Application Setup
1. Enable `istio-injection` label
```bash
$ kubectl label namespace default istio-injection=enabled
```
2. Install the application
```bash
$ kubectl apply -f samples/bookinfo/platform/kube/bookinfo.yaml
```
3. Check whether each pod has two containers (one is the original container, the other is the sidecar)
```bash
$ kubectl get pods -A
```
4. Verify if the application is running
```bash
$ kubectl exec "$(kubectl get pod -l app=ratings -o jsonpath='{.items[0].metadata.name}')" -c ratings -- curl -sS productpage:9080/productpage | grep -o "<title>.*</title>"
```

- Note: If something doesn't run correctly, use `istioctl analyze` to find out the problem

## Enable Ingress traffic
1. Create a gateway (a crd)
```bash
$ kubectl apply -f samples/bookinfo/networking/bookinfo-gateway.yaml
```
2. Get istio ingress port and host
```bash
export INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="http2")].nodePort}')
export SECURE_INGRESS_PORT=$(kubectl -n istio-system get service istio-ingressgateway -o jsonpath='{.spec.ports[?(@.name=="https")].nodePort}')
export INGRESS_HOST=$(minikube ip)
export GATEWAY_URL=$INGRESS_HOST:$INGRESS_PORT
```
3. Send traffic to istio ingress gateway
```bash
# Method 1
$ minikube tunnel

# Method 2
$ minikube addons enable ingress
```
4. Verify the page
```bash
# Method 1
$ curl "http://$GATEWAY_URL/productpage"

# Method 2
# Copy "http://$GATEWAY_URL/productpage" to the browser
```

## Add Custom Traffic Rules
1. Add desination rules (the virtual services had been defined in `bookinfo-gateway.yaml`)
```bash
$ kubectl apply -f samples/bookinfo/networking/destination-rule-all.yaml

# If using tls
$ kubectl apply -f samples/bookinfo/networking/destination-rule-all-mtls.yaml
```
2. After deployed, you will find some errors, it's fine in that it defines some rules that are not used in addition.

## Dashboard
Istio provides a Kiali dashboard to better understand the network view.

1. Install addons (note: these addons are just for demo, not for production)
```bash
$ kubectl apply -f samples/addons
```
2. Wait for them to be deployed
```bash
$ kubectl rollout status deployment/kiali -n istio-system
$ kubectl -n istio-system get svc kiali
```
3. View the dashbaord
```bash
$ istioctl dashboard kiali
```
4. Continue sending traffic to our application to gather metrics
```bash
$ while sleep 0.01; do curl -sS "http://$GATEWAY_URL/productpage" &> /dev/null ; done
```
5. Select the graph section on the sidebard (you may have to reload several times)

## Cleanup
1. Remove application-related resources (including gateway, virtual service, ...)
```bash
$ ./samples/bookinfo/platform/kube/cleanup.sh 
```
2. Remove istio-related resources
```bash
# Remove addons
kubectl delete -f samples/addons

# Remove namespace and injection label
kubectl delete namespace istio-system
kubectl label namespace default istio-injection-
```


## References
- https://istio.io/latest/docs/setup/getting-started/