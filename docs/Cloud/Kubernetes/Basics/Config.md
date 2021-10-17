# ConfidMaps and Secrets

## Motivation
- All container information has been stored in Pod spec
- Not quite portable
- Presents security issues if the file contains sensitive data

## Types
- ConfigMaps and Secrets separate confugration from pod `spec`
- Results in easier to manage and more portable manifests
- Both are similar but Secrets are used to store sensitive data (not encryption or access control)
- Secrets are just base64 encoded string, but kubernets will automatically decode/encode for you
- They are specialized types of secret for storing Docker registry credentials and TLS certificate
- Data are stored in key-value pair
- Pods must reference ConfigMaps or Secrets to use their data
- References can be made by mounting Volumes or setting environment variables

## Source Code
```yaml title="10.1-namespace.yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: config
  labels:
    app: counter
```
```yaml title="10.2-date_tier_config.yaml"
apiVersion: v1
kind: ConfigMap
metadata:
  name: redis-config
data:
  # We only add one key-value pair here
  config: | # YAML for multi-line string
    # Redis config file
    tcp-keepalive 240
    maxmemory 1mb
```
```yaml title="10.3-data_tier.yaml"
apiVersion: v1
kind: Service
metadata:
  name: data-tier
  labels:
    app: microservices
spec:
  ports:
  - port: 6379
    protocol: TCP # default 
    name: redis # optional when only 1 port
  selector:
    tier: data 
  type: ClusterIP # default
---
apiVersion: apps/v1 # apps API group
kind: Deployment
metadata:
  name: data-tier
  labels:
    app: microservices
    tier: data
spec:
  replicas: 1
  selector:
    matchLabels:
      tier: data
  template:
    metadata:
      labels:
        app: microservices
        tier: data
    spec: # Pod spec
      containers:
      - name: redis
        image: redis:latest
        imagePullPolicy: IfNotPresent
        ports:
          - containerPort: 6379
            name: redis
        livenessProbe:
          tcpSocket:
            port: redis # named port
          initialDelaySeconds: 15
        readinessProbe:
          exec:
            command:
            - redis-cli
            - ping
          initialDelaySeconds: 5
        command:
          - redis-server
          - /etc/redis/redis.conf
        volumeMounts:
          - mountPath: /etc/redis
            name: config
      volumes:
        - name: config
          # Secret: change this field to secret
          configMap:
            # Secret: change this field to secretName
            # This field is the name of the configMap in the cluster
            name: redis-config
            items:
            - key: config
              path: redis.conf
```
```yaml title="10.4-app_tier_secret.yaml"
apiVersion: v1
kind: Secret
metadata:
  name: app-tier-secret
stringData: # unencoded data
  api-key: LRcAmM1904ywzK3esX
  decoded: hello
data: #for base-64 encoded data
  encoded: aGVsbG8= # hello in base-64

# api-key secret (only) is equivalent to
# kubectl create secret generic app-tier-secret --from-literal=api-key=LRcAmM1904ywzK3esX
```
```yaml title="10.5-app_tier.yaml"
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
  replicas: 1
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
            name: server
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
          - name: DEBUG
            value: express:*
          - name: API_KEY
            valueFrom:
              # configMap: change this field to configMapKeyRef
              secretKeyRef:
                name: app-tier-secret
                key: api-key
        livenessProbe:
          httpGet:
            path: /probe/liveness
            port: server
          initialDelaySeconds: 5
        readinessProbe:
          httpGet:
            path: /probe/readiness
            port: server
          initialDelaySeconds: 3
      initContainers:
        - name: await-redis
          image: lrakai/microservices:server-v1
          env:
          - name: REDIS_URL
            value: redis://$(DATA_TIER_SERVICE_HOST):$(DATA_TIER_SERVICE_PORT_REDIS)
          command:
            - npm
            - run-script
            - await-redis
```

## Commands
- Verify the config map setting
```bash
# Connect into the container
kubectl -n config exec -it <pod_name> -- /bin/bash

# Print file contnet
cat /etc/redis/redis.conf

# Check the redis setting
redis-cli CONFIG GET tcp-keepalive
```
- Config map information
```bash
# Get config map value
kubectl -n config describe configmaps

# Edit config map file
kubectl -n config edit configmaps

# Neet to rollout to actually make change
kubectl -n config rollout restart deployment data-tier
```
- Secret information
```bash
# Get secret value (FAIL !!!) You only see OPAQUE
kubectl -n config describe secrets

# Edit secret file
kubectl -n config edit secrets

# Neet to rollout to actually make change
kubectl -n config rollout restart deployment app-tier
```




## References

