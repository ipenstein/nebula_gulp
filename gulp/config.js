var src               = 'app';
var build             = 'build';
var development       = 'build/development';
var production        = 'build/production';
var srcAssets         = 'app/assets';
var developmentAssets = 'build/development/assets';
var productionAssets  = 'build/production/assets';

var jsHead = [
    src + '/bower_components/modernizr/modernizr.js'
];

var jsApplication = [
    // dependencies
    src + '/bower_components/jquery/dist/jquery.min.js',
    src + '/bower_components/jquery-validation/dist/jquery.validate.min.js',
    src + '/bower_components/jquery-validation/src/localization/messages_de.js',
    srcAssets + '/js/vendor/jquery.syncheight.js',
    srcAssets + '/js/vendor/jquery.scrollTo.min.js',
    srcAssets + '/js/vendor/parallax.min.js',

    // user scripts
    srcAssets + '/js/responsive.js',
    srcAssets + '/js/forms.js',
    srcAssets + '/js/tabs.js',
    srcAssets + '/js/collapse.js',
    srcAssets + '/js/dropdowns.js',
    srcAssets + '/js/alerts.js',
    srcAssets + '/js/syncheight.js',
    srcAssets + '/js/example-parallax.js',
    srcAssets + '/js/example-scroll.js',
    srcAssets + '/js/example-navigation.js',
    srcAssets + '/js/layout.js'
];

module.exports = {
    browsersync: {
        development: {
            server: {
                baseDir: [development, build, src]
            },
            port: 9999,
            files: [
                development + '/**/*.html',
                developmentAssets + '/css/*.css',
                developmentAssets + '/js/*.js',
                developmentAssets + '/img/**',
                developmentAssets + '/fonts/*'
            ]
        }
    },
    delete: {
        src: [development]
    },
    sass: {
        src:  srcAssets + '/sass/**/*.{sass,scss}',
        dest: developmentAssets + '/css',
        options: {
            noCache: true,
            compass: false,
            bundleExec: true,
            sourcemap: true,
            sourcemapPath: '../../app/assets/sass'
        }
    },
    autoprefixer: {
        browsers: [
            'last 2 versions',
            'safari 5',
            'ie 8',
            'ie 9',
            'opera 12.1',
            'ios 6',
            'android 4'
        ],
        cascade: true
    },
    scripts: {
        srcHead: jsHead,
        srcApplication: jsApplication,
        dest: developmentAssets + '/js'
    },
    images: {
        src:  srcAssets + '/img/**/*',
        dest: developmentAssets + '/img'
    },
    copyfonts: {
        development: {
            src:  srcAssets + '/fonts/*',
            dest: developmentAssets + '/fonts'
        }
    },
    base64: {
        src: developmentAssets + '/css/*.css',
        dest: developmentAssets + '/css',
        options: {
            baseDir: build,
            extensions: ['png'],
            maxImageSize: 20 * 1024, // bytes
            debug: false
        }
    },
    watch: {
        html:    src + '/**/*.{html,markdown,md,yml,json,txt,xml}',
        sass:    srcAssets + '/sass/**/*.{sass,scss}',
        scripts: srcAssets + '/js/**/*.js',
        images:  srcAssets + '/img/**/*',
        sprites: srcAssets + '/img/**/*.png',
        svg:     'vectors/*.svg'
    },
    scsslint: {
        src: [
            srcAssets + '/sass/**/*.{sass,scss}',
            '!' + srcAssets + '/sass/base/_sprites.scss',
            '!' + srcAssets + '/sass/helpers/_meyer-reset.scss'
        ],
        options: {
            bundleExec: true
        }
    },
    jshint: {
        src: srcAssets + '/js/*.js'
    },
    sprites: {
        src: srcAssets + '/img/sprites/icon/*.png',
        dest: {
            css: srcAssets + '/sass/base/',
            image: srcAssets + '/img/sprites/'
        },
        options: {
            cssName: '_sprites.scss',
            cssFormat: 'css',
            cssOpts: {
                cssClass: function (item) {
                    // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
                    if (item.name.indexOf('-hover') !== -1) {
                        return '.icon-' + item.name.replace('-hover', ':hover');
                    // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
                    } else {
                        return '.icon-' + item.name;
                    }
                }
            },
            imgName: 'icon-sprite.png',
            imgPath: '/assets/img/sprites/icon-sprite.png'
        }
    },
    copyhtml: {
        development: {
            src: src + '/*.html',
            dest: development
        }
    }
};