// Set the require.js configuration for your application.
require.config({

  paths: {

    // Libraries
    jquery:     '../assets/js/libs/jquery-1.7.2', // Can switch to Zepto if we don't need WP7 support
    underscore: '../assets/js/libs/underscore-1.3.1',
    backbone:   '../assets/js/libs/backbone-0.9.2',
    text:       '../assets/js/plugins/text-1.0.7',
    iscroll:    '../assets/js/libs/iscroll-lite-4.1.6',
    layoutType: '../assets/js/layoutType',

    // helpers
    core:       'core/'

  },

  shim: {

    /*
    jquery: {
      exports: function() {
        // If we are using Zepto this is important, as Zepto is not AMD compliant.
        return this.Zepto;
      }
    },
    */

    iscroll: {
      exports: function() {
        return this.iScroll;
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
      deps: ["underscore", "jquery", "layoutType", "iscroll"],
      exports: function(_, $, layoutType, iScroll) {
        // Extend Backbone to clear up Views when they are removed.
        // This ensures we don't get memory leaks. :)
        // Much love to these resources:
        //  http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
        //  http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853

        var pageScroller = null;

        layoutType = layoutType();
        document.documentElement.className += ' ' + layoutType;
        document.getElementById('appheader').innerHTML = layoutType;
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
            var containerEl = this.container instanceof $ ? this.container[0] : this.container;
            if (this.currentView){
              this.currentView.dispose();
            }

            this.currentView = newView;

            // Render the new view into our main DOM element
            // Remmeber to set mainEl on the Router when creating!
            this.currentView.render();
            $(this.container).html(this.currentView.el);


            if(layoutType === 'iscroll') {
              if(!pageScroller) {
                pageScroller = new iScroll(containerEl.parentNode);
                $(window).on('orientationchange resize', function() {
                  setTimeout(function() { pageScroller.refresh(); }, 200);
                });
              }
              setTimeout(function() { pageScroller.refresh(); }, 200);
            }
          }
        });

        return this.Backbone;
      }
    }
  }

});

require(["main"]);

