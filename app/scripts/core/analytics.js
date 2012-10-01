// Tracks page views using google analytics.
// Full API for GA can be found at https://developers.google.com/analytics/devguides/collection/gajs/methods/
define(function(require) {

  var app = require('app');

  var ctx = window;

  // GA uses a global variable _gaq which can't be changed or made local.
  // It is a simple array until the script has loaded.
  var _gaq = ctx._gaq = [];
  _gaq.push(['_setAccount', app.analyticsID]);
  
   // Track the page view using GA.
  var trackPageview = function(frag) {
    ctx._gaq.push(['_trackPageview', frag]);
  };

  // Track a custom event.
  // See https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiEventTracking#_gat.GA_EventTracker_._trackEvent
  var trackEvent = function(options) {
    ctx._gaq.push(['trackEvent', 
      options.category,
      options.action,
      options.label || undefined,
      options.value || undefined ]);
  };
  
  // Load GA script into document
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);

  var exports = {
    trackPageview: trackPageview,
    trackPageView: trackPageview, // Guard against case differences
    trackEvent: trackEvent
  };

  app.registerModule('analytics', exports);

  // When calling GA, it would be a good idea to only track if we have network access,
  // as GA doesn't handle offline events very well.
  // E.g.
  //   app.trigger('network:ifonline', function() {
  //     app.trigger('analytics:trackPageview', frag);
  //   });

  return exports;

});