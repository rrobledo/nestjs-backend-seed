# notification-service

Notification Service (Email, SMS)

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm start
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov

# lint
$ npm run lint

# test for debug
$ npm run test:debug
```

## Check Stype

```bash
# checking codding style
$ npm run lint
```

## API Usage uses cases

# Adding items

```
POST /items HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 5ef6cb56-56cc-6df6-26f5-8efb80595eb6

{
  "id" : "1",
  "type": "PERSON",
  "firstName" : "Raul",
  "lastName" : "Robledo",
  "address": "M2 L4 Cuatro Hojas"
}
```