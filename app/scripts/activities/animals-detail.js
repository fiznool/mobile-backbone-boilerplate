define(
  [
    "backbone.activities",
    "scaffold",
    "app"
  ],
  function(Backbone, Scaffold, app) {

    var Detail = app.module();

    Detail.Model = Scaffold.Model.extend({
      url: function() {
        return '/api/animals/' + this.get('id');
      }
    });

    Detail.Views.Main = Scaffold.View.extend({
      template: 'animal-detail',
      className: 'detail',

      data: function() {
        return this.model.toJSON();
      },

      initialize: function() {
        this.bindTo(this.model, 'change', this.render);
      }
    });

    Detail.Views.Topbar = Scaffold.View.extend({
      template: 'animal-topbar-detail',
      className: 'headerbar-inner',
      data: function() {
        return this.model.toJSON();
      },

      initialize: function() {
        this.bindTo(this.model, 'change', this.render);
      }
    });

    Detail.Handler = Backbone.ActivityRouteHandler.extend({

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

      handlers: {
        'detail': new Detail.Handler()
      },

      routes: {
        '!/animals/:id': 'detail'
      }

    });

    return Activity;

});