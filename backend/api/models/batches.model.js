const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const batchesSchema = new Schema ({
    _id: {type: Number, required: true},
    startTime: {type: String, required:true},
    endTime: {type: String, required:true},
    beerType: {type: String, required: true},
    batchSize: {type: Number, required: true},
    defects: {type: Number, required: true},
    productionSpeed: {type: Number, required: true},
    temp: {type: Number, required: true},
    humidity: {type: Number, required: true},
    vibration: {type: Number, required: true}
}, {
    timestamps: true,
});

const Batches = mongoose.model('Batches', batchesSchema);

module.exports = Batches;