'use strict'

var gulp = require('gulp')
var extname = require('gulp-extname')
var babel = require('gulp-babel')
var del = require('del')
var gutil = require('gulp-util')

var global_done_color = 'bgRed'
var local_text_color = 'bgWhite'

gulp.task('TEST_init', function () {

    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                              test'))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))

    return del([
        '../test/acceptance/**/*.es6',
        '../test/acceptance/**/*.js'
    ], {"force": "true"})
})

gulp.task('TEST_jsx_to_es6', function () {
    console.log(gutil.colors.bgYellow('                                                    '))
    return gulp.src('../test/acceptance/**/*.jsx')
        .pipe(babel())
        .pipe(extname('.es6'))
        .pipe(gulp.dest(function (file) {
            return file.base
        }))
})


gulp.task('TEST_es6_to_js', ['TEST_jsx_to_es6'], function () {
    gutil.log(gutil.colors.bgYellow('                                                    '))
    return gulp.src('../test/acceptance/**/*.es6')
        .pipe(babel({presets: ['es2015', "stage-2"]}))
        .pipe(gulp.dest(function (file) {
            return file.base
        }))
})

gulp.task('TEST_start', ['TEST_es6_to_js'], function () {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('                     test')
    console.log(done + mess)
})

gulp.task('TEST_change_watch', function () {
    gulp.watch('acceptance/**/*.jsx', ['TEST_start'])
})

gulp.task('test', ['TEST_init', 'TEST_start', 'TEST_change_watch'])


