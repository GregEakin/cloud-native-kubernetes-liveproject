```
minikube start -p sns --vm-driver hyperv --memory 4096 --cpus 2
minikube -p sns docker-env
& minikube -p sns docker-env | Invoke-Expression
kubectl -n sns port-forward svc/payment 3000:3000
minikube stop -p sns

docker build -t sns-payment:latest .


kubectl get secrets
kubectl describe secrets/redis-secrets -n sns
kubectl get secret redis-secrets -n sns -o yaml

kubectl logs payment-787d569d6b-mbwkh -n sns
kubectl describe pod -n sns
docker image prune
kubectl -n sns get pods -w

kubectl -n sns drain
kubectl -n sns get pods

minikube service kubia -n sns --url
kubectl get deployments
kubectl scale deployment -n sns payment --replicas=1
kubectl get po payment-cdd85c459-lpds2 -n sns -o yaml
kubectl uncordon redis-679646bfc5-fg58h
kubectl logs payment-cdd85c459-lpds2
kubectl drain payment

kubectl -n sns rollout restart deployment payment

minikube addons enable metrics-server
minikube addons enable metrics-server -n sns
minikube -p sns addons remove metrics-server
minikube addons list -p sns

minikube status
minikube -p sns status

kubectl -n sns describe nodes
kubectl version

kubectl -n sns exec payment-74576b486-b2lhf cat /sys/fs/cgroup/memory/memory.max_usage_in_bytes
kubectl apply -k .

kubectl api-resources --verbs=list --namespaced -o name
kubectl -n sns get pods -w

docker image prune
Set-ExecutionPolicy unrestricted

kubectl api-resources
kubectl get configmap sns-config -n sns -o yaml
```
