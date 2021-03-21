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

kubectl get pvc www -o yaml
kubectl apply -f test.yaml service/nginx unchanged statefulset.apps/web configured

kubectl apply -f .\k8s\manifests\redis-volume.yaml
kubectl delete -f .\k8s\manifests\redis-volume.yaml
kubectl get pv redis-vol-redis-0
kubectl get pv redis-vol-redis-0 -o yaml

kubectl.exe apply -f .\pv-volume.yaml
kubectl get pv redis-vol
kubectl.exe apply -f .\pv-claim.yaml
kubectl get pv redis-vol
kubectl get pvc redis-claim
kubectl apply -f https://k8s.io/examples/pods/storage/pv-pod.yaml
kubectl get pod task-pv-pod
kubectl exec -it task-pv-pod -- /bin/bash
kubectl delete pod task-pv-pod
kubectl delete pvc redis-claim
kubectl delete pv redis-vol
```
