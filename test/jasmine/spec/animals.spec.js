define([
  'modules/list'
  ], function(List) {

    describe("animals module", function() {
      it("is structured correctly", function() {
        expect(List).toBeDefined();
        expect(List.Collection).toBeDefined(undefined);
        //expect(List.Collection).toEqual(jasmine.any(Backbone.Collection));
      });

    });

});