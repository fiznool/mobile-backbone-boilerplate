define(
  [
    // Core
    "jquery",
    "lodash",
    "backbone",
    "handlebars",
    "app",

    // Plugins
    "backbone.layoutmanager",
    "backbone.super"
  ],
  function($, _, Backbone, Handlebars, app) {

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

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
        // Explicitly specify the template as HTML
        // as some mobile WebViews will return a template
        // containing a single wrapper div as an
        // XML Document object
        $.get(app.root + path, function(contents) {
          JST[path] = Handlebars.compile(contents);
          JST[path].__compiled__ = true;
          done(JST[path]);
        }, 'html');
      }
    });

    var Scaffold = {
      Model: Backbone.Model.extend({}),

      Collection: Backbone.Collection.extend({}),

      View: Backbone.View.extend({

        cleanup: function() {
          this.stopListening();
          if (_.isFunction(this.dispose)) {
            this.dispose();
          }
        },

        // Default serialize function, if a model exsits.
        serialize: function() {
          if (this.model) {
            return this.model.toJSON();
          }
        }
      }),

      Region: Backbone.Layout
    };

    return Scaffold;
});
