'use strict'

var Q = require('q')
var VariablesTsvText = require('./VariablesTsvText')
var miscMethods = require('./miscMethods')

var media_constants = require('./MediaConstants')

var VariablesTsvFile = function (csv_parse, tsv_pathname, csv_parser_options) {
    this._tsv_pathname = tsv_pathname
    VariablesTsvText.call(this, csv_parse, media_constants.WAIT_FOR_FILE_TEST, csv_parser_options)
    this._class_name = 'VariablesTsvFile'
}

VariablesTsvFile.prototype = Object.create(VariablesTsvText.prototype)
VariablesTsvFile.prototype.constructor = VariablesTsvFile

VariablesTsvFile.prototype._getTsvText = function () {
    var deferred = Q.defer()
    var this_VariablesTsvFile = this
    miscMethods.readLocalFile(this._tsv_pathname).then(
        function onFulfilled(local_file_data) {
            this_VariablesTsvFile._tsv_text = local_file_data
            deferred.resolve(local_file_data)
        }, function onRejected(err_cond) {
            deferred.reject(err_cond)
        }
    )
    return deferred.promise
}

module.exports = VariablesTsvFile
