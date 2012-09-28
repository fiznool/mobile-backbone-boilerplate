// To be used as a temporary storage medium

define(function(require){

  var _ = require('lodash');
  var app = require('app');
  
  // The vault emulates local and session storage but in memory.
  var Vault = function() {};
  
  Vault.prototype.getItem = function(key) {
    return this[key];
  };

  Vault.prototype.setItem = function(key, value) {
    this[key] = value;
  };

  Vault.prototype.removeItem = function(key) {
    delete this[key];
  };

  // Assume all locations are the vault until we know whether
  // local and session storage is available.
  var locations = {
    'memory': new Vault()
  };

  // If private browsing is enabled, local / session storage might
  // not be available, in which case we check on load.
  (function(types) {
    var constant = 'storetest ' + new Date();
    // Try and set something in storage and retrieve it.
    // If it is available, use it.
    // Otherwise we will fall back to in-memory.
    _.each(types, function(type) {
      var store = window[type];
      var test = 'storetest';
      var retrieved;

      try {
        store.setItem(constant, constant);
        retrieved = store.getItem(constant);
        if (retrieved === constant) {
          locations[type] = store;
        }
        store.removeItem(constant);
      } catch (e) {
        // TODO do we want to notify user that storage is unavailable?
        console.warn(type + ' is not available, falling back to in-memory store.');
        locations[type] = new Vault();
      }
    });

  })(['localStorage', 'sessionStorage']);

  var getStore = function(options) {
    var key = (options && options.where)? options.where : 'memory';

    // Normalise the key, just in case
    if (key === 'localstorage') {
      key = 'localStorage';
    }

    if (key === 'sessionstorage') {
      key = 'sessionStorage';
    }

    return locations[key];
  };

  var set = function(key, value, options) {
    var store = getStore(options);
    store.setItem(key, value);
  };

  var withValue = function(key, callback, options){
    var store;
    if (_.isFunction(callback)) {
      store = getStore(options);
      callback.apply(callback, [store.getItem(key)]);
    }
  };

  var remove = function(key, options) {
    var store = getStore(options);
    store.removeItem(key);
  };

  var exports = {
    'with': withValue,
    'save': set,
    'destroy': remove
  };

  app.registerModule('datastore', exports);

  return exports;

});