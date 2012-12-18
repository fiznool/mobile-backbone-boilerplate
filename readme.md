Important Notice
================

This project has recently been reverted back to the original fork from tbranyen's Backbone Boilerplate. The intention is to stick more closely to the upstream changes and merge them into this project.

The old master has now moved to the `old` branch. If you are still interested in using the old branch, please point your upstream remotes to `old` instead of `master`

Otherwise, bear with us... the plan is to have two branches of this project to support two emerging use cases:

1. A wrapped version which is optimised for delivery through PhoneGap. This will resemble the previous `master` branch and will use Zepto and take advantage of native touch events, etc.
2. A responsive version which is intended for web apps accessed through the browser. This will use jQuery for best compatibility, click events, etc.

Sorry for the inconvenience.



![Boilerplate](https://github.com/tbranyen/backbone-boilerplate/raw/assets/header.png)

Backbone Boilerplate
====================

This boilerplate is the product of much research and frustration.  Existing
boilerplates freely modify Backbone core, lack a build process, and are very
prescriptive; Backbone Boilerplate changes that.

Organize your application with a logical file structure, develop your
Models/Collections/Views/Routers inside modules, and build knowing you have
efficient code that will not bottleneck your users.

Thanks to our
[Contributors](https://github.com/tbranyen/backbone-boilerplate/contributors)!

Special Thanks to: [cowboy](http://github.com/cowboy),
[iros](http://github.com/iros), [nimbupani](http://github.com/nimbupani),
[wookiehangover](http://github.com/wookiehangover), and
[jugglinmike](http://github.com/jugglinmike) for helping me create this project.

Extra Special Thanks to: [Paul Guinan](http://bigredhair.com/work/paul.html)
for giving me usage rights to his fantastic Boilerplate character.

## Documentation ##

View the Backbone Boilerplate documentation here:

[GitHub Wiki](https://github.com/tbranyen/backbone-boilerplate/wiki)

## Build process ##

To use the new and improved build process, please visit the 
[grunt-bbb](https://github.com/backbone-boilerplate/grunt-bbb)
plugin repo and follow the instructions to install.  Basing your project off
this repo will allow the `bbb` commands to work out-of-the-box.
