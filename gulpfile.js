'use strict';
const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const filter = require('gulp-filter');
const pug = require('gulp-pug');
const uglify = require('gulp-uglify'); //minify js
const prettify = require('gulp-prettify');
const clean = require('rimraf');
const concat = require('gulp-concat');
const svgMin = require('gulp-svgmin');
const cheerio = require('cheerio');
const svgSprite = require('svg-sprite');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

const arrPath = {
    'src': {
        'pug': [
            './src/html/*.pug',
        ],
        'stylus': [
            './src/css/style.scss',
            './src/css/*.scss',
        ],
        'fonts': [
            './src/fonts/*.*',
        ],
        'img': [
            './src/img/*.*',
        ]
    },
    'build': {
        'main': './build/',
        'html': './build/',
        'css': './build/css/',
        'fonts': './build/fonts/',
        'img': './build/img/',
        'sprite': './build/sprite/'
    },
    'watch': {
        'pug': [
            './src/html/*.pug',
            './src/html/**/*.pug'
        ],
        'stylus': [
            './src/css/*.scss',
            './src/css/**/*.scss'
        ],
    }
}
// pug task
gulp.task('build:pug', function() {
    return gulp
        .src(arrPath.src.pug)
        .pipe(filter(['**/*.pug', '!**/_*.pug']))
        .pipe(pug({
            doctype: 'html',
            pretty: false
        }))
        .on('error', console.log)
        .pipe(prettify({
            'unformatted': ['pre', 'code'],
            'preserve_newlines': true,
            'end_with_newline': true
        }))
        .pipe(gulp.dest(arrPath.build.html));
});

// stylus task
gulp.task('build:style', function() {
    return gulp
        .src(arrPath.src.stylus)
        .pipe(filter(['**/*.scss', '!**/_*.scss']))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
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
        .watch(arrPath.watch.pug, gulp.series('build:pug'))
        .on('change', browserSync.reload);
    gulp
        .watch(arrPath.watch.stylus, gulp.series('build:style'))
        .on('change', browserSync.reload);
});

gulp.task('clean', function(unknown) {
    clean(arrPath.build.main, unknown);
})
// build all
gulp.task('build', gulp.series('build:pug','build:style','build:fonts'));

// when developnent
gulp.task('dev', gulp.series('build','serve'));

