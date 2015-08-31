var gulp        = require('gulp');
var runSequence = require('run-sequence');

/**
 * Run all tasks needed for a build in defined order
 */
gulp.task('build:production', function(callback) {
    runSequence('delete', 'copy:html', 'copy:html:production',
    [
        'sass',
        'scripts:head',
        'scripts:application',
        'images',
        'copy:fonts'
    ],
    'base64',
    [
        'optimize:css',
        'optimize:js',
        'optimize:images',
        'optimize:html',
        'copy:fonts:production'
    ],
    'revision',
    'rev:collect',
    'gzip',
    callback);
});