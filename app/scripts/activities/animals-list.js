define(
  [
    "backbone.activities",
    "scaffold",
    "app"
  ],
  function(Backbone, Scaffold, app) {

    var List = app.module();

    List.Collection = Scaffold.Collection.extend({
      url: '/api/animals'
    });

    List.Views.Main = Scaffold.View.extend({
      tagName: 'ul',
      template: 'animal-list',
      className: 'list',
      attributes: {
        'data-tap': 'list'
      },

      data: function() {
        // Namespace the collection for Handlebars
        return {
          animals: this.collection.toJSON()
        };
      },

      initialize: function() {
        this.bindTo(this.collection, 'reset', this.render);
      }

    });

    List.Views.Topbar = Scaffold.View.extend({
      template: 'animal-topbar-list',
      className: 'headerbar-inner'
    });

    List.Handler = Backbone.ActivityRouteHandler.extend({

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

    var Activity = Backbone.Activity.extend({

      initialize: function() {
        // Singleton collection
        this.collection = new List.Collection();
      },

      onCreate: function() {
        // fetch the data when we first land on animals
        this.collection.fetch();
      },

      handlers: {
        'list': new List.Handler()
      },

      routes: {
        '!/animals': 'list'
      }

    });

    return Activity;

});