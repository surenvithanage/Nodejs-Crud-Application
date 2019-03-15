//get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//parse requests
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const config = require('./config.js');

require('./product.routes.js')(app);

//Connecting to the database
mongoose.connect(config.url , { useNewUrlParser : true }).then( () => {
    console.log("Successfully Connected to the Database");
}).catch(err => {
    console.log("Could not connect to the database : err " + err);
    process.exit();
});

//default route
app.get('/',(req,res) => {
    res.json({ "message" : "Welcome to the test application" });
});

app.listen(config.serverport , () => {
    console.log("Server is listening on port 3000");
});