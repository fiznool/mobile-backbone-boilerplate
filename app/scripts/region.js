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
    // This means we don't need to inherit from Backbone.LayoutView
    manage: true,

    prefix: "app/templates/",

    fetch: function(path) {
      // Concatenate the file extension.
      path = path + ".html";

      // If cached, use the compiled template.
      if(JST[path]) {
        if(!JST[path].__compiled__) {
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

  var Region = function(container) {
      this.$container = $(container);
    };

  Region.prototype.use = function(name, options) {
    if(this.layout && this.layout.options.template === name) {
      return this.layout;
    }

    // If a layout already exists, remove it from the DOM.
    if(this.layout) {
      this.layout.remove();
    }

    // Create a new Layout with options.
    var layout = new Backbone.Layout(_.extend({
      template: name,
      className: 'layout ' + name
    }, options));

    // Render the layout.
    //layout.render();

    this.$container.empty().html(layout.el);

    // Cache the refererence.
    this.layout = layout;

    // Return the reference, for chainability.
    return layout;
  };

  Region.prototype.update = function(name, views, append) {
    
    // handle update(views)
    if (typeof views === 'undefined') {
      views = name;
      name = '';
    }

    // views could be a single view - check to see.
    if (views instanceof Backbone.View) {
      this.layout.setView(name, views, append);
    } else {
      this.layout.setViews(views);
    }

    this.layout.render();
  };

  Region.prototype.empty = function() {
    if(this.layout) {
      this.layout.remove();
      this.layout = undefined;
    }
  };

  return Region;

});