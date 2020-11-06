const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();
const config = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Connection to MongoDB
mongoose.connect(config.db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

let db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});