'use strict'

var Q = require('q')
var miscMethods = require('./miscMethods')

module.exports = function (_di_factory) {

    var di_factory = _di_factory
    var save_rss = {
        saveXmlToDb: function (variables_tsv, parser_tsv, the_media, real_or_test, media_information, media_file_loc) {
            var deferred = Q.defer()
            save_rss.saveMediaToDb(variables_tsv, parser_tsv, the_media, real_or_test, media_information).then(
                function onFulfilled(records_saved) {
                    save_rss.makeRssXml(variables_tsv, parser_tsv, the_media, real_or_test, media_information, media_file_loc).then(
                        function onFulfilled() {
                            deferred.resolve(records_saved)
                        },
                        function onRejected(err_cond) {
                            deferred.reject(err_cond)
                        }
                    )
                },
                function onRejected(err_cond) {
                    deferred.reject(err_cond)
                }
            )
            return deferred.promise
        },

        produceXmlRss: function (variables_tsv, parser_tsv, the_media, real_or_test, item_template, feed_template) {
            var deferred = Q.defer()
            variables_tsv.allVariables('Dont_check_variable_names_quebert').then(
                function onSucces(tsv_variables) {
                    parser_tsv.allRows('Dont_check_data_header_titles_quebert').then(
                        function onSucces(the_rows) {
                            the_media.getTsvVariables(tsv_variables)
                            var offset_minutes = 60 * tsv_variables.hours_offset + 1 * tsv_variables.post_early_min_rss
                            var derived_rows = variables_tsv.deriveAll(the_rows, the_media, offset_minutes)
                            the_media.getDocument('description', 'itunes_summary', real_or_test).then(
                                function onFulfilled(itunes_summary) {
                                    var rss_xml = the_media.rssFeed(derived_rows, tsv_variables, item_template, feed_template, itunes_summary)
                                    deferred.resolve(rss_xml)
                                }, function onRejected(err_cond) {
                                    deferred.reject(err_cond)
                                }
                            )
                        }, function onRejected(err_cond) {
                            deferred.reject(err_cond)
                        }
                    )
                }, function onRejected(err_cond) {
                    deferred.reject(err_cond)
                })
            return deferred.promise
        },

        upsertMedia: function (variables_tsv, parser_tsv, the_media, real_or_test, verify_tsv) {
            var deferred = Q.defer()
            variables_tsv.allVariables(verify_tsv).then(
                function onFulfilled(tsv_variables) {
                    parser_tsv.allRows(verify_tsv).then(
                        function onFulfilled(the_rows) {
                            var test_values_regex = verify_tsv.mustContain(the_rows)
                            if (test_values_regex !== '') {
                                var the_error = new Error(test_values_regex)
                                deferred.reject(the_error)
                            } else {
                                the_media.getTsvVariables(tsv_variables)
                                var offset_minutes = 60 * tsv_variables.hours_offset + 1 * tsv_variables.post_early_min_rss
                                var derived_rows = variables_tsv.deriveAll(the_rows, the_media, offset_minutes)
                                var itunes_description_em_dash = miscMethods.replace2withMdash(variables_tsv._captured_variables.itunes_description)
                                var version_storage = di_factory.VersionStorageCreate(the_media, itunes_description_em_dash)
                                if (version_storage instanceof Error) {
                                    deferred.reject(version_storage)
                                }
                                version_storage.saveNewVersion(derived_rows, real_or_test).then(
                                    function onSucces(number_rows) {
                                        deferred.resolve(number_rows)
                                    }, function onRejected(err_cond) {
                                        global.Method_logger.chronicle('error', 'upsertMedia-ERROR-3', module.filename)
                                        deferred.resolve(err_cond)
                                    }
                                )
                            }
                        },
                        function onRejected(err_cond) {
                            deferred.reject(err_cond)
                        }
                    )
                },
                function onRejected(err_cond) {
                    deferred.reject(err_cond)
                }
            )
            return deferred.promise
        },

        saveMediaToDb: function (variables_tsv, parser_tsv, the_media, real_or_test) {
            var deferred = Q.defer()
            var verify_tsv = di_factory.VerifyTsvCreate()
            save_rss.upsertMedia(variables_tsv, parser_tsv, the_media, real_or_test, verify_tsv).then(
                function onFulfilled(records_saved) {
                    deferred.resolve(records_saved)
                },
                function onRejected(err_cond) {
                    deferred.reject(err_cond)
                }
            )
            return deferred.promise
        },

        makeRssXml: function (variables_tsv, parser_tsv, the_media, real_or_test, media_information, media_file_loc) {
            var deferred = Q.defer()
            var item_template = media_file_loc.rssHtmlItem()
            var feed_template = media_file_loc.rssHtmlFeed()
            save_rss.produceXmlRss(variables_tsv, parser_tsv, the_media, real_or_test, item_template, feed_template).then(
                function onSucces(rss_xml) {
                    the_media.saveXmlRss(rss_xml, real_or_test)
                    deferred.resolve(rss_xml)
                }, function onRejected(err_cond) {
                    deferred.reject(err_cond)
                }
            )
            return deferred.promise
        }
    }
    return save_rss
}















