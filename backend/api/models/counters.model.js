/**
 * @author Kasper Svane
 * 
 * The mongoose Schema for Counters to MongoDB
 * 
 * @param req All the variables in the counter Schema are need to store data to the database
 * 
 * Timestamps is an extra feature when data is stored to the database to see when the data was stored to the database 
 * and when the current data was last modified
*/

const mongoose = require('mongoose');

const Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const countersSchema = new Schema ({
    _id: {type: String, required: true},
    productionId: {type: Int32, required: true},
    batchId : {type: Int32, required: true},
}, {
    timestamps: true,
});

const Counters = mongoose.model('Counters', countersSchema);

module.exports = Counters;