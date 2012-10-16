define(function(require) {

  var $ = require('jquery');
  var _ = require('lodash');
  var Backbone = require('backbone');

  require('plugins/backbone.layoutmanager');

  var app = require('app');

  // Set _ template settings
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
  };

  // Localize or create a new JavaScript Template object.
  var JST = {};

  // Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.LayoutManager.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    paths: {
      layout: "app/templates/layouts/",
      template: "app/templates/"
    },

    fetch: function(path) {
      // Initialize done for use in async-mode
      var done;

      // Concatenate the file extension.
      path = path + ".html";

      // If cached, use the compiled template.
      if (JST[path]) {
        return JST[path];
      } else {
        // Put fetch into `async-mode`.
        done = this.async();

        // Seek out the template asynchronously.
        return $.ajax({ url: app.root + path }).then(function(contents) {
          done(JST[path] = _.template(contents));
        });
      }
    }
  });

  return {

    init: function(container) {
      this.$container = $(container);
    },

    // Helper for using layouts.
    use: function(name, options) {
      // If already using this Layout, then don't re-inject into the DOM.
      if (this.layout && this.layout.options.template === name) {
        return this.layout;
      }

      // If a layout already exists, remove it from the DOM.
      if (this.layout) {
        this.layout.remove();
      }

      // Create a new Layout with options.
      var layout = new Backbone.Layout(_.extend({
        template: name,
        className: "layout " + name,
        id: "layout"
      }, options));

      // Insert into the DOM.
      this.$container.empty().append(layout.el);

      // Render the layout.
      layout.render();

      // Cache the refererence.
      this.layout = layout;

      // Return the reference, for chainability.
      return layout;
    }
  };

});
