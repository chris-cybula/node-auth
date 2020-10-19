# Node.js Authentication

## Overview

Created as a starter for a project. It allows you to create an account, sign in to an example app, reset forgotten password, change your name, email and password as well as delete an account.

## Tools

### Client

- React
- Redux
- Gatsby
- Styled Components

### Server

- Node
- Express
- JWT
- Joi
- Bcrypt
- Nodemailer

### Database

- MongoDB
- Mongoose	

## Features

- validation
- user authentication
- password hashing
- user authorization
- generating and verifying JWT
- storing JWT in HttpOnly cookies
- sending email with generated password
- updating user details
- deleting an account from db

## Setup

### Environment variables (create .env file in root dir)

```
DB_CONNECTION = your connection string 
TOKEN_SECRET = your token secret

MAIL = your email address
PASSWORD = your email password
```

### Client (in /client dir)

```
npm i
```
```
npm run start
```

### Server (in root dir)
```
npm i
```
```
npm i @hapi/joi (if needed)
```
```
npm run start
```

## Preview

## Login page

![App-Auth](https://user-images.githubusercontent.com/28848115/96506358-63bd5180-124f-11eb-9088-21c2c2839c2a.png)

## App

![App](https://user-images.githubusercontent.com/28848115/96506368-66b84200-124f-11eb-9d5c-91809cfc1a83.png)

## Settings page

![App-Settings](https://user-images.githubusercontent.com/28848115/96506373-68820580-124f-11eb-9177-61eab038125c.png)

