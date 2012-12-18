define(
  [
    "backbone.activities",
    "scaffold"
  ],
  function(Backbone, Scaffold) {

    var HelloActivity = Backbone.Activity.extend({
      views: {
        Hello: Scaffold.View.extend({
          template: 'hello'
        })
      },
      hello: {
        onStart: function() {
          this.updateRegions({
            'main': [
              new this.views.Hello()
            ]
          });
        }
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
      defaultRoute: {
        'activityName': 'hello',
        'handlerName': 'hello'
      }
    });

    return Router;

});