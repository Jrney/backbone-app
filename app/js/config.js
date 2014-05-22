/**
 * RequireJS configuration
 */

(function () {
    require.config({

        baseUrl: "js/vendor",

        shim: {
            "jquery": {
                exports: "$",
            },
        },

        map: {},

        paths: {
            // vendor libraries
            "underscore": "lodash.underscore",
            "hbs": "hbs/hbs",

            // application libraries
            "app": "../app"

        }
    });
}());