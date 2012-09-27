define(function(require) {

  var $ = require('zepto');
  var app = require('app');

  var namespace = 'orientation';

  var _normalise = function() {
    switch(window.orientation) {
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

  var _orientation = _normalise(window.orientation);

  var withOrientation = function(options) {
    if (_.isFunction(options[_orientation])) {
      options[_orientation].apply();
    }
  };

  // Bind to orientation / resize changes and dispatch events when things change
  $(window).on('orientationchange', function() {
    _orientation = _normalise(window.orientation);

    // Trigger both an 'orientation:change' and either
    // 'orientation:portrait' or 'orientation:landscape'
    app.trigger(namespace + ':change', _orientation);
    app.trigger(namespace + ':' + _orientation);
  });

  var exports = {
    'with': withOrientation
  };

  app.registerModule(namespace, exports);

  return exports;

});