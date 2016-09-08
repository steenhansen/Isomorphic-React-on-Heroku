'use strict'

var Q = require('q')
var miscMethods = require('./miscMethods')

var ParserTsvText = function (csv_parse, tsv_text, csv_parser_options) {
    this._csv_parse = csv_parse
    this._tsv_text = tsv_text
    this._parser_options = csv_parser_options
    this._class_name = 'ParserTsvText'
}

ParserTsvText.prototype._firstRow = function (output_array) {
    if (output_array instanceof Array) {
        var output_first = output_array.slice(0, 1)
        var title_array = output_first.shift()
        var title_size = title_array.length
        for (var i = 0; i < title_size; i++) {
            var a_title = title_array[i]
            a_title = miscMethods.deleteBracketComments(a_title)
            a_title = a_title.trim()
            a_title = miscMethods.singleSpacesString(a_title)
            a_title = a_title.toLowerCase()
            title_array[i] = a_title
        }
        return title_array
    } else {
        global.Method_logger.chronicle('error', '_firstRow-ERROR-1', module.filename, 'output_array', output_array)
        return new Error("output_array parameter is not an array")
    }
}

ParserTsvText.prototype._getTsvText = function () {
    return _tsv_text
}

ParserTsvText.prototype.getTitles = function () {

    var deferred = Q.defer()
    var this_ParserTsvText = this
    this._csv_parse(this._tsv_text, this._parser_options, function (err_cond, output_array) {
        if (err_cond) {
            deferred.reject(err_cond)
        }
        var title_array = this_ParserTsvText._firstRow(output_array)
        if (title_array instanceof Error) {
            deferred.reject(title_array)
        }
        deferred.resolve(title_array)
    })
    return deferred.promise
}

// [a,b]+[c,d] => [a->c, b->d]
ParserTsvText.prototype._arrayToObj = function (title_array, current_row) {
    var number_columns = title_array.length
    var hash_object = {}
    for (var i = 0; i < number_columns; i++) {
        var a_title = title_array[i]
        var a_data = current_row[i]
        var current_title = miscMethods.trimString(a_title)
        var current_data = miscMethods.trimString(a_data)
        hash_object[current_title] = current_data
    }
    return hash_object
}

ParserTsvText.prototype._dataRows = function (title_array, data_rows) {
    var number_rows = data_rows.length
    var new_array = []
    for (var i = 0; i < number_rows; i++) {
        var current_row = data_rows[i]
        new_array [i] = this._arrayToObj(title_array, current_row)
    }
    return new_array
}

ParserTsvText.prototype._getData = function () {
    var deferred = Q.defer()
    var this_ParserTsvText = this
    this._csv_parse(this._tsv_text, this._parser_options, function (err_cond, output_array) {
        if (err_cond) {
            deferred.reject(err_cond)
        }
        var title_array = this_ParserTsvText._firstRow(output_array)
        if (title_array instanceof Error) {
            deferred.reject(title_array)
        }
        var data_rows = output_array.slice(1)
        var keyed_rows = this_ParserTsvText._dataRows(title_array, data_rows)
        deferred.resolve(keyed_rows)
    })
    return deferred.promise
}

ParserTsvText.prototype.allRows = function (verify_tsv) {
    var deferred = Q.defer()
    var this_ParserTsvText = this
    this._getTsvText().then(
        function onFulfilled() {
            this_ParserTsvText.getTitles().then(
                function onSucces(the_titles) {
                    if (typeof verify_tsv === 'object') {
                        if (!verify_tsv.headersMatch(the_titles)) {
                            var err_cond = new Error("error_1000 Spreadsheet Headers don't match database")
                            err_cond.information = 'the_titles = ' + the_titles
                            deferred.reject(err_cond)
                        }
                    }
                    this_ParserTsvText._getData().then(
                        function onSucces(the_rows) {
                            deferred.resolve(the_rows)
                        }, function onRejected(err_cond) {
                            deferred.reject(err_cond)
                        })
                }, function onRejected(err_cond) {
                    deferred.reject(err_cond)
                })
        }, function onRejected(err_cond) {
            deferred.reject(err_cond)
        })
    return deferred.promise
}

module.exports = ParserTsvText
