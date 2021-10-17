# Autoscaling

- Scale automatically based on some metrics (CPU utilization, memory, ...)
- Set target CPU along with min and max replicas
- Target CPU is expressed as a percentage of the Pod's request
- The autoscaler watch the average resource usage in the deployment, not the host machine

## Metrics
- Autoscaling depends on metrics being collected
- Metrics server is one solution for collecting metrics, maintained by Kubernetes itself
- Several manifest file are used to deploy Metrics Server

## Metric Server Source Code
- Put the following files under `metrics-server` directory.
```yaml title="aggregated-metrics-reader.yaml"
kind: ClusterRole
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: system:aggregated-metrics-reader
  labels:
    rbac.authorization.k8s.io/aggregate-to-view: "true"
    rbac.authorization.k8s.io/aggregate-to-edit: "true"
    rbac.authorization.k8s.io/aggregate-to-admin: "true"
rules:
- apiGroups: ["metrics.k8s.io"]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]
```
```yaml title="auth-delegator.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: metrics-server:system:auth-delegator
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
- kind: ServiceAccount
  name: metrics-server
  namespace: kube-system
```
```yaml title="auth-reader.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: metrics-server-auth-reader
  namespace: kube-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: extension-apiserver-authentication-reader
subjects:
- kind: ServiceAccount
  name: metrics-server
  namespace: kube-system
```
```yaml title="resource-reader.yaml"
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: system:metrics-server
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - nodes
  - nodes/stats
  verbs:
  - get
  - list
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: system:metrics-server
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:metrics-server
subjects:
- kind: ServiceAccount
  name: metrics-server
  namespace: kube-system
```
```yaml title="metrics-apiservice.yaml"
apiVersion: apiregistration.k8s.io/v1
kind: APIService
metadata:
  name: v1beta1.metrics.k8s.io
spec:
  service:
    name: metrics-server
    namespace: kube-system
  group: metrics.k8s.io
  version: v1beta1
  insecureSkipTLSVerify: true
  groupPriorityMinimum: 100
  versionPriority: 100
```
```yaml title="metrics-server-deployment.yaml"
apiVersion: v1
kind: ServiceAccount
metadata:
  name: metrics-server
  namespace: kube-system
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: metrics-server
  namespace: kube-system
  labels:
    k8s-app: metrics-server
spec:
  selector:
    matchLabels:
      k8s-app: metrics-server
  template:
    metadata:
      name: metrics-server
      labels:
        k8s-app: metrics-server
    spec:
      serviceAccountName: metrics-server
      volumes:
      # mount in tmp so we can safely use from-scratch images and/or read-only containers
      - name: tmp-dir
        emptyDir: {}
      containers:
      - name: metrics-server
        image: k8s.gcr.io/metrics-server-amd64:v0.3.3
        imagePullPolicy: Always
        command:
        - /metrics-server
        - --kubelet-insecure-tls
        - --kubelet-preferred-address-types=InternalIP 
        volumeMounts:
        - name: tmp-dir
          mountPath: /tmp
```
```yaml title="metric-servier-service.yaml"
apiVersion: v1
kind: Service
metadata:
  name: metrics-server
  namespace: kube-system
  labels:
    kubernetes.io/name: "Metrics-server"
    kubernetes.io/cluster-service: "true"
spec:
  selector:
    k8s-app: metrics-server
  ports:
  - port: 443
    protocol: TCP
    targetPort: 443
```
- Apply all these file
```bash
kubectl apply -f metrics-server/
```

## Application Source Code
- We use the `Deployment` section code in this note too.
- Another 2 file
```yaml title="6.1-app_tier_cpu_request.yaml"
apiVersion: v1
kind: Service
metadata:
  name: app-tier
  labels:
    app: microservices
spec:
  ports:
  - port: 8080
  selector:
    tier: app
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-tier
  labels:
    app: microservices
    tier: app
spec:
  replicas: 5
  selector:
    matchLabels:
      tier: app
  template:
    metadata:
      labels:
        app: microservices
        tier: app
    spec:
      containers:
      - name: server
        image: lrakai/microservices:server-v1
        ports:
          - containerPort: 8080
        resources:
          requests:
            cpu: 20m # 20 milliCPU / 0.02 CPU
        env:
          - name: REDIS_URL
            # Environment variable service discovery
            # Naming pattern:
            #   IP address: <all_caps_service_name>_SERVICE_HOST
            #   Port: <all_caps_service_name>_SERVICE_PORT
            #   Named Port: <all_caps_service_name>_SERVICE_PORT_<all_caps_port_name>
            value: redis://$(DATA_TIER_SERVICE_HOST):$(DATA_TIER_SERVICE_PORT_REDIS)
            # In multi-container example value was
            # value: redis://localhost:6379 
```
```yaml title="6.2-autoscale.yaml"
apiVersion: autoscaling/v1
kind: HorizontalPodAutoscaler
metadata:
  name: app-tier
  labels:
    app: microservices
    tier: app
spec:
  maxReplicas: 5
  minReplicas: 1
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: app-tier
  targetCPUUtilizationPercentage: 70

# Equivalent to
# kubectl autoscale deployment app-tier --max=5 --min=1 --cpu-percent=70
```

### Explanation
- We have to set the reqeust resource option in the deployment to let autoscaler works
- We can set `minReplicas` and `maxReplicas` to specify the lower and upper bound of the autoscaler
- And we have to set the `targetCPUUtilizationPercentage` to tell autoscaler when to scale up or down

## Commands
- To verify the metric server is working
```bash
kubectl -n deployments top pods
```
- Apply the new app-tier file
```bash
kubectl -n deployments apply -f 6.1-app_tier_cpu_request.yaml
```
- Apply the autoscaler file
```bash
kubectl -n deployments apply -f 6.2-autoscale.yaml
```
- Monitor
```bash
# Install watch using: brew install watch
watch -n 1 kubectl -n deployments get pods
```
- See all api resources
```bash
kubectl api-resources
```
- See the information of the autoscaler
```bash
kubectl -n deployments get hpa
kubectl -n deployments describe hpa
```
- Edit the config (ephemeral and not recommended)
```bash
kubectl -n deployments edit hpa
```

## References
- https://github.com/kubernetes-sigs/metrics-server