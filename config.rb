# Compass configuration file, used by the `compass` CLI.
# To install compass, `gem install compass`

# Require any additional compass plugins here.
require 'growl';

http_path = "/"
css_dir = "assets/css"
sass_dir = "app/styles"
images_dir = "assets/img"
javascripts_dir = "assets/js"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = :expanded

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass app/styles scss && rm -rf sass && mv scss sass

# Growl notifications
# Requires growl - `gem install growl`
# TODO get this lot working!
on_stylesheet_saved do |filename|
  Growl.notify {
     self.message = "#{File.basename(filename)} updated!"
     #self.icon = '/path/to/success.jpg'
   }
end

on_stylesheet_error do |filename, message|
  Growl.notify {
    self.message = "#{File.basename(filename)}: #{message}"
    #self.icon = '/path/to/fail.jpg'
    sticky!
  }
end