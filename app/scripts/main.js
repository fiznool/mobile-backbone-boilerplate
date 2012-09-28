define(function(require) {

  // Libs
  var $ = require('zepto');
  var FastClick = require('fastclick');

  // Core, comment out bits you don't need
  // Each registers with app events
  require('core/device');
  require('core/remotedata');
  require('core/orientation');
  require('core/network');
  require('core/datastore');

  var Toolbar = require('components/toolbar');

  // App-specific
  var app = require('app');
  var Router = require('router');

  
  // Treat the jQuery ready function as the entry point to the application.
  // Inside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  $(function() {

    // Cache the DOM elements for later use
    var $el = {
      app: $('#app'),
      headerbar: $('#headerbar'),
      footerbar: $('#footerbar'),
      content: $('#content')
    };

    // Create the header and footer modules
    new Toolbar({
      'headerbar': $el.headerbar,
      'footerbar': $el.footerbar
    });

    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
    app.router = new Router({
      // Define your container div where all content will be displayed.
      container: $("#content")
    });

    // Prevent 300ms tap delay
    new FastClick($el.app[0]);

    // Uncomment to test components
    // require('modules/devicetests');

    // Trigger the initial route
    // At this point, all dependencies required above will be loaded
    // This means all event modules will be registered and ready to be triggered
    Backbone.history.start();
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {
    // Get the absolute anchor href.
    var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };
    // Get the absolute root.
    var root = location.protocol + "//" + location.host + app.root;

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways. The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, true);
    }
  });

});
