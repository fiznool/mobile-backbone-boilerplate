define([
  'order!energize',
  'order!zepto',
  'order!underscore',
  'order!backbone'
], function() {

  // Tries to remove the library from global scope once it has been required.
  var tryNoConflict = function(lib) {
    if (lib && (typeof lib.noConflict === 'function')) {
      return lib.noConflict();

    } else {
      return lib;
    }
  };

  // Provide Mustache-like syntax for templating.
  _.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g
  };

  // Extend Backbone to clear up Views when they are removed
  

  return {
    $: tryNoConflict($),
    _: tryNoConflict(_),
    backbone: tryNoConflict(Backbone)
  };

});