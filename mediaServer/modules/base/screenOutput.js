'use strict'

var Q = require('q')
var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')

module.exports = function (save_rss, media_url_dirs) {

    var screenOutput = {
        htmlAdminSaveTestP1: function (variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc) {
            var deferred = Q.defer()
            save_rss.saveXmlToDb(variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc).then(
                function onFulfilled(num_records_saved) {
                    var save_test_to_db_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_SAVE_TEST_P1)
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        records_saved: num_records_saved,
                        link_to_next_view_test_rss: media_url_dirs.ADMIN_SHOW_TEST_P2
                    })
                    deferred.resolve(page_html)
                },
                function onRejected(err_cond) {
                    var save_test_to_db_html = media_file_loc.htmlFiles('saveTestToDb_fail')
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        error_message: err_cond
                    })
                    deferred.reject(page_html)
                }
            )
            return deferred.promise
        },

        htmlAdminSaveRealP3: function (variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc) {
            var deferred = Q.defer()
            save_rss.saveXmlToDb(variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc).then(
                function onFulfilled(num_records_saved) {
                    var save_real_rss_data_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_SAVE_REAL_P3)
                    var page_html = miscMethods.getFillSwig(save_real_rss_data_html, {
                        records_saved: num_records_saved,
                        link_to_view_current_rss: media_url_dirs.ADMIN_VIEW_REAL_IFRAME_P3,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE
                    })
                    deferred.resolve(page_html)
                },
                function onRejected(err_cond) {
                    console.log('screenOutput.htmlAdminSaveRealP3() ', err_cond)
                    deferred.reject(page_html)
                }
            )
            return deferred.promise
        },

        htmlPublicShowPlayer: function (id, the_media, the_information, media_file_loc) {
            var deferred = Q.defer()
            var podpress_html = media_file_loc.htmlFiles(media_url_dirs.PUBLIC_SHOW_PLAYER)
            if (miscMethods.isInteger(id)) {
                the_media.getDocument(id, media_constants.ENTIRE_DOCUMENT, media_constants.REAL_DATA).then(
                    function onFulfilled(media_data) {
                        if (media_data === null) {
                            deferred.reject('no such media id')
                        }
                        var player_template_vars = the_media.playerTemplateVars(media_data)
                        var page_html = miscMethods.getFillSwig(podpress_html, player_template_vars)
                        deferred.resolve(page_html)
                    },
                    function onRejected(err_cond) {
                        console.log('screenOutput.htmlPublicShowPlayer() ', err_cond)
                        deferred.reject(page_html)
                    }
                )
            } else {
                deferred.reject('get id value is not integer')
            }
            return deferred.promise
        },

        xmlAdminViewRealIframeP3: function (the_media) {
            var deferred = Q.defer()
            the_media.getDocument('rss_document', 'all_rss_xml', media_constants.REAL_DATA).then(
                function onFulfilled(the_rss_xml) {
                    deferred.resolve(the_rss_xml)
                },
                function onRejected(err_cond) {
                    deferred.reject(err_cond)
                }
            )
            return deferred.promise
        },

        xmlAdminViewTestIframeP2: function (the_media) {
            var deferred = Q.defer()
            the_media.getDocument('rss_document', 'all_rss_xml', media_constants.TEST_DATA).then(
                function onFulfilled(the_rss_xml) {
                    deferred.resolve(the_rss_xml)
                },
                function onRejected(err_cond) {
                    deferred.reject(err_cond)
                }
            )
            return deferred.promise
        },

        htmlAdminShowTestP2: function (the_information, media_file_loc) {
            var view_test_rss_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_SHOW_TEST_P2)
            var page_html = miscMethods.getFillSwig(view_test_rss_html, {
                link_to_rss_data: media_url_dirs.ADMIN_VIEW_TEST_IFRAME_P2,
                link_next_save_rss_data: media_url_dirs.ADMIN_SAVE_REAL_P3,
                link_back_to_change: media_url_dirs.CHANGE_PAGE
            })
            return page_html
        },

        htmlAdminShowAll: function (the_information, media_file_loc, host_url) {
            var view_all_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_SHOW_ALL_OUTPUT)
            var link_to_player_1 = media_url_dirs.URL_HTML_PUBLIC_SHOW_PLAYER + '?id=1'


            var page_html = miscMethods.getFillSwig(view_all_html, {
                player_link_1: link_to_player_1,
                host_url: host_url,
                table_link: media_url_dirs.URL_HTML_PUBLIC_TABLE,
                rss_link: media_url_dirs.URL_XML_ADMIN_VIEW_REAL_IFRAME_P3
            })
            return page_html
        },

    }
    return screenOutput
}


