# Q&A project with LLM 

Contains an endpoint for a large language model (a small model with poor quality responses), an API endpoint for the QA platform, and an UI for the QA platform.

Starting the application up for the first time may take a while, as it also downloads the (small) large language model (approx. 250 megabytes) and packages it into an image.


## Testing Instructions

If you're using VS Code, follow these steps to set up and run Playwright tests:

1. Install the **Playwright** extension from the VS Code Extensions Marketplace.
2. Once installed, open the Command Palette and type: `Install Playwright`.
3. After installation, you can run the Playwright tests using the VS Code extension by navigating to the **Tests** section in the left toolbar.

Alternatively, you can run the tests from the project root directory with the following command:

```bash
docker compose run --rm --entrypoint=npx e2e-playwright playwright test
```

<br>

## Running Instructions for Development Environment

1. Navigate to the `qa-ui` directory and install dependencies:

```bash
npm i
```
<br>

2. From the root directory of the project, start the services:

```bash
docker compose up --build
```

Subsequent runs can be executed with:

```bash
docker compose up
```

## Running Instructions for Production Environment


1. Navigate to the `qa-ui` directory and install dependencies:

```bash
npm i
```
<br>

2. Uncomment the marked lines in qa-ui/astro.config.mjs

<br>

2. From the root directory of the project, launch the application, creating it as a daemon:

```bash
docker compose -f docker-compose.prod.yml up -d
```

<br>

4. To stop the application:

```bash
docker compose down
```

<br>

## Running Instructions for Flyway Migrations and Database Admin

1. From the root directory of the project, run the project with the migrate profile and the pgadmin profile:

```bash
docker compose --profile migrate --profile pgadmin up
```

#### Debugging,troubleshooting and database querying

- Clear cache:

```bash
sudo npm cache clean --force
sudo rm -rf node_modules package-lock.json
npm install
```

<br>

- Clear docker containers and build app:

```bash
docker system prune -a
docker compose up --build
```

<br>

- If app is not available at localhost:7800.

```bash
docker ps
```

```bash
docker exec -it 24-project-ii-qa-ui-1 /bin/sh
```

```bash
netstat -tuln
```

- Check that there is local address 0.0.0.0:3000. If not, or it is something else (like 0.0.0.0:4321) then change the server qa-ui:3000 in nginx.prod.conf to server qa-ui:4321 and restart the production build.

<br>

- Database querying

```bash
docker ps
```

```bash
docker exec database-server... -it /bin/sh
```

```bash
psql
```

```bash
\dt
```


## Kubernetes

minikube addons list

### Building images:

### in flyway folder

minikube image build -t database-migrations -f ./Dockerfile .

### in qa-api folder

minikube image build -t qa-api -f ./Dockerfile.prod .

### in llm-api folder

minikube image build -t llm-api -f ./Dockerfile .

### in qa-ui folder

minikube image build -t qa-ui -f ./Dockerfile.prod .

### in websocket folder

minikube image build -t websocket -f ./Dockerfile .

### Nginx and Redis

No need to build custom Docker images for them


### Deploying

minikube start --cpus 4 --memory 8192

kubectl create namespace production

kubectl delete events --all -n production


minikube addons enable ingress

kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.1.yaml

kubectl apply -f kubernetes/components.yaml

kubectl get pods -n kube-system


kubectl apply -f kubernetes/database-cluster.yaml

kubectl get cluster -n production

kubectl cnpg status database-cluster -n production

minikube image build -t database-migrations -f ./Dockerfile .

kubectl apply -f kubernetes/database-migration-job.yaml

kubectl get pods -n production --watch

kubectl describe pod database-cluster-1 -n production

kubectl cnpg psql database-cluster -n production

\c app

kubectl apply -f kubernetes/redis-deployment.yaml
kubectl apply -f kubernetes/redis-service.yaml

minikube image build -t llm-api -f ./Dockerfile .

kubectl apply -f kubernetes/llm-api-deployment-hpa.yaml
kubectl apply -f kubernetes/llm-api-deployment.yaml
kubectl apply -f kubernetes/llm-api-service.yaml

minikube image build -t qa-api -f ./Dockerfile.prod .

kubectl apply -f kubernetes/qa-api-app.yaml

minikube service qa-api-service --url -n production

minikube image build -t qa-ui -f ./Dockerfile.prod .

kubectl apply -f kubernetes/qa-ui-deployment.yaml
kubectl apply -f kubernetes/qa-ui-service.yaml

minikube image build -t websocket -f ./Dockerfile .

kubectl apply -f kubernetes/websocket-deployment.yaml
kubectl apply -f kubernetes/websocket-service.yaml

    
kubectl get all -n production

kubectl apply -f kubernetes/ingress.yaml

kubectl get ingress -n production --watch

### Redeploy

kubectl rollout restart deployment/qa-api-deployment -n production

kubectl rollout restart cluster/database-cluster -n production

kubectl rollout restart deployment ingress-nginx-controller -n ingress-nginx

kubectl delete deployment ingress-nginx-controller -n ingress-nginx
kubectl delete ingressclass nginx

### Get pods

kubectl get pods

kubectl get pods -n ingress-nginx

### Get logs

kubectl logs 

kubectl logs ingress-nginx-controller-6d498b67d9-6r58m -n ingress-nginx

### Describe pod

kubectl describe pod


### Deleting the service and the deployment

kubectl delete -f kubernetes/database-cluster.yaml
kubectl delete -f kubernetes/database-migration-job.yaml
kubectl delete -f kubernetes/redis-deployment.yaml
kubectl delete -f kubernetes/redis-service.yaml
kubectl delete -f kubernetes/llm-api-deployment-hpa.yaml
kubectl delete -f kubernetes/llm-api-deployment.yaml
kubectl delete -f kubernetes/llm-api-service.yaml
kubectl delete -f kubernetes/qa-api-app.yaml

kubectl delete -f kubernetes/qa-ui-deployment.yaml
kubectl delete -f kubernetes/qa-ui-service.yaml
kubectl delete -f kubernetes/websocket-deployment.yaml
kubectl delete -f kubernetes/websocket-service.yaml
kubectl delete -f kubernetes/nginx-app.yaml
kubectl delete -f kubernetes/nginx-ingress.yaml

### Get deployments

kubectl get deployments

### Delete deployment

kubectl delete deployment <name>

### Detele pod 

kubectl delete pod <name-id>

### Check status

kubectl cnpg status database-cluster

### Describing secrets

kubectl describe secret database-cluster-app

### PSQL

kubectl cnpg psql database-cluster

### Getting the url

minikube service nginx-app --url

monitoring