define(function(require) {

  var $ = require('zepto');
  var app = require('app');

  var namespace = 'network';

  var _status = window.navigator && window.navigator.onLine ? 'online' : 'offline';

  var _onChanged = function(stat) {
    _status = stat;
    app.trigger(namespace + ':' + stat);
    app.trigger(namespace + ':change', stat);
  };

  var withNetwork = function(options) {
    if (_.isFunction(options[_status])) {
      options[_status].apply();
    }
  };

  // Hook into the browser's 'online' and 'offline' events and subsequently fire app:events!
  _.each(['online', 'offline'], function(status) {
    $(window).on(status, function(evt) {
      _onChanged(status);
    });
  });
  
  var exports = {
    'with': withNetwork
  };

  app.registerModule(namespace, exports);

  return exports;

});