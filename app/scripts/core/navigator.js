/**
 * Controls the navigation of the pages within the app.
 */
define(function(require) {
  var $ = require('zepto');
  
  return {

    init: function(options) {
      // We must set a base container element where we attach all views to.
      if (!options.container) {
        throw new Error("Option `container` must be set on page navigator");
      }

      this.container = options.container;

    },

    // Swaps out the current view for the new one,
    // destroying the old view in the process.
    // TODO look into how to handle a page transition here!
    changeView: function(newView) {
      if (this.currentView && this.currentView.dispose) {
        this.currentView.dispose();
      }

      this.currentView = newView;

      // Render the new view into our main DOM element
      // Note this used to use .html() instead of .empty().append()
      // But there is an issue with using .html():
      // http://tbranyen.com/post/missing-jquery-events-while-rendering
      this.currentView.render();
      //$(this.container).html(this.currentView.el);
      $(this.container).empty().append(this.currentView.el);

      // Let the view know we have finished rendering.
      this.currentView.wasRendered();
      
    }

  };

});