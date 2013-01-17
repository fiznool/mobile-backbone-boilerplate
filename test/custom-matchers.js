// Custom matchers
beforeEach(function() {
  this.addMatchers({
    toBeHtml: function(html) {
      var actual = this.actual.replace(/\n/g, '');
      var expected = jasmine.JQuery.browserTagCaseIndependentHtml(html.replace(/\n/g, ''));

      this.message = function() {
        return "Expected " + actual + " to be " + expected;
      };

      return actual === expected;
    }
  });
});