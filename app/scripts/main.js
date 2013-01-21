require(
  [
    "jquery",
    "fastclick",
    "app",
    "router",
    "scaffold",
    "core/device",
    "tappivate",
    "core/screenmatch"
  ],

  function($, FastClick, app, Router, Scaffold, device, tappivate, screenmatch) {

    $(function() {
      // Define the regions in the page; create a Region for each by passing
      // in the parent element.
      var regions = {
        'headerbar': new Scaffold.Region({ el: '#headerbar' }),
        'main': new Scaffold.Region({ el: '#main' })
      };

      // Set up the router for the application and pass in the regions.
      app.router = new Router({
        regions: regions,
        el: '#app'
      });

      // Setup FastClick to prevent 300ms button delay
      new FastClick(document.getElementById('app'));

      // Setup tappivate to mimic native button taps
      $('#app').tappivate();

      // Setup ScreenMatch to listen for media query changes
      app.on('screen:resize', app.router.setLayout, app.router);

      screenmatch.listen({
        'one-pane': 'screen and (max-width: 480px)',
        'two-pane': 'screen and (min-width: 481px)'
      });

      // Trigger the initial route, set the
      // root folder to '' by default.  Change in app.js.
      Backbone.history.start({ pushState: false, root: app.root });

    });


    // All navigation that is relative should be passed through the navigate
    // method, to be processed by the router. If the link has a `data-bypass`
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
        // calls this anyways.  The fragment is sliced from the root.
        Backbone.history.navigate(href.attr, true);
      }
    });

});