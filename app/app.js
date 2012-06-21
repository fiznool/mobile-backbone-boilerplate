define(function(require) {

  var _ = require('underscore');
  var Backbone = require('backbone');

  // Keep active application instances namespaced under an app object.
  return _.extend({

    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    }

  // Mix Backbone.Events into the app object.
  }, Backbone.Events);

});
