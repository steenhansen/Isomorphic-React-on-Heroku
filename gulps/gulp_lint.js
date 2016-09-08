'use strict'

var gulp = require('gulp')
var eslint = require('gulp-eslint')
var gutil = require('gulp-util')
var runSequence = require('run-sequence')

var global_done_color = 'bgRed'
var local_text_color = 'bgCyan'

var my_lint_dirs = [
    '../mediaServer/cron/**/*.js'
    , '../mediaServer/models/**/*.js'
    , '../mediaServer/modules/**/*.js'
    , '../mediaServer/react/**/*.jsx'
    , '../mediaServer/react/**/rsd_browser.js'
    , '../mediaServer/routes/**/*.js'
    , '../mediaServer/test/**/*.js'
    , '../mediaServer/test/**/*.jsx'
    , '../*.js'
    , '*.js'
    , '!../interfaces/**'
]

gulp.task('LINT_init', function (callback) {
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                              lint'))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    callback()
})

gulp.task('LINT_check', function () {
    return gulp.src(my_lint_dirs)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
})

gulp.task('LINT_done', ['LINT_check'], function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('                     lint')
    console.log(done + mess)
    callback()
})
gulp.task('LINT_start', function (callback) {
    return runSequence('LINT_init',
        'LINT_check',
        'LINT_done',
        callback)
})

gulp.task('LINT_change_watch', function () {
    gulp.watch(my_lint_dirs, ['LINT_start'])
})

gulp.task('lint', ['LINT_start', 'LINT_change_watch'])
