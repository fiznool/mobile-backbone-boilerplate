define([
    "backbone.activities",
    "modules/list",
    "modules/detail"
  ],
  function(Backbone, List, Detail) {

    var ListHandler = Backbone.ActivityRouteHandler.extend({
      onStart: function() {
        // Render the data when the activity starts
        this.updateRegions({
          'headerbar': new List.Views.Topbar(),
          'main': new List.Views.Main({
            collection: this.activity.data.list
          })
        });

      }
    });

    var DetailHandler = Backbone.ActivityRouteHandler.extend({

      onStart: function(id) {
        this.model = new Detail.Model({id: id});
        this.activity.updateSelection(id);
        this.model.fetch();
      },

      onStop: function() {
        // Forget the model state
        this.model = null;  // Garbage collect model in Topbar and Main views
        delete this.model;  // Remove model from this handler
      },

      layouts: {

        'one-pane': function() {
          this.updateRegions({
            'headerbar': new Detail.Views.Topbar({ model: this.model }),
            'main': new Detail.Views.Main({ model: this.model })
          });
        },

        'two-pane': function() {
          this.updateRegions({
            'headerbar': new Detail.Views.Topbar({ model: this.model }),
            'main': {
              template: 'region-two-pane',
              views: {
                '.list-view': new List.Views.Main({
                  collection: this.activity.data.list
                }),
                '.detail-view': new Detail.Views.Main({
                  model: this.model
                })
              }
            }
          });
        }
      }
    });

    var Activity = Backbone.Activity.extend({
      data: {
        list: undefined,
        selection: undefined,
        detail: undefined
      },

      initialize: function() {
        // set up the data to be used in the activity
        this.data.list = new List.Collection();
        this.data.selection = undefined;
        this.data.list.on('reset', function() {
          this.updateSelection(this.data.selection);
        }, this);
      },

      updateSelection: function(id) {

        // set the 'selected' attribute on the model with the given id
        // calling without an id removes the selection
        this.data.selection = parseInt(id, 10);

        this.data.list.each(function(model) {
          model.set('selected', model.id === this.data.selection, {
            silent: true
          });
        }, this);
      },

      onCreate: function() {
        // fetch the data when we first land on animals
        this.data.list.fetch();
      },

      routes: {
        '!/animals': new ListHandler(),
        '!/animals/:id': new DetailHandler()
      }
    });

    return Activity;
});