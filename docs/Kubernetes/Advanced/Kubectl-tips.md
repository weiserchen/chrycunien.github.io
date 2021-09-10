# Kubectl Tips
- Set config
```bash 
# Set the config and specify that we will use namespace 'labels' as default
kubectl config set-context $(kubectl config current-context) --namespace=labels

# Set alias to quickly switch between namespace
# Usage: kcd <namespace> 
alias kcd='kubectl config set-context $(kubectl config current- context) --namespace '
```
- Get Logs
```bash
# Get the logs of the previous logs of an container
kubectl logs mypod --previous

# You also can get restart information in describe command
kubectl describe po kubia-liveness
```
- Get help
```bash
# Get all commands
kubectl
# Or kubectl | less

# Get short-hand resources
kubectl api-resources

# Explain a resource
kubectl explain -h | less
```
- Add auto completion for Kubernetes
```bash
# Follow instruction for your terminal
kubectl completion --help

# I use zsh
source <(kubectl completion zsh)

# Add to zshrc
echo "source <(kubectl completion zsh)" >> ~/.zshrc
```
- Get Labels
```bash
# Get pods of all namespaces
kubectl get pods --all-namespaces

# show labels
kubectl get pods --all-namespaces --show-labels

# Specify labels
# You will find an additional colume as the label name, with the value as the colume value
kubectl get pods --all-namespaces --show-labels -L <label_name>

# Filter out the output without the label
kubectl get pods --all-namespaces --show-labels -l <label_name>

# Append '=' after the key for equality filtering, '!=' is the opposite
kubectl get pods --all-namespaces --show-labels -l <label_name>=<label_value>

# Use ',' to separate selection conditions
# Ensure that we still only get the output of pods that have <label_name>
kubectl get pods --all-namespaces --show-labels -l <label_name>!=<label_value>,<label_name>

# Use in or not in to select labels
kubectl get pods -L color,tier -l 'color in (blue,green)'
```
- Sorting
```bash
# Sort by timestamp
kubectl get pods -n kube-system --sort-by=metadata.creationTimestamp
# For more complex case, use
# kubectl get pods -n kube-system --sort-by='{.metadata.creationTimestamp}'
# . means root json object

# You can sort by field that defined in the manifest file
kubectl get pod <pod_name> -n kube-system -o=yaml

# To sort by another field
# In this case, sort by the root -> status -> podIP
# Each . is a level of indentation (parent-child relationship)
# -o wide is to show more information including ip address
kubectl get pods -n kube-system --sort-by='{.status.podIP}' -o wide

# Get pods ip by json 
# We use items because we use a general pods not a specific pod name
kubectl get pods -n kube-system --sort-by='{.status.podIP}' -o jsonpath='{.items[*].status.podIP}'

# Much more complex (uncommon)
kubectl get pods -n kube-system --sort-by='{.status.podIP}' -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.podIP}{"\n"}{end}'
```
- Create manifest files
```bash
# Use kubectl create <resource_name> -h to find how to create a service

# Create namespace using kubectl
kubectl create namespace tips -o yaml --dry-run=client > tips/1-namespace.yaml

# Create deployment
kubectl create deployment nginx --image=nginx --port=80 --replicas=2 --dry-run=client -o yaml
```