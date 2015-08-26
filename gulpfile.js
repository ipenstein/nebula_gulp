var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
    return gulp.src('app/scss/**/*.+(scss|sass)') // Gets all files ending with .scss or .sass in app/scss
        .pipe(sourcemaps.init()) // Initialize sourcemap plugin
        .pipe(sass({
            errLogToConsole: true
        })) // Passes it through a gulp-sass task
        .pipe(autoprefixer()) // Passes it through gulp-autoprefixer
        .pipe(sourcemaps.write()) // Writing sourcemaps
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        // Reloading the stream
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
    gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
});

// Start browserSync server
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: 'app'
        },
        port: 8080
    })
});