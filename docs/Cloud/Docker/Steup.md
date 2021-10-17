# Setup

I'm using Mac.

## Install Docker Desktop
One way to use docker is to install docker desktop. You can find it in the official webpage of Docker.

## Install via Minikube
Another way is to setup a minikube cluster with the help of hyperkit vm.

- Install hyperkit
```bash
$ brew install hyperkit
```
- Install docker cli
```bash
$ brew install docker
```
- Install Minikube and kubectl
```bash
$ brew install minikube kubectl
```
- My simple setup script
```bash
#!/bin/bash

minikube ip &> /dev/null

# Make sure no minikube cluster is running
if [[ "${?}" -ne 0  ]]
then
    echo "Minikube is down!"
else
    echo "Minikube is up!"
    docker_setup
    exit 1
fi

echo
echo "Starting Minikube..."
echo

echo "No. of Parameters: ${#}"

CPUS="${1}"
MEMORY="${2}"g

if [[ "${#}" -eq 0  ]]
then
    echo "Using default setting!"
elif [[ "${#}" -eq 1 ]]
then
    echo "Setting cpus as: " "$CPUS"
    minikube config set cpus "$CPUS"
else
    echo "Setting cpus as: " "$CPUS"
    echo "Setting memory as:" "$MEMORY"
    minikube config set cpus "$CPUS"
    minikube config set memory "$MEMORY"
fi

# Clean up all former resources
echo
echo "Deleting all resources..."
minikube delete
# Start minikube
echo
minikube start
```
- Point docker-cli to docker daemon in minikube (You have to do it when you open a new terminal session)
```bash
$ eval $(minikube docker-env)
```

## References
- https://itnext.io/goodbye-docker-desktop-hello-minikube-3649f2a1c469
- https://stackoverflow.com/questions/1955505/parsing-json-with-unix-tools
- https://unix.stackexchange.com/questions/31414/how-can-i-pass-a-command-line-argument-into-a-shell-script
- https://stackoverflow.com/questions/7069682/how-to-get-arguments-with-flags-in-bash

