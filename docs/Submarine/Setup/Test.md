# Test

Please make sure you have pods running in minikube.

## test-k8s
Forward port:
```
kubectl port-forward --address 0.0.0.0 service/submarine-database 3306:3306 &
kubectl port-forward --address 0.0.0.0 service/submarine-server 8080:8080 &
kubectl port-forward --address 0.0.0.0 service/submarine-minio-service 9000:9000 &
kubectl port-forward --address 0.0.0.0 service/submarine-mlflow-service 5001:5000 &
```
```
kubectl port-forward --address 0.0.0.0 service/submarine-traefik 8080:80
```
```
mvn verify -DskipRat -pl :submarine-test-k8s -Phadoop-2.9 -B
```

## e2e
```
mvn verify -DskipRat -pl :submarine-test-e2e -Phadoop-2.9 -B
```