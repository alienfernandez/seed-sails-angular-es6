/**
 * `html2js`
 *
 * ---------------------------------------------------------------
 *
 */
module.exports = function (grunt) {

    grunt.config.set('ng_html2js', {
      dev: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.html', '!**/highlight/*.html'],
                dest: '.tmp/public/app',
                ext: '.tpl.js'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-ng-html2js');
};
