'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var hub = require('gulp-hub')
var global_done_color = 'bgRed'

hub([
    , 'gulps/gulp-all.js'
    , 'gulps/gulp-dev.js'
    , 'gulps/gulp-prod.js'

    , 'gulps/gulp_css.js'
    , 'gulps/gulp_flow.js'
    , 'gulps/gulp_img.js'
    , 'gulps/gulp_jsx.js'
    , 'gulps/gulp_lint.js'
    , 'gulps/gulp_plain.js'
    , 'gulps/gulp_test.js'
    , 'gulps/gulp_ugly.js'
    ])



gulp.task('default', function () {
    console.log(gutil.colors[global_done_color]('                                                  '))
    console.log('  gulp all              // production builds everything')
    console.log('  gulp dev              // quick development build (dev/prod)')
    console.log('  gulp prod             // quick production build (dev/prod)')

    console.log('  gulp css              // minifies css')
    console.log('  gulp flow             // flow test')
    console.log('  gulp img              // makes the main logo into a data-uri')
    console.log('  gulp jsx              // compiles jsx, and bundles js')
    console.log('  gulp lint             // esLint everything')
    console.log('  gulp plain            // copies NON-compressed js bundles to html folder (plain/ugly)')
    console.log('  gulp test             // compiles test jsx files to js')
    console.log('  gulp ugly             // copies COMPRESSED js bundles to html folder (plain/ugly)')
    console.log(gutil.colors[global_done_color]('                                                  '))
})

