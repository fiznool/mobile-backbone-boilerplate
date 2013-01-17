// Tests are derived from the excellent book by Addy Osmani
// http://addyosmani.github.com/backbone-fundamentals/#unit-testing-backbone-applications-with-jasmine
define([
  'modules/list'
  ], function(List) {

    describe("animals list module", function() {

      it("is structured correctly", function() {
        expect(List).toBeDefined();
      });

      describe("collection", function() {
        it("exists in list module", function() {
          expect(List.Collection).toBeDefined();
        });

        it("has a defined URL", function() {
          var c = new List.Collection();
          expect(c.url).toBeDefined();
          expect(c.url).toBe('/api/animals');
        });
      });

      describe("main view", function() {
        var v;

        describe("scaffolding", function() {
          beforeEach(function() {
            v = new List.Views.Main();
          });

          afterEach(function() {
            v = null;
          });

          it("exists in list module", function() {
            expect(List.Views).toBeDefined();
            expect(List.Views.Main).toBeDefined();
          });

          it("has ul tagname", function() {
            expect(v.tagName).toBe('ul');
            expect(v.el.tagName.toLowerCase()).toBe('ul');
            expect(v.$el).toBe('ul');
          });

          it("has list-main template", function() {
            expect(v.template).toBe('list-main');
          });

          it("has list className", function() {
            expect(v.className).toBe('list');
            expect(v.$el).toHaveClass('list');
          });

          it("has data-tap=list attribute", function() {
            expect(v.attributes).toBeDefined();
            expect(v.attributes['data-tap']).toBeDefined();
            expect(v.attributes['data-tap']).toBe('list');
            expect(v.$el).toHaveAttr('data-tap', 'list');
          });

          it("must create an empty collection if none is defined", function() {
            expect(v.collection).toBeDefined();
          });

          it("must use an existing collection if one is defined", function() {
            var c = new List.Collection();
            expect(v.collection).not.toBe(c);

            v = new List.Views.Main({ collection: c });
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
            v = new List.Views.Main();
          });

          afterEach(function() {
            v = null;
          });

          async.it("produces an empty list with no collection data", function(done) {
            v.render().then(function() {
              expect(v.el.outerHTML).toBe('<ul data-tap="list" class="list"></ul>');
              done();
            });

          });

          async.it("produces a list with some collection data", function(done) {
            v.collection = new List.Collection([
              { name: 'Lion', id: 'lion' },
              { name: 'Badger', id: 'badger'}
            ]);

            v.render().then(function() {
              expect(v.el.innerHTML).toBe('<li><a href="#!/animals/lion">Lion</a></li><li><a href="#!/animals/badger">Badger</a></li>');
              done();
            });

          });

          it("renders when collection changes", function() {
            var done = false;

            spyOn(v, 'render');

            // To test Backbone events, you should put all your
            // 'listenTo' calls in a separate function.
            // This is so that the spy setup above can be re-bound
            // to the Backbone event by calling stopListening
            // and then startListening again.
            // Without this call, render cannot be spied on.
            v.stopListening();
            v.startListening();

            v.collection.reset([
              { name: 'Lion', id: 'lion' },
              { name: 'Badger', id: 'badger'}
            ]);

            expect(v.render).toHaveBeenCalled();

          });

        });

      });

    });

});