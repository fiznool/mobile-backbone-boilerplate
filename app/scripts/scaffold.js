define(function(require) {

  var app = require('app');
  var _ = require('lodash');
  var Backbone = require('backbone');
  
  // Plugins
  require('plugins/backbone.super');
  require('plugins/backbone.layoutmanager');
  
  // Activity constructor
  var Activity = function(options) {
    this._configure(options || {});
    this.initialize.apply(this, arguments);
  };

  _.extend(Activity.prototype, Backbone.Events, {
    // an object containing the regions in the app
    regions: {},

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    _initialized: false,

    updateRegions: function(regions) {
      _.each(regions, function(views, regionName) {
        this.updateRegion(regionName, views);
      }, this);
    },

    updateRegion: function(region, views) {
      region = this.regions[region];
      _.each(views, function(view, index) {
        region.setView(view, index !== 0);
        view.render();
      });
    },
    
    _configure: function() {},
    onCreate: function() {},
    onStart: function() {},
    onStop: function() {}
  });

  // use backbone's extend
  Activity.extend = Backbone.View.extend;

  return {
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
      }

    }),

    Activity: Activity,

    Router: Backbone.Router.extend({

      constructor: function(options) {

        options = options || {};

        this.regions = options.regions;
        _.each(this.regions, function(value, key) {
          if(key !== 'main') {
            value.use('empty');
          }
        });

        _.each(this.activities, function(activity, name) {
          _.each(activity.routes, function(methodName, route) {
            this.route(route, name + '-' + methodName, _.bind(function() {
              this.didRoute(activity, methodName, Array.prototype.slice.apply(arguments));
            }, this));
          }, this);
        }, this);

        this.route('', this.defaultRoute.activityName + '-' + this.defaultRoute.methodName, _.bind(function() {
          this.didRoute(this.defaultRoute.activity, this.defaultRoute.methodName, Array.prototype.slice.apply(arguments));
        }, this));

        if(this.responsive) {
          app.on('screen:resize', function(name) {
            this.currentLayout = name;
            this.regions.main.use(name);
            if(this.currentActivity) {
              this.currentActivity[this.currentMethod][this.currentLayout].apply(this.currentActivity, this.currentArgs);
            }
          }, this);
        }
        else {
          // define the layout to use for main in non-responsive mode
          this.regions.main.use('empty');
        }

        Backbone.Router.prototype['constructor'].call(this, options);
      },

      // Handle the activity lifecycle
      didRoute: function(activity, method, args) {
        var didChangeActivity = this.currentActivity !== activity;
        var didChangeMethod = this.currentMethod !== method;

        if (this.currentActivity &&
          (didChangeActivity || didChangeMethod) &&
          this.currentActivity[this.currentMethod].onStop) {
          this.currentActivity[this.currentMethod].onStop();
        }

        if (this.currentActivity && didChangeActivity) {
          this.currentActivity.onStop();
        }

        this.currentActivity = activity;
        this.currentMethod = method;
        this.currentArgs = args;

        if (!activity._initialized) {
          activity.regions = this.regions;
          activity.onCreate();
          activity._initialized = true;
        }

        if (didChangeActivity) {
          activity.onStart();
        }

        if (this.currentActivity[this.currentMethod].onStart) {
          this.currentActivity[this.currentMethod].onStart.apply(this.currentActivity, this.currentArgs);
        }

        if(this.responsive &&
          this.currentActivity[this.currentMethod][this.currentLayout]) {
          this.currentActivity[this.currentMethod][this.currentLayout].apply(this.currentActivity, this.currentArgs);
        }
      }
    })
  };
  
});