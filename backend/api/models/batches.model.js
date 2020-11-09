const mongoose = require('mongoose');

//Importing Types for Schema 
const Int32 = require('mongoose-int32');
const Double = require('@mongoosejs/double');

const Schema = mongoose.Schema;

const batchesSchema = new Schema ({
    _id: {type: Int32, required: true},
    startTime: {type: String, required:true},
    endTime: {type: String, required:true},
    beerType: {type: String, required: true},
    batchSize: {type: Int32, required: true},
    defects: {type: Int32, required: true},
    productionSpeed: {type: Double, required: true},
    temp: {type: Double, required: true},
    humidity: {type: Double, required: true},
    vibration: {type: Double, required: true}
}, {
    timestamps: true,
});

const Batches = mongoose.model('Batches', batchesSchema);

module.exports = Batches;