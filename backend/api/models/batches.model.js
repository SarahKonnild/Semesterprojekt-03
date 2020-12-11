/**
 * @author Kasper Svane
 * 
 * The mongoose Schema for Batches to MongoDB
 * 
 * @param req batchNumber, beerType, batchSize, productionSpeed must be used in order to store data to the database
 * @param req Since the simulatation and the physical machine are connected to the application, acceptable and defects beers are not required
*/

const mongoose = require('mongoose');

//Importing Types for Schema 
const Int32 = require('mongoose-int32');

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