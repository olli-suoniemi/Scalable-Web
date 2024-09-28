### Building within the flyway folder

minikube image build -t visit-counter-app-database-migrations -f ./Dockerfile .

### Building in visit-counter-app folder

minikube image build -t visit-counter-app -f ./Dockerfile .


### Deploying from the root

kubectl apply -f kubernetes/visit-counter-app-database-migration-job.yaml 
kubectl apply -f kubernetes/visit-counter-app-deployment.yaml
kubectl apply -f kubernetes/visit-counter-app-service.yaml
kubectl apply -f kubernetes/visit-counter-app-deployment-hpa.yaml 
kubectl apply -f kubernetes/visit-counter-app-database-cluster.yaml 


### Check status

kubectl cnpg status visit-counter-app-database-cluster

### Describing secrets

kubectl describe secret visit-counter-app-database-cluster-app

### PSQL

kubectl cnpg psql visit-counter-app-database-cluster

### Getting the url

minikube service visit-counter-app-service --url

### Get deployments

kubectl get deployments

### Get pods

kubectl get pods

### Get logs

kubectl logs 

### Deleting the service and the deployment

kubectl delete -f kubernetes/visit-counter-app-database-migration-job.yaml 
kubectl delete -f kubernetes/visit-counter-app-deployment.yaml
kubectl delete -f kubernetes/visit-counter-app-service.yaml
kubectl delete -f kubernetes/visit-counter-app-deployment-hpa.yaml 
kubectl delete -f kubernetes/visit-counter-app-database-cluster.yaml 