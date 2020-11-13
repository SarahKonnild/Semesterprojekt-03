const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Connection to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

//Connection to Java 
let net = require('net');
let client = net.connect(8000, 'localhost');
client.setEncoding('utf8');
setInterval(function() {
console.log("Writing....")
let ret = client.write('Hello from node.js\n');
console.log("Wrote", ret)
}, 1000);

//Java to Server API
let routes = require('./api/routes/brewsterRoutes.js'); //importing route
routes(app); //register the route

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});