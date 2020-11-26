
module.exports = function(app) {
  const opcua = require('../controllers/opcuaController.js');
  const optimization = require('../controllers/optimizationController')

  // All them http routes
  app.route('/startProduction')
    .get(opcua.startProduction);

  app.route('/stopProduction')
    .post(opcua.stopProduction);

  app.route('/detectMaintenanceStatus')
    .get(opcua.detectMaintenanceStatus);

  app.route('/calculateErrorSpeed')
    .get(optimization.calculateErrorSpeed);

  app.route('/cacluateErrorMargin')
    .get(optimization.cacluateErrorMargin);

  app.route('/calculateOptimalSpeed')
    .get(optimization.calculateOptimalSpeed);
};