var gulp   = require('gulp');
var config = require('../../config').copyhtml.development;

/**
 * Copy fonts to folder
 */
gulp.task('copy:html', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});