const gulp = require("gulp");
const browserSync = require('browser-sync').create();
const filter = require('gulp-filter');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');
const uglify = require('gulp-uglify'); //minify js
const prettify = require('gulp-prettify');
const clean = require('rimraf');
const concat = require('gulp-concat');

const arrPath = {
    'src': {
        'pug': [
            './src/html/*.pug',
        ],
        'stylus': [
            './src/css/*.styl',
            './src/css/libs/*.styl'
        ],
        'fonts': [
            './src/fonts/*.*',
        ]
    },
    'build': {
        'main': './build/',
        'html': './build/',
        'css': './build/css/',
        'fonts': './build/fonts/'
    },
    'watch': {
        'pug': [
            './src/html/*.pug',
            './src/html/**/*.pug'
        ],
        'stylus': [
            './src/css/*.styl',
            './src/css/**/*.styl'
        ],
    }
}
// pug task
gulp.task('build:pug', function() {
    gulp
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
gulp.task('build:stylus', function() {
    gulp
        .src(arrPath.src.stylus)
        .pipe(filter(['**/*.styl', '!**/_*.styl']))
        .pipe(stylus({
            'include css': true,
            compress: true,
        }))
        .pipe(concat('styles.css'))
        .on('error', console.log)
        .pipe(gulp.dest(arrPath.build.css));
});

gulp.task('build:fonts',function(){
    gulp
        .src(arrPath.src.fonts)
        .pipe(gulp.dest(arrPath.build.fonts))
})

// build all
gulp.task('build', 
    [
        'build:pug',
        'build:stylus',
        'build:fonts'
    ]
);

// when developnent
gulp.task('dev', 
    [
        'build',
        'watcher',        
        'serve',
    ]
);

// start server
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: arrPath.build.main,
            notify: false,
        }
    });
});

//watch files
gulp.task('watcher', function() {
    gulp
        .watch(arrPath.watch.pug, ['build:pug'])
        .on('change', browserSync.reload);
    gulp
        .watch(arrPath.watch.stylus, ['build:stylus'])
        .on('change', browserSync.reload);
})

gulp.task('clean', function(unknown) {
    clean(arrPath.build.main, unknown);
})