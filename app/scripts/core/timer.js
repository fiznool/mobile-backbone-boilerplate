// mubaloo.timer.js v2.0
define(function(require) {

  var Backbone = require('backbone');

  var Timer = function() {
    _.extend(this, Backbone.Events);
    this._timer = undefined;
    this._delay = undefined;
    this._remainingTime = 0;
    this._startTime = undefined;
    this._isRunning = false;
  };

  Timer.prototype._onFinished = function() {
    clearTimeout(this._timer);
    this._isRunning = false;
    this._remainingTime = 0;
    this.trigger('timeout');
  };

  Timer.prototype.resume = function(silent) {
    var self = this;
    if(this._isRunning || this._remainingTime <= 0) {
      return;
    }
    this._startTime = new Date() - (this._delay - this._remainingTime);
    this._timer = setTimeout(function() {
      self._onFinished();
    }, this._remainingTime);
    this._isRunning = true;
    if(!silent) {
      this.trigger('resume');
    }
  };

  Timer.prototype.cancel = function(silent) {
    this.pause(true);
    this._remainingTime = 0;
    if(!silent) {
      this.trigger('cancel');
    }
  };

  Timer.prototype.pause = function(silent) {
    clearTimeout(this._timer);
    this._remainingTime = Math.max(0, this._delay - (new Date() - this._startTime));
    this._isRunning = false;
    if(!silent) {
      this.trigger('pause');
    }
  };

  Timer.prototype.start = function(delay) {
    var self = this;
    this._startTime = new Date();
    clearTimeout(this._timer);
    this._delay = delay;
    this._remainingTime = undefined;
    this._timer = setTimeout(function() {
      self._onFinished();
    }, this._delay);
    this._isRunning = true;
    this.trigger('start');
  };

  Timer.prototype.getRemainingTime = function() {
    if (this._isRunning) {
      return Math.max(0, this._delay - (new Date() - this._startTime));
    }
    else {
      return this._remainingTime;
    }
  };

  Timer.prototype.isRunning = function() {
    return this._isRunning;
  };

  return Timer;
});