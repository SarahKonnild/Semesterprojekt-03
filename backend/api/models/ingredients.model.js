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