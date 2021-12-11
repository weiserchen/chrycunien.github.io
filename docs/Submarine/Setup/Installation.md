# Installation

## Steps
1. Install `kubectl`, `minikube`, and `helm`
```bash
$ brew install kubectl minikube helm
```
2. Start minikube cluster
> I have a question on this step. It seems that I cannot use docker driver on mac.
```bash
$ minikube start --kubernetes-version v1.15.1 --vm-driver=docker --cpus 8 --memory 4096
```
Alternative setup, using hyperkit
```bash
# Install hyperkit, you may already install it if you use Docker Desktop
$ brew install hyperkit
# Set as default
$ minikube config set driver hyperkit
$ minikube start --kubernetes-version v1.15.1 --cpus 8 --memory 4096 
```
3. Install resources using helm
```bash
$ helm install submarine ./helm-charts/submarine
```
4. Watch pod creation
```bash
# Using watch
$ brew install watch
$ watch kubectl get pods

# Using k9s
$ brew install k9s
$ k9s
```
5. Forward service port
```bash
$ kubectl port-forward --address 0.0.0.0 service/submarine-traefik 32080:80
```
```bash
$ kubectl port-forward --address 0.0.0.0 -n istio-system service/istio-ingressgateway 32080:80
```
```bash
$ kubectl port-forward --address 0.0.0.0 service/submarine-minio-service 9000:9000
```
6. Go to `localhost:32080`, the username and the password is both `admin`