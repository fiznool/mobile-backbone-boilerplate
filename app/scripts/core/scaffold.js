define(function(require) {

  var Backbone = require('backbone');
  var scroller = require('scroller');

  // Plugins
  require('backbone-zombienation');
  require('backbone-deepmodel');
  require('backbone-super');

  return {

    Model: Backbone.Model.extend({}),
    DeepModel: Backbone.DeepModel.extend({}),
    Collection: Backbone.Collection.extend({}),

    View: Backbone.View.extend({

      wasUpdated: function() {
        scroller.refresh();
      }

    })

  };
  
});