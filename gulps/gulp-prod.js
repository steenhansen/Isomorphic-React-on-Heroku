'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')

gulp.task('prod', function (callback) {
    return runSequence(
        'css'
        , 'jsx'
        , 'ugly'
        , callback)
})
