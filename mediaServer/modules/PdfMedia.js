'use strict'
var media_constants = require('./base/MediaConstants')
var REAL_DATA = media_constants.REAL_DATA
var CRON_DB_STATUS = media_constants.CRON_DB_STATUS
var CRON_ERR_FIELD = media_constants.CRON_ERR_FIELD
var PDF_CANADA_DIR_NOT_READ_IN_YET = media_constants.PDF_CANADA_DIR_NOT_READ_IN_YET
var PDF_USA_DIR_NOT_READ_IN_YET = media_constants.PDF_USA_DIR_NOT_READ_IN_YET


var objectAssign = require('object-assign')

var BaseMedia = require('./base/BaseMedia')
var pdf_items_db = require('../models/pdfItemsDb')


if (pdf_items_db.modelName !== 'PdfItems') {
    throw('PdfItems <> ' + pdf_items_db.modelName)
}

var PdfMedia = function (index_field, test_id_prefix, media_type) {

    this._media_type = media_type
    this._usa_media_directory_url = PDF_USA_DIR_NOT_READ_IN_YET
    this._can_media_directory_url = PDF_CANADA_DIR_NOT_READ_IN_YET

    BaseMedia.call(this, index_field, test_id_prefix)
    this._class_name = 'PdfMedia'
}

PdfMedia.prototype = Object.create(BaseMedia.prototype)
PdfMedia.prototype.constructor = PdfMedia

PdfMedia.prototype.saveCronStatus = function (the_value) {
    var upsert_value = BaseMedia.prototype.upsertDocument.call(this, pdf_items_db, CRON_DB_STATUS, CRON_ERR_FIELD, the_value, REAL_DATA)
    return upsert_value
}

PdfMedia.prototype.dropCollection = function () {
    BaseMedia.prototype.dropCollection.call(this, pdf_items_db)
}

//   http://stackoverflow.com/questions/30474059/mongodb-db-collection-copyto-and-eval-have-been-deprecated-whats-the-alte
PdfMedia.prototype.collectionAsString = function () {
    return BaseMedia.prototype.collectionAsString.call(this, pdf_items_db)
}

PdfMedia.prototype.getDocument = function (document_id, field_id, real_or_test) {
    return BaseMedia.prototype.getDocument.call(this, pdf_items_db, document_id, field_id, real_or_test)

}


PdfMedia.prototype.deleteItems = function (real_or_test) {
    return BaseMedia.prototype.deleteItems.call(this, pdf_items_db, real_or_test)
}

PdfMedia.prototype.deleteDocument = function (document_name) {
    return BaseMedia.prototype.deleteDocument.call(this, pdf_items_db, document_name)
}


//PdfMedia.prototype.saveMd5 = function (m5d_hash, real_or_test) {
//    return BaseMedia.prototype.saveMd5.call(this, pdf_items_db, m5d_hash, real_or_test)
//}

PdfMedia.prototype.saveDescription = function (description_text, real_or_test) {
    return BaseMedia.prototype.saveDescription.call(this, pdf_items_db, description_text, real_or_test)
}


PdfMedia.prototype.upsertDocument = function (document_name, variable_name, the_value, real_or_test) {
    return BaseMedia.prototype.upsertDocument.call(this, pdf_items_db, document_name, variable_name, the_value, real_or_test)
}


PdfMedia.prototype.getTsvVariables = function (tsv_variable_information) {
    this._usa_media_directory_url = tsv_variable_information.usa_media_directory_url
    this._can_media_directory_url = tsv_variable_information.can_media_directory_url
}


PdfMedia.prototype.databaseItem = function (data_columns) {

    var pdf_item = pdf_items_db.mediaFactory(data_columns)
    return pdf_item
}


