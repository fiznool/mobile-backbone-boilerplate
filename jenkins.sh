#!/bin/sh
# To be run by Jenkins to create builds.
# Pass in the destination build location where builds should be created on the command line. 
# Also ensure node and phantomjs are installed and available in the PATH.
# 
# To use in Jenkins:
#  1. Login to Jenkins and add a new job
#  2. In the Build window, add a new shell build step
#  3. Type the following in the text box:
#     PATH=$PATH:/usr/local/bin
#     bash -ex $WORKSPACE/jenkins.sh /var/www/html/jenkins
#
#   (/usr/local/bin is the location of node and phantomjs)
#   (/var/www/html/jenkins is the place to put the build)
#   (change both of these params if necessary)
#
# Depends on lots of Jenkins ENV vars. Only use with Jenkins!!


BUILD_DIR=$1/$JOB_NAME/$BUILD_NUMBER
DEVEL_DIR=$BUILD_DIR/devel
DEBUG_DIR=$BUILD_DIR/debug
RELEASE_DIR=$BUILD_DIR/release

# Use Grunt to lint, test and minify files
# Requires grunt-bbb
bbb release

mkdir -p $BUILD_DIR $DEVEL_DIR $DEBUG_DIR $RELEASE_DIR

# Development build - clone of repo
cp -R $WORKSPACE/* $DEVEL_DIR

# Debug build - JS files concatenated
cp -R $WORKSPACE/index.html $WORKSPACE/favicon.ico $WORKSPACE/assets/ $DEBUG_DIR
rm -dfR $DEBUG_DIR/assets/js/
mkdir -p $DEBUG_DIR/assets/js/libs 
cp $WORKSPACE/dist/release/require.js $DEBUG_DIR/assets/js/libs
cp $WORKSPACE/assets/js/*.js $DEBUG_DIR/assets/js/

# Release build - JS/CSS files concatenated and minified
cp -R $WORKSPACE/index.html $WORKSPACE/favicon.ico $WORKSPACE/assets/ $RELEASE_DIR
rm -dfR $RELEASE_DIR/assets/css/ $RELEASE_DIR/assets/js/
mkdir -p $RELEASE_DIR/assets/css && cp $WORKSPACE/dist/release/index.css $RELEASE_DIR/assets/css
mkdir -p $RELEASE_DIR/assets/js/libs
cp $WORKSPACE/dist/release/require.js $RELEASE_DIR/assets/js/libs
cp $WORKSPACE/assets/js/*.js $RELEASE_DIR/assets/js/

# Create symbolic link to new BUILD_DIR
rm -f $1/$JOB_NAME/latest
ln -sf $BUILD_DIR $1/$JOB_NAME/latest