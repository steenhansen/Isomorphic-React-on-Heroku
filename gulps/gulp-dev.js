'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('dev', function (callback) {
    return runSequence(
        'css'
        , 'jsx'
        , 'plain'
        , callback)
})

