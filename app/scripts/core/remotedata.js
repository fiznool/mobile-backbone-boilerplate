/**
 *
 */
define(function(require) {
  
  var app = require('app');

  var fetch = function() {

  };

  var load = function() {

  };

  var submit = function() {
    alert('submit');
  };

  var exports = {
    fetch: fetch,
    load: load,
    submit: submit
  };

  app.registerModule('data', exports);

  return exports;

});