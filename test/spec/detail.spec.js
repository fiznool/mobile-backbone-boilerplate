define([
  'modules/detail'
  ], function(Module) {

    describe("animals detail module", function() {

      it("is structured correctly", function() {
        expect(Module).toBeDefined();
      });

      describe("model", function() {

        it("exists in module", function() {
          expect(Module.Model).toBeDefined();
        });

        it("can be created with default attribute values", function() {
          var m = new Module.Model();
          expect(m.get('id')).toBeNull();
          expect(m.get('name')).toBe('');
          expect(m.get('description')).toBe('');
          expect(m.get('img')).toBe('');
        });

        it("has a defined URL when initiated with an ID", function() {
          var m = new Module.Model({
            id: 1
          });

          expect(m.url).toBeDefined();
          expect(m.url()).toBe('/api/animals/1');
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

          it("has detail-main template", function() {
            expect(v.template).toBe('detail-main');
          });

          it("has detail className", function() {
            expect(v.$el).toHaveClass('detail');
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
            var expected =
              '<div class="detail">' +
                '<img src="" height="177px">' +
                '<p></p>' +
              '</div>';

            v.render().then(function() {
              expect(v.el.outerHTML).toBeHtml(expected);
              done();
            });

          });

          async.it("produces expected HTML with model data", function(done) {
            var expected =
              '<div class="detail">' +
                '<img src="lion.jpg" height="177px">' +
                '<p>King of the Jungle.</p>' +
              '</div>';

            v.model = new Module.Model({
              id: 1,
              name: 'Lion',
              img: 'lion.jpg',
              description: 'King of the Jungle.'
            });

            v.render().then(function() {
              expect(v.el.outerHTML).toBeHtml(expected);
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

            v.model.set({
              id: 1,
              name: 'Lion',
              img: 'lion.jpg',
              description: 'King of the Jungle.'
            });

            expect(v.render).toHaveBeenCalled();

          });

        });

      });

    });

});