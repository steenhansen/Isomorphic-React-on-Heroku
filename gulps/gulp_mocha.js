'use strict'

const gulp = require('gulp')
const mocha = require('gulp-mocha')
var gutil = require('gulp-util')
var global_done_color = 'bgRed'
var local_text_color = 'bgBlack'

gulp.task('mocha', function () {


   var done = gutil.colors[global_done_color]('                         ')
   var mess = gutil.colors[local_text_color]('                     database has been emptied')
   console.log(done + mess)

   return gulp.src('../test/call-tests.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({reporter: 'nyan'}))
})