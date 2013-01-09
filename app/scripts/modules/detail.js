define([
    "scaffold",
    "app"
  ],
  function(Scaffold, app) {

    var Detail = app.module();

    Detail.Model = Scaffold.Model.extend({
      url: function() {
        return '/api/animals/' + this.get('id');
      }
    });

    Detail.Views.Main = Scaffold.View.extend({
      template: 'detail-main',
      className: 'detail',

      serialize: function() {
        return this.model.toJSON();
      },

      initialize: function() {
        this.bindTo(this.model, 'change', this.render);
      }
    });

    Detail.Views.Topbar = Scaffold.View.extend({
      template: 'detail-topbar',
      className: 'headerbar-inner',
      data: function() {
        return this.model.toJSON();
      },

      initialize: function() {
        this.bindTo(this.model, 'change', this.render);
      }
    });

    return Detail;

});