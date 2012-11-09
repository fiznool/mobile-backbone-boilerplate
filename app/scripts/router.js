define(function(require) {

  var Scaffold = require('scaffold');

  var HelloActivity = Scaffold.Activity.extend({
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

  var Router = Scaffold.Router.extend({
    activities: activities,
    responsive: false,
    defaultRoute: {
      'activity': activities.hello,
      'activityName': 'hello',
      'methodName': 'hello'
    }
  });

  return Router;

});