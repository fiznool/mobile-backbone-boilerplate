require.config({

  baseUrl: 'app',

	paths: {

    // Libraries
    'zepto':      '../../assets/js/libs/zepto-1.0rc1',
    'lodash':     '../../assets/js/libs/lodash-0.8.0',
    'backbone':   '../../assets/js/libs/backbone-0.9.2',
    'recognizr':  '../../assets/js/libs/recognizr-0.1.0',
    
    // Plugins
    'text':                  '../../assets/js/plugins/text-1.0.7',
    'backbone-deepmodel':    '../../assets/js/plugins/backbone-deepmodel-0.7.3',
    'backbone-super':        '../../assets/js/plugins/backbone-super',
    'backbone-zombienation': '../../assets/js/plugins/backbone-zombienation-0.1.0',
    
    'spec': '../test/qunit/spec'
    
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

require([

  // Load the example tests, replace this and add your own tests
  // TODO figure out why this isn't working
  // "spec/qunit-basics"

]);