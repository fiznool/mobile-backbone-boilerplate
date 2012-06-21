define(function(require) {

  var Backbone = require('backbone');
  var ButtonTest = require('modules/button-test/main');
  var ListExample = require('modules/list-example/main');
  var DetailExample = require('modules/detail-example/main');

 // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "!/animals": "list",
      "!/animals/:id": "detail",
      "!/button": "button",
      "*actions": "list"
    },

    'button': function() {
      this.changeView(new ButtonTest.Views.Main());
    },

    'list': function() {
      this.changeView(new ListExample.Views.Main());
    },

    'detail': function(id) {
      this.changeView(new DetailExample.Views.Main({
        model: new DetailExample.Model({ id: id })
      }));
    }

  });

  return Router;

});
