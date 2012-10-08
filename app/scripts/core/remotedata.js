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
    var beforeSend = options.beforeSend || noop;
    beforeSend();
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
    var beforeSend = options.beforeSend || noop;
    beforeSend();
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

  var destroy = function(model, options) {
    var complete = options.complete || noop;
    var success = options.success || noop;
    var error = options.error || noop;
    var beforeSend = options.beforeSend || noop;
    beforeSend();
    model.destroy({
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
    var beforeSend = options.beforeSend || noop;
    $.ajax({
      type: 'GET',
      url: url,
      dataType: options.dataType || 'text',
      timeout: options.timeout,
      headers: options.headers,
      async: options.async || true,
      global: options.global || true,
      context: options.context,
      beforeSend: beforeSend,
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
    var beforeSend = options.beforeSend || noop;
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
      beforeSend: beforeSend,
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

  // do an ajax put
  var put = function(url, data, options) {
    var complete = options.complete || noop;
    var success = options.success || noop;
    var error = options.error || noop;
    var beforeSend = options.beforeSend || noop;
    $.ajax({
      type: 'PUT',
      data: data,
      url: url,
      contentType: options.contentType,
      dataType: options.dataType,
      timeout: options.timeout,
      headers: options.headers,
      async: options.async,
      global: options.global,
      context: options.context,
      beforeSend: beforeSend,
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

  // do an AJAX delete
  var del = function(url, options) {
    var complete = options.complete || noop;
    var success = options.success || noop;
    var error = options.error || noop;
    var beforeSend = options.beforeSend || noop;
    $.ajax({
      type: 'DELETE',
      url: url,
      dataType: options.dataType || 'text',
      timeout: options.timeout,
      headers: options.headers,
      async: options.async || true,
      global: options.global || true,
      context: options.context,
      beforeSend: beforeSend,
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
    destroy: destroy,
    get: get,
    post: post,
    put: put,
    'delete': del
  };

  app.registerModule('data', exports);

  return exports;

});