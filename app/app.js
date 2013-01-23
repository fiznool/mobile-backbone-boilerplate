define([
  "backbone.layoutmanager"

  // Include additional libraries installed with JamJS or placed in the
  // `vendor/js` directory, here.
],

function(LayoutManager) {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {
    // The root path to run the application.
    root: ""
  };

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  // Configure LayoutManager with Backbone Boilerplate defaults.
  LayoutManager.configure({
    // Allow LayoutManager to augment Backbone.View.prototype.
    manage: true,

    prefix: "app/templates/",

    fetch: function(path) {
      // Concatenate the file extension.
      path = path + ".html";

      // If cached, use the compiled template.
      if (JST[path]) {
        return JST[path];
      }

      // Put fetch into `async-mode`.
      var done = this.async();

      // Seek out the template asynchronously.
      $.get(app.root + path, function(contents) {
        done(_.template(contents));
      }, "text");
    }
  });

  var ready;

  var nativeBridge = (function() {
    if (window.cordova) {

      window.jsapp = {
        // This global should be used to receive messages from Cordova
        // native plugins. A good workflow is to fire app events when
        // these messages are received.

      };

      // Populate the ready function
      ready = function(cb) {
        // Wait for the Cordova 'deviceready' event, which occurs when
        // Cordova has fully initialised the native side.
        // When the deviceready event is received, trigger the router.
        document.addEventListener("deviceready", function() {
          cb.apply();
        }, false);
      };
        

      return {
        // Place functions in here which will call the native cordova layer.
        // http://docs.phonegap.com/en/2.3.0/guide_plugin-development_index.md.html
        // The cordova API is as follows:
        // cordova.exec(function(winParam) {}, function(error) {},
        //  "service", "action", ["firstArgument", "secondArgument"]);

      };

    } else {

      ready = function(cb) {
        // In a non-cordova environment, just run the callback
        // immediately.
        cb.apply();
      };

      return {
        // Place functions in here for use in a non-Cordova environment.
        // These should follow the functions defined above,
        // so that the app can still function when it is accessed
        // in the browser.

      };

    }
  })();

  // Mix Backbone.Events, modules, and layout management into the app object.
  return _.extend(app, {
    // Create a custom object with a nested Views object.
    module: function(additionalProps) {
      return _.extend({ Views: {} }, additionalProps);
    },

    // Helper for using layouts.
    useLayout: function(name, options) {
      // Enable variable arity by allowing the first argument to be the options
      // object and omitting the name argument.
      if (_.isObject(name)) {
        options = name;
      }

      // Ensure options is an object.
      options = options || {};

      // If a name property was specified use that as the template.
      if (_.isString(name)) {
        options.template = name;
      }

      // Check if a layout already exists, if so, update the template.
      if (this.layout) {
        this.layout.template = options.template;
      } else {
        // Create a new Layout with options.
        this.layout = new Backbone.Layout(_.extend({
          el: "main"
        }, options));
      }

      // Cache the refererence.
      return this.layout;
    },

    ready: ready,
    nativeBridge: nativeBridge

  }, Backbone.Events);

});
