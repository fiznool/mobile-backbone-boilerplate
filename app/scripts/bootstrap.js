// Set the require.js configuration for your application.
require.config({

  paths: {

    // Libraries
    'zepto':      '../../assets/js/libs/zepto-1.0rc1',
    'lodash':     '../../assets/js/libs/lodash-0.8.0',
    'backbone':   '../../assets/js/libs/backbone-0.9.2',
    // 'fastclick':  '../../assets/js/libs/fastclick',  // No longer required as we should use zepto tap event
    'recognizr':  '../../assets/js/libs/recognizr-0.3.0',
    'handlebars': '../../assets/js/libs/handlebars-1.0rc1',
    
    // Plugins
    'text':                   '../../assets/js/plugins/text-1.0.7',
    'zepto-tappivate':        '../../assets/js/plugins/zepto-tappivate-0.2.0',
    'backbone-deepmodel':     '../../assets/js/plugins/backbone-deepmodel-0.7.3',
    'backbone-super':         '../../assets/js/plugins/backbone-super',
    'backbone-zombienation':  '../../assets/js/plugins/backbone-zombienation-0.1.0',
    'bootstrap-zepto-compat': '../../assets/js/plugins/bootstrap-zepto-compat',
    'bootstrap-transition':   '../../assets/js/plugins/bootstrap-transition-2.1.1',
    'bootstrap-alert':        '../../assets/js/plugins/bootstrap-alert-2.1.1',

    'templates': '../templates'
    
  },

  shim: {

    zepto: {
      exports: function() {
        return this.Zepto;
      }
    },

    backbone: {
      deps: [ 'lodash', 'zepto' ],
      exports: function() {
        return this.Backbone;
      }
    },

    handlebars: {
      exports: function() {
        return this.Handlebars;
      }
    },

    'backbone-deepmodel': { deps: ['backbone'] },
    'backbone-super': { deps: ['backbone'] },
    'backbone-zombienation': { deps: ['backbone'] },

    'bootstrap-zepto-compat': { deps: ['zepto'] },

    'bootstrap-transition': { deps: ['bootstrap-zepto-compat'] },
    'bootstrap-alert': { deps: ['bootstrap-zepto-compat', 'bootstrap-transition'] },

    'zepto-tappivate': { deps: ['zepto'] }
  }

});

require(["main"]);

