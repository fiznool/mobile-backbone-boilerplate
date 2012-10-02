// Alert box, singleton view which sits above main content.
// Styled and controlled by the Twitter Bootstrap alert component.
// Activate it through app.trigger('alert:show')
// and hide with app.trigger('alert:hide').
define(function(require) {

  var _ = require('lodash');
  var app = require('app');
  var device = require('core/device');
  var Scaffold = require('core/scaffold');
  
  // Ensure we have the bootstrap alert plugin
  require('bootstrap-alert');

  // Private variables
  var isOnScreen = false;
  var timerId = null;

  var setTimer = function(callback, interval) {
    if (!timerId) {
      timerId = setTimeout(callback, interval);
    }
  };

  var clearTimer = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  var Model = Scaffold.Model.extend({
    defaults: {
      type: 'info', // success|error|info
      title: '',
      body: '',
      tapToDismiss: true,
      timeout: 0,     // auto-dismiss timeout in milliseconds, 0 is never
      popover: false  // Whether alert should pop over content or sit inline
    },

    parse: function(resp) {
      // Defult classname is bootstrap's alert
      var cls = 'alert alert-block';

      // Change type according to model
      if (resp.type) {
        cls += ' alert-' + resp.type;
      }

      // If we support animations, allow alert to fade
      if (device.animations) {
        cls += ' fade';
      }

      resp.alertCls = cls;

      return resp;
    }
  });

  var View = Scaffold.View.extend({

    timerId: null,

    template: _.template(require('text!templates/core/alert.jst')),

    events: {
      'tap': 'onTap'
    },

    // Override this only if we are the right sort of alert
    onTap: function() {
      if(this.model.get("tapToDismiss")) {
        this.hide();
      }
    },

    render: function(data) {
      // Render the alert with the data
      this.model = new Model(data, { parse: true });
      
      var body = '';
      var list = this.model.get('list');

      if (list) {
        // Create a ul and loop through adding li
        body += '<ul class="bullets">';
        _.each(list, function(item) {
          body += '<li>' + item + '</li>';
        });
        body += '</ul>';

        this.model.set('body', (this.model.get('body') + body), {
          silent: true
        });
      }

      // Render the DOM
      this.$el.html(this.template(this.model.toJSON()));

    },

    show: function(data) {

      // Make sure alert timer is stopped
      clearTimer();

      this.render(data);

      if(this.model.get("tapToDismiss")){
        // Show the close button.
        this.$el.find('.close').removeClass('hidden');
      }

      // If we are a popover, add the class.
      if (this.model.get('popover')) {
        this.$el.addClass('popover');
      }

      // Bind the alert to the bootstrap-alert plugin and show it
      this.$el.find('.alert')
        .alert()
        .addClass('in');
      
      isOnScreen = true;

      // After showing, dismiss after [timeout] seconds
      var timeout = this.model.get('timeout');
      if (timeout > 0) {
        setTimer(_.bind(this.hide, this), timeout);
      }
    },

    hide: function() {
      // Cleanup the alert, ready for its next outing.
      clearTimer();

      // Hide the alert using the bootstrap-alert plugin
      this.$el.find('.alert')
        .on('closed', _.bind(this.onClosed, this))
        .alert('close');
    },

    // When the alert is completely hidden, clean it up.
    onClosed: function() {
      isOnScreen = false;
      this.$el.removeClass('popover');
      this.$el.empty();
    }

  });

  return function(options) {
    // Create alert and bind events
    var alert = new View(options);

    app.registerModule('alert', {
      'show': alert.show,
      'hide': alert.hide
    }, alert);

    return alert;

  };

});