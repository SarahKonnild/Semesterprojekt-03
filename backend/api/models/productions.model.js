const mongoose = require('mongoose');

//Importing Types for Schema 
const Int32 = require('mongoose-int32');
const Double = require('@mongoosejs/double');

const Schema = mongoose.Schema;

const ProductionsSchema = new Schema ({
    _id: {type: Int32, required: true},
    batchQueue: {type: [{
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
    }]},
}, {
    timestamps: true,
});

const Productions = mongoose.model('Productions', ProductionsSchema);

module.exports = Productions;