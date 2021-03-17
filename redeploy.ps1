docker build -t sns-payment:latest .\payments --no-cache

# kubectl -n sns rollout restart deployment payment
kubectl delete -k ./k8s/manifests
kubectl apply -k ./k8s/manifests
kubectl -n sns get pods --watch
