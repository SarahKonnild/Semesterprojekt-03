const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./config/db');

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

app.use('/batches', batchesRouter);
app.use('/ingredients', IngredientsRouter);

//Welcome Message
app.get('/', (req, res) => res.send('Welcome to Group 2 API frontpage'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});