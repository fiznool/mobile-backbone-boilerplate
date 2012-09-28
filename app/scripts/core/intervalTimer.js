// mubaloo.timer.js v2.0
define(function(require) {

  var Backbone = require('backbone');

  var Timer = function() {
    _.extend(this, Backbone.Events);
    this._timer = undefined;
    this._delay = undefined;
    this._isRunning = false;
  };

  Timer.prototype._onInterval = function() {
    clearInterval(this._timer);
    this._isRunning = false;
    this.trigger('interval');
  };

  Timer.prototype.resume = function(silent) {
    var self = this;
    if(this._isRunning) {
      return;
    }
    this._timer = setInterval(function() {
      self._onInterval();
    }, this._delay);
    this._isRunning = true;
    if(!silent) {
      this.trigger('resume');
    }
  };

  Timer.prototype.cancel = function(silent) {
    this.pause(true);
    if(!silent) {
      this.trigger('cancel');
    }
  };

  Timer.prototype.pause = function(silent) {
    clearInterval(this._timer);
    this._isRunning = false;
    if(!silent) {
      this.trigger('pause');
    }
  };

  Timer.prototype.start = function(delay) {
    var self = this;
    clearInterval(this._timer);
    this._delay = delay;
    this._timer = setTimeout(function() {
      self._onFinished();
    }, this._delay);
    this._isRunning = true;
    this.trigger('start');
  };

  Timer.prototype.isRunning = function() {
    return this._isRunning;
  };

  return Timer;
});