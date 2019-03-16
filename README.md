
# Project Title

API made for the IoT Simulator APP in order to get and receive different types of requests 

![databseModel](readmeImages/Mockup.jpg)

## Getting Started
Make sure you have installed:

* [Node](https://nodejs.org/en/) NodeJS
* [MongoDB](https://www.mongodb.com/download-center#community) Atlas or Community Server

### Prerequisites
* Run ```npm install``` 
* If you run locally run the mongodb first using the command ```mongod``` and 
make sure to use the right connection string ```mongoose.connect("mongodb://localhost/iot-simulator")```
* Create a file nodemon.json specifying environment variables as follows
```
{
 "env": {
    "MONGO_ATLAS_PW": "your_mongo_cluster_password",
    "JWT_KEY": "your_JWT_secret"
  }
}
```
* If you wish to prepopulate the database access the ```routes``` and check what routes a available
* Run ```nodemon index.js``` nodemon will watch for changes on your code

### Installing

Using git

```
 git clone https://gitlab.com/cristian.cernat97/iot-simulator-api
```
or download the zip file

## Testing and Middleware
...soon...

## Built With

* [Nodemon](https://github.com/remy/nodemon) Watcher
* [Mocha](https://mochajs.org/) Test Framework
* [Mongoose](https://mongoosejs.com) ODM
* [MongoDB](https://www.mongodb.com/download-center#community) NoSQL database
* [Node](https://nodejs.org/en/) NodeJS
* [PassportJS](http://www.passportjs.org/) Authentication library (multiple strategies)
* [JWT](https://jwt.io/) JSON Web Token
* [Multer](https://github.com/expressjs/multer) Multipart/form-data
* [Bcrypt](https://www.npmjs.com/package/bcrypt) Hashing algorithm for passwords
* [CORS](https://www.npmjs.com/package/cors) Cross Origin Resource Sharing middleware

## Contributing

Go ahead blame me for anything I am still learning 
## Versioning

Version 1.1.0

## Authors

* **Cristian Cernat** - (https://gitlab.com/cristian.cernat97)
