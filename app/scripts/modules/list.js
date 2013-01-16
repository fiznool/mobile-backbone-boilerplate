define([
    "scaffold",
    "app"
  ],
  function(Scaffold, app) {

    var List = app.module();

    List.Collection = Scaffold.Collection.extend({
      url: '/api/animals'
    });

    List.Views.Main = Scaffold.View.extend({
      tagName: 'ul',
      template: 'list-main',
      className: 'list',
      attributes: {
        'data-tap': 'list'
      },

      serialize: function() {
        // Namespace the collection for Handlebars
        return {
          animals: this.collection.toJSON()
        };
      },

      doRender: function() {
        this.render.apply(this, arguments);
      },

      initialize: function() {
        this.collection = this.collection || new List.Collection();
        this.bindTo(this.collection, 'reset', this.doRender);
      }

    });

    List.Views.Topbar = Scaffold.View.extend({
      template: 'list-topbar',
      className: 'headerbar-inner'
    });

    return List;

});