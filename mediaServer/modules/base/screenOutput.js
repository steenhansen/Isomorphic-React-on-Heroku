'use strict'

var Q = require('q')
var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')

module.exports = function (save_rss, media_url_dirs) {

    var screenOutput = {
        html_saveTestToDb_P1: function (variables_tsv, parser_tsv, the_media, real_or_test, the_information,media_file_loc) {
            var deferred = Q.defer()
            save_rss.saveXmlToDb(variables_tsv, parser_tsv, the_media, real_or_test, the_information).then(
                function onFulfilled(num_records_saved) {
                    var save_test_to_db_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_saveTestToDb_P1)
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        records_saved: num_records_saved,
                        link_to_next_save_test_rss: media_url_dirs.ADMIN_saveTestToRss_P2,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE
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
            ).catch(function (error) {
                miscMethods.serverError(error)
            })
            return deferred.promise
        },


        html_saveTestToRss_P2: function (variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc) {
            var deferred = Q.defer()
            save_rss.saveXmlToRss(variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc).then(
                function onFulfilled() {
                    var save_test_to_db_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_saveTestToRss_P2)
                    var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                        link_to_next_view_test_rss: media_url_dirs.ADMIN_viewTestRss_P3,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE
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
            ).catch(function (error) {
                miscMethods.serverError(error)
            })
            return deferred.promise
        },

        html_saveRealToDb_P4: function (variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc) {
            var deferred = Q.defer()
            save_rss.saveXmlToDb(variables_tsv, parser_tsv, the_media, real_or_test, the_information).then(
                function onFulfilled(num_records_saved) {
                    var save_real_rss_data_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_saveRealToDb_P4)
                    var page_html = miscMethods.getFillSwig(save_real_rss_data_html, {
                        records_saved: num_records_saved,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE,
                        link__next_to_save_real_rss: media_url_dirs.ADMIN_saveRealToRss_P5
                    })
                    deferred.resolve(page_html)
                },
                function onRejected(err_cond) {
                    console.log('screenOutput.html_saveRealToDb_P4() ', err_cond)
                    deferred.reject(page_html)
                }
            ).catch(function (error) {
                miscMethods.serverError(error)
            })
            return deferred.promise
        },
        html_saveRealToRss_P5: function (variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc) {
            var deferred = Q.defer()
            save_rss.saveXmlToRss(variables_tsv, parser_tsv, the_media, real_or_test, the_information, media_file_loc).then(
                function onFulfilled() {
                    var save_real_rss_data_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_saveRealToRss_P5)
                    var page_html = miscMethods.getFillSwig(save_real_rss_data_html, {
                        link_to_view_current_rss: media_url_dirs.ADMIN_IFRAME_rss_P5,
                        link_back_to_change: media_url_dirs.CHANGE_PAGE
                    })
                    deferred.resolve(page_html)
                },
                function onRejected(err_cond) {
                    console.log('screenOutput.html_saveRealToDb_P4() ', err_cond)
                    deferred.reject(page_html)
                }
            ).catch(function (error) {
                miscMethods.serverError(error)
            })
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
                ).catch(function (error) {
                    miscMethods.serverError(error)
                })
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
            ).catch(function (error) {
                miscMethods.serverError(error)
            })
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
            ).catch(function (error) {
                miscMethods.serverError(error)
            })
            return deferred.promise
        },

        html_viewTestRss_P3: function (the_information, media_file_loc) {
            var view_test_rss_html = media_file_loc.htmlFiles(media_url_dirs.ADMIN_viewTestRss_P3)
            var page_html = miscMethods.getFillSwig(view_test_rss_html, {
                link_to_rss_data: media_url_dirs.ADMIN_IFRAME_showTestRss_P3,
                link_next_save_rss_data: media_url_dirs.ADMIN_saveRealToDb_P4,
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
                mobile_link: media_url_dirs.URL_HTML_MOBILE_TABLE,
                rss_link: media_url_dirs.URL_XML_ADMIN_IFRAME_rss_P5
            })
            return page_html
        },

    }
    return screenOutput
}


