module.exports = function(grunt) {

    // Helpers
    /**
     * Strip comments from JSON file (naive) and return JS object.
     */
    var _readJsonCfg = function(name) {
        if (!grunt.file.exists(name)) {
            return "{}";
        }
        return JSON.parse(grunt.file.read(name).replace(/\/\/.*\n/g, ""));
    };


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bowerPath: "bower_components",
        vendorPath: "app/js/vendor",
        appPath: "app/js/app",
        distPath: "app/dist",

        //-------------------------------------------------------------
        // Clean tasks.
        // ------------------------------------------------------------

        clean: {
            vendor: "<%= vendorPath %>",
            dist: "<%= distPath %>"
        },

        // ------------------------------------------------------------
        // Copy tasks.
        // ------------------------------------------------------------

        copy: {
            vendor: {
                files: [{
                    cwd: "<%= bowerPath %>",
                    dest: "<%= vendorPath %>",
                    expand: true,
                    flatten: true,
                    src: [
                        // App libraries.
                        "jquery/dist/jquery.js",
                        "lodash/dist/lodash.underscore.js",
                        "json2/json2.js",
                        "backbone/backbone.js",
                        "backbone.localStorage/backbone.localStorage.js",
                        "RouteBoxer/RouteBoxer.js",
                        "requirejs-plugins/src/async.js",
                        "requirejs-plugins/src/propertyParser.js",
                        "requirejs-plugins/src/goog.js",
                        "isotope/dist/isotope.pkgd.js",

                        // Test libraries.
                        "mocha/mocha.js",
                        "mocha/mocha.css",
                        "chai/chai.js",
                    ]
                }, {
                    cwd: "<%= bowerPath %>/hbs",
                    dest: "<%= vendorPath %>/hbs",
                    expand: true,
                    src: [
                        "hbs/**",
                        "hbs.js"
                    ]
                }, {
                    cwd: "<%= bowerPath %>/bootstrap/dist",
                    dest: "<%= vendorPath %>/bootstrap",
                    expand: true,
                    src: [
                        "css/**",
                        "fonts/**",
                        "js/**"
                    ]
                }, ]
            },
            dist: {
                files: [{
                    cwd: "<%= bowerPath %>",
                    dest: "<%= distPath %>",
                    expand: true,
                    flatten: true,
                    src: [
                        "requirejs/require.js"
                    ]
                }]
            }
        },

        // ------------------------------------------------------------
        // Bundle tasks.
        // ------------------------------------------------------------

        requirejs: {
            app: {
                options: {
                    name: "config",
                    baseUrl: "app/js",
                    mainConfigFile: "app/js/config.js",
                    out: "<%= distPath %>/public.js",
                    optimize: "none"
                }
            }
        },

        // ------------------------------------------------------------
        // LESS compilation.
        // ------------------------------------------------------------

        less: {
            development: {
                options: {

                },
                files: {
                    "app/css/app.css": "app/css/less/style.less"
                },
            },
        },

        // ------------------------------------------------------------
        // JSHint
        // ------------------------------------------------------------

        jshint: {
            client: {
                options: _readJsonCfg(".jshint.json"),
                files: {
                    src: [
                        "app/js/*.js",
                        "app/js/**/*.js",
                        "!app/js/app/scripts.js",
                        "!app/js/vendor/**/*.js",
                        "test/*/js/**/*.js"
                    ]
                }
            }
        },

        // ------------------------------------------------------------
        // Express
        // ------------------------------------------------------------

        express: {
            options: {

            },
            dev: {
                options: {
                    script: "server/server.js"
                }
            },
            prod: {
                options: {
                    script: "server/server.js",
                    node_env: "production"
                }
            },
            test: {
                options: {
                    script: "server/server.js"
                }
            }
        },

        // ------------------------------------------------------------
        // Watch
        // ------------------------------------------------------------

        watch: {
            express: {
                files: ['server/server.js'],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            },
            options: {
                livereload: true
            },
            styles: {
                files: ["app/css/less/**/*.less"],
                tasks: ["less"],
                options: {
                    spawn: false,
                    reload: true
                }
            },
            scripts: {
                files: ["app/js/app/**/*.js", "!app/js/app/scripts.js", "app/js/app/*.js"],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                    reload: true
                },
            },
        },

        // ------------------------------------------------------------
        // Tests
        // ------------------------------------------------------------

        casper: {
            acceptance: {
                options: {
                    test: true,
                },
                files: {
                    'test/acceptance/casper-results.xml': ['test/acceptance/*_test.js']
                }
            }
        },

        // ------------------------------------------------------------------------
        // Karma test driver.
        // ------------------------------------------------------------------------
        // See: http://karma-runner.github.io/0.8/plus/RequireJS.html
        // See: https://github.com/kjbekkelund/karma-requirejs

        karma: {
            "mocha-fast": {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ["PhantomJS"]
            },
            "mocha-windows": {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ["PhantomJS", "IE", "Chrome"]
            },
            "mocha-ci": {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ["PhantomJS", "Firefox"]
            },
            "mocha-all": {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ["PhantomJS", "Chrome", "Firefox", "Safari"]
            }
        }
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // ------------------------------------------------------------
    // Task: Build
    // ------------------------------------------------------------

    grunt.registerTask('build', ['clean:vendor', 'copy:vendor', 'clean:dist', 'copy:dist', 'requirejs', 'less']);

    // ------------------------------------------------------------
    // Task: Test
    // ------------------------------------------------------------

    grunt.registerTask('casper:test', ['express:dev', 'casper']);

    grunt.registerTask("karma:fast", ["karma:mocha-fast"]);
    grunt.registerTask("karma:ci", ["karma:mocha-ci"]);
    grunt.registerTask("karma:all", ["karma:mocha-all"]);
    grunt.registerTask("karma:dev", ["karma:main"]);

    grunt.registerTask("test", ["casper:test", "karma:fast"]);

    grunt.registerTask("check", ["jshint", "test"]);
    grunt.registerTask("check:ci", ["jshint", "karma:ci"]);
    grunt.registerTask("check:all", ["jshint", "casper:test", "karma:all"]);

    // ------------------------------------------------------------
    // Task: Default
    // ------------------------------------------------------------

    grunt.registerTask('serve', ['build', 'express:dev', 'watch']);
    grunt.registerTask('default', ['build', 'express:dev', 'watch']);

};
