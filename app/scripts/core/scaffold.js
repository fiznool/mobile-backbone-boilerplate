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

        // Use this function to bind any model/collection events.
        // This will track the bindings and allow us to unbind
        // them all when the view is disposed of.
        bindTo: function(obj, evt, callback) {
          // TODO handle non-Backbone object?
          obj.bind(evt, callback, this);

          if (!this.bindings) {
            this.bindings = [];
          }

          this.bindings.push({
            obj: obj,
            evt: evt,
            callback: callback
          });
        },

        // Clear all model/event bindings.
        unbindFromAll: function() {
          var that = this;
          if (this.bindings) {
            _.each(this.bindings, function(binding) {
              // Ensure we pass 'that' so only events on this view are removed
              // Important for app events as unbindFromAll happens after
              // other views have been init'd
              binding.obj.unbind(binding.evt, binding.callback, that);
            });
            this.bindings = null;
          }

        },

        cleanup: function() {
          this.unbindFromAll();
          if (_.isFunction(this.dispose)) {
            this.dispose();
          }
        },

        // Default serialize function, if a model exsits.
        serialize: function() {
          var data;
          if (this.model) {
            data = this.model.toJSON();
          }
          return data;
        }
      }),

      Region: Backbone.Layout
    };

    return Scaffold;
});
