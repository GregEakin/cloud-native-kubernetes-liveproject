# Commands to Run for the Full Solution

This solution assumes you've properly set up your Docker and Minikube environments.

## Build Payment docker image

```
cd payments
docker build -t sns-payment:latest .
```

## Switch to the k8s directory that holds the manifests

```
cd ../k8s/manifests
kubectl apply -k .
```

## Check on Pod progress

```
kubectl -n sns get pods
```

Once all pods are in a Running status, you can proceed.

## Port Forward to the Payment service

```
kubectl -n sns port-forward svc/payment 3000:3000
```

This will say running in the foreground.

## Test the payment api

You can use the postman collection included in the `api/postman` directory or any other API client you'd like.

