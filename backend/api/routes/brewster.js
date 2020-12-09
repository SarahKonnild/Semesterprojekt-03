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
router.route('/calculateErrorSpeed').post(optimization.calculateErrorSpeed);

//Calculate Error Margin
router.route('/calculateErrorMargin').post(optimization.calculateErrorMargin);

//Calculate Valid Margin
router.route('/calculateValidMargin').post(optimization.calculateValidMargin);

//Calculate Valid Speed
router.route('/calculateValidSpeed').post(optimization.calculateValidSpeed);

//Calculate Error Percentage of Total Batch Size
router.route('/calculatePercentageBeers').post(optimization.calculatePercentageBeers);

//Calculate Amount of Errors based on Percentage of Batch Size
router.route('/calculateAmountOfBeers').post(optimization.calculateAmountOfBeers);

//Calculate Estimated Production Time
router.route('/calculateEstimatedProductionTime').post(optimization.calculateEstimatedProductionTime);

//Calculate Optimal Speed Using Errors
router.route('/calculateOptimalSpeedUsingErrors').post(optimization.calculateOptimalSpeedUsingErrors);

//Calculate Optimal Speed Using Valids
router.route('/calculateOptimalSpeedUsingValids').post(optimization.calculateOptimalSpeedUsingValids);


module.exports = router;

