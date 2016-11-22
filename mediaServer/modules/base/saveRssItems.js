'use strict'

var Promise = require('bluebird')
var miscMethods = require('./miscMethods')

module.exports = function (_di_factory) {

    var di_factory = _di_factory
    var save_rss_items = {


        saveRssToDb: function (variables_tsv, parser_tsv, the_media, real_or_test, media_file_loc, host_url) {
            var item_template = media_file_loc.rssHtmlItem()
            var feed_template = media_file_loc.rssHtmlFeed()
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            var verify_tsv_variables = di_factory.VerifyTsvVariablesCreate()
            var promise_tsv_variables = variables_tsv.allVariables(verify_tsv_variables)
            var promise_the_rows = promise_tsv_variables.then(function () {
                //throw new Error ('exception test - saveRssToDb - 1') 
                return parser_tsv.allRows(verify_tsv)
            })

            return Promise.all([promise_tsv_variables, promise_the_rows]).spread(function (tsv_variables, the_rows) {
                //throw new Error ('exception test - saveRssToDb - 2') 
                var offset_minutes = 60 * tsv_variables.hours_offset + 1 * tsv_variables.post_early_min_rss
                var derived_rows = variables_tsv.deriveAll(the_rows, the_media, tsv_variables, offset_minutes)
                return the_media.getDocument('description', 'itunes_summary', real_or_test)
                    .then(
                        function (itunes_summary) {
                            //throw new Error('exception test - saveRssToDb - 3')
                            var rss_xml = the_media.rssFeed(derived_rows, tsv_variables, item_template, feed_template, itunes_summary, host_url)
                            return the_media.saveXmlRss(rss_xml, real_or_test)
                        }
                    )
                    .catch(function (e) {
                        throw e
                    })
            })

        },

        saveItemsToDb: function (variables_tsv, parser_tsv, the_media, real_or_test) {
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            var verify_tsv_variables = di_factory.VerifyTsvVariablesCreate()
            var promise_tsv_variables = variables_tsv.allVariables(verify_tsv_variables)
            var promise_the_rows = promise_tsv_variables.then(function () {
                //  throw new Error ('exception test - saveItemsToDb - 1') 
                let the_rows = parser_tsv.allRows(verify_tsv)
                return the_rows
            })

            return Promise.all([promise_tsv_variables, promise_the_rows]).spread(function (tsv_variables, the_rows) {
                if (the_rows instanceof Error) {
                    throw the_rows
                }
                var test_values_regex = verify_tsv.mustContain(the_rows)
                //  var test_values_regex = 'exception test - saveItemsToDb - 2'
                if (test_values_regex !== '') {
                    throw new Error(test_values_regex)
                } else {
                    var offset_minutes = 60 * tsv_variables.hours_offset + 1 * tsv_variables.post_early_min_rss
                    var derived_rows = variables_tsv.deriveAll(the_rows, the_media, tsv_variables, offset_minutes)
                    var itunes_description_em_dash = miscMethods.replace2withMdash(variables_tsv._captured_variables.itunes_description)
                    var version_storage = di_factory.VersionStorageCreate(the_media, itunes_description_em_dash)
                    // var version_storage = new Error ('exception test - saveItemsToDb - 3') 
                    if (version_storage instanceof Error) {
                        throw version_storage
                    }
                    return version_storage.saveNewVersion(derived_rows, real_or_test)
                        .then(function (number_rows) {
                            //throw new Error ('exception test - saveItemsToDb - 4') 
                            return number_rows
                        })
                        .catch(function (e) {
                            throw e
                        })
                }
            })
        }

    }
    return save_rss_items
}

