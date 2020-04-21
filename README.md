# shorturls

[![Build Status](https://travis-ci.org/cesarferradas/shorturls.svg?branch=master)](https://travis-ci.org/cesarferradas/shorturls)

A URL shortening REST API.

## Install

### With Docker

1. Install [Docker](https://docs.docker.com/compose/install/)

1. Create an `.env` file in the project root, and edit the environment variables

    ```shell
    cp .example.env .env
    vim .env
    ```

1. Run app:

    ```shell
    docker-compose up --build
    ```

### Manually

1. Install [Node.js](https://nodejs.org/en/)

1. Install dependencies

    ```shell
    npm install
    ```

1. Install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

1. Start MongoDB in the background

    ```shell
    mongod --config /usr/local/etc/mongod.conf --fork
    ```

1. Create admin account for authentication

    ```shell
    mongo
    ```

    ```
    > use admin
    switched to db admin
    > db.createUser({
          user: "monkey",
          pwd: "password",
          roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
      })
    ```

1. Create an `.env` file in the project root, and edit the environment variables

    ```shell
    cp .example.env .env
    vim .env
    ```

1. Export environment variables

    ```shell
    export $(cat .env | xargs)
    ```

1. Start the server

    ```shell
    npm start
    ```

## Linting

We use [ESLint](https://www.npmjs.com/package/eslint) with the Airbnb Style
Guide. ESLint is configured to run automatically as a pre-commit hook.

You can also run linting manually with:

```shell
npm run lint
```

## Testing

...coming soon

## Deployment

You can easily deploy this application to a server of your choice by using Docker.

Please **never use the `.example.env` environment variables in a production
environment**. The defaults are only for local development and are not secure.
Change the passwords and secrets to long, random strings.

## Development

See [Issues](https://github.com/cesarferradas/shorturls/issues) for outstanding work, and feel free to submit your own.
