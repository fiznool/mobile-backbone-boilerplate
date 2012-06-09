// Set the require.js configuration for your application.
require.config({
  
  paths: {
    
    // Libraries
    jquery:     '../assets/js/libs/zepto-1.0rc1', // Named jquery so that modules don't have to change their require() calls
    underscore: '../assets/js/libs/underscore-1.3.1',
    backbone:   '../assets/js/libs/backbone-0.9.2',
    text:       '../assets/js/plugins/text-1.0.7',
    
    // helpers
    core:       'core/'
    
  },

  shim: {

    jquery: {
      exports: function() {
        // We are using Zepto. Pull this out if we replace with jQuery as it is AMD compatible
        return this.Zepto;
      }
    },

    underscore: {
      exports: function() {
        this._.templateSettings = {
          interpolate : /\{\{(.+?)\}\}/g
        };

        return this._;
      }
    },

    backbone: {
      deps: ["underscore", "jquery"],
      exports: function(_, $) {
        // Extend Backbone to clear up Views when they are removed.
        // This ensures we don't get memory leaks. :)
        // Much love to these resources:
        //  http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
        //  http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853
        _.extend(this.Backbone.View.prototype, {

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
            if (this.bindings) {
              _.each(this.bindings, function(binding) {
                binding.obj.unbind(binding.evt, binding.callback);
              });
              this.bindings = null;
            }
            
          },

          // Completely removes the view from the DOM
          // and removes all event bindings.
          // This will remove this view from memory.
          dispose: function() {
            if (this.beforeClose) {
              this.beforeClose();
            }

            // Unbind all events that have been bound with bindTo().
            this.unbindFromAll();

            // Unbind all listeners to this view's events.
            this.unbind();

            // Removes this.el from the DOM, destroying all DOM event bindings.
            this.remove();

            // Call any custom onClose function defined.
            if (this.onClose) {
              this.onClose();
            }
          }

        });

        // Extend Backbone Router to show our view.
        _.extend(this.Backbone.Router.prototype, {

          initialize: function(options) {
            if (!options.container) {
              throw new Error("Option `container` must be set on router");
            }

            this.container = options.container;
          },

          // Swaps out the current view for the new one,
          // destroying the old view in the process.
          // TODO look into how to handle transition here!
          changeView: function(newView) {
            if (this.currentView){
              this.currentView.dispose();
            }

            this.currentView = newView;

            // Render the new view into our main DOM element
            // Remmeber to set mainEl on the Router when creating!
            this.currentView.render();
            $(this.container).html(this.currentView.el);

          }

        });

        return this.Backbone;
      }
    }
  }
});

require(["app"]);

