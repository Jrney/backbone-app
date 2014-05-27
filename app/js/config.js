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

            // application libraries
            // "app": "app",
            "simple": "app/simple",
            "scripts": "app/scripts"

        }
    });
    require(['scripts'], function(){});
    require(['simple'], function(){
        console.log("inside of simple require function");
    });
}());