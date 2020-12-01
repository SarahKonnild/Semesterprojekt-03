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
        const _id = req.body._id;
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const beerType = req.body.beerType;
        const batchSize= req.body.batchSize;
        const defects = req.body.defects;
        const productionSpeed = req.body.productionSpeed;
        const temp = req.body.temp;
        const humidity = req.body.humidity;
        const vibration = req.body.vibration;


        const newBatch = new Batches({
            _id,
            startTime,
            endTime,
            beerType,
            batchSize,
            defects,
            productionSpeed,
            temp,
            humidity,
            vibration
        })

        newBatch.save()
        .then(() => res.json('Batch added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//Update Batch by id
router.route('/update/:id').post((req, res) => {
    Batches.findById(req.params.id)
    .then(batch => {
        batch._id = req.body._id;
        batch.startTime = req.body.startTime;
        batch.endTime = req.body.endTime;
        batch.beerType = req.body.beerType;
        batch.batchSize = req.body.batchSize;
        batch.defects = req.body.defects;
        batch.productionSpeed = req.body.productionSpeed;
        batch.temp = req.body.temp;
        batch.humidity = req.body.humidity;
        batch.vibration = req.body.vibration;

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