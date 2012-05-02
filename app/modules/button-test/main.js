define(function(require) {
  var      libs = require('core/libs'),
              $ = libs.$,
              _ = libs._,
       Backbone = libs.backbone;
  
  var Model = Backbone.Model.extend({
    defaults: {
      "hello": "world"
    }
  });

  var Collection = Backbone.Collection.extend({

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
        "click #button-target" : "buttonPress"
      },

      initialize: function() {
        // Put any initialization code in here.
        // This is typically where you will set up
        // event listeners for model/collection events.
        // Example:
        // this.bindTo(model, 'change', this.render);
        // this.bindTo(model, 'destroy', this.remove);
      },

      render: function() {
        // Put code in here that should be called when
        // the view is rendered.
        // Example:
        // $(this.el).html(this.template(this.model.toJSON()));
        this.model = new Model({"timestamp": new Date()});
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
      },

      buttonPress: function() {
        this.$('#button-results').prepend('<p>Button pressed at ' + new Date().toString() + '</p>');
      }

      // The rest of the view should be used to carry
      // out any view-specific logic.

    })

  };



  return {
    Model: Model,
    Collection: Collection,
    Views: Views
  };


});