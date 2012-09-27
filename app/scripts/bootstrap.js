// Set the require.js configuration for your application.
require.config({

  paths: {

    // Libraries
    'zepto':      '../../assets/js/libs/zepto-1.0rc1',
    'lodash':     '../../assets/js/libs/lodash-0.7.0',
    'backbone':   '../../assets/js/libs/backbone-0.9.2',
    'fastclick':  '../../assets/js/libs/fastclick',
    'recognizr':  '../../assets/js/libs/recognizr-0.1.0',
    
    // Plugins
    'text':                  '../../assets/js/plugins/text-1.0.7',
    'backbone-deepmodel':    '../../assets/js/plugins/backbone-deepmodel-0.7.3',
    'backbone-super':        '../../assets/js/plugins/backbone-super',
    'backbone-zombienation': '../../assets/js/plugins/backbone-zombienation-0.1.0',
    
    'templates': '../templates',
    'navigator': 'core/navigator',
    'scaffold': 'core/scaffold',
    'components': 'core/components'
    
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

    'backbone-deepmodel': { deps: ['backbone'] },
    'backbone-super': { deps: ['backbone'] },
    'backbone-zombienation': { deps: ['backbone'] }
  }

});

require(["main"]);

