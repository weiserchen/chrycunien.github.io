# Kubernetes

## Kubectl
1. Update the apt package index and install packages needed to use the Kubernetes apt repository
```bash
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
```
2. Download the Google Cloud public signing key
```bash
$ sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
```
3. Add the Kubernetes apt repository
```bash
$ echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
```
4. Update apt package index with the new repository and install kubectl
```bash
$ sudo apt-get update
$ sudo apt-get install -y kubectl
```

## Minikube
```bash
# Add this line before your start an minikube cluster
$ sudo usermod -aG docker $USER && newgrp docker

# Create a new node
$ minikube start

# Stop the node
$ minikube stop

# Resume the node
$ minikube start

# Delete a node
$ minikube delete
```

## Helm
```bash
curl https://baltocdn.com/helm/signing.asc | sudo apt-key add -
sudo apt-get install apt-transport-https --yes
echo "deb https://baltocdn.com/helm/stable/debian/ all main" | sudo tee /etc/apt/sources.list.d/helm-stable-debian.list
sudo apt-get update
sudo apt-get install helm
```

## K9s
```bash
$ curl -sS https://webinstall.dev/k9s | bash
```

## References
- https://helm.sh/docs/intro/install/
- https://github.com/derailed/k9s