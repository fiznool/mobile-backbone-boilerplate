define(function(require) {
  
  var $ = require('jquery');
  var _ = require('underscore');
  var app = require('app');
  var Scaffold = require('scaffold');
  
  var Model = Scaffold.Model.extend({
    url: function() {
      return '/api/animals/' + this.id + '.json';
    }
  });

  var View = Scaffold.View.extend({

    template: _.template(require('text!templates/detail.jst')),
    
    events: {
      // Respond to UI events, calling named functions in this object.
      // These events will automatically be cleaned up when the view is hidden.
      // Example:
      // "click .check"              : "toggleDone",
      // "dblclick div.todo-text"    : "edit"
    },

    initialize: function(options) {
      this.model = new Model({ id: options.id });
      this.bindTo(this.model, 'change', this.modelFetched);
    },

    render: function() {
      this.model.fetch();
      return this;
    },

    modelFetched: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.wasUpdated();
      return this;
    }

  });


  return View;

});