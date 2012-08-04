define(function(require) {

  var _ = require('underscore');
  var device = require('recognizr');
  var Backbone = require('backbone');

  // Set the classname on the root so that the CSS can be applied
  document.documentElement.className += ' ' + device.scroll;
  
  return _.extend({}, Backbone.Events);

});
