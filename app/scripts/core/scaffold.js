define(function(require) {

  var app = require('app');
  var _ = require('lodash');
  var Backbone = require('backbone');
  
  // Plugins
  require('backbone-zombienation');
  require('backbone-deepmodel');
  require('backbone-super');

  // Set _ template settings
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
  };

  return {

    Model: Backbone.Model.extend({}),
    DeepModel: Backbone.DeepModel.extend({}),
    Collection: Backbone.Collection.extend({}),

    View: Backbone.View.extend({

      wasRendered: function() {
        /* Override if necessary, at this point the view is in the DOM */
      }

    })

  };
  
});