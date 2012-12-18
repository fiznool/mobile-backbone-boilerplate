// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["../../vendor/jam/require.config", "main"],

  paths: {
    // require often tries to load jquery from the wrong place; hardcoding the path here fixes that
    "jquery": "../../vendor/jam/jquery/dist/jquery",
    // Use the underscore build of Lo-Dash to minimize incompatibilities.
    "lodash": "../../vendor/jam/lodash/lodash.underscore",

    // plugins and libraries not available as jam.js packages
    "fastclick": "../../assets/js/libs/fastclick",
    "backbone.activities": "../../assets/js/plugins/backbone.activities",
    "backbone.super": "../../assets/js/plugins/backbone.super"
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
      deps: ["backbone"],
      exports: "Backbone"
    },

    "fastclick": {
      exports: "FastClick"
    }
  }

});