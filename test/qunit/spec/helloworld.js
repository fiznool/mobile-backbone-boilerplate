define(function(require) {

  var       libs = require('core/libs'),
               $ = libs.$,
      HelloWorld = require('modules/button-test/main');

  module("HelloWorld Backbone Model");

  test("Can be instantiated", 2, function() {
    ok(HelloWorld.Model, "Model exists in HelloWorld object");
    ok(new HelloWorld.Model(), "Model can be instantiated");
  });

  test("Is created with default values for its attributes", 1, function() {
    var model = new HelloWorld.Model();
    equal(model.get("hello"), "world", "Expected attribute 'hello' to return 'world'");
  });


  module("HelloWorld Backbone Collection");

  test("Can be instantiated", 2, function() {
    ok(HelloWorld.Collection, "Collection exists in HelloWorld object");
    ok(new HelloWorld.Collection(), "Collection can be instantiated");
  });

  test("Can add Model instances as objects and arrays", 4, function() {
    var helloWorlds = new HelloWorld.Collection();
    equal(helloWorlds.length, 0, "Expected initial collection length to equal 0");

    helloWorlds.add( { "hello": "is it me you're looking for..." } );
    equal(helloWorlds.length, 1, "Expected collection to equal 1");

    helloWorlds.add([
      {
        "hello": "is it me you're looking for...",
        "goodbye": "maybe not!"
      },
      {}
    ]);
    equal(helloWorlds.length, 3, "Expected collection to equal 3");
    equal(helloWorlds.at(0).get("hello"), "is it me you're looking for...",
              "Expected first object in collection to contain {'hello': 'is it me you're looking for...'}");
  });

});
