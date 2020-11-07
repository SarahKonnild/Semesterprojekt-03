const router = require('express').Router();
let Ingredients = require('../models/batches.model');

//Get all Ingredients
router.get('/').get((req, res) => {
    Ingredients.find()
    .then(ingredients => res.json(ingredients))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;