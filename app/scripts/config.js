// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["../../vendor/jam/require.config"],

  paths: {

    // Use the underscore build of Lo-Dash to minimize incompatibilities.
    "lodash": "../../vendor/jam/lodash/dist/lodash.underscore",

    // plugins and libraries not available as jam.js packages
    "recognizr": "../../vendor/js/libs/recognizr",
    "fastclick": "../../vendor/js/libs/fastclick",
    "enquire": "../../vendor/js/libs/enquire",
    "tappivate": "../../vendor/js/plugins/tappivate",
    "backbone.activities": "../../vendor/js/plugins/backbone.activities",
    "backbone.super": "../../vendor/js/plugins/backbone.super",

    'scaffold': 'core/scaffold'
  },

  map: {
    // Ensure Lo-Dash is used instead of underscore.
    "*": { "underscore": "lodash" }

    // Put additional maps here.
  },

  shim: {
    // Handlebars has no dependencies.
    "lodash": {
      exports: "_"
    },

    // Backbone.Super depends on Backbone.
    "backbone.super": {
      deps: ["backbone"],
      exports: "Backbone"
    },

    // Backbone.Activities depends on Backbone and exports Backbone
    "backbone.activities": {
      deps: ["backbone", "backbone.layoutmanager"],
      exports: "Backbone"
    },

    enquire: {
      exports: "enquire"
    },

    "tappivate": {
      deps: ["jquery"]
    },

    "fastclick": {
      exports: "FastClick"
    }
  }

});
