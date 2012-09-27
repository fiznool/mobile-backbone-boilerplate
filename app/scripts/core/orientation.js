define(function(require) {

  var $ = require('zepto');
  var app = require('app');

  var namespace = 'orientation';

  var orientation;

  var _normalise = function(o) {
    switch(o) {
    case 0:
    case 180:
      return 'portrait';
    case 90:
    case -90:
      return 'landscape';
    default:
      return 'unknown';
    }
  };

  orientation = _normalise(window.orientation);

  var withOrientation = function(options) {
    if (_.isFunction(options[orientation])) {
      options[orientation].apply();
    }
  };

  // Bind to orientation / resize changes and dispatch events when things change
  $(window).on('orientationchange', function() {
    orientation = _normalise(window.orientation);

    // Trigger both an 'orientation:change' and either
    // 'orientation:portrait' or 'orientation:landscape'
    app.trigger(namespace + ':change', orientation);
    app.trigger(namespace + ':' + orientation);
  });

  var exports = {
    'with': withOrientation
  };

  app.registerModule(namespace, exports);

  return exports;

});