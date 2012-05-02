require.config({

  baseUrl: 'app',

	paths: {
    // libs
    zepto:      '../assets/js/libs/zepto-1.0rc1',
    underscore: '../assets/js/libs/underscore-1.3.1',
    backbone:   '../assets/js/libs/backbone-0.9.2',
    energize:   '../assets/js/libs/energize',
    text:       '../assets/js/plugins/text-1.0.7',
    order:      '../assets/js/plugins/order-1.0.5',

    // helpers
    core:       'core/',

    // test
    spec:       '../test/qunit/spec'
  }
});

require([

  // Load the example tests, replace this and add your own tests
  "spec/qunit-basics",
  "spec/helloworld"

]);