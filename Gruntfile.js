module.exports = function(grunt) {

    grunt.initConfig({

        //LINT javascript files
        jshint: {
            files: ['Gruntfile.js', 'js/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },


        //MINIFY javascript files
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'js/weekli.min.js': ['js/weekli.js']
                }
            }
        },


        //COMPILE less
        less: {
            // production config is also available
            development: {
                options: {
                    paths: ['less/']
                },
                files: {
                    //compilation.css  :  source.less
                    "css/weekli.css": "css/weekli.less",
                    "css/index.css": "css/index.less"
                }
            }
        },

        //CONNECT and SERVE on browser
        connect: {
            server: {
                options: {
                    port: 9001
                }
            }
        },

        watch: {
            files: ['js/*.js', 'js/*.js', 'css/*.less'],
            tasks: ['jshint', 'uglify', 'less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-connect');


    grunt.registerTask('default', ['jshint', 'uglify', 'less','connect', 'watch']);
};