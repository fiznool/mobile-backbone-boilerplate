define(function(require) {
  var      libs = require('core/libs'),
              $ = libs.$,
              _ = libs._,
       Backbone = libs.backbone;
  
  var Model = Backbone.Model.extend({
    url: function() {
      return '/api/animals/' + this.id + '.json';
    }
  });

  var Views = {
    Main: Backbone.View.extend({

      template: _.template(require('text!./template.jst')),
      
      events: {
        // Respond to UI events, calling named functions in this object.
        // These events will automatically be cleaned up when the view is hidden.
        // Example:
        // "click .check"              : "toggleDone",
        // "dblclick div.todo-text"    : "edit"
      },

      initialize: function(options) {
        this.bindTo(this.model, 'change', this.modelFetched);
      },

      render: function() {
        this.model.fetch();
        return this;
      },

      modelFetched: function() {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      }

    })

  };



  return {
    Model: Model,
    Views: Views
  };


});