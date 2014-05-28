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
            "isotope": "vendor/isotope.pkgd",
            "backbone": "vendor/backbone",

            // application libraries
            "client": "app/app",
            "scripts": "app/scripts",
            "maps": "app/customMaps",
            "pitstopView": "app/views/pitstopView"
        }
    });
    require(['scripts'], function(){});
    require(['client'], function(){});
    require(['async!http://maps.googleapis.com/maps/api/js?v=3.exp?key={AIzaSyAckmSzoxdbOdFhNltb9ufCWuTackzcupc}&sensor=false&libraries=places'], function(){});
    //require(['maps'], function(){});
}());