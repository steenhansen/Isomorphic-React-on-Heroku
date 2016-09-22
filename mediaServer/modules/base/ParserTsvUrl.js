'use strict'

var Q = require('q')
var ParserTsvText = require('./ParserTsvText')
var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')

var ParserTsvUrl = function (csv_parse, tsv_url, csv_parser_options) {
    if (tsv_url.indexOf('format=tsv') === -1) {
        var the_error = new Error("The Google link does not contain 'format=tsv' ")
        throw (the_error)
    }
    this._tsv_url = tsv_url
    ParserTsvText.call(this, csv_parse, media_constants.WAIT_FOR_FILE_TEST, csv_parser_options)
    this._class_name = 'ParserTsvUrl'
}

ParserTsvUrl.prototype = Object.create(ParserTsvText.prototype)
ParserTsvUrl.prototype.constructor = ParserTsvUrl
ParserTsvUrl.prototype._getTsvText = function () {
    var deferred = Q.defer()
    var this_ParserTsvUrl = this
    miscMethods.readUrlFile(this._tsv_url).then(
        function onFulfilled(url_file_data) {
            this_ParserTsvUrl._tsv_text = url_file_data
            deferred.resolve(url_file_data)
        },
        function onRejected(err_cond) {
            deferred.reject(err_cond)
        }
    ).catch(function (error) {
        miscMethods.serverError(error.stack)
    })
    return deferred.promise
}

module.exports = ParserTsvUrl










