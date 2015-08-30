
var jsFiles = [
    // dependencies
    'app/bower_components/jquery/dist/jquery.min.js',
    'app/bower_components/jquery-validation/dist/jquery.validate.min.js',
    'app/bower_components/jquery-validation/src/localization/messages_de.js',
    'app/js/vendor/jquery.syncheight.js',
    'app/js/vendor/jquery.scrollTo.min.js',
    'app/js/vendor/parallax.min.js',

    // user scripts
    'app/js/responsive.js',
    'app/js/forms.js',
    'app/js/tabs.js',
    'app/js/collapse.js',
    'app/js/dropdowns.js',
    'app/js/alerts.js',
    'app/js/syncheight.js',
    'app/js/example-parallax.js',
    'app/js/example-scroll.js',
    'app/js/example-navigation.js',
    'app/js/layout.js'
];


var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var changed = require('gulp-changed');
var gutil = require('gulp-util');
var minifyCss = require('gulp-minify-css');
var clean = require('gulp-clean');
var filesize = require('gulp-filesize');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

gulp.task('hello', function () {
    console.log("********** Greetings, Master! **********");
});

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.+(scss|sass)') // Gets all files ending with .scss or .sass in app/scss
        .pipe(gutil.env.production ? gutil.noop() : sourcemaps.init()) // Initialize sourcemap plugin
        .pipe(sass({
            errLogToConsole: true
        })) // Passes it through a gulp-sass task
        .pipe(autoprefixer()) // Passes it through gulp-autoprefixer
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gutil.env.production ? gutil.noop() : sourcemaps.write()) // Writing sourcemaps
        .pipe(gulp.dest('app/css')) // Outputs it in the css folder
        // Reloading the stream
        .pipe(filesize())
        .pipe(browserSync.reload({
            stream: true
        }));
});

// JS hint task
gulp.task('jshint', function() {
  gulp.src(['app/js/**/*.js', '!app/js/{vendor,vendor/**}', '!app/js/bundle.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('build-js', function() {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            //only uglify if gulp is ran with '--production'
            .pipe(gutil.env.production ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/js'));
});

gulp.task('images', function () {
    var imgSrc = 'app/img/**/*.{png,gif,jpg}',
        imgDst = 'dist/img';

    return gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(imgDst));
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

// Watch task
gulp.task('watch', ['hello', 'browserSync', 'sass', 'jshint', 'build-js'], function() {
    gulp.watch('app/sass/**/*.+(scss|sass)', ['sass']);
    gulp.watch('app/js/*.js', ['jshint', 'build-js']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/img/**/*', ['images']);
});

// Default task
gulp.task('default', ['watch']);