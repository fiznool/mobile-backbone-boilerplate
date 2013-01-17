require(
  [
    '../app/scripts/config',
    { paths: { spec: "../../test/spec" } },

    // Put your test specs here
    "spec/animals.spec"
  ],

  function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
      return htmlReporter.specFilter(spec);
    };

    jasmineEnv.execute();

  });