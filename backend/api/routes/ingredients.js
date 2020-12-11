const router = require('express').Router();
let Ingredients = require('../models/ingredients.model');

/**
 * @author Kasper Svane
 * 
 * The GET method for all ingredients
 * 
 * The route "/" defines the path for accessing all the ingredients available in the database
 * 
 * If the ingredients are found then they will be displayed in JSON format
 * If can error occurred then a statuscode of 404 "Not Found" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/').get((req, res) => {
    Ingredients.find()
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(404).json('Error: ' + err));
})

/**
 * @author Kasper Svane
 * 
 * The GET method for a specific ingredient
 * 
 * The route "/:id" defines the path for accessing a specific ingredients available in the database
 * 
 * If the ingredients are found by its id then it will be displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/:id').get((req, res) => {
    Ingredients.findById(req.params.id)
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(400).json('Error: ' + err))   
})

/**
 * @author Kasper Svane
 * 
 * The POST method to add a ingredient to the database
 * 
 * The route "/add" defines the path for posting a specific ingredient available in the database
 * 
 * @req Defined from the ingredients.model.js _id, type, stock, name and ingredientId are required
 * 
 * When the variables in newingredient are entered to be stored then newingredient.save() is called to save the data to the database
 * 
 * If the ingredient are added then the user will be prompted with 'Ingredient added' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
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

/**
 * @author Kasper Svane
 * 
 * The POST method to modify a specific ingredient in the database
 * 
 * The route "/update/:id" defines the path for accessing a specific ingredient by its id available to be modificed in the database
 * 
 * @req To modify a specific ingredient with a new id then all the variables _id, type, stock, name and ingredientId
 * need to be entered to modify the wanted variable to be modified
 * 
 * When the variable in ingredient are entered to be stored then ingredient.save() is called to save the data to the database
 * 
 * If the ingredient are added then the user will be prompted with 'Ingredient updated' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
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

/**
 * @author Kasper Svane
 * 
 * The DELETE method for a specific ingredient
 * 
 * The route "/:id" defines the path for accessing a specific ingredient available in the database to delete
 * 
 * If the ingredient are found by its id then it will be displayed 'Ingredient Deleted' in JSON format 
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/:id').delete((req, res) => {
    Ingredients.findByIdAndDelete(req.params.id)
    .then(() => res.json('Ingredient Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;