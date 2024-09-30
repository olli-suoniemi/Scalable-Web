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

1. Navigate to the `qa-api` directory and install dependencies:

```bash
npm i
```
<br>

2. Navigate to the `qa-ui` directory and install dependencies:

```bash
npm i
```
<br>

3. From the root directory of the project, start the services:

```bash
docker compose up --build
```

Subsequent runs can be executed with:

```bash
docker compose up
```

#### Debugging tips

1. Clear cache:

```bash
sudo npm cache clean --force
sudo rm -rf node_modules package-lock.json
npm install
```

2. Clear docker containers and build app:

```bash
docker system prune -a
docker compose up --build
```

<br>

## Running Instructions for Production Environment

1. Navigate to the `qa-api` directory and install dependencies:

```bash
npm i
```
<br>

2. Navigate to the `qa-ui` directory and install dependencies:

```bash
npm i
```
<br>

3. From the root directory of the project, launch the application, creating it as a daemon:

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