'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')
var gutil = require('gulp-util')

var global_done_color = 'bgRed'
var local_text_color = 'bgGreen'

gulp.task('VERIFY_build', function (callback) {
    return runSequence(
        'test'
        , 'flow'
        , 'lint'
        , 'mocha'
        , callback)
})

gulp.task('VERIFY_done', function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('        verify')
    console.log(done + mess)
    callback()
})

gulp.task('VERIFY_start', function (callback) {
    return runSequence('VERIFY_build',
        'VERIFY_done',
        callback)
})

gulp.task('verify', ['VERIFY_start'])