/**
 *
 */
define(function(require) {
  
  var $ = require('zepto');
  var app = require('app');
  var noop = function() {};

  // fetch model
  var fetch = function(model, options) {
    var complete = options.complete || noop;
    var success = options.success || noop;
    var error = options.error || noop;
    model.fetch({
      success: function(model, response) {
        success(model, response);
        complete();
      },
      error: function(model, response) {
        error(model, response);
        complete();
      }
    });
  };

  var save = function(model, options) {
    var complete = options.complete || noop;
    var success = options.success || noop;
    var error = options.error || noop;
    model.save({
      wait: options.wait,
      success: function(model, response) {
        success(model, response);
        complete();
      },
      error: function(model, response) {
        error(model, response);
        complete();
      }
    });
  };

  // do an AJAX get
  var get = function(url, options) {
    var complete = options.complete || noop;
    var success = options.success || noop;
    var error = options.error || noop;
    $.ajax({
      type: 'GET',
      url: url,
      dataType: options.dataType || 'text',
      timeout: options.timeout,
      headers: options.headers,
      async: options.async || true,
      global: options.global || true,
      context: options.context,
      success: function(data, status, xhr) {
        success(data);
        complete();
      },
      error: function(xhr) {
        error(xhr.responseText);
      },
      complete: complete
    });
  };

  // don an AJAX post
  var post = function(url, data, options) {
    var complete = options.complete || noop;
    var success = options.success || noop;
    var error = options.error || noop;
    $.ajax({
      type: 'POST',
      data: data,
      url: url,
      contentType: options.contentType,
      dataType: options.dataType,
      timeout: options.timeout,
      headers: options.headers,
      async: options.async,
      global: options.global,
      context: options.context,
      success: function(data, status, xhr) {
        success(data);
        complete();
      },
      error: function(xhr) {
        error(xhr.responseText);
      },
      complete: complete
    });
  };

  var exports = {
    fetch: fetch,
    save: save,
    get: get,
    post: post
  };

  app.registerModule('data', exports);

  return exports;

});