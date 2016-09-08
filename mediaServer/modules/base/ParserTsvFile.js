'use strict'


var Q = require('q')
var ParserTsvText = require('./ParserTsvText')
var miscMethods = require('./miscMethods')

var ParserTsvFile = function (csv_parse, tsv_pathname, csv_parser_options) {
    this._tsv_pathname = tsv_pathname
    ParserTsvText.call(this, csv_parse, ParserTsvText.call, csv_parser_options)
    this._class_name = 'ParserTsvFile'
}

ParserTsvFile.prototype = Object.create(ParserTsvText.prototype)
ParserTsvFile.prototype.constructor = ParserTsvFile

ParserTsvFile.prototype._getTsvText = function () {
    var deferred = Q.defer()
    var this_ParserTsvFile = this
    miscMethods.readLocalFile(this._tsv_pathname).then(
        function onFulfilled(local_file_data) {
            this_ParserTsvFile._tsv_text = local_file_data
            deferred.resolve(local_file_data)
        },
        function onRejected(err_cond) {
            deferred.reject(err_cond)
        }
    )
    return deferred.promise
}

module.exports = ParserTsvFile
