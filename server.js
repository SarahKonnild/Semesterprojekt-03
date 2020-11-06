var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./api/models/todoListModel'), //created model loading here
  bodyParser = require('body-parser');

//Til Java
var net = require('net');
var client = net.connect(8000, 'localhost');
client.setEncoding('utf8');
setInterval(function() {
console.log("Writing....")
var ret = client.write('Hello from node.js\n');
console.log("Wrote", ret)
}, 1000);

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });


var routes = require('./api/routes/brewsterRoutes.js'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);