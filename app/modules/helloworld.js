define(function(require) {
  var      libs = require('libs'),
              $ = libs.$,
              _ = libs._,
       Backbone = libs.backbone;
  
  var Model = Backbone.Model.extend({
    defaults: {
      "hello": "world",
      "timestamp" : new Date()
    }
  });

  var Collection = Backbone.Collection.extend({

  });

  var ViewMain = Backbone.View.extend({
    template: _.template(require('text!templates/helloworld.html')),

    events: {
      // Respond to UI events, calling named fucntions in this object.
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
      // this.model.bind('change', this.render, this);
      // this.model.bind('destroy', this.remove, this);
    },

    render: function() {
      // Put code in here that should be called when
      // the view is rendered.
      // Example:
      // $(this.el).html(this.template(this.model.toJSON()));
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    buttonPress: function() {
      this.$('#button-results').prepend('<p>Button pressed at ' + new Date().toString() + '</p>');
    }

    // The rest of the view should be used to carry
    // out any view-specific logic.

  });



  return {
    Model: Model,
    Collection: Collection,
    Views: {
      Main: ViewMain
    }
  };


});