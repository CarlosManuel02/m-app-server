<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

A simple NestJS API to Register Payments and The monthly spending of a user every month. The API is built using NestJS
and MySQL as the database.

## Installation

```bash
$ npm install
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

Work in progress

# CRUD Operations and Endpoints

## Users

The users endpoint is used to create, login, get, update and delete users. Also, there is and endpoint to Create an
account for a user.
The account is where the user will register the amount of money he/she has currently.

### Create User

```bash
POST /api/auth/new
```

body:

```json
{
  "username": "Test",
  "email": "test@example.com",
  "password": "12345678"
}
```

### Login User

```bash
POST /api/auth/
```

body:

```json
{
  "email": "carlos@example.com",
  "password": "12345678"
}
```

### Get User

```bash
GET /api/auth/:term
```

### Get all Users

```bash
GET /api/auth/all
```

### Update User

```bash
PATCH /api/auth/:id
```

body:

```json
{
  "username": "Carlos",
  "email": "carlos@example.com",
  "password": "12345678"
}
```

### Delete User

```bash
DELETE /api/auth/:id
```

### Create Account

```bash
POST api/auth/account
```

body:

```json
{
  "name": "Cask",
  "balance": 3234.00,
  "userId": "1"
}
```

## Categories

The categories are used to classify the payments that the user will register. The categories are created by the user and
can only be seen by the user that created them.

### Create Category

```bash
POST /api/categories/new
```

body:

```json
{
  "name": "Gifs",
  "currency": "USD",
  "userId": "0ec5693e-3ae6-49c6-b998-54029f279207"
}
```

### Get Category

```bash
GET /api/categories/:term
```

### Get all Categories

```bash
GET /api/categories/
```

### Update Category

```bash
PATCH /api/categories/:id
```

body:

```json
{
  "name": "Gifs",
  "currency": "USD",
  "userId": "0ec5693e-3ae6-49c6-b998-54029f279207"
}
```

### Delete Category

```bash
DELETE /api/categories/:id
```

## Transactions

The transactions are the payments that the user will register. The transactions can be either an income or an expense.
The transactions are created when the user registers a payment. The transactions can be seen by the user that created,
and will be displayed in the user's dashboard in a calendar.

### Create Transaction

```bash
POST /api/transactions/new
```
body:

```json
{
  "type": "income",
  "amount": 3000,
  "description": "Ejemplo de descripción",
  "date": "2023-09-26",
  "categoryId": "1",
  "accountId": "1",
  "userId": "1"
}
```

### Get Transaction

```bash
GET /api/transactions/:term
```

### Get all Transactions

```bash
GET /api/transactions/
```

### Update Transaction

```bash
PATCH /api/transactions/:id
```
body:

```json
{
  "type": "expense",
  "amount": 2000,
  "description": "Ejemplo de descripción",
  "date": "2023-09-26",
  "categoryId": "1",
  "accountId": "1",
  "userId": "1"
}
```

### Delete Transaction

```bash
DELETE /api/transactions/:id
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
