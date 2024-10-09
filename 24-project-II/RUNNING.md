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

## Running Instructions for Development Environment with Docker

Navigate to the `qa-api` directory. Edit the `questionsService.js`, uncomment line

```bash
import { postgres } from "../deps.js";
const sql = postgres({});
```

and comment out line

```bash
import { sql } from "../util/database.js";
```

Edit the `database.js` and comment out everything in the file.

<br>

Navigate to the `qa-ui` directory and install dependencies:

```bash
npm i
```
<br>

Edit the `astro.config.mjs`, comment out line

```bash
import node from "@astrojs/node"; 
```

and

```bash
adapter: node({ mode: 'standalone' })
```


Edit the `Course.svelte`, comment out line

```bash
let wsUrl = `wss://local.production/ws?course=${courseId}`;
```

and uncomment line

```bash
let wsUrl = `ws://localhost:7788/ws?course=${courseId}`;
```

<br>

Edit the `Question.svelte`, comment out line 

```bash
let wsUrl = `wss://local.production/ws?question=${questionId}`;
```

and uncomment line

```bash
let wsUrl = `ws://localhost:7788/ws?question=${questionId}`;
```

<br>

From the root directory of the project, start the services:

```bash
docker compose up --build
```

<br>

Subsequent runs can be executed with:

```bash
docker compose up
```

## Running Instructions for Production Environment with Docker

Navigate to the `qa-api` directory. Edit the `questionsService.js`, uncomment line

```bash
import { postgres } from "../deps.js";
const sql = postgres({});
```

and comment out line

```bash
import { sql } from "../util/database.js";
```

Edit the `database.js` and comment out everything in the file.

<br>

Navigate to the `qa-ui` directory and install dependencies:

```bash
npm i
```
<br>

Edit the `astro.config.mjs`, uncomment line

```bash
import node from "@astrojs/node"; 
```

and

```bash
adapter: node({ mode: 'standalone' })
```


Edit the `Course.svelte`, comment out line

```bash
let wsUrl = `wss://local.production/ws?course=${courseId}`;
```

and uncomment line

```bash
let wsUrl = `ws://localhost:7788/ws?course=${courseId}`;
```

<br>

Edit the `Question.svelte`, comment out line 

```bash
let wsUrl = `wss://local.production/ws?question=${questionId}`;
```

and uncomment line

```bash
let wsUrl = `ws://localhost:7788/ws?question=${questionId}`;
```


<br>

From the root directory of the project, launch the application:

```bash
docker compose -f docker-compose.prod.yml up --build
```
<br>

Subsequent runs can be executed with:

```bash
docker compose -f docker-compose.prod.yml up
```

<br>

## Running Instructions for Flyway Migrations and Database Admin

From the root directory of the project, run the project with the migrate profile and the pgadmin profile:

```bash
docker compose --profile migrate --profile pgadmin up
```

<br>

## Debugging and troubleshooting

Clear cache:

```bash
sudo npm cache clean --force

sudo rm -rf node_modules package-lock.json

npm install
```

<br>

Clear docker containers and build app:

```bash
docker system prune -a

docker compose up --build
```

<br>

If app is not available at localhost:7800.

```bash
docker ps

docker exec -it 24-project-ii-qa-ui-1 /bin/sh

netstat -tuln
```

Check that there is local address 0.0.0.0:3000. If not, or it is something else (like 0.0.0.0:4321) then change the server qa-ui:3000 in nginx.prod.conf to server qa-ui:4321 and restart the production build.

<br>

Database querying

```bash
docker ps

docker exec database-server... -it /bin/sh

psql

\dt
```

## Running Instructions for Production Environment with Kubernetes

### Starting up and setting configurations

Starting Minikube

```bash
minikube start --cpus 4 --memory 8192
```

<br>

Enable Ingress addon

```bash
minikube addons enable ingress
```

<br>

Enable Clounative postgress addon

```bash
kubectl apply -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/release-1.19/releases/cnpg-1.19.1.yaml
```

<br>

Enable metrics-server addon

```bash
kubectl apply -f kubernetes/components.yaml
```

<br>

Listing all addons

```bash
minikube addons list
```

Verify that `ingress` is enabled  

<br>

Get pods

```bash
kubectl get pods -n kube-system
```

Verify that `metrics-server` is running

<br>


Create `production` namespace

```bash
kubectl create namespace production
```

<br>

Get minikube IP and set it to the hosts file

```bash
minikube ip
```

<br>

Add new host `local.production` specifying it with the minikube IP. In Linux/Mac the hosts file is in `/etc/hosts`

### Modify files:

Navigate to the `qa-api` directory. Edit the `questionsService.js`, comment out lines

```bash
import { postgres } from "../deps.js";
const sql = postgres({});
```

and uncomment line

```bash
import { sql } from "../util/database.js";
```

Edit the `database.js` and uncomment everything in the file.

<br>

Navigate to the `qa-ui` directory

Edit the `astro.config.mjs`, uncomment line

```bash
import node from "@astrojs/node"; 
```

and

```bash
adapter: node({ mode: 'standalone' })
```


Edit the `Course.svelte`, uncomment line

```bash
let wsUrl = `wss://local.production/ws?course=${courseId}`;
```

and comment out line

```bash
let wsUrl = `ws://localhost:7788/ws?course=${courseId}`;
```

<br>

Edit the `Question.svelte`, uncomment line 

```bash
let wsUrl = `wss://local.production/ws?question=${questionId}`;
```

and comment out line

```bash
let wsUrl = `ws://localhost:7788/ws?question=${questionId}`;
```

### Building images:

Build image in flyway folder

```bash
cd flyway

