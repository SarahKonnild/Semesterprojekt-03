const router = require('express').Router();
let Counters = require('../models/counters.model');

/**
 * @author Kasper Svane
 * 
 * The GET method for all counters
 * 
 * The route "/" defines the path for accessing all the counters available in the database
 * 
 * If the counters are found then they will be displayed in JSON format
 * If can error occurred then a statuscode of 404 "Not Found" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/').get((req, res) => {
    Counters.find()
    .then(counters => res.json(counters))
    .catch(err => res.status(404).json('Error: ' + err));
})

/**
 * @author Kasper Svane
 * 
 * The GET method for a specific counter
 * 
 * The route "/:id" defines the path for accessing a specific counter available in the database
 * 
 * If the counter are found by its id then it will be displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/:id').get((req, res) => {
    Counters.findById(req.params.id)
    .then(counter => res.json(counter))
    .catch(err => res.status(400).json('Error: ' + err))   
})

/**
 * @author Kasper Svane
 * 
 * The POST method to add a counter to the database
 * 
 * The route "/add" defines the path for posting a specific counter available in the database
 * 
 * @req Defined from the counter.model.js _id, productionId and batchId are required
 * 
 * When the variables in newCounter are entered to be stored then newCounter.save() is called to save the data to the database
 * 
 * If the counter are added then the user will be prompted with 'Counter added' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
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

/**
 * @author Kasper Svane
 * 
 * The POST method to modify a specific counter in the database
 * 
 * The route "/update/:id" defines the path for accessing a specific counter by its id available to be modificed in the database
 * 
 * @req To modify a specific counter with a new id then all the variables _id, productionId, batchId, 
 * need to be entered to modify the wanted variable to be modified
 * 
 * When the variable in counter are entered to be stored then counter.save() is called to save the data to the database
 * 
 * If the counter are added then the user will be prompted with 'Counter updated' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
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

/**
 * @author Kasper Svane
 * 
 * The DELETE method for a specific counter
 * 
 * The route "/:id" defines the path for accessing a specific counter available in the database to delete
 * 
 * If the counter are found by its id then it will be displayed 'Counter Deleted' in JSON format 
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/:id').delete((req, res) => {
    Counters.findByIdAndDelete(req.params.id)
    .then(() => res.json('Counter Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;