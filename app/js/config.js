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
            "goog": "vendor/goog",
            "propertyParser": "vendor/propertyParser",
            "isotope": "vendor/isotope.pkgd",
            "backbone": "vendor/backbone",
            "bootstrap": "vendor/bootstrap/js/bootstrap",
            "gmaps": "http://maps.googleapis.com/maps/api/js?v=3.exp?key={AIzaSyAckmSzoxdbOdFhNltb9ufCWuTackzcupc}&sensor=false&libraries=places",
            // no longer use "routeBoxer": "vendor/RouteBoxer",

            // application libraries
            "client": "app/app",
            "scripts": "app/scripts",
            "pitstopView": "app/views/pitstopView"
        }
    });
    require(["scripts"], function(){});
    require(["client"], function(){});
    require(["bootstrap"], function(){});
    //require(["async!http://maps.googleapis.com/maps/api/js?v=3.exp?key={AIzaSyAckmSzoxdbOdFhNltb9ufCWuTackzcupc}&sensor=false&libraries=places"], function(){});
    //require(['maps'], function(){});
}());