const router = require('express').Router();
let Ingredients = require('../models/ingredients.model');

//Get all Ingredients
router.route('/').get((req, res) => {
    Ingredients.find()
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(404).json('Error: ' + err));
})

//Get Ingredient by id
router.route('/:id').get((req, res) => {
    Ingredients.findById(req.params.id)
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(400).json('Error: ' + err))   
})

//Create Ingredient
router.route('/add').post((req, res) => {
    const _id = req.body._id;
    const type = req.body.type;
    const stock = req.body.stock;
    const name = req.body.name;
    const ingredientId= req.body.ingredientId;
    
    const newIngredient = new Ingredients({
        _id,
        type,
        stock,
        name,
        ingredientId
    })

    newIngredient.save()
    .then(() => res.json('Ingredient added'))
    .catch(err => res.status(400).json('Error: ' + err));
})

//Update Ingredient by id
router.route('/update/:id').post((req, res) => {
    Ingredients.findById(req.params.id)
    .then(ingredient => {
        ingredient._id = req.body._id;
        ingredient.type = req.body.type;
        ingredient.stock = req.body.stock;
        ingredient.name = req.body.name;
        ingredient.ingredientId = req.body.ingredientId;

        ingredient.save()
        .then(() => res.json('Ingredient updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

//Delete Ingredient by id
router.route('/:id').delete((req, res) => {
    Ingredients.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ingredient Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;