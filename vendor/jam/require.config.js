var jam = {
    "packages": [
        {
            "name": "backbone",
            "location": "../../vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "backbone.layoutmanager",
            "location": "../../vendor/jam/backbone.layoutmanager",
            "main": "backbone.layoutmanager.js"
        },
        {
            "name": "handlebars",
            "location": "../../vendor/jam/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "jquery",
            "location": "../../vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "lodash",
            "location": "../../vendor/jam/lodash",
            "main": "./lodash.js"
        },
        {
            "name": "modernizr",
            "location": "../../vendor/jam/modernizr"
        },
        {
            "name": "underscore",
            "location": "../../vendor/jam/underscore",
            "main": "underscore.js"
        }
    ],
    "version": "0.2.12",
    "shim": {
        "backbone": {
            "deps": [
                "lodash"
            ],
            "exports": "Backbone"
        },
        "backbone.layoutmanager": {
            "deps": [
                "jquery",
                "backbone",
                "lodash"
            ],
            "exports": "Backbone.LayoutManager"
        },
        "jquery": {
            "exports": "jQuery"
        },
        "underscore": {
            "exports": "_"
        }
    }
};

if (typeof require !== "undefined" && require.config) {
    require.config({
    "packages": [
        {
            "name": "backbone",
            "location": "../../vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "backbone.layoutmanager",
            "location": "../../vendor/jam/backbone.layoutmanager",
            "main": "backbone.layoutmanager.js"
        },
        {
            "name": "handlebars",
            "location": "../../vendor/jam/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "jquery",
            "location": "../../vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "lodash",
            "location": "../../vendor/jam/lodash",
            "main": "./lodash.js"
        },
        {
            "name": "modernizr",
            "location": "../../vendor/jam/modernizr"
        },
        {
            "name": "underscore",
            "location": "../../vendor/jam/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "lodash"
            ],
            "exports": "Backbone"
        },
        "backbone.layoutmanager": {
            "deps": [
                "jquery",
                "backbone",
                "lodash"
            ],
            "exports": "Backbone.LayoutManager"
        },
        "jquery": {
            "exports": "jQuery"
        },
        "underscore": {
            "exports": "_"
        }
    }
});
}
else {
    var require = {
    "packages": [
        {
            "name": "backbone",
            "location": "../../vendor/jam/backbone",
            "main": "backbone.js"
        },
        {
            "name": "backbone.layoutmanager",
            "location": "../../vendor/jam/backbone.layoutmanager",
            "main": "backbone.layoutmanager.js"
        },
        {
            "name": "handlebars",
            "location": "../../vendor/jam/handlebars",
            "main": "handlebars.js"
        },
        {
            "name": "jquery",
            "location": "../../vendor/jam/jquery",
            "main": "dist/jquery.js"
        },
        {
            "name": "lodash",
            "location": "../../vendor/jam/lodash",
            "main": "./lodash.js"
        },
        {
            "name": "modernizr",
            "location": "../../vendor/jam/modernizr"
        },
        {
            "name": "underscore",
            "location": "../../vendor/jam/underscore",
            "main": "underscore.js"
        }
    ],
    "shim": {
        "backbone": {
            "deps": [
                "lodash"
            ],
            "exports": "Backbone"
        },
        "backbone.layoutmanager": {
            "deps": [
                "jquery",
                "backbone",
                "lodash"
            ],
            "exports": "Backbone.LayoutManager"
        },
        "jquery": {
            "exports": "jQuery"
        },
        "underscore": {
            "exports": "_"
        }
    }
};
}

if (typeof exports !== "undefined" && typeof module !== "undefined") {
    module.exports = jam;
}