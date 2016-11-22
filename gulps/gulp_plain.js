'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')
var env = require('gulp-env')
var gutil = require('gulp-util')
var fs = require('fs')
var del = require('del')

var global_done_color = 'bgRed'
var local_text_color = 'bgGreen'

gulp.task('PLAIN_init', function () {
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                             plain'))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))

    const envs = env.set({
        NODE_ENV: 'development'        // turn ON React error messages
    })
    console.log(envs.readable)         // stop eslint un-used
    return del([
         '../public/media_1st_bundle.*.js',
        '../public/rsd_2nd_bundle.*.js',
        '../public/podcast_3rd_bundle.*.js',
        '../public/pdf_4th_bundle.*.js'
    ], {"force": "true"})
})

gulp.task('PLAIN_bundle_to_public', function () {
    console.log(gutil.colors[local_text_color]('                                                  '))
    return gulp.src(['../mediaServer/react/media_1st_bundle.*.js'
        , '../mediaServer/react/rsd_2nd_bundle.*.js'
         , '../mediaServer/react/podcast_3rd_bundle.*.js'
         , '../mediaServer/react/pdf_4th_bundle.*.js'])
            .pipe(gulp.dest('../public'))
})

gulp.task('PLAIN_check_localhost_db',  function () {
    console.log(gutil.colors[local_text_color]('                                                  '))
    fs.readFile('../configEnvironment.js', 'utf8', function (e, file_data) {
        if (!file_data.includes('/localhost/')) {
            console.log(gutil.colors[global_done_color]('Generally "/localhost/" should be used in the DEV config_environment'))
        }
    })
    return
})

gulp.task('PLAIN_done', function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('                    plain')
    console.log(done + mess)
    callback()
})

gulp.task('PLAIN_start', function(callback) {
    return runSequence('PLAIN_init',
        'PLAIN_bundle_to_public',
        'PLAIN_check_localhost_db',
        'PLAIN_done',
        callback)
})

gulp.task('PLAIN_change_watch', function () {
    gulp.watch(['../mediaServer/react/media_1st_bundle.*.js'
        , '../mediaServer/react/rsd_2nd_bundle.*.js'
        , '../mediaServer/react/podcast_3rd_bundle.*.js'
        , '../mediaServer/react/pdf_4th_bundle.*.js'
        ], ['PLAIN_start'])
})

gulp.task('plain', ['PLAIN_start', 'PLAIN_change_watch'])





