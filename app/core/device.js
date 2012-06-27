define(function() {
    // Calculates what the deive is capable of, depending on the UA string.
    // It would be nice to use Modernizr, but somethings can't be feature detected
    // reliably (e.g. position:fixed support). Other things (e.g. animations) will
    // work in theory on some devices, but really shouldn't be, for performance reasons.
    // UA regexes from https://raw.github.com/tobie/ua-parser/master/regexes.yaml

    var _buildReturnObj = function(browserFamily, browserVersion, scroll, animations) {
        return {
            'browser' : {
                'family' : browserFamily,
                'version' : browserVersion
            },
            'scroll' : scroll,
            'animations' : animations
        };
    };

    return (function(ua) {
        var webkit = ua.match(/AppleWebKit\/([0-9]+)/);
        var wkversion = webkit && webkit[1];
        var msie = ua.match(/MSIE ([0-9]+).*IEMobile/);
        var msieversion = msie && msie[1];
        var blackberry = ua.match(/Blackberry.*Version\/([0-9]+)/);
        var bbversion = blackberry && blackberry[1];
        
        // iOS
        if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) {
            if (wkversion && wkversion >= 534) {
                //iOS 5+
                return _buildReturnObj('safari', '5+', 'positionfixed', true);

            } else if (wkversion && wkversion >= 528) {
                // iOS 3.1.3 - 4.x
                return _buildReturnObj('safari', '3.1.3,4.x', 'polyfillscroll', true);

            } else {
                // iOS < 3.1.3
                return _buildReturnObj('safari', '3.1.2-', 'inline', false);
            }
            
        }

        // CHROME / CHROMIUM
        if (ua.indexOf('Chrome') > -1 || ua.indexOf('Chromium') > -1) {
            return _buildReturnObj('chrome', '1+', 'positionfixed', true);
        }
        
        // ANDROID
        if (ua.indexOf('Android') > -1) {
            if (wkversion && wkversion >= 534) {
                // Android 4+
                // Android ICS browser also supports position:fixed. But overflow:scroll found to work better.
                // With pos:fixed, the header is masked by the URL bar when scrolling up.
                return _buildReturnObj('android', '4+', 'overflowscroll', true);
            
            } else if (wkversion && wkversion >= 525) {
                // Android 1.6 - 3.2
                // Animations on Android < ICS suck balls
                return _buildReturnObj('android', '1.6,3.x', 'polyfillscroll', false);
            
            } else {
                // Sucky Android version. Minimal anything.
                return _buildReturnObj('android', '1.5-', 'inline', false);
            }
            
        }

        // IE9+ Mobile
        if (msie && msieversion >= 9) {
            // Amusingly, IE9 mobile supports overflow:scroll. But not with momentum scrolling.
            // iScroll flat out refuses to work.
            // Animations? Ha, don't even think about it!
            return _buildReturnObj('msie', '9+', 'overflowscroll', false);
        }

        // BLACKBERRY 6+
        if (ua.indexOf('Blackberry') > -1 && bbversion && bbversion >= 6) {
            return _buildReturnObj('blackberry', '6+', 'iscroll', false);
        }

        // EVERYTHING ELSE
        // Basics. Inline scrolling, no animations.
        return _buildReturnObj('unknown', '', 'inline', false);

    })(navigator.userAgent);

});