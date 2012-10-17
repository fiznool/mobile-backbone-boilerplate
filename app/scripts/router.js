define(function(require) {

  var app = require('app');
  var layout = require('layout');

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    initialize: function(options) {
      // Initialise the router with the correct container.
      layout.init(options.container);
    },

    routes: {
      "": "index"
    },

    index: function() {
      layout.use('hello');
    }
  });

  return Router;

});
