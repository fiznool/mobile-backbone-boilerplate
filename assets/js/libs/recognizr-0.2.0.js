/*
 * Recognizr
 * v0.2.0
 *
 * A small library to detect the capabilities of mobile web browsers.
 *
 * Mobile browsers are a bit of a pain. Some support native scrolling, others proclaim to support animations.
 * Real-world usage, however is patchy. This library uses UA sniffing (gosh!) to check what type of mobile browser
 * is present, and returns a simple object to indicate its capabilities.
 *
 * If AMD is present, it will not expose a global variable. Otherwise, Recognizr can be accessed using the Recognizr global.
 *
 * Thanks to @jtward for much hours of headscratching and frustration in debugging various browsers!
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else {
        // Browser globals
        root.Recognizr = factory();
    }
}(window, function () {
    
  // Recognizr
 
  var _buildReturnObj = function(browserFamily, browserVersion, toolbar, form, animations) {
      var rtn = {
        'browser': {
          'family': browserFamily,
          'version': browserVersion
        },
        'scroll': {
          'toolbar': toolbar,
          'form': form
        },
        'animations': animations
      };

      return rtn;
    };

  // Calculates what the deive is capable of, depending on the UA string.
  // It would be nice to use Modernizr, but somethings can't be feature detected
  // reliably (e.g. overflow:scroll support). Other things (e.g. animations) will
  // work in theory on some devices, but really shouldn't be, for performance reasons.
  var Recognizr = (function(ua) {

    // UA regexes from https://raw.github.com/tobie/ua-parser/master/regexes.yaml
    var webkit = ua.match(/AppleWebKit\/([0-9]+)/);
    var wkversion = webkit && webkit[1];
    var msie = ua.match(/MSIE ([0-9]+).*IEMobile/);
    var msieversion = msie && msie[1];
    var blackberry = ua.match(/Blackberry.*Version\/([0-9]+)/);
    var bbversion = blackberry && blackberry[1];

    // iOS: Mobile Safari
    if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
      if (wkversion && wkversion >= 534) {
        // iOS 5/6
        // Supports pos:fixed but needs to be disabled when forms are present
        // as toolbars will start scrolling inline when form elements are active
        return _buildReturnObj('safari', '5+', 'fixed', 'inline', true);

      } else {
        // iOS <= 4.x
        // We no longer like iScroll, so scroll inline. Animations are out, too.
        return _buildReturnObj('safari', '4-', 'inline', 'inline', false);
      }

    }

    // ANDROID: Stock Browser
    if (ua.indexOf('Android') > -1) {
      if (wkversion && wkversion >= 534) {
        // Android 4+
        // Supports pos:fixed but needs to be disabled when forms are present
        // as input element scrolls on top of the toolbar.
        // Animations are OK.
        return _buildReturnObj('android', '4+', 'fixed', 'inline', true);

      } else if (wkversion && wkversion >= 533) {
        // Android 2.2 - 3.2
        // Supports pos:fixed but needs to be disabled when forms are present
        // as input element scrolls on top of the toolbar.
        // Animations are disabled.
        return _buildReturnObj('android', '2.2->3.2', 'fixed', 'inline', false);

      } else {
        // Sucky Android version. Minimal anything.
        return _buildReturnObj('android', '2.1-', 'inline', 'inline', false);
      }

    }

    // CHROME / CHROMIUM
    // Well supported, even form fields can be scrolled.
    if (ua.indexOf('Chrome') > -1 || ua.indexOf('Chromium') > -1) {
      return _buildReturnObj('chrome', '1+', 'fixed', 'fixed', true);
    }

    // EVERYTHING ELSE
    // Basics. Inline scrolling, no animations.
    return _buildReturnObj('unknown', '', 'inline', 'inline', false);

  })(navigator.userAgent);


  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return Recognizr;
    
}));