define(
  [
    "backbone.activities",
    "scaffold"
  ],
  function(Backbone, Scaffold) {

    var HelloView = Scaffold.View.extend({
      template: 'hello'
    });

    var HelloHandler = Backbone.ActivityRouteHandler.extend({
      onStart: function() {
        this.updateRegions({
          'main': [
            new HelloView()
          ]
        });
      }
    });

    var HelloActivity = Backbone.Activity.extend({
      handlers: {
        'hello': new HelloHandler()
      },

      routes: {
        '!/hello': 'hello'
      }
    });

    var activities = {
      'hello': new HelloActivity()
    };

    var Router = Backbone.ActivityRouter.extend({
      activities: activities,
      responsive: false,
      defaultRoute: '!/hello'
    });

    return Router;

});