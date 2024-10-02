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

next:

database optimization: https://fitech101.aalto.fi/designing-and-building-scalable-web-applications/dab-16-data-and-scalability/2-database-indexes/

kuberentes

monitoring

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


