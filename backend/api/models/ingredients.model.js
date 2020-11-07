const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ingredientsSchema = new Schema ({
    name: {type: String, required:true},
    ingredientId: {type: Number, required:true},
    stock: {type: Number, required: true},
}, {
    timestamps: true,
});

const Ingredients = mongoose.model('Ingredients', ingredientsSchema);

module.exports = Ingredients;