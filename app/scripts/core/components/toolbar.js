define(function(require) {

  var $ = require('zepto');
  var _ = require('lodash');
  var app = require('app');
  var Scaffold = require('scaffold');

  var Model = Scaffold.Model.extend({});

  var View = Scaffold.View.extend({

    initialize: function() {
      // The toolbar is a singleton.
      // Changes to the content should be made through an app event.
      this.model = new Model();
      this.bindTo(this.model, 'change', this.render);

    },

    render: function() {
      this.$el.html(this.model.get('title'));
    },

    update: function(data) {
      // Set the model, which fires the change event, rendering the toolbar.
      this.model.set(data);
    }

  });

  return function(options) {
    _.each(options, function(item, key) {
      
      var toolbar = new View({
        el: item
      });

      app.registerModule(key, {
        'update': toolbar.update
      }, toolbar);

    });

  };


});