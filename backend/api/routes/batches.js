const router = require('express').Router();
let Batches = require('../models/batches.model');

//Get all Batches
router.route('/').get((req, res) => {
    Batches.find()
    .then(batches => res.json(batches))
    .catch(err => res.status(404).json('Error: ' + err));
})

//Get Batch by id
router.route('/:id').get((req, res) => {
    Batches.findById(req.params.id)
    .then(batch => res.json(batch))
    .catch(err => res.status(400).json('Error: ' + err))   
})

//Create Batch
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

//Update Batch by id
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

//Delete batch by id
router.route('/:id').delete((req, res) => {
    Batches.findByIdAndDelete(req.params.id)
    .then(() => res.json('Batch Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;