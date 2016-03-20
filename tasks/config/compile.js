/**
 * `compile`
 *
 * ---------------------------------------------------------------
 *
 * For usage docs see:
 *   https://github.com/babel/grunt-babel
 *
 */
module.exports = function (grunt) {

    grunt.config.set('babel', {
        options: {
            sourceMap: true,
            presets: ['es2015', 'react']
        },
        dist: {
            files: [{
                "expand": true,
                "cwd": "src/",
                "src": ['**/*.js', '!**/highlight/*.js'],
                "dest": ".tmp/public/app",
                "ext": ".js"
            }]
        }
    });

    grunt.loadNpmTasks('grunt-babel');
};
