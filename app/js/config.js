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
            "isotope": "vendor/isotope.pkgd",
            "backbone": "vendor/backbone",

            // application libraries
            "client": "app/app",
            "scripts": "app/scripts",
            "maps": "app/customMaps",
            "pitstopView": "app/views/pitstopView",
            "pitstopModel": "app/models/pitstopModel"
        }
    });
    require(['scripts'], function(){});
    require(['client'], function(){});
    //require(['maps'], function(){});
}());
