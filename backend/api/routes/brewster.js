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

//Get machine status 
router.route('/machineStatus').get(opcua.getCurrentStatePublic);

//Detect Maintenance Status
router.route('/detectMaintenanceStatus').get(opcua.detectMaintenanceStatus);

//Get the count of the produced products, if the production is done, and the machine hasnt been reset
router.route('/getProductionCount').get(opcua.getProductionCount);

router.route('/getSubValues').get(opcua.getSubValues);

//Optimization Controller
//Calculate Error Speed
router.route('/calculateErrorSpeed').get(optimization.calculateErrorSpeed);

//Calculate Error Margin
router.route('/calculateErrorMargin').get(optimization.calculateErrorMargin);

//Calculate Valid Margin
router.route('/calculateValidMargin').get(optimization.calculateValidMargin);

//Calculate Valid Speed
router.route('/calculateValidSpeed').get(optimization.calculateValidSpeed);

//Calculate Error Percentage of Total Batch Size
router.route('/calculatePercentageBeers').get(optimization.calculatePercentageBeers);

//Calculate Amount of Errors based on Percentage of Batch Size
router.route('/calculateAmountOfBeers').get(optimization.calculateAmountOfBeers);

//Calculate Estimated Production Time
router.route('/calculateEstimatedProductionTime').get(optimization.calculateEstimatedProductionTime);

//Calculate Optimal Speed Using Errors
router.route('/calculateOptimalSpeedUsingErrors').get(optimization.calculateOptimalSpeedUsingErrors);

//Calculate Optimal Speed Using Valids
router.route('/calculateOptimalSpeedUsingValids').post(optimization.calculateOptimalSpeedUsingValids);


module.exports = router;

