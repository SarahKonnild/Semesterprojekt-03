'use strict';
module.exports = function(app) {
  let brewster = require('../controllers/brewsterController');

  // brewster Routes
  app.route('/startProduction')
    .get(brewster.startProduction);

  app.route('/stopProduction')
    .post(brewster.stopProduction);

  app.route('/detectMaintenanceStatus')
    .get(brewster.detectMaintenanceStatus);

  app.route('/calculateErrorSpeed')
    .get(brewster.calculateErrorSpeed);

  app.route('/cacluateErrorMargin')
    .get(brewster.cacluateErrorMargin);

  app.route('/calculateOptimalSpeed')
    .get(brewster.calculateOptimalSpeed);

  app.route('/detectedStatus')
      .get(brewster.detectedStatus);

  // app.route('/tasks/:taskId')
  //   .get(brewster.read_a_task)
  //   .put(brewster.update_a_task)
  //   .delete(brewster.delete_a_task);
};