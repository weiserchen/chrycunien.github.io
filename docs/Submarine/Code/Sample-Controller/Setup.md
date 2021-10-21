# Setup

## Install 
- Clone this repository `https://github.com/kubernetes/sample-controller`
```bash
$ git clone git@github.com:kubernetes/sample-controller.git
$ cd sample-controller
```

## Run
- Follow the instructions below to create a cr and cr controller
```bash
# assumes you have a working kubeconfig, not required if operating in-cluster
go build -o sample-controller .
./sample-controller -kubeconfig=$HOME/.kube/config

# create a CustomResourceDefinition
kubectl create -f artifacts/examples/crd.yaml

# create a custom resource of type Foo
kubectl create -f artifacts/examples/example-foo.yaml

# check deployments created through the custom resource
kubectl get deployments
```

## Update 
- Make sure you install the depency first
- When you modify the resource in `pkg`, you need to run `update-codegen.sh` first
```bash
# Install required dependencies to vendor directory especially code generator
# under project root folder
$ go mod vendor

$ ./hack/update-codegen.sh
```


## References
- https://github.com/kubernetes/sample-controller/