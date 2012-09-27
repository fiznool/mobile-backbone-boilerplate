/**
 * Feature control according to device.
 */
define(function(require) {
  
  var $ = require('zepto');
  var device = require('recognizr');

  // Set CSS classes from recognizr
  var classStr = '';

  if (device.browser.family) {
    classStr += ' ' + device.browser.family;
  }

  if (device.scroll) {
    classStr += ' ' + device.scroll;
  }

  if (device.animations) {
    classStr += ' ' + 'animations';
  }

  // Set the correct class on the root HTML element.
  $('html').addClass(classStr);

  return device;

});