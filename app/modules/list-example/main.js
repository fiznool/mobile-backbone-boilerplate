define(function(require) {
  var      libs = require('core/libs'),
              $ = libs.$,
              _ = libs._,
       Backbone = libs.backbone;
  
  var Model = Backbone.Model.extend({
    defaults: {
      "id": null,
      "name": "Animal"
    }
  });

  var Collection = Backbone.Collection.extend({
    model: Model,
    url: '/api/animals.json'
  });

  var animals = new Collection();

  var Views = {
    Main: Backbone.View.extend({
      tagName: 'nav',

      template: _.template(require('text!./template.jst')),

      collection: animals,
      
      events: {
        // Respond to UI events, calling named functions in this object.
        // These events will automatically be cleaned up when the view is hidden.
        // Example:
        // "click .check"              : "toggleDone",
        // "dblclick div.todo-text"    : "edit"
      },

      initialize: function() {
        this.bindTo(this.collection, 'add', this.addOne);
        this.bindTo(this.collection, 'reset', this.addAll);
        
        this.collection.fetch();

      },

      render: function() {
        $(this.el).html(this.template());
        return this;
      },

      addOne: function(item) {
        var view = new Views.Item({ model: item });
        view.render();
        $(this.el).find('ul').append(view.el);
        console.log(this.el);
      },

      addAll: function() {
        this.collection.each(this.addOne, this);
      }

    }),

    Item: Backbone.View.extend({
      tagName: 'li',

      template: _.template(require('text!./item.jst')),

      render: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }

    })

  };



  return {
    Model: Model,
    Collection: Collection,
    Views: Views
  };


});