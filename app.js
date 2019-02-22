const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes/routes');
const cors = require('cors');
const app = express();

mongoose.Promise = global.Promise
//node env environment variable if not in test 
//test is separated in test/test_helper
if (process.env.NODE_ENV !== 'test') {
    // * Connects to the remote databse
    mongoose.connect("mongodb+srv://airfor:qO4ZjiFpE63i464z@iot-simulator-og9ll.mongodb.net/api_iot?retryWrites=true", {
            useNewUrlParser: true
        })
        .then(() => {
            console.log('Remote connection successful')
        })
        .catch((err) => {
            console.error(err);
            // * Connects to localhost database
            mongoose.connect('mongodb://localhost:27017/iot-simulator', {
                    useNewUrlParser: true
                })
                .then(() => {
                    console.log('Local connection successful')
                })
                .catch((err) => console.error(err))
        })
}
app.use(express.json());
app.use(express.urlencoded({
    'extended': false
}));
//* Enhance app to allow requests coming from other applications (React/Angular), not only direct callers like Postman 
app.use(cors());
routes(app);

app.use((err, req, res, next) => {
    res.status(422).send({
        err: err.message,
    });
})

module.exports = app;