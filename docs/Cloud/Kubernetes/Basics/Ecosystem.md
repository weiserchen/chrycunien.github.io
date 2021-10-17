# Kubernetes Ecosystem

## Helm
- Kubernets package manager
- Packages are called chart and are installed on the cluster using Helm CLI
- Make it easy to share complete applications
- Seach for Helm Hub for public charts

### Example
1. Use Helm for redis data tier
    - redis charts available
    - Highly-available redis charts avoids a single point of failure
```bash
helm install stable/redis-ha
```
2. Create a chart for the entire sample application
    - Share it with anyone

## Kustomize
- Customize yaml manifests in Kubernetes
- Helps you manage the complexity of the applications
- Works by using a kustomization.yaml file that declares customization rules
- Original manifests are untouched and remain usable
- Directly intergrated with `kubectl` by including `--kustomize` or `-k` with `create` or `apply` 

### Examples
- Generate ConfigMaps and Secrets from file
- Configure common fields across multiple resources
- Apply patched to any field in a manifest

## Prometheus
- Open-source monitoring and alerting system
- A server for pulling in time series metric data and storing it
- Inspired by an internal monitoring tool at Google called borgmon
- De facto standard solution for monitoring Kubernetes
- Kubernetes components supply all their own metrics in Prometheus format (many more than metric server)
- Adapter availab to autoscale using metrics in Prometheus rather than CPU utilization
- Commonly paired with Grafana for visualization and 
- Define alert rules and send out notification
- Easily installed via Helm chart

## Kubeflow
- Makes deployment of machine learning workflows on Kubernetes simple, scalable and portable
- A complete machine learning stack
- Leverage Kubernetes to deploy anywhere

## Knative
- Platform for building, deploying, and managing serverless workloads on kubernetes
- Can be deployed anywhere with Kubernetes, avoiding vendor lock-in
- Supported by Google, IBM, and SAP