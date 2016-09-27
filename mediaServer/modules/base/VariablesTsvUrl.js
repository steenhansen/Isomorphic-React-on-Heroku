'use strict'

var Q = require('q')
var VariablesTsvText = require('./VariablesTsvText')
var miscMethods = require('./miscMethods')

var media_constants = require('./MediaConstants')


var VariablesTsvUrl = function (csv_parse, tsv_url, csv_parser_options) {
    this._tsv_url = tsv_url
    VariablesTsvText.call(this, csv_parse, media_constants.WAIT_FOR_FILE_TEST, csv_parser_options)
    this._class_name = 'VariablesTsvUrl'
}

VariablesTsvUrl.prototype = Object.create(VariablesTsvText.prototype)
VariablesTsvUrl.prototype.constructor = VariablesTsvUrl

VariablesTsvUrl.prototype._getTsvText = function () {
    var deferred = Q.defer()
    var this_VariablesTsvUrl = this
    miscMethods.readUrlFile(this._tsv_url).then(
        function onFulfilled(local_file_data) {
            if (local_file_data.indexOf('text/javascript') > -1) {
                var err_cond = new Error("Cannot read Google spreedsheet " + this_VariablesTsvUrl._tsv_url)
                deferred.reject(err_cond)
            }
            this_VariablesTsvUrl._tsv_text = local_file_data
            deferred.resolve(local_file_data)
        }, function onRejected(err_cond) {
            deferred.reject(err_cond)
        }).catch(function (error) {
        miscMethods.serverError(error)
    })
    return deferred.promise
}

module.exports = VariablesTsvUrl
