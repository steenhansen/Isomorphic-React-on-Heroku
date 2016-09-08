'use strict'

var gulp = require('gulp')
var flow = require('gulp-flowtype')
var gutil = require('gulp-util')
var runSequence = require('run-sequence')

var global_done_color = 'bgRed'
var local_text_color = 'bgMagenta'

gulp.task('FLOW_typecheck', function() {
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                              flow'))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    return gulp.src('../mediaServer/react/jsx/**/*.jsx')
        .pipe(flow({
            all: false,
            weak: false,
            declarations: './declarations',
            killFlow: false,
            beep: true,
            abort: false
        }))
})

gulp.task('FLOW_done', function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('                     flow')
    console.log(done + mess)
    callback()
})
gulp.task('FLOW_start', function (callback) {
    return runSequence('FLOW_typecheck',
        'FLOW_done',
        callback)
})

gulp.task('flow', ['FLOW_start'])


