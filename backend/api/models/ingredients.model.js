/**
 * @author Kasper Svane
 * 
 * The mongoose Schema for Ingredients to MongoDB
 * 
 * @param req All the variables in the ingredients Schema are need to store data to the database
 * 
 * Timestamps is an extra feature when data is stored to the database to see when the data was stored to the database 
 * and when the current data was last modified
*/

const mongoose = require('mongoose');

const Int32 = require('mongoose-int32');
const Double = require('@mongoosejs/double');

const Schema = mongoose.Schema;

const ingredientsSchema = new Schema ({
    _id: {type: Int32, required: true},
    type: {type: String, required: true},
    stock: {type: Double, required: true},
    name: {type: String, required: true},
    ingredientId: {type: Int32, required: true},
}, {
    timestamps: true,
});

const Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = Ingredients;