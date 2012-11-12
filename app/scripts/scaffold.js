define(function(require) {

  var app = require('app');
  var $ = require('jquery');
  var _ = require('lodash');
  var Backbone = require('backbone');
  
  // Plugins
  require('plugins/backbone.super');
  require('plugins/backbone.layoutmanager');
  
  // Activity constructor
  var Activity = function(options) {
    // both _configure and initialize are stubs
    this._configure(options || {});
    this.initialize.apply(this, arguments);
  };

  // mix events into the prototype
  _.extend(Activity.prototype, Backbone.Events, {

    // regions is a map from region names to region objects.
    // Setup is handled by the base Scaffold.Router's constructor.
    // This object will be the same for all activities associated with the same router.
    regions: {},

    // _configure is an empty function by default. Override it with your own
    // configuration logic.
    _configure: function() {},

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The router uses this value to determine whether to call an activity's onCreate callback
    _initialized: false,

    // updateRegions takes an object of region - View[] pairs.
    // For each region given, the corresponding views are inserted.
    // e.g. this.updateRegions({ 'mainRegion': [ fooView, new BarView({}), ... ], ... })
    updateRegions: function(regions) {
      console.log(regions);
      _.each(regions, function(views, regionName) {
        this.updateRegion(regionName, views);
      }, this);
    },

    // updateRegion takes a region and a View[].
    // The views are inserted into the region, replacing any existing views.
    // e.g. this.updateRegion('mainRegion', [ fooView, new BarView({}), ... ])
    updateRegion: function(region, views) {

      // retrieve the actual region by its name
      region = this.regions[region];

      // wrap a single view in an array
      if (views instanceof Backbone.View) {
        views = [ views ];
      }

      // remove all of the child views from the region
      region._removeViews(true);

      // insert the given views into the region
      _.each(views, function(view) {
        // on the first iteration, set append to false to clear the region
        // on all other iterations, set append to true
        region.setView(view, true);
      });

      // render the views in a separate loop to keep all the DOM interaction together
      _.each(views, function(view) {
        console.log('rendering ', region, view);
        view.render();
      });

    },

    // callback stubs
    onCreate: function() {},
    onStart: function() {},
    onStop: function() {}

  });

  // use backbone's extend (referencing via View here, but they're all the same)
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

        this.$el = $(options.el);

        this.regions = options.regions;

        // create a route for each entry in each activity's routes object
        _.each(this.activities, function(activity, name) {
          _.each(activity.routes, function(methodName, route) {
            this.route(route, name + '-' + methodName, _.bind(function() {
              this.didRoute(activity, methodName, Array.prototype.slice.apply(arguments));
            }, this));
          }, this);
        }, this);

        // set up the default route
        this.route('', this.defaultRoute.activityName + '-' + this.defaultRoute.methodName, _.bind(function() {
          this.didRoute(this.defaultRoute.activity, this.defaultRoute.methodName, Array.prototype.slice.apply(arguments));
        }, this));

        if(this.responsive) {
          app.on('screen:resize', this.setLayout, this);
        }
        else {
          this.setLayout('default');
        }

        // manually call the superclass constructor
        Backbone.Router.prototype['constructor'].call(this, options);
      },

      setLayout: function(name) {
        
        // update the layout class on the parent element
        if (this.$el) {
          this.$el.removeClass('layout-' + this.currentLayout).addClass('layout-' + name);
        }
        
        this.currentLayout = name;
        
        // if the current activity's current method has a function for the new layout, invoke it
        if (this.currentActivity &&
          this.currentActivity[this.currentMethod][this.currentLayout]) {
          this.currentActivity[this.currentMethod][this.currentLayout].apply(this.currentActivity, this.currentArgs);
        }
      },

      // Handle the activity lifecycle
      didRoute: function(activity, method, args) {
        var didChangeActivity = this.currentActivity !== activity;
        var didChangeMethod = this.currentMethod !== method;

        if (this.currentActivity &&
          (didChangeActivity || didChangeMethod) &&
          this.currentActivity[this.currentMethod].onStop) {
          this.currentActivity[this.currentMethod].onStop.apply(this.currentActivity);
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