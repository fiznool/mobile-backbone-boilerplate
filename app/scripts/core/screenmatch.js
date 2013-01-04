define([
    'lodash',
    'enquire',
    'app'
  ], function(_, enquire, app) {

    var listen = function(queries) {
      _.each(queries, function(query, name) {
        enquire.register(query, {
          match: function() {
            app.trigger('screen:resize', name);
            app.trigger('screen:wasresized');
          }
        });
      });

      enquire.listen();

    };

    return {
      listen: listen
    };

});