/**
 * `compile`
 *
 * ---------------------------------------------------------------
 *
 */
module.exports = function (grunt) {
    grunt.registerTask('compile', [
        'babel', 'copy:assets', 'ng_html2js'
    ]);
};
