# Operator

We can use submarine operator as another way to deploy. The code is under `submarine/submarine-cloud-v2`


## Operator setup
Make sure to delete those in the previous deploy from the normal steps.
Under `submarine/submarine-cloud-v2` directory

1. Initial setup
```bash
# Add helm-chart dependencies
$ cp -r ../helm-charts/submarine/charts ./helm-charts/submarine-operator/
# Run the cluster
$ minikube start --kubernetes-version v1.15.11
```
2. You can see that there is some `operator-XXX` in the default namespace.
3. Use the in-cluster method to deploy other resources
```bash
# Step1: Install submarine-operator
$ helm install submarine-operator ./helm-charts/submarine-operator/

# Step2: Deploy a submarine
$ kubectl create ns submarine-user-test
$ kubectl apply -n submarine-user-test -f artifacts/examples/example-submarine.yaml
```
4. You wll see many other resources in the `submarine-user-test` namespace.

## Rebuild server
Under `submarine/submarine-cloud-v2` directory

1. Run maven install each time you want to rebuild (in `submarine` folder)
```bash
$ mvn install -DskipTests
```
2. Rebuild server
```bash
$ cd hack/
# ./server-rapid-builder.sh <namespace>
$ ./server-rapid-builder.sh submarine-user-test
```
3. Verify that it indeed change
```bash
$ kubectl logs <pod_name> -n submarine-user-test| grep Host
```



## More Information
- [oeprator](https://github.com/apache/submarine/tree/master/submarine-cloud-v2)
- []