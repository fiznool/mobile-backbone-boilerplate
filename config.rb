# Compass configuration file, used by the `compass` CLI.
# To install compass, `gem install compass`

# Require any additional compass plugins here.

http_path = "/"
css_dir = "assets/css"
sass_dir = "app/styles"
images_dir = "assets/img"
javascripts_dir = "assets/js/plugins"
fonts_dir = "assets/font"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed
output_style = ( environment == :production ) ? :compressed : :expanded

# To enable relative paths to assets via compass helper functions.
relative_assets = true
