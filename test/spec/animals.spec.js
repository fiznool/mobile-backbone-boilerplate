// Tests are derived from the excellent book by Addy Osmani
// http://addyosmani.github.com/backbone-fundamentals/#unit-testing-backbone-applications-with-jasmine
define([
  'scaffold',
  'modules/list'
  ], function(Scaffold, List) {

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

        describe("rendering", function() {

          beforeEach(function() {
            v = new List.Views.Main();
          });

          afterEach(function() {
            v = null;
          });

          it("produces an empty list with no collection data", function() {
            // We must use the async style as rendering is done using promises.
            // http://lostechies.com/derickbailey/2012/08/18/jasmine-async-making-asynchronous-testing-with-jasmine-suck-less/
            var done = false;

            runs(function() {
              v.render().then(function() {
                expect(v.el.outerHTML).toBe('<ul data-tap="list" class="list"></ul>');
                done = true;
              });
            });

            waitsFor(function() { return done; });

          });

          it("produces a list with some collection data", function() {
            var done = false;

            v.collection = new List.Collection([
              { name: 'Lion', id: 'lion' },
              { name: 'Badger', id: 'badger'}
            ]);

            runs(function() {
              v.render().then(function() {
                expect(v.el.innerHTML).toBe('<li><a href="#!/animals/lion">Lion</a></li><li><a href="#!/animals/badger">Badger</a></li>');
                done = true;
              });
            });

            waitsFor(function() { return done; });

          });

          it("renders when collection changes", function() {
            var done = false;

            //spyOn(v, 'render');
            spyOn(v, 'render');

            v.collection.reset([
              { name: 'Lion', id: 'lion' },
              { name: 'Badger', id: 'badger'}
            ]);

            expect(v.render).toHaveBeenCalled();

            //expect(v.serialize).toHaveBeenCalled();
            //expect(v.render).toHaveBeenCalled();
          });

        });

      });
      /*
      it("renders the view with correct data", function() {
        var collection = new List.Collection();
        var view = new List.Views.Main({
          el: '#sandbox',
          collection: collection
        });

        spyOn(view, 'render');
        spyOn(view, 'serialize');

        collection.reset([
          { name: 'Lion', href: 'lion' },
          { name: 'Badger', href: 'badger'}
        ]);

        expect(view.serialize).toHaveBeenCalled();
        expect(view.render).toHaveBeenCalled();

      });
      */
    });

});