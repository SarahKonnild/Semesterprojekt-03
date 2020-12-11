const router = require('express').Router();
const opcua = require('../controllers/opcuaController.js');
const optimization = require('../controllers/optimizationController')

//OPC UA Controller
/**
 * @author Simon Quvang
 * 
 * The POST method to start a production
 * 
 * The route "/startProduction" defines the path for starting a production
 * See "controllers/opcuaController.js" under "startProduction" for a further description
*/
router.route('/startProduction').post(opcua.startProduction);

/**
 * @author Simon Quvang
 * 
 * The GET method to stop a production
 * 
 * The route "/stopProduction" defines the path for stopping a production
 * See "controllers/opcuaController.js" under "stopProduction" for a further description
*/
router.route('/stopProduction').get(opcua.stopProduction); 

/**
 * @author Simon Quvang
 * 
 * The GET method to reset the machine state to idle and ready for production
 * 
 * The route "/resetProduction" defines the path for resetting the machine state
 * See "controllers/opcuaController.js" under "resetProduction" for a further description
*/
router.route('/resetProduction').get(opcua.resetProduction);

/**
 * @author Simon Quvang
 * 
 * The GET method to access the current state of the Machine
 * See under "Public/dashboard.html" to see it in action
 * 
 * The route "/machineStatus" defines the path for seeing the current state of the Machine
 * See "controllers/opcuaController.js" under "machineStatus" for a further description
*/ 
router.route('/machineStatus').get(opcua.getCurrentStatePublic);

/**
 * @author Simon Quvang
 * 
 * The GET method to see the current Maintenance status in the machine
 * See under "Public/dashboard.html" to see it in action
 * 
 * The route "/detectMaintenanceStatus" defines the path to view the current Maintenance status in the machine
 * See "controllers/opcuaController.js" under "detectMaintenanceStatus" for a further description
*/ 
router.route('/detectMaintenanceStatus').get(opcua.detectMaintenanceStatus);

/**
 * @author Simon Quvang
 * 
 * The GET method to see if the production is finished or not
 * See under "Public/dashboard.html" to see it in action
 * 
 * The route "/getProductionCount" defines the path to get the count of the produced products, if the production is done, and the machine hasnt been reset
 * See "controllers/opcuaController.js" under "getProductionCount" for a further description
*/ 
router.route('/getProductionCount').get(opcua.getProductionCount);

/**
 * @author Simon Quvang
 * 
 * The GET method to access the machine status to get all the need values to be displayed when a production is started
 * See under "Public/dashboard.html" to see it in action
 * 
 * The route "/getSubValues" defines the path for seeing the actual values for the production (same data as UaExpert)
 * See "controllers/opcuaController.js" under "getSubValues" for a further description
*/
router.route('/getSubValues').get(opcua.getSubValues);

//Optimization Controller
/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the error speed
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculateErrorSpeed" defines the path
 * See "controllers/optimizationController.js" under "calculateErrorSpeed" for a further description
*/
router.route('/calculateErrorSpeed').post(optimization.calculateErrorSpeed);

/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the error margin
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculateErrorMargin" defines the path
 * See "controllers/optimizationController.js" under "calculateErrorMargin" for a further description
*/
router.route('/calculateErrorMargin').post(optimization.calculateErrorMargin);

/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the valid margin
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculateValidMargin" defines the path
 * See "controllers/optimizationController.js" under "calculateValidMargin" for a further description
*/
router.route('/calculateValidMargin').post(optimization.calculateValidMargin);

/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the valid speed
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculateValidSpeed" defines the path
 * See "controllers/optimizationController.js" under "calculateValidSpeed" for a further description
*/
router.route('/calculateValidSpeed').post(optimization.calculateValidSpeed);

/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the error percentage of total batch size
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculatePercentageBeers" defines the path
 * See "controllers/optimizationController.js" under "calculatePercentageBeers" for a further description
*/
router.route('/calculatePercentageBeers').post(optimization.calculatePercentageBeers);

/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the amount of errors based on percentage of batch size
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculateAmountOfBeers" defines the path
 * See "controllers/optimizationController.js" under "calculateAmountOfBeers" for a further description
*/
router.route('/calculateAmountOfBeers').post(optimization.calculateAmountOfBeers);

/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the estimated production time
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculateEstimatedProductionTime" defines the path
 * See "controllers/optimizationController.js" under "calculateEstimatedProductionTime" for a further description
*/
router.route('/calculateEstimatedProductionTime').post(optimization.calculateEstimatedProductionTime);

/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the optimal speed using errors
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculateOptimalSpeedUsingErrors" defines the path
 * See "controllers/optimizationController.js" under "calculateOptimalSpeedUsingErrors" for a further description
*/
router.route('/calculateOptimalSpeedUsingErrors').post(optimization.calculateOptimalSpeedUsingErrors);

/**
 * @author Sarah Manon Pradel
 * 
 * The POST method to calculate the optimal speed using valids
 * See under "Public/production.html" to see it in action
 * 
 * The route "/calculateOptimalSpeedUsingValids" defines the path
 * See "controllers/optimizationController.js" under "calculateOptimalSpeedUsingValids" for a further description
*/
router.route('/calculateOptimalSpeedUsingValids').post(optimization.calculateOptimalSpeedUsingValids);

module.exports = router;

