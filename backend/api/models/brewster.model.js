'use strict';
var mongoose = require('mongoose');

/**
 * @author Simon Quvang
 * 
 * The mongoose Schema for brewster to MongoDB
 * 
 * Since the isn't stored any data to the database from the brewster API's, a mongoose Schema is not setup
 * but still needed in order to function correctly
*/

var Schema = mongoose.Schema;


module.exports = mongoose.model('Tasks', TaskSchema);