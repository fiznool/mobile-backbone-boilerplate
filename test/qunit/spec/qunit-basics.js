define(function(require) {
  var $ = require('zepto');
         
  module ("QUnit Testing basics");

  var myString = "Hello Backbone.js";
  test( "Our first QUnit test - asserting results", 2, function(){
    // ok( boolean, message )
    ok( true, "the test succeeds");
    //ok( false, "the test fails");
    // equal( actualValue, expectedValue, message )
    equal( myString, "Hello Backbone.js", "The value expected is Hello Backbone.js!");
  });

  test( "deepEqual", 4, function() {
    var actual = {q: "foo", t: "bar"};
    var el =  $("div");
    var children = $("div").children();
    notEqual( actual, {q: "foo", t: "bar"},   "fails - objects are not equal using equal()" );
    deepEqual( actual, {q: "foo", t: "bar"},   "passes - objects are equal" );
    notEqual( el, children, "fails - jQuery objects are not the same" );
    notDeepEqual(el, children, "fails - objects not equivalent" );
  });

  test( "notDeepEqual", 2, function() {
    var actual = {q: "foo", t: "bar"};
    notEqual( actual, {q: "foo", t: "bar"},   "passes - objects are not equal" );
    deepEqual( actual, {q: "foo", t: "bar"},   "fails - objects are equivalent" );
  });

  test( "raises", 1, function() {
    raises(function() {
      throw new Error( "Oh no! It's an error!" );
    }, "passes - an error was thrown inside our callback");
  });

  function reverseString( str ){
      return str.split("").reverse().join("");
  }
  test( "reverseString()", 5, function() {
      equal( reverseString("hello"), "olleh", "The value expected was olleh" );
      equal( reverseString("foobar"), "raboof", "The value expected was raboof" );
      equal( reverseString("world"), "dlrow", "The value expected was dlrow" );
      notEqual( reverseString("world"), "dlroo", "The value was expected to not be dlroo" );
      equal( reverseString("bubble"), "elbbub", "The value expected was elbbub" );
  });

  var messageUrl = "test/qunit/spec/message.json";

  asyncTest("An async test", 1, function() {
    $.ajax({
      url: messageUrl,
      dataType: "json",
      success: function( data ){
        deepEqual(data, {
           topic: "hello",
           message: "hi there!"
        });
        start();
      }
    });
  });

  asyncTest("An async test with a Sinon spy", 1, function() {
    var callback = this.spy();

    $.ajax({
      url: messageUrl,
      dataType: "json",
      success: callback,
      complete: function() {
        ok(callback.called);
        start();
      }
    });
  });

  test("test with a named Sinon spy", 3, function() {
    this.spy($, "ajax");
    $.getJSON(messageUrl);
    ok($.ajax.calledOnce);
    strictEqual($.ajax.getCall(0).args[0].url, messageUrl);
    strictEqual($.ajax.getCall(0).args[0].dataType, "json");
  });

  
});