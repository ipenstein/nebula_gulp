var gulp   = require('gulp');
var config = require('../../config').copyhtml.production;

/**
 * Copy fonts to folder
 */
gulp.task('copy:html:production', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});