const router = require('express').Router();
let Counters = require('../models/counters.model');

//Get all Counters
router.route('/').get((req, res) => {
    Counters.find()
    .then(counters => res.json(counters))
    .catch(err => res.status(404).json('Error: ' + err));
})

//Get Counter by id
router.route('/:id').get((req, res) => {
    Counters.findById(req.params.id)
    .then(counter => res.json(counter))
    .catch(err => res.status(400).json('Error: ' + err))   
})

//Create Counter
router.route('/add').post((req, res) => {
        const _id = req.body._id;
        const productionId = req.body.productionId;
        const batchId = req.body.batchId;
        
        const newCounter = new Counters({
            _id,
            productionId,
            batchId
        })

        newCounter.save()
        .then(() => res.json('Counter added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//Update Counter by id
router.route('/update/:id').post((req, res) => {
    Counters.findById(req.params.id)
    .then(counter => {
        counter._id = req.body._id;
        counter.productionId = req.body.productionId;
        counter.batchId = req.body.batchId;

        counter.save()
        .then(() => res.json('Counter updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

//Delete Counter by id
router.route('/:id').delete((req, res) => {
    Counters.findByIdAndDelete(req.params.id)
    .then(() => res.json('Counter Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;