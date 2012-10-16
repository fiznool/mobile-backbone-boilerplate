define(function(require) {

  var app = require('app');
  var _ = require('lodash');
  var Backbone = require('backbone');
  
  // Plugins
  require('plugins/backbone.layoutmanager');
  require('plugins/backbone.super');
  
  return {
    Model: Backbone.Model.extend({}),
    Collection: Backbone.Collection.extend({}),
    View: Backbone.LayoutView.extend({})
  };
  
});