// Set the require.js configuration for your application.
require.config({

  paths: {
    // JavaScript folders.
    libs: "../../assets/js/libs",
    plugins: "../../assets/js/plugins",
    vendor: "../../assets/vendor",

    // Libraries.
    jquery: "../../assets/js/libs/jquery",
    lodash: "../../assets/js/libs/lodash",
    backbone: "../../assets/js/libs/backbone",
    handlebars: "../../assets/js/libs/handlebars",
    fastclick: "../../assets/js/libs/fastclick"
  },

  shim: {
    // Backbone library depends on lodash and jQuery.
    backbone: {
      deps: ["lodash", "jquery"],
      exports: "Backbone"
    },

    // Handlebars has no dependencies.
    handlebars: {
      exports: "Handlebars"
    },

    // Backbone.LayoutManager depends on Backbone.
    "plugins/backbone.layoutmanager": ["backbone"],

    // Backbone.Super depends on Backbone.
    "plugins/backbone.super": ["backbone"],

    // Backbone.Activities depends on Backbone.
    "plugins/backbone.activities": ["backbone"]
  }

});

// Initialize the application with the main application file.
require(["main"]);
