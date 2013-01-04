define(
  [
    "backbone.activities",
    "activities/animals"
  ],
  function(Backbone, Animals) {

    var activities = {
      'animals': new Animals()
    };

    var Router = Backbone.ActivityRouter.extend({
      activities: activities,
      responsive: true,
      defaultRoute: '!/animals'
    });

    return Router;

});