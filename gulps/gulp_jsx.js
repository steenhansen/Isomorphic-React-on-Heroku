'use strict'

require('../rootAppRequire')
var gulp = require('gulp')
var runSequence = require('run-sequence')
var webpackStream = require('webpack-stream')
var jsonfile = require('jsonfile')
var path = require("path")
var webpack = require('webpack')
var extname = require('gulp-extname')
var babel = require('gulp-babel')
var del = require('del')
var gutil = require('gulp-util')
var global_done_color = 'bgRed'
var local_text_color = 'bgCyan'

gulp.task('REACT_init', function () {
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                               jsx'))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    return del([
        '../mediaServer/react/es6/**/*.es6',
        '../mediaServer/react/js/**/*.js',
        '../mediaServer/react/media_1st_bundle.*.js',
        '../mediaServer/react/rsd_2nd_bundle.*.js',
    ], {"force": "true"})
})

gulp.task('REACT_jsx_to_es6', function () {
    console.log(gutil.colors[local_text_color]('                                                    '))
    return gulp.src('../mediaServer/react/jsx/**/*.jsx')
        .pipe(babel())
        .pipe(extname('.es6'))
        .pipe(gulp.dest('../mediaServer/react/es6'))
})

gulp.task('REACT_es6_to_js', function () {
    console.log(gutil.colors[local_text_color]('                                                    '))
    return gulp.src('../mediaServer/react/es6/**/*.es6')
        .pipe(babel({presets: ['es2015', "stage-2"]}))
        .pipe(gulp.dest('../mediaServer/react/js'))
})

gulp.task('BUNDLE_rsd_bundle', function () {
    console.log(gutil.colors[local_text_color]('                                                    '))
    return gulp.src('')
        .pipe(webpackStream({
            entry: {
                media_1st_bundle: [
                    ,"fixed-data-table-2"
                    ,"../mediaServer/react/js/DataList"
                    ,"../mediaServer/react/js/MediaTable"
                    ,"../mediaServer/react/js/reactConstants"
                ],
                rsd_2nd_bundle: "../mediaServer/react/rsd_browser.js"
            },
            output: {
                path: path.join(__dirname, "js"),
                filename: "[name].[chunkhash].js",
                chunkFilename: "[chunkhash].js"
            },
            plugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    names: ["rsd_2nd_bundle", "media_1st_bundle" ],
                    minChunks: Infinity
                }),
            ]
        }, null, function(err, stats) {
            var js_chunks ={}
            for (var js_file_bundle in stats.compilation.assets) {
                var js_file_parts = js_file_bundle.split('.')
                var js_file_name = js_file_parts[0]
                var chunkhash = js_file_parts[1]
                js_chunks[js_file_name]=chunkhash
            }
            var webpack_js_chunks = fromAppRoot('./webpack_js_chunks.json')
            jsonfile.writeFile(webpack_js_chunks, js_chunks, function (err) {
                console.error(err)
            })
        }))
        .pipe(gulp.dest('../mediaServer/react/'))
})

gulp.task('JSX_done',  function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('                      jsx')
    console.log(done + mess)
    callback()
})

gulp.task('JSX_start', function(callback) {
    return runSequence('REACT_init',
        'REACT_jsx_to_es6',
        'REACT_es6_to_js',
        'BUNDLE_rsd_bundle',
        'JSX_done',
        callback)
})

gulp.task('JSX_change_watch', function () {
    gulp.watch('../mediaServer/react/jsx/**/*.jsx', ['JSX_start'])
    gulp.watch('../mediaServer/react/rsd_browser.js', ['JSX_start'])
    gulp.watch('../mediaServer/react/sharedConstants.js', ['JSX_start'])
    gulp.watch('../mediaServer/react/sharedMethods.js', ['JSX_start'])
})

gulp.task('jsx', ['JSX_start', 'JSX_change_watch'])

