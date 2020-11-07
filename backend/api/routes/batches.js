const router = require('express').Router();
let Batches = require('../models/batches.model');

//Get all Batches
router.get('/').get((req, res) => {
    Batches.find()
    .then(batches => res.json(batches))
    .catch(err => res.status(400).json('Error' + err));
});

module.exports = router;