minikube image build -t database-migrations -f ./Dockerfile .

cd ..
```

<br>

Build image  in qa-api folder

```bash
cd qa-api

minikube image build -t qa-api -f ./Dockerfile.kubernetes.prod .

cd ..
```

<br>

Build image in llm-api folder

```bash
cd llm-api

minikube image build -t llm-api -f ./Dockerfile .

cd ..
```

<br>

Build image in qa-ui folder

```bash
cd qa-ui

minikube image build -t qa-ui -f ./Dockerfile.kubernetes.prod .

cd ..
```

<br>

Build image in websocket folder

```bash
cd websocket

minikube image build -t websocket -f ./Dockerfile.kubernetes.prod .

cd ..
```

### Deploying

Apply database-cluster 

```bash
kubectl apply -f kubernetes/database-cluster.yaml
```

<br>

Get clusters

```bash
kubectl get cluster -n production --watch
```

Wait for the database-cluster to be in status `Cluster in healthy state`

<br>

Check database-cluster status

```bash
kubectl cnpg status database-cluster -n production
```

<br>


Apply database-migration

```bash
kubectl apply -f kubernetes/database-migration-job.yaml
```

<br>


Get production pods

```bash
kubectl get pods -n production --watch
```

Wait for the database-migration to be in status `Completed`

<br>


Check psql is accessible in database-cluster

```bash
kubectl cnpg psql database-cluster -n production

\c app

\dt

\q
```

<br>

Apply redis

```bash
kubectl apply -f kubernetes/redis-deployment.yaml
kubectl apply -f kubernetes/redis-service.yaml
```

<br>

Apply llm-api

```bash
kubectl apply -f kubernetes/llm-api-deployment.yaml
kubectl apply -f kubernetes/llm-api-service.yaml
```

<br>

Apply qa-api

```bash
kubectl apply -f kubernetes/qa-api-app.yaml
```

<br>

Apply qa-ui

```bash
kubectl apply -f kubernetes/qa-ui-deployment.yaml
kubectl apply -f kubernetes/qa-ui-service.yaml
```

<br>

Apply websocket

```bash
kubectl apply -f kubernetes/websocket-deployment.yaml
kubectl apply -f kubernetes/websocket-service.yaml
```

<br>

Apply Ingress

```bash
kubectl apply -f kubernetes/ingress.yaml
```

<br>

Get all in `production` namespace

```bash
kubectl get all -n production
```

<br>

Access app in `http://local.production/`

### Redeployment

```bash
kubectl rollout restart deployment/websocket-deployment -n production
kubectl rollout restart deployment/qa-api-deployment -n production
kubectl rollout restart deployment/qa-ui-deployment -n production
```

### Get logs

```bash
kubectl logs <id> -n production
```

### Deleting everything

```bash
minikube delete --all
```

### Deleting single deployments/services

```bash
kubectl delete -f kubernetes/components.yaml
kubectl delete -f kubernetes/database-cluster.yaml
kubectl delete -f kubernetes/database-migration-job.yaml
kubectl delete -f kubernetes/ingress.yaml
kubectl delete -f kubernetes/llm-api-deployment.yaml
kubectl delete -f kubernetes/llm-api-service.yaml
kubectl delete -f kubernetes/production-namespace.yaml
kubectl delete -f kubernetes/qa-api-app.yaml
kubectl delete -f kubernetes/qa-ui-deployment.yaml
kubectl delete -f kubernetes/qa-ui-service.yaml
kubectl delete -f kubernetes/redis-deployment.yaml
kubectl delete -f kubernetes/redis-service.yaml
kubectl delete -f kubernetes/websocket-deployment.yaml
kubectl delete -f kubernetes/websocket-service.yaml
```

## Adding Prometheus and Grafana to monitor application

Install `Helm` from [here](https://helm.sh/docs/intro/install/)

Add repos

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo update
```

Install chart

```bash
helm install prometheus prometheus-community/kube-prometheus-stack
```

Port-forward grafana deployment to port 3000

```bash
kubectl port-forward deployment/prometheus-grafana 3000
```

Access Grafana UI in `http://localhost:3000/`. Admin credentials are username:`admin` and password:`prom-operator`

<br>

Get pods

```bash
kubectl get pod
```

Port-forward prometheus deployment to port 9090

```bash
kubectl port-forward prometheus-prometheus-kube-prometheus-prometheus-0 9090
```

Access Prometheus UI in `http://localhost:9090/`.