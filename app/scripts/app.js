define(function(require) {

  var _ = require('lodash');
  var Backbone = require('backbone');

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: "/"
  };

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

  // Mix Backbone.Events into the app object.
  return _.extend(app, {
    
    // A way to register modules for application-wide events.
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
