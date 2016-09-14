'use strict'

var sharedMethods = require('../react/sharedMethods')
var moment = require('moment-timezone')
var Q = require('q')
var media_constants = require('./base/MediaConstants')
var miscMethods = require('./base/miscMethods')
var BaseMedia = require('./base/BaseMedia')
var rsd_items_db = require('../models/rsdItemsDb')

if (rsd_items_db.modelName !== 'RsdItems') {
    throw('RsdItems <> ' + rsd_items_db.modelName)
}

var RsdMedia = function (index_field, test_id_prefix, media_type) {
    this._media_type = media_type
    this._media_directory_url = media_constants.RSD_DIRECTORY_NOT_READ_IN_YET
    BaseMedia.call(this, index_field, test_id_prefix)
    this._class_name = 'RsdMedia'
}

RsdMedia.prototype = Object.create(BaseMedia.prototype)
RsdMedia.prototype.constructor = RsdMedia

RsdMedia.prototype.saveXmlRss = function (rss_xml, real_or_test) {
    var rss_value = BaseMedia.prototype.upsertDocument.call(this, rsd_items_db, 'rss_document', 'all_rss_xml', rss_xml, real_or_test)
    return rss_value
}

RsdMedia.prototype.getDocument = function (document_id, field_id, real_or_test) {
    return BaseMedia.prototype.getDocument.call(this, rsd_items_db, document_id, field_id, real_or_test)
}

RsdMedia.prototype.dropCollection = function () {
    BaseMedia.prototype.dropCollection.call(this, rsd_items_db)
}

RsdMedia.prototype.collectionAsString = function () {
    return BaseMedia.prototype.collectionAsString.call(this, rsd_items_db)
}

RsdMedia.prototype.deleteItems = function (real_or_test) {
    return BaseMedia.prototype.deleteItems.call(this, rsd_items_db, real_or_test)
}

RsdMedia.prototype.deleteDocument = function (document_name) {
    return BaseMedia.prototype.deleteDocument.call(this, rsd_items_db, document_name)
}

RsdMedia.prototype.upsertDocument = function (document_name, variable_name, the_value, real_or_test) {
    return BaseMedia.prototype.upsertDocument.call(this, rsd_items_db, document_name, variable_name, the_value, real_or_test)
}

RsdMedia.prototype.saveDescription = function (description_text, real_or_test) {
    var save_res = BaseMedia.prototype.saveDescription.call(this, rsd_items_db, description_text, real_or_test)
    return save_res
}

RsdMedia.prototype.getTsvVariables = function (tsv_variable_information) {
    this._media_directory_url = tsv_variable_information.media_directory_url
}


RsdMedia.prototype.databaseItem = function (data_columns) {
    var rsd_item = rsd_items_db.mediaFactory(data_columns)
    return rsd_item
}

RsdMedia.prototype.deriveData = function (data_columns, offset_minutes) {
    if (media_constants.RSD_DIRECTORY_NOT_READ_IN_YET === this._media_directory_url) {
        global.Method_logger.chronicle('error', 'deriveData-ERROR-1', module.filename)
        return new Error("RsdMedia._media_directory_url has not been set, call RsdMedia.getTsvVariables first")
    } else {
        data_columns = BaseMedia.prototype.deriveData.call(this, data_columns)
        data_columns['mp3_url'] = this._media_directory_url + data_columns["file name"]
        var byte_size_commas = data_columns['byte size']
        var byte_size_integer = byte_size_commas.replace(/,/g, "")
        data_columns['byte_size'] = byte_size_integer
        var show_date = moment(data_columns['publish date'], "YYYY-MM-DD HH:mm")
        show_date.subtract(offset_minutes, 'minutes')
        data_columns['publish date'] = show_date.format("YYYY-MM-DD HH:mm")
        return data_columns
    }
}


RsdMedia.prototype._itemTemplateVars = function (data_row) {
    var episode_number = data_row['episode number']
    var episode_digit = sharedMethods.leadingZerosDigits(episode_number)
    var item_template_vars = {
        media_item_title: episode_digit + ' ' + data_row['book title'] + ' by ' + data_row['book author'],
        media_item_link: data_row['mp3_url'],
        media_item_description: data_row['podcast description'],
        media_byte_size: data_row['byte_size'],
        media_post_link: data_row['post link'],
        itunes_pubDate: data_row['itunes_pubDate'],
        publish_date: data_row['publish date'],
        item_duration: data_row['hh:mm:ss'],
        media_type: this._media_type
    }
    return item_template_vars
}

RsdMedia.prototype._pageTemplateVars = function (rsd_items_html, tsv_variable_information, itunes_summary) {
    var page_template_vars = {
        rssItem_html: rsd_items_html,

        feed_media_link: tsv_variable_information.media_web_page,
        feed_media_title: tsv_variable_information.media_title,
        feed_media_description: tsv_variable_information.media_description,
        feed_media_copyright: tsv_variable_information.media_copyright,

        itunes_category: tsv_variable_information.itunes_category,
        itunes_sub_category: tsv_variable_information.itunes_sub_category,
        itunes_explicit: tsv_variable_information.itunes_explicit,
        itunes_image: tsv_variable_information.itunes_image,
        itunes_name: tsv_variable_information.itunes_name,
        itunes_email: tsv_variable_information.itunes_email,
        itunes_summary: itunes_summary
    }
    return page_template_vars
}

RsdMedia.prototype.playerTemplateVars = function (data_row) {
    var number_bytes = data_row['byte_size']
    var number_mbs = Math.floor(number_bytes / 1000000)
    var id_digits = sharedMethods.leadingZerosDigits(data_row['_id'])
    var player_template_vars = {
        rsd_id: data_row['_id'],
        id_3_digits: id_digits,
        mp3_url: data_row.mp3_url,
        podcast_description: data_row['podcast description'],
        book_title: data_row['book title'],
        book_author: data_row['book author'],
        hh_mm_ss_length: data_row['hh:mm:ss'],
        mb_size: number_mbs
    }
    return player_template_vars
}


RsdMedia.prototype.currentList = function () {
    var deferred = Q.defer()
    var now_yyyy_mm_dd_hh_mm = miscMethods.serverYYYYMMDDHHmm()
    var valid_episodes = {
        "episode number": {$exists: true},
        "real_or_test": "real",
        "publish date": {$lt: now_yyyy_mm_dd_hh_mm}
    }
    rsd_items_db.collection.find(valid_episodes, function (err, cursor) {
        cursor.sort({'episode number': -1})
        cursor.toArray().then(
            function onFulfilled(collection_arr) {

                deferred.resolve(collection_arr)
            }, function onRejected(err_cond) {
                deferred.reject(err_cond)
            }
        )
    })
    return deferred.promise
}

module.exports = RsdMedia
