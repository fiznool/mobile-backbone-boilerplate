// Set the require.js configuration for your application.
require.config({

  paths: {

    // Libraries
    'jquery':     '../../assets/js/libs/jquery-1.7.2', // Can switch to Zepto if we don't need WP7 support
    'underscore': '../../assets/js/libs/underscore-1.3.1',
    'backbone':   '../../assets/js/libs/backbone-0.9.2',
    'iscroll':    '../../assets/js/libs/iscroll-lite-4.1.6',
    'recognizr':  '../../assets/js/libs/recognizr-0.1.0',
    
    // Plugins
    'text':                  '../../assets/js/plugins/text-1.0.7',
    'backbone-deepmodel':    '../../assets/js/plugins/backbone-deepmodel-0.7.3',
    'backbone-super':        '../../assets/js/plugins/backbone-super',
    'backbone-zombienation': '../../assets/js/plugins/backbone-zombienation-0.1.0',
    
    'templates': '../templates',
    'navigator': 'core/navigator',
    'scaffold': 'core/scaffold',
    'scroller': 'core/scroller'
    
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
      deps: ["jquery", "underscore"],
      exports: function() {
        return this.Backbone;
      }
    },

    'backbone-deepmodel': { deps: ["backbone"] },
    'backbone-super': { deps: ["backbone"] },
    'backbone-zombienation': { deps: ["backbone"] }
  }

});

require(["main"]);

