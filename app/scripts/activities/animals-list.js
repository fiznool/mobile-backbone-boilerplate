define(
  [
    "backbone.activities",
    "scaffold",
    "app"
  ],
  function(Backbone, Scaffold, app) {

    var List = app.module();
    List.Model = Scaffold.Model.extend({});

    List.Collection = Scaffold.Collection.extend({
      model: List.Model,
      url: 'api/animals.json'
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
        return { animals: this.collection.toJSON() };
      },

      initialize: function() {
        this.bindTo(this.collection, 'reset', this.render);
      }

    });

    List.Views.Header = Scaffold.View.extend({
      template: 'animal-list-header',
      className: 'headerbar-inner'
    });

    return Backbone.Activity.extend({

      initialize: function() {
        // Singleton collection
        this.collection = new List.Collection();
      },

      'list': {
        onStart: function() {
          // Render the data when the activity starts
          this.updateRegions({
            'headerbar': new List.Views.Header(),
            'main': new List.Views.Main({ collection: this.collection })
          });
          
          this.collection.fetch();

        }
      },

      routes: {
        '!/animals': 'list'
      }

    });

});