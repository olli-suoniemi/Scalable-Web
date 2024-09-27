### Building in hello-minikube-app folder

minikube image build -t hello-minikube-app -f ./Dockerfile .


### Deploying from the root

kubectl apply -f kubernetes/hello-minikube-app-deployment.yaml
kubectl apply -f kubernetes/hello-minikube-app-service.yaml

### Getting the url

minikube service hello-minikube-app-service --url


### Deleting the service and the deployment

kubectl delete -f kubernetes/hello-minikube-app-service.yaml

kubectl delete -f kubernetes/hello-minikube-app-deployment.yaml