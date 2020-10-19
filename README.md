# Node.js Authentication

## Overview

Created as a starter for a project. It allows you to create an account, sign in to an example app, reset forgotten password, change your name, email and password as well as delete an account.

## Tools

### Client

-React
-Redux
-Gatsby
-Styled Components

### Server

-Node
-Express
-JWT
-Joi
-Bcrypt
-Nodemailer

### Database

-MongoDB
-Mongoose	

## Features

-validation
-user authentication
-password hashing
-user authorization
-generating and verifying JWT
-storing JWT in HttpOnly cookies
-sending email with generated password
-updating user details
-deleting an account from db

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


