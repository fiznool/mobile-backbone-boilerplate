define(
  [
    "lodash",
    "backbone.super",
    "backbone.layoutmanager"
  ],
  function(_, Backbone, layoutmanager) {

    var Scaffold = {
      Model: Backbone.Model.extend({}),

      Collection: Backbone.Collection.extend({}),

      View: Backbone.View.extend({

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

        cleanup: function() {
          this.unbindFromAll();
          if (_.isFunction(this.dispose)) {
            this.dispose();
          }
        },

        // Default serialize function, if a model exsits.
        serialize: function() {
          var data;
          if (this.model) {
            data = this.model.toJSON();
          }
          return data;
        }
      })
    };

    return Scaffold;
});
