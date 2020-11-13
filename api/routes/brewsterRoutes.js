'use strict';
module.exports = function(app) {
  let brewster = require('../controllers/brewsterController');

  // brewster Routes
  app.route('/startProduction')
    .get(brewster.startProduction);

  app.route('/stopProduction')
    .post(brewster.stopProduction);

  // app.route('/tasks/:taskId')
  //   .get(brewster.read_a_task)
  //   .put(brewster.update_a_task)
  //   .delete(brewster.delete_a_task);
};