# shorturls

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

1. Install MongoDB

    via Homebrew
    ```shell
    brew tap mongodb/brew
    brew install mongodb-community@4.2
    ```

    or from [mongodb.com](https://docs.mongodb.com/manual/administration/install-community/)

1. Install Node.js

    via Homebrew
    ```shell
    brew install node
    ```

    or from [nodejs.org](https://nodejs.org/en/)

1. Install dependencies

    ```shell
    npm install
    ```

1. Start MongoDB in the background

    ```shell
    brew services start mongodb-community@4.2
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

This app is dockerized, so you can easily deploy it to a server of your choice.

## Development

See [Issues](https://github.com/cesarferradas/shorturls/issues) for outstanding work, and feel free to submit your own.
