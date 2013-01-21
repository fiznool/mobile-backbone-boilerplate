// This is a skeleton spec, designed to be reused to ensure that the
// most common characteristics of a module are tested.

// Tests are derived from the excellent book by Addy Osmani
// http://addyosmani.github.com/backbone-fundamentals/#unit-testing-backbone-applications-with-jasmine

define([
  'modules/example'
  ], function(Module) {

    describe("example module", function() {

      it("is structured correctly", function() {
        expect(Module).toBeDefined();
      });

      describe("model", function() {

        it("exists in module", function() {
          expect(Module.Model).toBeDefined();
        });

        it("can be created with default attribute values", function() {
          var m = new Module.Model();
          expect(m.get('example').toBe(''));
        });

        it("has a defined URL", function() {
          var m = new Module.Model();
          expect(m.url).toBeDefined();
          expect(m.url).toBe('/example/url');
        });

        it("will follow validation rules", function() {
          var errorCallback = jasmine.createSpy('-error event callback-');

          var m = new Module.Model();

          m.on('error', errorCallback);

          m.set('a_boolean_value', 'a_non_boolean_string');

          var errorArgs = errorCallback.mostRecentCall.args;
          expect(errorArgs).toBeDefined();
          expect(errorArgs[0].toBe(m));
          expect(errorArgs[1]).toBe('Model.a_boolean_value must be a boolean value');

        });

      });

      describe("collection", function() {
        it("exists in module", function() {
          expect(Module.Collection).toBeDefined();
        });

        it("has a defined URL", function() {
          var c = new Module.Collection();
          expect(c.url).toBeDefined();
          expect(c.url).toBe('/example/url');
        });
      });

      describe("main view", function() {
        var v;

        it("exists in module", function() {
          expect(Module.Views).toBeDefined();
          expect(Module.Views.Main).toBeDefined();
        });

        describe("scaffolding", function() {
          beforeEach(function() {
            v = new Module.Views.Main();
          });

          afterEach(function() {
            v = null;
          });

          it("has div root element", function() {
            expect(v.$el).toBe('div');
          });

          it("has main template", function() {
            expect(v.template).toBe('main');
          });

          it("has example className", function() {
            expect(v.$el).toHaveClass('example');
          });

          it("has example attribute", function() {
            expect(v.$el).toHaveAttr('data-example', 'example');
          });

          it("must create an empty model if none is defined", function() {
            expect(v.model).toBeDefined();
          });

          it("must use an existing model if one is defined", function() {
            var m = new Module.Model();
            expect(v.model).not.toBe(m);

            v = new Module.Views.Main({ model: m });
            expect(v.model).toBe(m);
          });

          it("must create an empty collection if none is defined", function() {
            expect(v.collection).toBeDefined();
          });

          it("must use an existing collection if one is defined", function() {
            var c = new Module.Collection();
            expect(v.collection).not.toBe(c);

            v = new Module.Views.Main({ collection: c });
            expect(v.collection).toBe(c);
          });

        });

        // LayoutManager uses promises for rendering.
        // We need to wait for the promise to be resolved before
        // testing that rendering has worked correctly.
        // For this, we use the jasmine Async plugin:
        // http://lostechies.com/derickbailey/2012/08/18/jasmine-async-making-asynchronous-testing-with-jasmine-suck-less/
        describe("rendering", function() {

          var async = new AsyncSpec(this);

          beforeEach(function() {
            v = new Module.Views.Main();
          });

          afterEach(function() {
            v = null;
          });

          async.it("produces expected HTML with no data", function(done) {
            v.render().then(function() {
              expect(v.el.outerHTML).toBe('<div class="example" data-example="example"></div>');
              done();
            });

          });

          async.it("produces expected HTML with model data", function(done) {
            v.model = new Module.Model({
              // Some data goes here
            });

            v.render().then(function() {
              expect(v.el.outerHTML).toBeHtml('Put expected HTML here');
              done();
            });

          });

          async.it("produces expected HTML with collection data", function(done) {
            v.collection = new Module.Collection([
              // Some data goes here
            ]);

            v.render().then(function() {
              expect(v.el.outerHTML).toBeHtml('Put expected HTML here');
              done();
            });

          });

          it("renders when model changes", function() {
            spyOn(v, 'render');

            // To test Backbone events, you should put all your
            // 'listenTo' calls in a separate function.
            // This is so that the spy setup above can be re-bound
            // to the Backbone event by calling stopModuleening
            // and then startModuleening again.
            // Without this call, render cannot be spied on.
            v.stopListening();
            v.startListening();

            v.collection.model.set({
              // Some data goes here
            });

            expect(v.render).toHaveBeenCalled();

          });

          it("renders when collection changes", function() {
            spyOn(v, 'render');

            // To test Backbone events, you should put all your
            // 'listenTo' calls in a separate function.
            // This is so that the spy setup above can be re-bound
            // to the Backbone event by calling stopModuleening
            // and then startModuleening again.
            // Without this call, render cannot be spied on.
            v.stopListening();
            v.startListening();

            v.collection.reset([
              // Some data goes here
            ]);

            expect(v.render).toHaveBeenCalled();

          });

        });

      });

    });

});