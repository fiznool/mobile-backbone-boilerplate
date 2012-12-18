define(
  [
    "backbone.activities",
    "scaffold",
    "app"
  ],
  function(Backbone, Scaffold, app) {

    var Detail = app.module();

    Detail.Model = Scaffold.Model.extend({
      url: function() {
        return 'api/animals/' + this.get('id') + '.json';
      }
    });

    Detail.Views.Main = Scaffold.View.extend({
      template: 'animal-detail',
      className: 'detail',

      data: function() {
        return this.model.toJSON();
      },

      initialize: function() {
        this.bindTo(this.model, 'change', this.render);
      }
    });

    Detail.Views.Header = Scaffold.View.extend({
      template: 'animal-detail-header',
      className: 'headerbar-inner',
      data: function() {
        return this.model.toJSON();
      },

      initialize: function() {
        this.bindTo(this.model, 'change', this.render);
      }
    });

    return Backbone.Activity.extend({

      'detail': {
        onStart: function(id) {
          this.model = new Detail.Model({id: id});
          this.updateRegions({
            'headerbar': new Detail.Views.Header({ model: this.model }),
            'main': new Detail.Views.Main({ model: this.model })
          });
          this.model.fetch();
        }
      },

      routes: {
        '!/animals/:id': 'detail'
      }

    });

});