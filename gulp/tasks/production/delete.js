var gulp   = require('gulp');
var del    = require('del');
var config = require('../../config').delete.production;

/**
 * Delete folders and files
 */
gulp.task('delete:production', function(callback) {
    del(config.src, callback);
});