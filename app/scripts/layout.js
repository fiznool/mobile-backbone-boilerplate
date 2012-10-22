define(function(require) {

  var $ = require('jquery');
  var _ = require('lodash');
  var Backbone = require('backbone');
                 require('plugins/backbone.layoutmanager');
  var Handlebars = require('handlebars');
  
  var app = require('app');

  // Localize or create a new JavaScript Template object.
  var JST = {};

  // Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.LayoutManager.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    prefix: "app/templates/",

    fetch: function(path) {
      // Concatenate the file extension.
      path = path + ".html";

      // If cached, use the compiled template.
      if (JST[path]) {
        if (!JST[path].__compiled__) {
          JST[path] = Handlebars.template(JST[path]);
          JST[path].__compiled__ = true;
        }
        return JST[path];
      }

      // Put fetch into `async-mode`.
      var done = this.async();

      // Seek out the template asynchronously.
      $.get(app.root + path, function(contents) {
        JST[path] = Handlebars.compile(contents);
        JST[path].__compiled__ = true;
        done(JST[path]);
      });
    }
  });

  return {

    init: function(container) {
      this.$container = $(container);
    },

    // Helper for using layouts.
    use: function(name, options) {
      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        el: this.$container,
        template: name
      }, options));

      // Cache the refererence.
      return this.layout = layout;
    }
  };

});
