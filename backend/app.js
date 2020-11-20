const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const io = require('socket.io');

const app = express();

//CORS Middleware
app.use(cors());

//BodyParser Middleware
app.use(bodyParser.json());

//Connection to MongoDB
// mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@sem03pg2.0eybl.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`).then(() => {
//   app.listen(3000);
// }).catch(err => {
//   console.log(err);
// })

//Til Java
app.listen(3000);
let routes = require('../api/routes/brewsterRoutes'); //importing route
routes(app); //register the route

