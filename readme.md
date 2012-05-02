Backbone Boilerplate
====================

Adapted from [Tim Brenyan's Backbone Boilerplate.](https://github.com/backbone-boilerplate/core)

Overview
--------

This boilerplate provides a starting point to build single-page mobile web apps, targeting mobile Webkit browsers (iOS and Android). It uses the following components:

- [HTML5 Mobile Boilerplate](http://html5boilerplate.com/mobile) to provide a basis for the project layout.
- [Backbone.js](http://documentcloud.github.com/backbone/) to provide an MVC-ish structure to your app.
- [RequireJS](http://requirejs.org) to organise your project into loosly coupled, highly testable modules.
- [RequireJS text plugin](http://requirejs.org/docs/api.html#text) combined with [Underscore templating](http://documentcloud.github.com/underscore/#template) with a [Mustache-like syntax](https://gist.github.com/2169509) to separate HTML views into individual template snippets.
- [Almond.js](https://github.com/jrburke/almond), a stripped down version of RequireJS which can be used in place of RequireJS in a production environment.
- [Library Bootstrapping](http://fiznool.com/post/18436104594/bootstrapping-your-libs-with-requirejs) using a `libs.js` file, which defines any pre-requisites for libraries before they are required.
- [QUnit](http://docs.jquery.com/QUnit) JavaScript unit testing tool.
- [Grunt](https://github.com/cowboy/grunt) to lint, test, concatenate and minify the app, ready for deployment.
- [Compass](http://compass-style.org/) to simplify styling.
- [Energize](https://github.com/davidcalhoun/energize.js) to speed up clickable (touchable) links on mobile devices.

Folder Structure
----------------
This structure is very basic and yet offers many advantages such as isolation of concerns where libraries and application code are separated completely.

Application code and templates are placed inside the `app` directory.  The
`main.js` file serves as the entry-point into the application and initialises the main application Router.

The static assets are placed inside the `assets` directory.  The H5BP files
are already included here. Place all new JavaScript libraries inside the
`assets/js/libs`, and for each library insert a `require()` in `libs.js`.

**Default structure:**

```
.
├── app
│   ├── core          // Core files, shared by the modules in the app live here.
│   │   ├── style     // Core styles live here.
│   │   └── libs.js   // Wrapper for JS libs for bootstrapping, see below for more details.
│   ├── modules       // Each individual module lives in here. A module comprises an HTML template, styles and a JS controller.
│   │   └── _skeleton.js  // A bare-bones starting point for building your JS module.
│   ├── app.js        // App entry point, defines global router and sets up views.
│   ├── app.scss      // Master stylesheet, responsible for importing module styles.
│   ├── config.js     // RequireJS entry point. Sets up common paths and loads app.js.
├── assets
│   ├── css
│   ├── img
│   └── js
│       ├── libs      // Place new JS libs in here, reference in libs.js.
│       └── plugins
├── config.rb         // Config file used by Compass.
├── favicon.ico
├── index.html        // Main HTML entry point for single page app.
├── jenkins.sh        // Jenkins CI shell script.
├── qunit.html          // QUnit test page to view test results.
└── test
    └── qunit
        ├── specs.js    // Entry point for QUnit, defines libs paths and specs to run
        └── specs       // JS unit test modules. One per JS module.
```

Modules
----------

The app comprises of many modules, each of which is contained in its own directory under the `app/modules/` directory. Typically, a module will map to a single screen in the mobile application. Each module comprises of the following files:

- *main.js*: this is a JavaScript controller, defined as a RequireJS module, and is a self-contained portion of code.
- *template.jst*: this is the HTML markup for the module.
- *_style.scss*: this is the SASS/Compass based stylesheet for the module.

The remainder of this section discusses each part of the module in more detail.

###JavaScript###

The JS file is a RequireJS module, and is structured using Backbone. A module usually contains the following Backbone components:

- A single Model
- A single Collection
- One or more Views
- An optional Router

The View hierarchy is usually split into a Main View (representing the entire screen) and zero or more sub-views, or widgets.

For example, consider a simple iPhone List view, corresponding of a header a list container with individual list items, and a tab bar footer. This would be broken down as follows:

```
PageView
├── HeaderView
├── ListContainerView
│   ├── ListItemView
│   ├── ListItemView
│   ├── ListItemView
│   ├── ListItemView
└── FooterView
```

Each page (screen) has its own module, and the collection of modules makes up the entire app. The master Router in `app.js` links together all PageViews and handles routing between each.

A helper js file, `_skeleton.js` is available to use as a base for creating your JS module. Simply duplicate this file into the `modules/<module_name>` directory, to use it as a starting point.

Before going straight into building a module, it is better to write its test first, leading us on to...

####Testing####

Each module should have a respective *test module* which is responsible for unit testing. The test module is written using [QUnit](http://docs.jquery.com/QUnit) and each test is located in `test/qunit/spec`. To write a test:

1. Add a new RequireJS module to the `spec` folder.
2. Add this spec to the list in `test/qunit/spec.js`. 
3. Require your _module under test_ in the RequireJS module, along with any extra libraries you need to carry out tests.
4. Write your test cases using QUnit syntax. When considering what to test, and how many tests to write, consider the guidelines in [Addy Osmani's blog](http://addyosmani.com/blog/unit-testing-backbone-js-apps-with-qunit-and-sinonjs/), especially the *Practical* section.
5. Run the command `bbb server:qunit` from the project root, and browse to http://localhost:8001. This will show you a web view indicating which tests have passed, and which have failed. (Alternatively, run `bbb qunit` from the command line to run the tests in a headless browser and pipe the results to the terminal).

####Libraries####

This project includes Zepto, Backbone, Underscore, RequireJS + text plugin, and Almond.js.

Patches have been made to the following libraries, so that they operate correctly in an AMD/RequireJS environment:

- Backbone and Underscore are AMD-aware versions of these libraries, grabbed from [the AMD JS Github repository](https://github.com/amdjs).
- Zepto is not AMD-aware by default. Extra lines have been added to this library to enable AMD loading. [See the modified source](https://github.com/fiznool/Backbone-Boilerplate/blob/master/assets/js/libs/zepto-amd-custom-0.8.0.js#L508) for more details.

Modules which require a library to operate do not `require()` them directly. Instead, a `libs.js` proxy is used to require. This is so that libraries can first be bootstrapped with configuration information, and can be removed from the global scope. See [this blog post](http://fiznool.com/post/18436104594/bootstrapping-your-libs-with-requirejs) for more details on this.

##### Almond.js #####
RequireJS is great for modularising your codebase, which makes development easier, promotes loose coupling and separates units of code into highly testable modules. Win!

However, the included build tools concatenate and minify all JS files into one master file, which is the only file loaded in production. Hence, we really don't need the full scope of RequireJS for production, as we only need to load a single file.

Enter [Almond](https://github.com/jrburke/almond). The author of RequireJS realised this and has stripped down RequireJS into just the pieces that are needed for this production scenario. It is very lightweight and very well suited for mobile apps.

Almond is used by the build tool to create the production minified codebase.

####JSHint####

If you use the build tools, the first thing they will do is check your JS syntax using [JSHint](http://www.jshint.com/). For this reason, its a good idea to use a syntax-highlighting plugin for your text editor / IDE to catch these problems as your write them. Then, the build tools should pass this step every time.

See JSHint's [Platforms page](http://www.jshint.com/platforms/) for more info on this.

###Templates###

The enry point for the app is `index.html`, responsible for setting up initial styles, meta information and then loading the app using RequireJS.

Each page in the app is written as a Backbone/RequireJS module. Markup is injected into these modules using HTML templates. These should be stored in the same directoryas the module, using the *.jst* suffix (JavaScript Template).

###Stylesheets###

This project expects a single master CSS file at `assets/css/app.css` for styling. You have two options to create this CSS file:

1. Create 'vanilla' CSS files by hand and save them into the `assets/css` folder. For each CSS file, add a `@import` statement manually into `assets/css/app.css`.
2. Create LESS/SASS/Stylus files and place them in the module folder. If you choose this option, you are responsible for setting up a SASS/LESS compiler to watch this directory and compile the lot into the file `assets/css/app.css`, whenever the file is saved.

In addition to `assets/css/app.css`, add any additional CSS files you need for branding, etc. As a rule of thumb, all core CSS should live in `app.css`, and any branding / device specific CSS which would be loaded dynamically should be included separately.

#### Compass ####

The project supports [Compass](http://compass-style.org/) with the following files:

- `config.rb` - points Compass to `app/styles` and compiles these files to `assets/css` when the command `compass watch` is run from the root of the project.
- `app/styles/_base.scss` - a base SCSS file where you should include common features. See [Compass Best Practices](http://compass-style.org/help/tutorials/best_practices/) for more details.

##### Installing #####

To install Compass:

- Install Ruby. If you are on OS X, use [RVM](https://rvm.beginrescueend.com/rvm/install/).
- Install the Compass gem: `gem install compass`.

There is already a `config.rb` file located in the root project folder, so there is no need to use `compass create`.

##### Creating style modules #####

For each module, its best to create a separate SCSS partial in the module folder. This file will contain all CSS needed for that module. Then, import all modules in the single `app.scss` file. This will allow Compass to compile the styles down to a single `app.css` file.

The SCSS module will likely use Compass imports. It's usually best to place these imports into the `_base.scss` partial, rather than the module itself, and then just `@import 'core/style/base'` in your module. This keeps all common imports / functionality in one place.

For example, you want to include rounded corners for your module `foo`:

- Create `app/modules/foo/_style.scss`
- Add `@import 'compass/css3'` to `app/core/styles/_base.scss`
- Add `@import 'core/style/base'` to `app/modules/foo/_style.scss`
- Add `@import 'modules/foo/style'` to `app/app.scss`

As `_base.scss` is a partial, the CSS3 module will be imported into `_style.scss`, so that the `@include border-radius` mixin can be used.

##### Compiling #####

It is important that each SCSS file is compiled whenever it is saved - this is so that you can view changes instantly in your browser. The build tool does not compile CSS for you - it expects all CSS to be present in `assets/css`.

Use the Compass Watcher to compile on the fly:

- From the project root folder, run `compass watch`.

This will watch all partials in `app/modules` and compile them to `assets/css/app.css`.


Images
------

Image files should be placed in `assets/img`.

Running Development Server
--------------------------

To serve up the application so it can be viewed in a browser, run the command `bbb server`. Your app can be viewed at http://localhost:8000.

Build Scripts
-------------

Tim's associated [grunt-bbb](https://github.com/backbone-boilerplate/grunt-bbb) project is used to lint, test and build the proejct.

###Dependencies###

The following dependencies are required for the build scripts:

- [Node](http://nodejs.org) with npm.
- [PhantomJS](http://www.phantomjs.org/) - [follow the instructions here](http://code.google.com/p/phantomjs/wiki/Installation) to install. Make sure the executable is in your $PATH.

###Installation###

Use npm to install the build tools: `npm install -g bbb`

###Commands###

All commands are prefixed with `bbb` in your terminal.  For example the command
`server` below would be executed like this:

``` bash
$ bbb server
```

###`bbb server`###
Runs an embedded development server which serves up your web application, so it can be viewed in a local browser.

###`bbb server:qunit`###
Runs an embedded server which serves up your QUnit test page, so it can be viewed in a local browser.

####`bbb debug`####
Builds a debug version of the web app by carrying out the following tasks:

- Lints the JavaScript code using JSHint. Its probably best to install a JSHint plugin for your text editor to catch these syntax errors as you type
- Runs through all tests defined in `test/qunit/spec.js`, using PhantomJS.
- Concatenates all JavaScript files required by `app/app.js`, recursively. This will recurse through all dependencies and concatenate the lot into one JS file - typically, this will include all modules and js files in `app/`, and the libraries required by the modules in `assets/js/libs/`. Note that the concatenated file also includes `assets/js/libs/almond.js` as a drop-in replacement for RequireJS.

This places a single concatenated JS file at `dist/debug/require.js`. Naming the JS file `require.js` allows the regular `index.html` file to be used without any modifications. Serve up this file instead of the individual modules by running...

####`bbb server:debug`####

Serves up the web application, using the single concatenated file created with a previous call to `bbb debug`, instead of the individual JS files in the `app/` and `assets/js/libs` directories. Internally, this rewrites  `assets/js/libs/require.js` to `dist/debug/require.js`, so that the index.html file loads the concatenated file rather than using the real RequireJS library.

###`bbb release`###

Identical to `bbb debug` except:

- Adds an extra minification stage to the concatenated JS file.
- Minifies all CSS files in `assets/css` into one `index.css`.
- Places two minified files into `dist/release`.

####`bbb server:release`####

Identical to `bbb server:debug`, except it uses the files in `dist/release` instead of `dist/debug`.

###`bbb preflight`###
Lints your code and runs your tests in a headless environment. Very useful to check if your code is ready to be checked in to version control.

Note this needs PhantomJS to be installed, in order to run.

###`bbb qunit`###
Runs your tests only in a headless environment. This automates your unit tests, so you don't have to keep browsing to the QUnit web page to check test results.

Note this needs PhantomJS to be installed, in order to run.

Continuous Integration with Jenkins
-----------------------------------

Also included in the project is a `jenkins.sh` file. This can be used in conjunction with a [Jenkins](http://jenkins-ci.org/) Continuous Integration server to automate builds.

To use this script:

1. Ensure Jenkins, NodeJS and PhantomJS are installed on the CI server.
2. Set up a new job to poll your SVN repository (see the [Jenkins docs](https://wiki.jenkins-ci.org/display/JENKINS/Building+a+software+project) for more info on this).
3. Add an _Execute Shell_ build step to your job, and run the following command:

  `PATH=$PATH:/usr/local/bin`
  `bash -ex $WORKSPACE/jenkins.sh /var/www/html/jenkins`

  The first command adds the expected location of node and phantomjs to the path so that the Jenkins script can run them. If node and/or phantomjs are installed somewhere else, its a good idea to ad a symlink to their binaries into `/usr/local/bin`.

  The variable `/var/www/html/jenkins` is where Jenkins will build to. You must ensure this location is writable by the `jenkins` user on the server.

The Jenkins build script will run `bbb release`, creating debug and release JS/CSS files. It will then create three different builds and place them at the directory specified by the variable you passed to the script above, as follows:

```
root
└──── jobname
      └──── buildnumber
            ├───── debug
            ├───── devel
            └───── release

```
where:

* *root* is the directory you passed into the script (e.g. `var/www/html/jenkins`)
* *jobname* is the name you gave the job in Jenkins. Usually best to make this match your project name!
* *buildnumber* is an incremental build number given to each build by Jenkins. This is managed by Jenkins and automatically increments each time a job is run.
* *devel* is a carbon copy of the project filesystem, including the test specs.
* *debug* is a version of the app using the _debug_ JavaScript file (all JS concatenated into one).
* *release* is the production-ready version of the app, with all JS and CSS concatenated and minified into a single file each.

By setting up Jenkins to poll the SVN repository, builds can be automatically created whenever a commit is made. This provides snapshots at any given time, and provides near-instant feedback to tests which fail - hopefully catching bugs earlier!