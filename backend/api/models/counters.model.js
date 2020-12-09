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