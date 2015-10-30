//S1:
module.exports = function (grunt) {
    'use strict';
 
    //S2    
    grunt.initConfig({
        //S3:Open the package.json
        pkg: grunt.file.readJSON('package.json'),
        //S4:The Concate Task
        concatcss: {
            dist: {
                options: {
                    separator: '\n\r',
                    banner: '/*\nConcatinated JS file \n' +
                            'Author: Mahesh \n' +
                            'Created Date: <%= grunt.template.today("yyyy-mm-dd") %>' +
                            '\n */ \n'
                },
                // select the files to concatenate
                src: ['css/libs/angular-material.min.css', 'css/libs/bootstrap.min.css','css/libs/bootstrap-theme.min.css', 'md-data-table-style.css' ],

                // the resulting JS file
                dest: 'css/libs_styles.css'
            }
        },

        concat: {
            dist: {
                options: {
                    separator: '\n\r',
                    banner: '/*\nConcatinated JS file \n' +
                            'Author: Mahesh \n' +
                            'Created Date: <%= grunt.template.today("yyyy-mm-dd") %>' +
                            '\n */ \n'
                },
                // select the files to concatenate
                src: ['js/libs/jquery-1.11.3.min.js', 'js/libs/angular.min.js', 'js/libs/angular-resource.min.js', 'js/libs/angular-material.min.js', 'js/libs/angular-route.min.js', 'js/libs/angular-animate.min.js',
                                    'js/libs/bootstrap.min.js', 'js/libs/md-data-table.min.js', 'js/libs/underscore-min.js', 'js/libs/angular-aria.min.js',
                                 'js/libs/angular-material-icons.min.js', 'js/libs/angular-uuid4.min.js', 'js/libs/jquery-ui.min.js'],

                // the resulting JS file
                dest: 'js/libs.min.js'
            }
        },
 
        //S5:Task for Minification
        uglifycss: {
            options: {
                //  banner for inserting at the top of the result
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                src: ['js/main.js'],
                dest: 'js/main.min.js'
        }
        },
        uglify: {
            options: {
                //  banner for inserting at the top of the result
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            build: {
                src: ['css/libs_styles.css'],
                dest: 'css/libs_styles.min.css'
            }
        }

});
 
//S6: The Required Plug-Ins whihc will be loaded for Task
grunt.loadNpmTasks('grunt-contrib-concat');
 
grunt.loadNpmTasks('grunt-contrib-uglify');
 
//S7: the array of tasks
grunt.registerTask('default', ['concat', 'uglify', 'concatcss','uglifycss']);
};