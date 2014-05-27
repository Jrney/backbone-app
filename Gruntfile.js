module.exports = function(grunt) {

    // Helpers
    /**
     * Strip comments from JSON file (naive) and return JS object.
     */
    var _readJsonCfg = function (name) {
        if (!grunt.file.exists(name)) { return "{}"; }
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
                files: [
                    {
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

                            // Test libraries.
                            "mocha/mocha.js",
                            "mocha/mocha.css",
                            "chai/chai.js",
                        ]
                    },
                    {
                        cwd: "<%= bowerPath %>/hbs",
                        dest: "<%= vendorPath %>/hbs",
                        expand: true,
                        src: [
                            "hbs/**",
                            "hbs.js"
                        ]
                    },
                    {
                        cwd: "<%= bowerPath %>/bootstrap/dist",
                        dest: "<%= vendorPath %>/bootstrap",
                        expand: true,
                        src: [
                            "css/**",
                            "fonts/**",
                            "js/**"
                        ]
                    },
                ]
            },
            dist: {
                files: [
                    {
                        cwd: "<%= bowerPath %>",
                        dest: "<%= distPath %>",
                        expand: true,
                        flatten: true,
                        src: [
                            "requirejs/require.js"
                        ]
                    }
                ]
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
                    "app/css/app.css" : "app/css/less/style.less"
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
                        "app/js/app/**/*.js",
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
                files: [ 'server/server.js' ],
                tasks: [ 'express:dev' ],
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
                    spawn: false
                }
            },
        },

        // ------------------------------------------------------------
        // Tests
        // ------------------------------------------------------------

        mocha: {
            test: {
                src: [
                    "test/js/test.html"
                ],
                options: {
                    run: true,
                },
            },
        },
    });

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // ------------------------------------------------------------
    // Task: Build
    // ------------------------------------------------------------

    grunt.registerTask('build', ['clean:vendor', 'copy:vendor', 'clean:dist', 'copy:dist', 'requirejs', 'less']);

    // ------------------------------------------------------------
    // Task: Test
    // ------------------------------------------------------------

    grunt.registerTask('test', ['express:dev', 'jshint', 'mocha']);

    // ------------------------------------------------------------
    // Task: Default
    // ------------------------------------------------------------

    grunt.registerTask('serve', ['build', 'express:dev', 'watch']);
    grunt.registerTask('default', ['build', 'express:dev', 'watch']);

};









