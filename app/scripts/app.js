define(function(require) {

  var _ = require('lodash');
  var Backbone = require('backbone');

  // Convenience function for registering a method as an event
  var _registerWith = function(app, namespace, context) {
    return function(item, key) {
      if (_.isFunction(item)) {
        // Add an event listener on this function which
        // can be accessed via app.trigger() at any time
        app.on(namespace + ':' + key, function() {
          item.apply(context, arguments);
        });
      }
    };
        
  };

  return _.extend({

    publish: function(key) {

    },

    // A way to regiter modules for application-wide events.
    registerModule: function(namespace, module, context) {
      var that = this;

      if (!context) {
        context = module;
      }

      // Register each function in the module
      // as an event that can be called
      // via app.trigger() at a later date
      _.each(module, _registerWith(this, namespace, context));

    }

  }, Backbone.Events);

});
