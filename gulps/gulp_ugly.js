'use strict'

var gulp = require('gulp')
var runSequence = require('run-sequence')
var uglify = require('gulp-uglify')
var env = require('gulp-env')
var stripDebug = require('gulp-strip-debug')
var gutil = require('gulp-util')
var fs = require('fs')
var del = require('del')

var global_done_color = 'bgRed'
var local_text_color = 'bgBlack'


gulp.task('UGLY_init', function () {
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                              ugly'))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    const envs = env.set({
        NODE_ENV: 'production'    // turn OFF React error messages
    })
    console.log(envs.readable)         // stop eslint un-used
    return del([
        '../public/media_1st_bundle.*.js',
        '../public/rsd_2nd_bundle.*.js'
    ], {"force": "true"})

})

gulp.task('UGLY_compress_bundle_to_public', function () {
    console.log(gutil.colors[local_text_color]('                                                    '))
    const envs = env.set({
        NODE_ENV: 'production'    // turn OFF React error messages
    })
    envs.readable         // stop eslint un-used
    return gulp.src(['../mediaServer/react/media_1st_bundle.*.js'
            , '../mediaServer/react/rsd_2nd_bundle.*.js'])
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('../public'))
})

gulp.task('UGLY_check_mongo_db', function () {
    console.log(gutil.colors[local_text_color]('                                                    '))
    fs.readFile('../configEnvironment.js', 'utf8', function (err_cond, file_data) {
        if (file_data.includes('/localhost/')) {
            console.log(gutil.colors[global_done_color]('Generally "/localhost/" should NOT be used in the PROD config_environment'))
        }
    })
    return
})

gulp.task('UGLY_done', function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('                     ugly')
    console.log(done + mess)
    callback()
})

gulp.task('UGLY_start', function (callback) {
    return runSequence('UGLY_init',
        'UGLY_compress_bundle_to_public',
        'UGLY_check_mongo_db',
        'UGLY_done',
        callback)
})

gulp.task('UGLY_change_watch', function () {
    gulp.watch(['../mediaServer/react/react_1st_bundle.*.js'
        , '../mediaServer/react/react_dom_2nd_bundle.*.js'
        , '../mediaServer/react/media_3rd_bundle.*.js'
        , '../mediaServer/react/rsd_4th_bundle.*.js'], ['UGLY_start'])
})

gulp.task('ugly', ['UGLY_start', 'UGLY_change_watch'])


