define(function(require) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var scroller = require('scroller');

  var container, scrollWrapper, currentView;

  var unwrap = function(el) {
    return el instanceof $ ? el[0] : el;
  };
  
  var init = function(options) {
    if (!options.container) {
      throw new Error("Option `container` must be set on router");
    }

    if (!options.scrollWrapper) {
      throw new Error("Option `scrollWrapper` must be set on router");
    }

    container = unwrap(options.container);
    scrollWrapper = unwrap(options.scrollWrapper);

    scroller.init(scrollWrapper);

  };

    // Swaps out the current view for the new one,
    // destroying the old view in the process.
    // TODO look into how to handle transition here!
  var changeView = function(newView) {
    if (currentView){
      currentView.dispose();
    }

    currentView = newView;

    // Render the new view into our main DOM element
    // Remmeber to set mainEl on the Router when creating!
    currentView.render();
    $(container).html(currentView.el);

    currentView.wasUpdated();

  };

  return {
    init: init,
    changeView: changeView
  };

});