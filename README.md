# URL Shortener

## Description

I think we can all agree that there aren't enough URL shorteners in the world, so the goal of this assignment is to create a URL shortener service prototype. Now, let's describe what we're looking for in this assignment, we have two parts to it: the prototype part where you actually will write some code, and the "what if" part where you would just explain how you'd tackle this at scale.

## Local Setup

```bash
# install packages
$ npm install

# add env variable
$ mv .env.example .env

# run docker containers with postgres db and redis
$ docker compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Apply migrations

```bash
$ npm run migration:run
```