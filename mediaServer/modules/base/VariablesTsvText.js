'use strict'

var Q = require('q')
var ParserTsvText = require('./ParserTsvText')
var miscMethods = require('./miscMethods')


var VariablesTsvText = function (csv_parse, tsv_text, csv_parser_options) {
    ParserTsvText.call(this, csv_parse, tsv_text, csv_parser_options)
    this._class_name = 'VariablesTsvText'
    this._captured_variables = ''
}
VariablesTsvText.prototype = Object.create(ParserTsvText.prototype)
VariablesTsvText.prototype.constructor = VariablesTsvText

VariablesTsvText.prototype.capturedVariables = function () {
    return this._captured_variables
}

VariablesTsvText.prototype.deriveAll = function (the_rows, current_media, offset_minutes) {
    var modified_rows = []
    for (var row_index in the_rows) {
        if (the_rows.hasOwnProperty(row_index)) {
            var un_modified_row = the_rows[row_index]
            var modified_row = current_media.deriveData(un_modified_row, offset_minutes)
            modified_rows.push(modified_row)
        }
    }
    var modified_rows_123 = current_media.deriveVersions(modified_rows)
    return modified_rows_123
}

//  http://www.feedforall.com/itune-tutorial-tags.htm
VariablesTsvText.prototype.allVariables = function (verify_tsv) {
    var deferred = Q.defer()
    var this_allVariables = this
     this.allRows(verify_tsv).then(
        function onFulfilled(variable_rows) {
            var tsv_variables = []
            for (var value_key in variable_rows) {
                if (variable_rows.hasOwnProperty(value_key)) {
                    var variable_name = miscMethods.trimString(variable_rows[value_key]['variables'])
                    var variable_value = miscMethods.trimString(variable_rows[value_key]['values'])
                    if (( variable_name !== '') && (variable_value !== '')) {
                        tsv_variables[variable_name] = variable_value
                    }
                }
            }
            this_allVariables._captured_variables = tsv_variables
            deferred.resolve(tsv_variables)
        }, function onRejected(err_cond) {
            deferred.reject(err_cond)
        }
    ).catch(function (error) {
         miscMethods.serverError(error)
     })
    return deferred.promise
}

module.exports = VariablesTsvText
