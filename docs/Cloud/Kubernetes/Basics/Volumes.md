# Volumes

## Motivation
- Sometimes useful to share data between containers in a pod
- Lifetime of container file systems is limited to containers' lifetime

## Types
- Volumes and Persistent Volumes
- Used by mounting a directory to containers in the pod
- Pods can use multiple volumes
- The difference between them is how lifetime is managed

### Volumes
- Volumes are tied to a Pod and its lifecycle
- Share data between containers and tolerate containers restart
- Use for non-durable storage that is deleted with the Pod
- Default type is `emptyDir`
- Data is lost when the pod is reschedule to another node

### Persistent Volumes
- Managed by Kubernetes
- Independent of Pods' lifetime
- Pods claim Persisten Volumes to use throughout their lifetime
- Can be mounted by multiple pods on different nodes if underlying storage supports it
- Can be provisioned statically in advance or or dynamically on demand

### Persisten Volume Claims
- Describe a Pod's request for Persisten Volume storage
- Includes how much storage, type of storage, and access mode
- Access mode can be read-write once, read-only many, read-write many
- PVC stays pending if no PV can satisfy it and dynamic provisioning is not enabled
- Connect to a Pod through Volume (the Volume in the pod) of type PVC
- (?) Many pods use the same PVC to connect to PV, but a PV and a PVC are one-to-one mapping

## Source Code
```yaml title="9.1-namespace.yaml"
apiVersion: v1
kind: Namespace
metadata:
  name: volumes
  labels:
    app: counter
```
```yaml title="9.2-data_tier.yaml"
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
apiVersion: v1
kind: PersistentVolume
metadata:
  name: data-tier-volume
spec:
  capacity:
    storage: 1Gi # 1 gibibyte
  accessModes:
    - ReadWriteOnce
  awsElasticBlockStore:
    volumeID: INSERT_VOLUME_ID # replace with actual ID
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: data-tier-volume-claim
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 128Mi # 128 mebibytes
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
        volumeMounts:
          - mountPath: /data
            name: data-tier-volume
      # The PVC will find PV that satisfies the conditions in the PVC file
      # Then the access mode of PVC will become the only option of access mode of that PV
      # The PV will be bound to the PVC
      volumes:
        # This name is the PV name in the cluster
      - name: data-tier-volume
        # If you don't want to use persisten volume
        # Replace it with emptyDir of other ephemeral storage
        persistentVolumeClaim:
          claimName: data-tier-volume-claim
```
- The app-tier and support-tier is the same as the previous files

## Commands
- Connect into containers in the pod (may need to specify `-c` if have multiple containers)
```bash
kubectl -n deployments exec -it <pod_name> -- /bin/bash
```

## References
