var gulp         = require('gulp');
var sourcemaps   = require('gulp-sourcemaps');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var jshint       = require('gulp-jshint');
var config       = require('../../config');


gulp.task('scripts:application', function() {
    return gulp.src(config.scripts.srcApplication)
        .pipe(sourcemaps.init())
        .pipe(concat('application.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.scripts.dest))
});