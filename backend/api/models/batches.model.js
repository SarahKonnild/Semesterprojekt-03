const mongoose = require('mongoose');

//Importing Types for Schema 
const Int32 = require('mongoose-int32');
const Double = require('@mongoosejs/double');

const Schema = mongoose.Schema;

const batchesSchema = new Schema ({
    batchNumber: {type: Int32, required: true},
    beerType: {type: Int32, required: true},
    batchSize: {type: Int32, required: true},
    acceptable: {type: Int32},
    defects: {type: Int32},
    productionSpeed: {type: Int32, required: true}
});

const Batches = mongoose.model('Batches', batchesSchema);

module.exports = Batches;