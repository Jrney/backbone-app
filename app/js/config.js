/**
 * RequireJS configuration
 */

(function () {
    require.config({

        map: {},

        paths: {
            // vendor libraries
            "jquery": "vendor/jquery",
            "underscore": "vendor/lodash.underscore",
            "hbs": "vendor/hbs/hbs",
            "async": "vendor/async",
            "google": "google",

            // application libraries
            "app": "app",
            "scripts": "app/scripts",
            "maps": "app/customMaps"

        }
    });
    require(['scripts'], function(){});
    require(['maps'], function(){});
}());