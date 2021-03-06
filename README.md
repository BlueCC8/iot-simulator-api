# Project Title
## [![Build Status](https://travis-ci.com/BlueCC8/iot-simulator-ng.svg?token=wimezKrCqyRNdiZF2Tdi&branch=master)](https://travis-ci.com/BlueCC8/iot-simulator-api)  [![Known Vulnerabilities](https://snyk.io/test/github/BlueCC8/iot-simulator-api/badge.svg)](https://snyk.io/test/github/BlueCC8/iot-simulator-api)
API made for the IoT Simulator APP in order to get and receive different types of requests

![databseModel](readmeImages/Mockup.jpg)

## Getting Started

Make sure you have installed:

- [Node](https://nodejs.org/en/) NodeJS
- [MongoDB](https://www.mongodb.com/download-center#community) Atlas or Community Server

### Prerequisites

- Run `npm install`
- If you run locally run the mongodb first using the command `mongod` and
  make sure to use the right connection string `mongoose.connect("mongodb://localhost/iot-simulator")`
- Create a file in the root folder nodemon.json specifying environment variables as follows

```
{
 "env": {
    "MONGO_ATLAS_PW": "your_mongo_cluster_password",
    "JWT_KEY": "your_JWT_secret"
  }
}
```

- If you wish to populate the database access the `routes` and check what routes a available
- Run `nodemon index.js` nodemon will watch for changes on your code

### Installing

Using git

```
 git clone https://gitlab.com/cristian.cernat97/iot-simulator-api.git
```

or download the zip file

## Testing and Middleware

...soon...

## Tested with node version 10.17
### Issues that you might encounter:
- Sometimes JWT might create the same token for very old users that results in "Not authorised error" (Just delete the old users): fixes coming.

## Built With

- [Nodemon](https://github.com/remy/nodemon) Watcher
- [Mocha](https://mochajs.org/) Test Framework
- [Mongoose](https://mongoosejs.com) ODM
- [MongoDB](https://www.mongodb.com/download-center#community) NoSQL database
- [Node](https://nodejs.org/en/) NodeJS
- [PassportJS](http://www.passportjs.org/) Authentication library (multiple strategies)
- [JWT](https://jwt.io/) JSON Web Token
- [Multer](https://github.com/expressjs/multer) Multipart/form-data
- [Bcrypt](https://www.npmjs.com/package/bcrypt) Hashing algorithm for passwords
- [CORS](https://www.npmjs.com/package/cors) Cross Origin Resource Sharing middleware

## Contributing

Go ahead blame me for anything I am still learning

## Versioning

Version 2.1.0

## Authors

- **Cristian Cernat** - (https://gitlab.com/cristian.cernat97)
