'use strict'
//     http://stackoverflow.com/questions/10352900/mongoose-how-to-set-a-schema-field-to-be-the-id
var objectAssign = require('object-assign')
var base_schema = require('./base/baseSchema')
var config_environment = rootAppRequire('configEnvironment')

var pdf_information = {
    media_index_field: 'book id',
    item_schema: {
        "book id": Number,
        title: String,
        author: String,
        "story link on wikipedia": String,
        "author wikipedia entry": String,

        "pdf link 1": String, "pdf page count 1": Number, "pdf info 1": String, pdf_url_1: String,
        "pdf link 2": String, "pdf page count 2": Number, "pdf info 2": String, pdf_url_2: String,
        "pdf link 3": String, "pdf page count 3": Number, "pdf info 3": String, pdf_url_3: String,
        "pdf link 4": String, "pdf page count 4": Number, "pdf info 4": String, pdf_url_4: String,
        "pdf link 5": String, "pdf page count 5": Number, "pdf info 5": String, pdf_url_5: String,
        "pdf link 6": String, "pdf page count 6": Number, "pdf info 6": String, pdf_url_6: String,
        "pdf link 7": String, "pdf page count 7": Number, "pdf info 7": String, pdf_url_7: String,
        "pdf link 8": String, "pdf page count 8": Number, "pdf info 8": String, pdf_url_8: String,
        "pdf link 9": String, "pdf page count 9": Number, "pdf info 9": String, pdf_url_9: String
    },

    google_media_tab: config_environment.PDF_GOOGLE_DATA,
    google_variables_tab: config_environment.PDF_GOOGLE_VARIABLES,


    rss_dir_name: 'pdf/',


    heading_vars: ["book id", "publish date", 'title', 'author', 'story link on wikipedia', 'author wikipedia entry',
        'pdf link 1', 'pdf page count 1', 'pdf info 1',
        'pdf link 2', 'pdf page count 2', 'pdf info 2',
        'pdf link 3', 'pdf page count 3', 'pdf info 3',
        'pdf link 4', 'pdf page count 4', 'pdf info 4',
        'pdf link 5', 'pdf page count 5', 'pdf info 5',
        'pdf link 6', 'pdf page count 6', 'pdf info 6',
        'pdf link 7', 'pdf page count 7', 'pdf info 7',
        'pdf link 8', 'pdf page count 8', 'pdf info 8',
        'pdf link 9', 'pdf page count 9', 'pdf info 9'],

    must_contain: {
        "book id": "\\d+",
        "publish date": "\\d\\d\\d\\d-\\d+-\\d+ \\d+",        // 2016-12-31 23
        "title": ".+",
        "author": ".+",
        "pdf link 1": "\\.(pdf|can)$",
        "pdf page count 1": "\\d+",
        "pdf info 1": ".*"
    },
    contain_errors: {
        "book id": "a digit not bigger than 1",
        "publish date": " date like 2016-12-31 23 ",        // 2016-12-31 23
        "title": "title",
        "author": "author",
        "pdf link 1": "pdf link",
        "pdf page count 1": "page count",
        "pdf info 1": "info text"
    },
    media_type: 'application/pdf',
    tsv_variables: ['usa_media_directory_url', 'can_media_directory_url', 'media_title', 'media_web_page',
        'media_description', 'media_copyright', 'itunes_category', 'itunes_sub_category', 'itunes_explicit',
        'itunes_image', 'itunes_name', 'itunes_email']
}

//   http://www.sffaudio.com/podcasts/the-sffaudio-podcast/#/readalong/347
//   http://www.sffaudio.com/podcasts/SFFaudioPodcast350.mp3
//   https://www.jerkersearcher.com/sffaudio_podcasts/SFFaudioPodcast144.mp3

objectAssign(pdf_information.item_schema, base_schema)
module.exports = pdf_information




