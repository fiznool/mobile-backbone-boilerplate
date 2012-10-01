;(function($) {

  // Others may be availabe from http://blog.pamelafox.org/2011/11/porting-from-jquery-to-zepto.html

  // For TwBootstrap
  $.support = $.support || {};  
  
  Event.prototype.isDefaultPrevented = function() {
    return this.defaultPrevented;
  };

  window.jQuery = $;



})(window.Zepto);