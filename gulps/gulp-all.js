'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')
var gutil = require('gulp-util')

var global_done_color = 'bgRed'
var local_text_color = 'bgGreen'

gulp.task('ALL_build', function (callback) {
    return runSequence(
        'jsx'
        , 'test'
        , 'flow'
        , 'lint'
        , 'css'
        , 'img'
        , 'ugly'
        , callback)
})

gulp.task('ALL_done', function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('        node media-server')
    console.log(done + mess)
    callback()
})

gulp.task('ALL_start', function (callback) {
    return runSequence('ALL_build',
        'ALL_done',
        callback)
})

gulp.task('all', ['ALL_start'])
