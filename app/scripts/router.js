define(function(require) {

  var nav = require('core/navigator');
  var List = require('modules/list');
  var Detail = require('modules/detail');

 // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    initialize: function(options) {
      nav.init(options);
      this.on('all', options.onRoute);
    },
    
    routes: {
      "!/animals": "list",
      "!/animals/:id": "detail",
      "*actions": "list"
    },

    'list': function() {
      nav.changeView(new List());
    },

    'detail': function(id) {
      nav.changeView(new Detail({ id: id }));
    }

  });

  return Router;

});
