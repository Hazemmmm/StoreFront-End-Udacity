# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

### Prerequisites

You need the following modules and dependencies installed to run this project:

```bash
docker-compose   # To run the Postgres database on Docker
node 12          # To run the application
yarn             # For dependency management
```

### Installing

- yarn
  or
- npm i

### Setup environment

First, create a `.env` file with all the required environment variables:

# .env

NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=database_dev
DB_DATABASE_TEST=database_test
DB_USER=databaseuser
DB_PASS=password

BCRYPT_PASSWORD=your-secret-password
SALT_ROUNDS=10
TOKEN_SECRET=your-secret-token

```

Next, start the Postgres server and create DB:
- psql -U postgres

# Postgres shell
# This will list out all the databases
\l

# If "store" database is not present
create database store;

Next, you need to run the database migrations:
- dp-migrate up


then, run the application server

npm run start

#Message:
The application will run on <http://localhost:3000/>

# Use this command for testing purpose:
- npm run test
or
- npm run test1
```
