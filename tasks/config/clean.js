/**
 * `clean`
 *
 * ---------------------------------------------------------------
 *
 * Remove the files and folders in your Sails app's web root
 * (conventionally a hidden directory called `.tmp/public`).
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-clean
 *
 */
module.exports = function (grunt) {

    grunt.config.set('clean', {
        options: {
            'no-write': true
        },
        dev: ['.tmp/public/**/*', '!.tmp/public/jspm_packages/**', '!.tmp/public/system.config.js'],
        build: ['www']
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
};
