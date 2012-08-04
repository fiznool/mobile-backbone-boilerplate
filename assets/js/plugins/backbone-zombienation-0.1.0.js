// A small plugin to handle bindings and subviews in Backbone Views.
// Intentionally overrides Backbone.View so you can use it by directly extending Backbone.View.extend({})
// This wouldn't have been possible without the following resources:
//  http://lostechies.com/derickbailey/2011/12/12/composite-js-apps-regions-and-region-managers/
//  http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853#7607853
//  https://github.com/thoughtbot/backbone-support
//
// version 0.1.0

;(function(Backbone) {

  _.extend(this.Backbone.View.prototype, {
    // Use this function to bind any model/collection events.
    // This will track the bindings and allow us to unbind
    // them all when the view is disposed of.
    bindTo: function(obj, evt, callback) {
      // TODO handle non-Backbone object?
      obj.bind(evt, callback, this);

      if (!this.bindings) {
        this.bindings = [];
      }

      this.bindings.push({
        obj: obj,
        evt: evt,
        callback: callback
      });
    },

    // Clear all model/event bindings.
    unbindFromAll: function() {
      var that = this;
      if (this.bindings) {
        _.each(this.bindings, function(binding) {
          // Ensure we pass 'that' so only events on this view are removed
          // Important for app events as unbindFromAll happens after
          // other views have been init'd
          binding.obj.unbind(binding.evt, binding.callback, that);
        });
        this.bindings = null;
      }

    },

    // Completely removes the view from the DOM
    // and removes all event bindings.
    // This will remove this view from memory.
    dispose: function() {
      // Unbind all events that have been bound with bindTo().
      this.unbindFromAll();

      // Unbind all listeners to this view's events.
      this.unbind();

      // Removes this.el from the DOM, destroying all DOM event bindings.
      this.remove();

      // Disposes all subviews
      this.disposeChildren();
      
    },

    addChild: function(child) {
      if (!this.children) {
        this.children = [];
      }
      this.children.push(child);
    },

    disposeChildren: function() {
      _.each(this.children, function(child) {
        if (child.dispose) {
          child.dispose();
        }
      });

      this.children = null;
    }

  });

})(Backbone);