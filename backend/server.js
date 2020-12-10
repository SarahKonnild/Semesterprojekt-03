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

//Path for CSS

//Paths for HTML files
app.use(express.static("Public"));


//Setting server to listen to Port 5000
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});