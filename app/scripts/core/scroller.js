define(function(require) {

  var $ = require('jquery');
  var device = require('recognizr');
  var iScroll = require('iscroll');

  var scroller = null;

  var init = function() {};
  var refresh = function() {};

  if(device.scroll === 'polyfillscroll') {

    init = function(container) {
      if (scroller) {
        scroller.destroy();
      }
      
      scroller = new iScroll(container);
    };
    
    refresh = function() {
      if (scroller) {
        scroller.refresh();
      }
    };

    // Make sure iScroll re-initialises when page is resized
    $(window).on('orientationchange resize', function() {
      setTimeout(refresh, 400);
    });

  }

  return {
    init: init,
    refresh: refresh
  };

});