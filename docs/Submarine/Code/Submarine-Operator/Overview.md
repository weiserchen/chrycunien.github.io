# Overview

The Submarine Operator is based on the sample controller project of Kubernetes.

## Setup
```bash
# Add helm-chart dependencies
$ cp -r ../helm-charts/submarine/charts ./helm-charts/submarine-operator/
# Install dependencies
$ go mod vendor
# Run the cluster
$ minikube start --vm-driver=docker  --kubernetes-version v1.15.11
```

## Run out of Cluster
- The meaning of out of cluster is that you run the operator on your host machine instead of inside the minikube.
```bash
# Step1: Install helm chart dependencies
helm install --set dev=true submarine-operator ./helm-charts/submarine-operator/

# Step2: Build & Run "submarine-operator"
make
./submarine-operator

# Step3: Deploy a Submarine
kubectl create ns submarine-user-test
kubectl apply -n submarine-user-test -f artifacts/examples/example-submarine.yaml

# Step4: Exposing Service
# Method1 -- use minikube ip
minikube ip  # you'll get the IP address of minikube, ex: 192.168.49.2

# Method2 -- use port-forwarding
kubectl port-forward --address 0.0.0.0 service/submarine-operator-traefik 32080:80

# Step5: View Workbench
# http://{minikube ip}:32080 (from Method 1), ex: http://192.168.49.2:32080
# or http://127.0.0.1:32080 (from Method 2).

# Step6: Delete Submarine
# By deleting the submarine custom resource, the operator will do the following things:
#   (1) Remove all relevant Helm chart releases
#   (2) Remove all resources in the namespace "submariner-user-test"
#   (3) Remove all non-namespaced resources (Ex: PersistentVolume) created by client-go API
#   (4) **Note:** The namespace "submarine-user-test" will not be deleted
kubectl delete submarine example-submarine -n submarine-user-test

# Step6: Stop the operator
# Press ctrl+c to stop the operator

# Step7: Uninstall helm chart dependencies
helm delete submarine-operator
```

## Run in-cluster
- The meaning of run in cluster is that it will deploy the operator inside the minikube cluster using pod or deployment.
```bash
# Step1: Install submarine-operator
helm install submarine-operator ./helm-charts/submarine-operator/

# Step2: Deploy a submarine
kubectl create ns submarine-user-test
kubectl apply -n submarine-user-test -f artifacts/examples/example-submarine.yaml

# Step3: Inspect the logs of submarine-operator
kubectl logs -f $(kubectl get pods --output=name | grep submarine-operator)

# Step4: Exposing Service
# Method1 -- use minikube ip
minikube ip  # you'll get the IP address of minikube, ex: 192.168.49.2

# Method2 -- use port-forwarding
kubectl port-forward --address 0.0.0.0 service/submarine-operator-traefik 32080:80

# Step5: View Workbench
# http://{minikube ip}:32080 (from Method 1), ex: http://192.168.49.2:32080
# or http://127.0.0.1:32080 (from Method 2).

# Step6: Delete Submarine
# By deleting the submarine custom resource, the operator will do the following things:
#   (1) Remove all relevant Helm chart releases
#   (2) Remove all resources in the namespace "submariner-user-test"
#   (3) Remove all non-namespaced resources (Ex: PersistentVolume) created by client-go API
#   (4) **Note:** The namespace "submarine-user-test" will not be deleted
kubectl delete submarine example-submarine -n submarine-user-test

# Step7: Delete the submarine-operator
helm delete submarine-operator
```

## References
- https://github.com/apache/submarine/blob/master/submarine-cloud-v2/README.md