PdfMedia.prototype.deriveData = function (data_columns) {
    data_columns = BaseMedia.prototype.deriveData.call(this, data_columns)
    if (PDF_USA_DIR_NOT_READ_IN_YET === this._usa_media_directory_url) {
        global.Method_logger.chronicle('error', 'deriveData-ERROR-1', module.filename)

        return new Error("PdfMedia._usa_media_directory_url has not been set, call PdfMedia.getTsvVariables first")
    } else {
        var data_columns = this._emptyWikipediaLinks(data_columns)
        data_columns["version_count"] = 0
        for (var i = 1; i < 10; i++) {
            var the_i_th_filename = data_columns["pdf link " + i]
            if (this._validVersion(data_columns, i)) {
                var can_usa_pdf_name = this._usaOrCanadaLocation(the_i_th_filename)


                data_columns["pdf_url_" + i] = can_usa_pdf_name
                data_columns["version_count"]++
            } else {
                delete data_columns["pdf link " + i]
                delete data_columns["pdf page count " + i]
                delete data_columns["pdf info " + i]
            }
        }
        return data_columns
    }
}
PdfMedia.prototype._validVersion = function (data_columns, i) {

    if (!data_columns["pdf link " + i]) {
        return false
    }
//    if (! data_columns["pdf info " + i]) {
    //      return false
    //}
    if (!data_columns["pdf page count " + i]) {
        return false
    }
    return true
}

//  after we are done below there are only pdf_info, there are no pdf_info_1, or _2 .....

PdfMedia.prototype.deriveVersions = function (data_rows_compact) {
    var data_rows_versions = []
    for (var row_index in data_rows_compact) {
        if (data_rows_compact.hasOwnProperty(row_index)) {
            var data_row = data_rows_compact[row_index]
            for (var i = 1; i < 10; i++) {
                if (typeof data_row["pdf_url_" + i] !== 'undefined') {
                    var prototype_data_row = objectAssign({}, data_row)
                    prototype_data_row["pdf_url"] = data_row["pdf_url_" + i]
                    prototype_data_row["pdf link"] = prototype_data_row["pdf link " + i]
                    prototype_data_row["pdf page count"] = prototype_data_row["pdf page count " + i]
                    var pdf_info = prototype_data_row["pdf info " + i]
                    var pdf_info_no_can = pdf_info.replace(/ CDNPD/g, "")
                    prototype_data_row["pdf info"] = pdf_info_no_can
                    if (prototype_data_row["version_count"] > 1) {
                        prototype_data_row["book id"] = prototype_data_row["book id"] + i
                        prototype_data_row["book id char"] = String.fromCharCode(64 + i)

                    } else {
                        prototype_data_row["book id"] = prototype_data_row["book id"] + '0'
                        prototype_data_row["book id char"] = ""
                    }
                    data_rows_versions.push(prototype_data_row)
                }
            }
        }
    }
    return data_rows_versions
}


PdfMedia.prototype._usaOrCanadaLocation = function (can_usa_pdf_name) {
    if (can_usa_pdf_name.indexOf('.can') > -1) {
        var can_loc_with_pdf = can_usa_pdf_name.replace(".can", ".pdf")
        var pdf_location_link = this._can_media_directory_url + can_loc_with_pdf
    } else {
        var pdf_location_link = this._usa_media_directory_url + can_usa_pdf_name
    }
    return pdf_location_link
}

PdfMedia.prototype._emptyWikipediaLinks = function (data_columns) {
    if (data_columns["story link on wikipedia"] === '') {
        delete data_columns["story link on wikipedia"]
    }
    if (data_columns["author wikipedia entry"] === '') {
        delete data_columns["author wikipedia entry"]
    }
    return data_columns
}


PdfMedia.prototype._itemTemplateVars = function (data_row) {
    if (data_row["book id char"]) {
        var pdf_author = data_row['author'] + ' - Version ' + data_row["book id char"]
    } else {
        var pdf_author = data_row['author']
    }
    var pdf_title = data_row['title']
    var pdf_pages = data_row['pdf page count']
    var pdf_info = data_row['pdf info']
    var pdf_url = data_row['pdf_url']
    var pdf_description = 'A ' + pdf_pages + ' page PDF edition of ' + pdf_title + ' by ' + pdf_author + ' in ' + pdf_info
    var item_template_vars = {
        media_item_title: pdf_title + ' by ' + pdf_author,
        media_item_link: pdf_url,
        media_item_description: pdf_description,
        media_byte_size: '123456',
        media_post_link: pdf_url,
        media_type: this._media_type
    }
    return item_template_vars
}

PdfMedia.prototype._pageTemplateVars = function (rss_items_html, tsv_variable_information, itunes_summary) {
    var page_template_vars = {
        rssItem_html: rss_items_html,

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

module.exports = PdfMedia
