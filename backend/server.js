/**
 * @author Kasper Svane
 * 
 * The entire server is setup from here
 * 
 * @req To start the MES System: 
 * @req 1. Open the terminal
 * @req 2. Write "cd backend" to access the backend folder
 * @req 3. Write "npm start", nodemon is implemented so if the server crashes then the server will automatically restart itself
 * @req 4. Open a Chrome browser for best use of the MES System and write "http://localhost:5000/" to access the MES System
 * @req 5. Enjoy
 * 
 * @description Set the server to listen to port 5000
 * @description Setup the configuration to MongoDB with a prompt to the user that the connection is connected
 * @description Implemented the required Middleware to work across different port (cors) and the API tool (Express)
 * @description Implemented the API Connections from the API folder
 * @description Setup the static files (HTML, CSS, JavaScript and images) to be served from the server
 * 
*/

//Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path')
require('typescript-require');

//Connection to DB Configuration
const config = require('./config/db');

//Connection to Express for API and Setting Port for 5000
const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Connection to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

//API Connection
const batchesRouter = require('./api/routes/batches');
const IngredientsRouter = require('./api/routes/ingredients');
const productionsRouter = require('./api/routes/productions');
const countersRouter = require('./api/routes/counters');
const brewsterRouter = require('./api/routes/brewster');

app.use('/batches', batchesRouter);
app.use('/ingredients', IngredientsRouter);
app.use('/productions', productionsRouter);
app.use('/counters', countersRouter);
app.use('/brewster', brewsterRouter);

//Static Files
app.use(express.static('Public'));
app.use('/css', express.static(__dirname + 'Public/CSS'));
app.use('/img', express.static(__dirname + 'Public/images'));
app.use('/js', express.static(__dirname + 'Public/JS'));


//HTML Files
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Public/dashboard.html')
})


//Setting server to listen to Port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});