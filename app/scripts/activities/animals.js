define([
    "backbone.activities",
    "modules/list",
    "modules/detail"
  ],
  function(Backbone, List, Detail) {

    var ListHandler = Backbone.ActivityRouteHandler.extend({

      onStart: function() {
        // Render the data when the activity starts
        this.updateRegions({
          'headerbar': new List.Views.Topbar(),
          'main': new List.Views.Main({
            collection: this.activity.collection
          })
        });

      }

    });

    var DetailHandler = Backbone.ActivityRouteHandler.extend({

      onStart: function(id) {
        this.model = new Detail.Model({id: id});
        this.updateRegions({
          'headerbar': new Detail.Views.Topbar({ model: this.model }),
          'main': new Detail.Views.Main({ model: this.model })
        });
        this.model.fetch();
      },

      onStop: function() {
        // Forget the model state
        this.model = null;  // Garbage collect model in Topbar and Main views
        delete this.model;  // Remove model from this handler
      }

    });

    var Activity = Backbone.Activity.extend({

      initialize: function() {
        // Singleton collection
        this.collection = new List.Collection();
      },

      onCreate: function() {
        // fetch the data when we first land on animals
        this.collection.fetch();
      },

      routes: {
        '!/animals': new ListHandler(),
        '!/animals/:id': new DetailHandler()
      }

    });

    return Activity;

});