const router = require('express').Router();
let Batches = require('../models/batches.model');

/**
 * @author Kasper Svane
 * 
 * The GET method for all batches
 * 
 * The route "/" defines the path for accessing all the batches available in the database
 * 
 * If the batches are found then they will be displayed in JSON format
 * If can error occurred then a statuscode of 404 "Not Found" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/').get((req, res) => {
    Batches.find()
    .then(batches => res.json(batches))
    .catch(err => res.status(404).json('Error: ' + err));
})

/**
 * @author Kasper Svane
 * 
 * The GET method for a specific batch
 * 
 * The route "/:id" defines the path for accessing a specific batch available in the database
 * 
 * If the batch are found by its id then it will be displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/:id').get((req, res) => {
    Batches.findById(req.params.id)
    .then(batch => res.json(batch))
    .catch(err => res.status(400).json('Error: ' + err))   
})

/**
 * @author Kasper Svane
 * 
 * The POST method to add a batch to the database
 * 
 * The route "/add" defines the path for posting a specific batch available in the database
 * 
 * @req Defined from the batches.model.js batchNumber, beerType, batchSize and productionSpeed are required where acceptable and defects can be empty
 * 
 * When the variables in newBatch are entered to be stored then newBatch.save() is called to save the data to the database
 * 
 * If the batch are added then the user will be prompted with 'Batch added' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/add').post((req, res) => {
        const batchNumber = req.body.batchNumber;
        const beerType = req.body.beerType;
        const batchSize = req.body.batchSize;
        const acceptable = req.body.acceptable;
        const defects = req.body.defects;
        const productionSpeed = req.body.productionSpeed;

        const newBatch = new Batches({
            batchNumber,
            beerType,
            batchSize,
            acceptable,
            defects,
            productionSpeed
        })

        newBatch.save()
        .then(() => res.json('Batch added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

/**
 * @author Kasper Svane
 * 
 * The POST method to modify a specific batch in the database
 * 
 * The route "/update/:id" defines the path for accessing a specific batch by its id available to be modificed in the database
 * 
 * @req To modify a specific batch with a new id or batchSize then all the variables batchNumber, beerType, batchSize, 
 * acceptable, defects and productionSpeed need to be entered to modify the wanted variable to be modified
 * 
 * When the variable in batch are entered to be stored then newBatch.save() is called to save the data to the database
 * 
 * If the batch are added then the user will be prompted with 'Batch updated' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/update/:id').post((req, res) => {
    Batches.findById(req.params.id)
    .then(batch => {
        batch.batchNumber = req.body._id;
        batch.beerType = req.body.startTime;
        batch.batchSize = req.body.endTime;
        batch.acceptable = req.body.beerType;
        batch.defects = req.body.defects;
        batch.productionSpeed = req.body.productionSpeed;

        batch.save()
        .then(() => res.json('Batch updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

/**
 * @author Kasper Svane
 * 
 * The DELETE method for a specific batch
 * 
 * The route "/:id" defines the path for accessing a specific batch available in the database to delete
 * 
 * If the batch are found by its id then it will be displayed 'Batch Deleted' in JSON format 
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/:id').delete((req, res) => {
    Batches.findByIdAndDelete(req.params.id)
    .then(() => res.json('Batch Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;