var gulp         = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var config       = require('../../config');


gulp.task('scripts:head', function() {
    return gulp.src(config.scripts.srcHead)
        .pipe(sourcemaps.init())
        .pipe(concat('head.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scripts.dest))
});