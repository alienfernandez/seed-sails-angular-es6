/**
 * `watch`
 *
 * ---------------------------------------------------------------
 *
 * Run predefined tasks whenever watched file patterns are added, changed or deleted.
 *
 * Watch for changes on:
 * - files in the `assets` folder
 * - the `tasks/pipeline.js` file
 * and re-run the appropriate tasks.
 *
 * For usage docs see:
 *   https://github.com/gruntjs/grunt-contrib-watch
 *
 */
module.exports = function (grunt) {

    grunt.config.set('watch', {
        assets: {

            // Assets to watch:
            files: ['assets/**/*', 'tasks/pipeline.js', '!**/node_modules/**', 'src/**/*'],

            // When assets are changed:
            tasks: ['syncAssets', 'linkAssets', 'babel', 'copy:assets', 'ng_html2js']
        },
        es6: {
            // Assets to watch:
            files: ['src/**/*'],

            // When assets are changed:
            tasks: ['babel', 'copy:assets', 'ng_html2js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};
