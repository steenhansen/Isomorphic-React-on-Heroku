'use strict'




var validUrl = require('valid-url')
var csv_parse = require('csv-parse')

var ParserTsvText = require('./ParserTsvText')
var ParserTsvFile = require('./ParserTsvFile')
var ParserTsvUrl = require('./ParserTsvUrl')
var VariablesTsvText = require('./VariablesTsvText')
var VariablesTsvFile = require('./VariablesTsvFile')
var VariablesTsvUrl = require('./VariablesTsvUrl')

var VerifyTsv = require('./VerifyTsv')
var VersionStorage = require('./VersionStorage')
var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')

var PdfMedia = require('../PdfMedia')
var RsdMedia = require('../RsdMedia')

module.exports = function (media_information) {

    var diFactory = {

        ParserTsvTextCreate: function (tsv_text) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
            if (missing_methods) {
                return global.Method_logger.chronicle('error', 'ParserTsvTextCreate-ERROR-1', module.filename, 'missing_methods', missing_methods)
            } else {
                var parser_tsv_text = new ParserTsvText(csv_parse, tsv_text, media_constants.CSV_PARSER_OPTIONS)
                return parser_tsv_text
            }
        },

        ParserTsvFileCreate: function (tsv_pathname) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
            if (missing_methods) {
                return global.Method_logger.chronicle('error', 'ParserTsvFileCreate-ERROR-1', module.filename, 'missing_methods', missing_methods)
            } else {
                var parser_tsv_file = new ParserTsvFile(csv_parse, tsv_pathname, media_constants.CSV_PARSER_OPTIONS)
                return parser_tsv_file
            }
        },

        ParserTsvUrlCreate: function (tsv_url) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
            if (missing_methods) {
                return global.Method_logger.chronicle('error', 'ParserTsvUrlCreate-ERROR-1', module.filename, 'missing_methods', missing_methods)
            } else {
                if (validUrl.isUri(tsv_url)) {
                    try {
                        var parser_tsv_url = new ParserTsvUrl(csv_parse, tsv_url, media_constants.CSV_PARSER_OPTIONS)
                    } catch (err) {
                        return global.Method_logger.chronicle('error', err, module.filename, 'tsv_url', tsv_url)
                    }
                    return parser_tsv_url
                } else {
                    return global.Method_logger.chronicle('error', 'ParserTsvUrlCreate-ERROR-2', module.filename, 'tsv_url', tsv_url)
                }
            }
        },

        VariablesTsvTextCreate: function (tsv_text) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
            if (missing_methods) {
                return global.Method_logger.chronicle('error', 'VariablesTsvTextCreate-ERROR-1', module.filename, 'missing_methods', missing_methods)
            } else {
                var variables_tsv_text = new VariablesTsvText(csv_parse, tsv_text, media_constants.CSV_PARSER_OPTIONS)
                return variables_tsv_text
            }
        },

        VariablesTsvFileCreate: function (tsv_pathname) {
            var missing_methods = miscMethods.objectHasMethods(csv_parse, ['Parser'])
            if (missing_methods) {
                return global.Method_logger.chronicle('error', 'VariablesTsvFileCreate-ERROR-1', module.filename, 'missing_methods', missing_methods)
            } else {
                var variables_tsv_file = new VariablesTsvFile(csv_parse, tsv_pathname, media_constants.CSV_PARSER_OPTIONS)
                return variables_tsv_file
            }
        },

        VariablesTsvUrlCreate: function (tsv_url) {
            if (validUrl.isUri(tsv_url)) {
                var variables_tsv_url = new VariablesTsvUrl(csv_parse, tsv_url, media_constants.CSV_PARSER_OPTIONS)
                return variables_tsv_url
            } else {
                return global.Method_logger.chronicle('error', 'VariablesTsvUrlCreate-ERROR-1', module.filename, 'tsv_url', tsv_url)
            }
        },

        VerifyTsvCreate: function () {
            var heading_vars = media_information.heading_vars
            var must_contain = media_information.must_contain
            var contain_errors = media_information.contain_errors
            var tsv_variables = media_information.tsv_variables
            if ((heading_vars instanceof Array) && (must_contain instanceof Object) && (contain_errors instanceof Object) && (tsv_variables instanceof Array)) {
                var verify_tsv = new VerifyTsv(heading_vars, must_contain, contain_errors, tsv_variables)
                return verify_tsv
            } else {
                return global.Method_logger.chronicle('error', 'VerifyTsvCreate-ERROR-1', module.filename)
            }
        },

        PdfMediaCreate: function () {
            var media_index_field = media_information.media_index_field
            var media_type = media_information.media_type
            var pdf_storage = new PdfMedia(media_index_field, media_constants.TEST_ID_PREFIX, media_type)
            return pdf_storage
        },

        RsdMediaCreate: function () {
            var media_index_field = media_information.media_index_field
            var media_type = media_information.media_type
            var rsd_storage = new RsdMedia(media_index_field, media_constants.TEST_ID_PREFIX, media_type)
            return rsd_storage
        },

        VersionStorageCreate: function (current_media, media_description_text) {  // PdfMedia or RsdMedia
            var media_methods = ['getTsvVariables', 'deleteItems', 'databaseItem',
                'deriveData', '_itemTemplateVars', '_pageTemplateVars']
            var missing_methods = miscMethods.objectHasMethods(current_media, media_methods)
            if (missing_methods) {
                return global.Method_logger.chronicle('error', 'VersionStorageCreate-ERROR-1', module.filename, 'missing_methods', missing_methods)
            } else {
                var version_storage = new VersionStorage(current_media, media_description_text)
                return version_storage
            }
        }
    }
    return diFactory
}

