/*
Verzeichnisse
 */

var src               = 'app';
var build             = 'build';
var development       = 'build/development';
var production        = 'build/production';
var srcAssets         = 'app/assets';
var developmentAssets = 'build/development/assets';
var productionAssets  = 'build/production/assets';

/*
Skripte, die concatiniert werden sollen
 */

// Für head.js
var jsHead = [
    src + '/bower_components/modernizr/modernizr.js'
];

// Für application.js
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
            /*
            server: {
                baseDir: [development, build, src]
            },
            port: 9999,
            */
            proxy: 'nebula.loc',
            files: [
                development + '/**/*.html',
                developmentAssets + '/css/*.css',
                developmentAssets + '/js/*.js',
                developmentAssets + '/img/**',
                developmentAssets + '/fonts/*'
            ]
        },
        production: {
            /*
            server: {
                baseDir: [production]
            },
            port: 9998
            */
            proxy: 'nebula.loc'
        }
    },
    delete: {
        src: [production]
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
            src:  [
                srcAssets + '/fonts/*',
                src + '/bower_components/font-awesome/fonts/*'
            ],
            dest: developmentAssets + '/fonts'
        },
        production: {
            src:  developmentAssets + '/fonts/*',
            dest: productionAssets + '/fonts'
        }
    },
    base64: {
        src: developmentAssets + '/css/*.css',
        dest: developmentAssets + '/css',
        options: {
            baseDir: developmentAssets + '/css',
            extensions: ['png','gif'],
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
            src:    [
                        src + '/**/*.{html,markdown,md,yml,json,txt,xml}',
                        '!' + src + '/{bower_components,bower_components/**}'
                    ],
            dest:   development
        },
        production: {
            src:    [
                        src + '/**/*.{html,markdown,md,yml,json,txt,xml}',
                        '!' + src + '/{bower_components,bower_components/**}'
                    ],
            dest:   production
          }
    },
    optimize: {
        css: {
            src:  developmentAssets + '/css/*.css',
            dest: productionAssets + '/css/',
            options: {
                keepSpecialComments: 0
            }
        },
        js: {
            src:  developmentAssets + '/js/*.js',
            dest: productionAssets + '/js/',
            options: {}
        },
        images: {
            src:  developmentAssets + '/img/**/*.{jpg,jpeg,png,gif}',
            dest: productionAssets + '/img/',
            options: {
                optimizationLevel: 3,
                progessive: true,
                interlaced: true
            }
        },
        html: {
            src: production + '/**/*.html',
            dest: production,
            options: {
                collapseWhitespace: true
            }
        }
    },
    revision: {
        src: {
            assets: [
                productionAssets + '/css/*.css',
                productionAssets + '/js/*.js',
                productionAssets + '/img/**/*'
            ],
            base: production
        },
        dest: {
            assets: production,
            manifest: {
                name: 'manifest.json',
                path: productionAssets
            }
        }
    },
    collect: {
        src: [
            productionAssets + '/manifest.json',
            production + '/**/*.{html,xml,txt,json,css,js}',
            '!' + production + '/feed.xml'
        ],
        dest: production
    },
    gzip: {
        src: production + '/**/*.{html,xml,json,css,js}',
        dest: production,
        options: {}
    },
};