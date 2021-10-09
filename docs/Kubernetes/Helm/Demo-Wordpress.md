# Demo - Wordpress

We install bitnami wordpress helm chart in this note.

```bash
# Make our working directory consistent
$ mkdir ~/helm-demo
$ cd ~/helm-demo
```

## Setup minikube
```bash
# Check minikube status
$ minikube status

# Start a minikube cluster
$ minikube start

# Check minikube status again
$ minikube status

# After finished
$ minikube stop
# Or
# minikube delete
```

## Add Helm Repository
```bash
# Check helm list
$ helm list

# Search for wordpress chart
$ helm search hub wordpress

# Output result in yaml
$ helm search hub wordpress -o yaml

# Search for bitnami wordpress
$ helm search hub wordpress -o yaml | grep bitnami

# Go to the link you found and then you can follow the instruction
$ helm repo add bitnami https://charts.bitnami.com/bitnami

# List repo
$ helm repo list

# Update the repo cache
$ helm repo update
```

## Install Helm Chart
```bash
# Search for wordpress in repo
$ helm search repo wordpress

# Install chart
$ helm install wordpress \
  --set wordpressUsername=admin \
  --set wordpressPassword=password \
  --set mariadb.auth.rootPassword=secretpassword \
    bitnami/wordpress

# Check that wordpress is successfully installed
$ helm list

# See information using minikube
$ minikube service wordpress

# Then you can copy the link shown int the URL field and paste into your browser
# You may see something like this (The first link)
# http://172.16.174.5:30740

# Login to the admin page
# http://172.16.174.5:30740/wp-admin
# username: admin
# password: password
# just as you set in the install command

# Finally, uninstall the chart
$ helm uninstall wordpress

# Check successfully uninstalled
$ kubectl get all
```

## References
- https://cloudacademy.com/course/introduction-to-helm-1034