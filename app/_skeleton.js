// A skeleton module, duplicate and customise for your own module.

define(function(require) {
  var      libs = require('libs'),
              $ = libs.$,
              _ = libs._,
       Backbone = libs.backbone;
  
  var Model = Backbone.Model.extend({ /* your model here */ });

  var Collection = Backbone.Collection.extend({ /* your collection here */ });

  var Views = {
    Main: Backbone.View.extend({
      template: _.template(require( /* Use the text plugin to require a template */ )),

      events: {
        // Respond to UI events, calling named functions in this object.
        // Example:
        // "click .check"              : "toggleDone",
        // "dblclick div.todo-text"    : "edit"
      },

      initialize: function() {
        // Put any initialization code in here.
        // This is typically where you will set up
        // event listeners for model/collection events.
        // Example:
        // this.model.bind('change', this.render, this);
        // this.model.bind('destroy', this.remove, this);
      },

      render: function() {
        // Put code in here that should be called when
        // the view is rendered.
        // Example:
        // $(this.el).html(this.template(this.model.toJSON()));
        // return this;
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