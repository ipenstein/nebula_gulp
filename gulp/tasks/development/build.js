var gulp        = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build', function(callback) {
    runSequence('delete',
    [
        'sass',
        'jshint',
        'scripts:head',
        'scripts:application',
        'images',
        'copy:fonts',
        'copy:html'
    ],
    'base64',
    callback);
});