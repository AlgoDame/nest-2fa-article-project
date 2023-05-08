# NestJS Two-Factor Authentication Implementation

A demo project for my [dev.to article](https://dev.to/algodame/implementing-sms-enabled-two-factor-authentication-using-nestjs-twilio-and-prisma-52p). This project demonstrates how to implement two-factor authentication (2FA) in a NestJS project. The implementation covers sign up, login, authentication, using pipes for request validation, using guards to protect routes, and enabling/disabling 2FA.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project, you will need to have Node.js and npm installed on your machine. You can download them from the official websites:

- Node.js: https://nodejs.org
- npm: https://www.npmjs.com/get-npm
- Postgres: https://www.postgresql.org

### Installing

1. Clone this repository to your local machine:

```
git clone https://github.com/AlgoDame/nestjs-2fa-article-project.git
```

2. Install the dependencies:

```
npm install
```

### Configuration

Copy the `.env.example` file and create a new `.env` file:

```
cp .env.example .env
```

Update the `.env` file with your own environment variables.

### Running the application

To start the application, run the following command:

```
npm run start:dev
```

This will start the application in development mode. The application will be available at http://localhost:3000.

## Usage

The endpoints are available in this [Postman documentation](https://documenter.getpostman.com/view/15503893/2s93eYVsFF).

