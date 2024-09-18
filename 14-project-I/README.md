## Testing Instructions

If you're using VS Code, follow these steps to set up and run Playwright tests:

1. Install the **Playwright** extension from the VS Code Extensions Marketplace.
2. Once installed, open the Command Palette and type: `Install Playwright`.
3. After installation, you can run the Playwright tests using the VS Code extension by navigating to the **Tests** section in the left toolbar.

Alternatively, you can run the tests from the project root directory with the following command:

```bash
docker compose run --rm --entrypoint=npx e2e-playwright playwright test
```

Note: One of the tests may occasionally fail when run from the command line, but it consistently passes when executed via the VS Code Test Explorer.

<br>

## Running Instructions for Development Environment

1. Navigate to the `grader-image` directory and build the Docker image:

```bash
docker build -t grader-image .
```
<br>

2. Navigate to the `grader-api` directory and install dependencies:

```bash
npm i
```
<br>

3. Navigate to the `programming-ui` directory and install dependencies:

```bash
npm i
```
<br>

4. From the root directory of the project, start the services:

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

1. Navigate to the `grader-image` directory and build the Docker image:

```bash
docker build -t grader-image .
```
<br>

2. Navigate to the `grader-api` directory and install dependencies:

```bash
npm i
```
<br>

3. Navigate to the `programming-ui` directory and install dependencies:

```bash
npm i
```
<br>

4. From the root directory of the project, launch the application, creating it as a daemon:

```bash
docker compose -f docker-compose.prod.yml up -d
```

<br>

5. To stop the application:

```bash
docker compose down
```

Note: The 'All submissions' page doesn't work in production mode

<br>

## Running Instructions for Flyway Migrations and Database Admin

1. From the root directory of the project, run the project with the migrate profile and the pgadmin profile:

```bash
docker compose --profile migrate --profile pgadmin up
```