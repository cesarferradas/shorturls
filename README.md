# shorturls

A URL shortening REST API.

## Install

### With Docker

1. Install [Docker](https://docs.docker.com/compose/install/)

1. Create an `.env` file in the project root, and edit the environment variables

    ```
    cp .example.env .env
    vim .env
    ```

1. Run app:

    ```
    docker-compose up --build
    ```

### Manually

1. Install MongoDB

    via Homebrew
    ```
    brew tap mongodb/brew
    brew install mongodb-community@4.2
    ```

    or from [mongodb.com](https://docs.mongodb.com/manual/administration/install-community/)

1. Install Node.js

    via Homebrew
    ```
    brew install node
    ```

    or from [nodejs.org](https://nodejs.org/en/)

1. Install dependencies

    ```
    npm install
    ```

1. Start MongoDB in the background

    ```
    brew services start mongodb-community@4.2
    ```

1. Create an `.env` file in the project root, and edit the environment variables

    ```
    cp .example.env .env
    vim .env
    ```

1. Export environment variables

    ```
    export $(cat .env | xargs)
    ```

1. Start the server

    ```
    npm start
    ```

## Linting

We use [ESLint](https://www.npmjs.com/package/eslint) with the Airbnb Style
Guide. ESLint is configured to run automatically as a pre-commit hook.

You can also run linting manually with:

```
npm run lint
```

## Testing

...coming soon

## Deployment

This app is dockerized, so you can easily deploy it to a server of your choice.

## Todo

See Issues for outstanding work, and feel free to submit your own.
