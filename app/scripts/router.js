define(
  [
    "backbone.activities",
    "activities/animals-list",
    "activities/animals-detail"
  ],
  function(Backbone, AnimalsList, AnimalsDetail) {

    var activities = {
      'list': new AnimalsList(),
      'detail': new AnimalsDetail()
    };

    var Router = Backbone.ActivityRouter.extend({
      activities: activities,
      responsive: false,
      defaultRoute: '!/animals'
    });

    return Router;

});