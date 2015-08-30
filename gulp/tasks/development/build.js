var gulp        = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build', function(callback) {
    runSequence('delete',
    [
        'sass',
        'scripts:application',
        'scripts:head',
        'images',
        'copy:fonts'
    ],
    'base64',
    callback);
});