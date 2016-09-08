'use strict'

var gulp = require('gulp')
var cssmin = require('gulp-cssmin')
var rename = require('gulp-rename')
var del = require('del')
var gutil = require('gulp-util')
var runSequence = require('run-sequence')
var rev = require('gulp-rev')

var global_done_color = 'bgRed'
var local_text_color = 'bgMagenta'

gulp.task('CSS_init', function () {
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                               css'))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    return del([
        '../public/styles.min.css',
        '../public/styles-*.min.css'
    ], {"force": "true"})
})

gulp.task('CSS_minify', function () {
    return gulp.src('../public/styles.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('../public'))
})

gulp.task('CSS_hash', function () {
    return gulp.src('../public/styles.min.css')
        .pipe(rev())
        .pipe(gulp.dest('../public'))
        .pipe(rev.manifest('../rev-manifest_css.json'))
        .pipe(gulp.dest('../public'))
})

gulp.task('CSS_done', function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('                      css')
    console.log(done + mess)
    callback()
})

gulp.task('CSS_start', function (callback) {
    return runSequence('CSS_init',
        'CSS_minify',
        'CSS_hash',
        'CSS_done',
        callback)
})

gulp.task('CSS_change_watch', function () {
    gulp.watch('../public/styles.css', ['CSS_start'])
})

gulp.task('css', ['CSS_start', 'CSS_change_watch'])


