var gulp   = require('gulp');
var del    = require('del');
var config = require('../../config').delete.development;

/**
 * Delete folders and files
 */
gulp.task('delete:development', function(callback) {
    del(config.src, callback);
});