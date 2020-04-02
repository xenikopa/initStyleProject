'use strict';
const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const filter = require('gulp-filter');
const clean = require('rimraf');
const concat = require('gulp-concat');
const svgMin = require('gulp-svgmin');
const svgSprite = require('svg-sprite');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const prefixer = require('gulp-autoprefixer');
const rigger = require('gulp-rigger');
const cssmin = require('gulp-minify-css');
const webpack = require('webpack-stream');

const arrPath = {
    'src': {
        'html': [
            './src/html/*.html',
        ],
        'styles': [
            './src/css/style.scss',
            './src/css/*.scss',
        ],
        'fonts': [
            './src/fonts/*.*',
        ],
        'img': [
            './src/img/*.*',
        ],
        'js': [
            './src/js/*.js'
        ]
    },
    'build': {
        'main': './build/',
        'html': './build/',
        'css': './build/css/',
        'fonts': './build/fonts/',
        'img': './build/img/',
        'sprite': './build/sprite/',
        'js': './build/js'
    },
    'watch': {
        'html': [
            './src/html/*.html',
            './src/html/**/*.html'
        ],
        'styles': [
            './src/css/*.scss',
            './src/css/**/*.scss'
        ],
        'js': [
            './src/js/*.js',
            './src/js/**/*.js'
        ]
    }
}

gulp.task('build:html', function () {
    return gulp.src(arrPath.src.html) 
        .pipe(rigger()) 
        .pipe(gulp.dest(arrPath.build.html)) 
});

gulp.task('build:js', function () {
    return gulp.src(arrPath.src.js) 
        .pipe(webpack({
            mode: process.env.NODE_ENV || 'development',
            entry: {
                'wizard': './src/js/wizard/wizard.js'
            },
            output: {
                filename: '[name].js'
            },
            optimization: {
                minimize: true
            },
            module: {
                rules: [
                  {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                      loader: "babel-loader",
        
                    }
                  },
                ]
            }
        }))
        .pipe(gulp.dest(arrPath.build.js))
});

gulp.task('build:style', function() {
    return gulp
        .src(arrPath.src.styles)
        .pipe(filter(['**/*.scss', '!**/_*.scss']))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(concat('styles.css'))
        .on('error', console.log)
        .pipe(gulp.dest(arrPath.build.css));
});

gulp.task('build:fonts',function(){
    return gulp
        .src(arrPath.src.fonts)
        .pipe(gulp.dest(arrPath.build.fonts))
})

/**
 * TODO: TypeError: dest.write is not a function
 */
//sprite svg
gulp.task('build:sprite', function() {
    return gulp
        .src(arrPath.src.img)
        .pipe(svgMin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(svgSprite({
            mode: {
                symbol: true
            }
        }))
        .pipe(rename("sprite.html"))
        .on('error', console.log)
        .pipe(gulp.dest(arrPath.build.sprite));
})



// start server
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: arrPath.build.main,
            notify: true,
        }
    });
    gulp
        .watch(arrPath.watch.html, gulp.series('build:html'))
        .on('change', browserSync.reload);
    gulp
        .watch(arrPath.watch.styles, gulp.series('build:style'))
        .on('change', browserSync.reload);
    gulp
        .watch(arrPath.watch.js, gulp.series('build:js'))
        .on('change', browserSync.reload);
});

gulp.task('clean', function(unknown) {
    clean(arrPath.build.main, unknown);
})
// build all
gulp.task('build', gulp.series('build:html','build:style','build:fonts', 'build:js'));

// when developnent
gulp.task('dev', gulp.series('build','serve'));

