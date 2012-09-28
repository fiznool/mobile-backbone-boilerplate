define(function(require) {
  var $ = require('zepto');
  var _ = require('lodash');
  var app = require('app');
  var Scaffold = require('scaffold');

  var Item = (function() {

    return Scaffold.View.extend({

      events: {
        'tap': 'onTap'
      },

      template: _.template(require('text!templates/item.jst')),

      render: function() {
        this.setElement(this.template(this.model.toJSON()));
        return this;
      },

      onTap: function(e) {
        //console.log(e);
      }

    });

  })();


  var List = (function() {

    var Model = Scaffold.Model.extend({
      defaults: {
        "id": null,
        "name": "Animal"
      }
    });

    var Collection = Scaffold.Collection.extend({
      model: Model,
      url: '/api/animals.json'
    });

    return Scaffold.View.extend({

      tagName: 'ul',

      template: _.template(require('text!templates/list.jst')),

      events: {
        // Respond to UI events, calling named functions in this object.
        // These events will automatically be cleaned up when the view is hidden.
        // Example:
        // "click .check"              : "toggleDone",
        // "dblclick div.todo-text"    : "edit"
      },

      initialize: function() {
        this.collection = new Collection();

        this.bindTo(this.collection, 'add', this.addOne);
        this.bindTo(this.collection, 'reset', this.addAll);

        app.trigger('headerbar:update', {
          title: 'Choose your weapon!'
        });
        
        this.collection.fetch();

      },

      render: function() {
        this.$el.html(this.template());
        return this;
      },

      addOne: function(item) {
        var view = new Item({ model: item });
        view.render();
        this.$el.append(view.el);
        this.addChild(view);
      },

      addAll: function() {
        this.disposeChildren();
        this.collection.each(this.addOne, this);
      }

    });

  })();
  
  return List;


});