const router = require('express').Router();
const opcua = require('../controllers/opcuaController.js');
const optimization = require('../controllers/optimizationController')

//OPC UA Controller
//Start Production
router.route('/startProduction').post(opcua.startProduction);

//Stop Production
router.route('/stopProduction').get(opcua.stopProduction); 

//Reset Production
router.route('/resetProduction').get(opcua.resetProduction);

//Detect Maintenance Status
router.route('/detectMaintenanceStatus').get(opcua.detectMaintenanceStatus);

//Get the count of the produced products, if the production is done, and the machine hasnt been reset
router.route('/getProductionCount').get(opcua.getProductionCount);


//Optimization Controller
//Calculate Error Speed
router.route('/calculateErrorSpeed').get(optimization.calculateErrorSpeed);

//Calculate Error Margin
router.route('/calculateErrorMargin').get(optimization.calculateErrorMargin);

//Calculate Amount of Errors
router.route('/calculateAmountOfErrors').get(optimization.calculateAmountOfErrors);

//Calculate Estimated Production Time
router.route('/calculateEstimatedProductionTime').get(optimization.calculateEstimatedProductionTime);

//Calculate Optimal Speed
router.route('/calculateOptimalSpeed').get(optimization.calculateOptimalSpeed);

module.exports = router;

