# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```bash
git clone https://github.com/olegeremenko/nodejs2022Q4-service
```

Checkout to `container` branch

```bash
git checkout container
```

## Installing NPM modules (to run tests locally)

```bash
npm install
```

## Server environment variables

Copy `.env.example` to `.env` and update the PORT value if needed.

Update Postgres parameters if needed.

## Running application

```bash
docker-compose up
```

Postgres and NodeJS containers is up and running on ports specified in .env.
You can open in your browser OpenAPI documentation by typing http://localhost:4000/api/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Scan docker container for vulnerabilities

You must login to Docker hub first:

```bash
docker login
```

To scan nest-server container run:

```bash
npm run scan
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
