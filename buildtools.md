# Modifications needed to build the project

These instructions refer to bbb 0.2.0-alpha-4.

## Path to bbb files

If you have installed `bbb` globally with `npm install -g bbb` then the root folder of the bbb files can be found as follows:

 - OS X Mountain Lion: one of the following (depending on how you installed node):
   - `/usr/local/share/npm/lib/node_modules/bbb/`
   - `/usr/local/lib/node_modules/bbb`
 - Ubuntu 12.10: /usr/lib/node_modules/bbb/

This folder will be refered to as $BBB_ROOT below.

## Handlebars task

Out of the box, bbb 0.2.0-alpha4 has a broken handlebars task. To fix, replace the installed `handlebars.js` task file with https://raw.github.com/gruntjs/grunt-contrib-handlebars/49fe4a68e8a7f8c5883db5f2ccbdecfcdc7ed2f1/tasks/handlebars.js.

```
cd $BBB_ROOT/tasks
sudo mv handlebars.js handlebars.js.bak
sudo wget https://raw.github.com/gruntjs/grunt-contrib-handlebars/49fe4a68e8a7f8c5883db5f2ccbdecfcdc7ed2f1/tasks/handlebars.js
```

## r.js script

The `r.js` script does not work correctly when trying to run the debug or release version of the app.

https://github.com/tbranyen/backbone-boilerplate/issues/185

To fix:

```
cd $BBB_ROOT/node_modules/requirejs/bin/
sudo mv r.js r.js.bak
sudo wget https://raw.github.com/jrburke/r.js/4d071125363b8fd50c20ae6ab3e4db91908a1206/dist/r.js
```
