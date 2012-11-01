define(function(require) {

  var Backbone = require('backbone');

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    initialize: function(options) {
      var that = this;
      this.regions = options.regions;
      this.regionStates = _.clone(options.regions);
      _.each(_.keys(this.regionStates), function(key) {
        this.regionStates[key] = {};
      }, this);
    },

    routes: {
      "": "index"
    },

    // Define the callbacks for routes. When a route fires, it should
    // update the regions in the app by specifying the layouts to be used.
    index: function() {
      this.updateRegions({
        main: { // the name of the region to update
          name: 'hello', // reference to a layout; in this case layouts.hello
          data: {} // any data to pass to the layout
        }
      });
    },

    
    layouts: {
      // layouts are given a region which they should update.
      // the data is passed in from the route
      'hello': function(region, data) {
        
        // create a new View class which we can use to update the region.
        var HelloView = Backbone.View.extend({
          template: 'hello-text'
        });

        // Set the region's template to the 'hello' template.
        region.use('hello');

        // update the region by passing an object of selectors and the views to
        // render into those elements
        region.update({
          '.hello-text': new HelloView()
        });
      }
    },

    updateRegions: function(options) {
      var that = this;

      _.each(_.keys(this.regions), function(regionName) {
        var region = that.regions[regionName];
        var opts = options[regionName];

        that.regionStates[regionName] = opts || {};
        if(opts) {
          var layout = that.layouts[opts.name];
          layout.call(null, region, opts.data);
        }

        // you must explicitly pass null to clear out a region,
        // otherwise it's left untouched
        else if(opts === null) {
          region.empty();
        }
      });
    },

    refreshCurrentRegions: function() {
      var that = this;
      _.each(_.keys(this.regions), function(regionName) {
        var region = that.regions[regionName];
        var opts = that.regionStates[regionName];

        if(opts.name) {
          var layout = that.layouts[opts.name];
          layout.call(null, region, opts.data);
        }
      });
    }
  });

  return Router;

});
