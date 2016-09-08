'use strict'

var gulp = require('gulp')
const DataURI = require('datauri').promise
var jsonfile = require('jsonfile')
var runSequence = require('run-sequence')
var gutil = require('gulp-util')

var global_done_color = 'bgRed'
var local_text_color = 'bgBlack'

gulp.task('IMG_init', function (callback) {
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                               img'))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    console.log(gutil.colors[local_text_color]('                                                  '))
    callback()
})

gulp.task('IMG_data_uri', function (callback) {
    var image_list = ['ReadingShortAndDeepLogo200x200.jpg']
    let number_images = image_list.length
    var data_uris = {}
    for (let i in image_list) {
        let image_name = image_list[i]
        var image_path = '../public/' + image_name
        DataURI(image_path)
            .then(content => {
                data_uris[image_name] = content
                number_images--
                if (number_images === 0) {
                    var data_uri_file = fromAppRoot('./img_data_uris.json')
                    jsonfile.writeFile(data_uri_file, data_uris, function (err) {
                        console.error(err)
                    })
                    callback()
                }
            })
            .catch(err => {
                throw err
            })
    }
})

gulp.task('IMG_done',  function (callback) {
    var done = gutil.colors[global_done_color]('                         ')
    var mess = gutil.colors[local_text_color]('                      img')
    console.log(done + mess)
    callback()
})

gulp.task('IMG_start', function(callback) {
    return runSequence(
        'IMG_init'
    ,'IMG_data_uri'
         ,'IMG_done'
        ,callback)
})

gulp.task('img', ['IMG_start'])


