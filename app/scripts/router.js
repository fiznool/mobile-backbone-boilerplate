define(function(require) {

  require('plugins/backbone.activities');
  var Scaffold = require('scaffold');

  var AnimalsList = require('activities/animals-list');
  var AnimalsDetail = require('activities/animals-detail');

  var activities = {
    'list': new AnimalsList(),
    'detail': new AnimalsDetail()
  };

  var Router = Backbone.ActivityRouter.extend({
    activities: activities,
    defaultRoute: {
      'activity': activities.list,
      'activityName': 'list',
      'methodName': 'list'
    }
  });

  return Router;

});