const router = require('express').Router();
let Productions = require('../models/productions.model');

/**
 * @author Kasper Svane
 * 
 * The GET method for all productions
 * 
 * The route "/" defines the path for accessing all the productions available in the database
 * 
 * If the productions are found then they will be displayed in JSON format
 * If can error occurred then a statuscode of 404 "Not Found" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/').get((req, res) => {
    Productions.find()
    .then(productions => res.json(productions))
    .catch(err => res.status(404).json('Error: ' + err));
})

/**
 * @author Kasper Svane
 * 
 * The GET method for a specific production
 * 
 * The route "/:id" defines the path for accessing a specific production available in the database
 * 
 * If the production are found by its id then it will be displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/:id').get((req, res) => {
    Productions.findById(req.params.id)
    .then(production => res.json(production))
    .catch(err => res.status(400).json('Error: ' + err))   
})

/**
 * @author Kasper Svane
 * 
 * The POST method to add a production to the database
 * 
 * The route "/add" defines the path for posting a specific production available in the database
 * 
 * @req Defined from the productions.model.js all variables in the function are required
 * 
 * When the variables in newProduction are entered to be stored then newProduction.save() is called to save the data to the database
 * 
 * If the production are added then the user will be prompted with 'Production added' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/add').post((req, res) => {
        const _id = req.body._id;
        const batch = req.body.batch
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
        batch, 
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

/**
 * @author Kasper Svane
 * 
 * The POST method to modify a specific production in the database
 * 
 * The route "/update/:id" defines the path for accessing a specific production by its id available to be modificed in the database
 * 
 * @req To modify a specific production with a new id then all the variables from the function
 * need to be entered to modify the wanted variable to be modified
 * 
 * When the variable in production are entered to be stored then production.save() is called to save the data to the database
 * 
 * If the production are added then the user will be prompted with 'Production updated' displayed in JSON format
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/update/:id').post((req, res) => {
    Productions.findById(req.params.id)
    .then(production => {
        production._id = req.body._id;
        production.batch = req.body.batch
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

/**
 * @author Kasper Svane
 * 
 * The DELETE method for a specific production
 * 
 * The route "/:id" defines the path for accessing a specific production available in the database to delete
 * 
 * If the production are found by its id then it will be displayed 'Production Deleted' in JSON format 
 * If can error occurred then a statuscode of 400 "Bad Request" in JSON format with the error message will be prompted to the user
 * 
*/
router.route('/:id').delete((req, res) => {
    Productions.findByIdAndDelete(req.params.id)
    .then(() => res.json('Production Deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;