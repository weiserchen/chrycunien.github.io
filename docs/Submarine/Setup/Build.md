# Build

## Package
1. Each time you have some changes in the project, you have to repackage into a new jar file.
```bash
# If you don't want to run the test, add -Dskiptests flag
$ mvn package -DskipTests
```
2. Build the new server docker image
```bash
# switch to minikube docker daemon to build image directly in minikube
$ eval $(minikube docker-env)

# run docker build
$ ./dev-support/docker-images/submarine/build.sh

# exit minikube docker daemon
$ eval $(minikube docker-env -u)
``` 
3. Upgrade server pod
```bash
helm upgrade --set submarine.server.dev=true submarine ./helm-charts/submarine
```
4. Check
```bash
# First, find your pod name 
$ watch kubectl get pods

# Second, get the logs
$ kubectl logs <pod_name> | grep Host
```


For more information: [link](https://submarine.apache.org/docs/devDocs/Development)