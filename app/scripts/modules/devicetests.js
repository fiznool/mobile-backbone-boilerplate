define(function(require) {
  
  var app = require('app');

  app.on('orientation:portrait', function() {
    alert('We are in portrait mode');
  });

  app.on('orientation:landscape', function() {
    alert('We are in landscape mode');
  });

  app.trigger('orientation:with', {
    'portrait': function() {
      alert('We have started the app in portrait mode.');
    },

    'landscape': function() {
      alert('We have started the app in landscape mode.');
    }

  });

  app.on('network:online', function() {
    alert('We are online');
  });

  app.on('network:offline', function() {
    alert('We are offline');
  });

  app.trigger('network:with', {
    'online': function() {
      alert('We have started the app in online mode.');
    },

    'offline': function() {
      alert('We have started the app in offline mode.');
    }

  });

  return {};

});