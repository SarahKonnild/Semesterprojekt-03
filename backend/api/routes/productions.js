const router = require('express').Router();
let Productions = require('../models/productions.model');

//Get all Productions
router.route('/').get((req, res) => {
    Productions.find()
    .then(productions => res.json(productions))
    .catch(err => res.status(404).json('Error: ' + err));
})

//Get Production by id
router.route('/:id').get((req, res) => {
    Productions.findById(req.params.id)
    .then(production => res.json(production))
    .catch(err => res.status(400).json('Error: ' + err))   
})

//Create Production
router.route('/add').post((req, res) => {
        const _id = req.body._id;
        const batchQueue = req.body.batchQueue
        const startTime = req.body.startTime;
        const endTime = req.body.endTime;
        const beerType = req.body.beerType;
        const batchSize= req.body.batchSize;
        const defects = req.body.defects;
        const productionSpeed = req.body.productionSpeed;
        const temp = req.body.temp;
        const humidity = req.body.humidity;
        const vibration = req.body.vibration;


        const newProduction = new Productions({
        _id,
        batchQueue, 
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
        

        newProduction.save()
        .then(() => res.json('Production added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

//Update Production by id
router.route('/update/:id').post((req, res) => {
    Productions.findById(req.params.id)
    .then(production => {
        production._id = req.body._id;
        production.batchQueue = req.body.batchQueue
        production._id = req.body._id;
        production.startTime = req.body.startTime;
        production.endTime = req.body.endTime;
        production.beerType = req.body.beerType;
        production.batchSize = req.body.batchSize;
        production.defects = req.body.defects;
        production.productionSpeed = req.body.productionSpeed;
        production.temp = req.body.temp;
        production.humidity = req.body.humidity;
        production.vibration = req.body.vibration;

        production.save()
        .then(() => res.json('Production updated'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
})

//Delete Production by id
router.route('/:id').delete((req, res) => {
    Productions.findByIdAndDelete(req.params.id)
    .then(() => res.json('Production Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;