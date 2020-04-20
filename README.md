# shorturls

A URL shortening REST API.

## Setup

1. Install Docker

1. Run app:

    ```
    docker-compose up --build
    ```

### Docker

### Manual

1. Install MongoDB

    via Homebrew
    ```
    brew tap mongodb/brew
    brew install mongodb-community@4.2
    ```

    or follow the [instructions for your OS](https://docs.mongodb.com/manual/administration/install-community/)

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

1. Run MongoDB in the background

    ```
    brew services start mongodb-community@4.2
    ```

1. Start the server

    ```
    npm start
    ```

## Todo

- [ ] Database seeder
- [ ] Unit tests
- [ ] Dockerize
- [ ] Add Users and authentication
