# Minikube

## Installation
```bash
brew install minikube
brew install hyperkit
```

## Start
```bash
minikube start --driver=hyperkit
# Set as default 
# minikube config set driver hyperkit 
```

## References
- https://minikube.sigs.k8s.io/docs/start/
- https://minikube.sigs.k8s.io/docs/drivers/hyperkit/