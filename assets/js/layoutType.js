define(function() {
    var layoutType = (function() {
        var ua = navigator.userAgent;
        var webkit = ua.match(/AppleWebKit\/([0-9]+)/);
        var wkversion = webkit && webkit[1];
        var msie = ua.match(/MSIE ([0-9]+).*IEMobile/);
        var msieversion = msie && msie[1];
        var blackberry = ua.match(/Blackberry.*Version\/([0-9]+)/);
        var bbversion = blackberry && blackberry[1];
        // POSITION: FIXED
        // CHROME / CHROMIUM
        if (ua.indexOf('Chrome') > -1 || ua.indexOf('Chromium') > -1) {
            return 'positionfixed';
        }
        // IOS 5+
        if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) && wkversion && wkversion >= 534) {
            return 'positionfixed';
        }

        // OVERFLOW: SCROLL
        // ANDROID 4+
        if (ua.indexOf('Android') > -1 && wkversion && wkversion >= 534) {
            return 'overflowscroll';
        }
        // IE9+ Mobile
        if (msie && msieversion >= 9) {
            return 'overflowscroll';
        }

        // ISCROLL
        // IOS < 5
        if ((ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1 || ua.indexOf("iPod") > -1) && wkversion && wkversion < 534) {
            return 'iscroll';
        }
        // ANDROID < 4
        if (ua.indexOf('Android') > -1 && wkversion && wkversion < 534) {
            return 'iscroll';
        }
        // BLACKBERRY 6+
        if (ua.indexOf('Blackberry') > -1 && bbversion && bbversion >= 6) {
            return 'iscroll';
        }

        // STATIC POSITIONING
        // EVERYTHING ELSE
        return 'static';
    }());

    // return a function that returns the layout type because we can't return a string
    return function() {
        return layoutType;
    };
});