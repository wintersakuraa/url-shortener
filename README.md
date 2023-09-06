# URL Shortener

## Description

I think we can all agree that there aren't enough URL shorteners in the world, so the goal of this assignment is to create a URL shortener service prototype. Now, let's describe what we're looking for in this assignment, we have two parts to it: the prototype part where you actually will write some code, and the "what if" part where you would just explain how you'd tackle this at scale.

## Local Setup

```bash
# install packages
$ pnpm install

# add env variable
$ mv .env.example .env

# run docker containers with postgres db and redis
$ docker compose up -d
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Apply migrations

```bash
$ pnpm run migration:run
```
