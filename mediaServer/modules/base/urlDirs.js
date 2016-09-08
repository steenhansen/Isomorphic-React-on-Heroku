'use strict'

module.exports = function (media_dir_type) {

    var media_url_dirs = {
        CHANGE_PAGE: 'change',

        ADMIN_SAVE_TEST_P1: 'saveTestToDb',

        ADMIN_SHOW_TEST_P2: 'viewTestRss',
        ADMIN_VIEW_TEST_IFRAME_P2: 'showTestRss',

        ADMIN_SAVE_REAL_P3: 'saveRealToDb',
        ADMIN_VIEW_REAL_IFRAME_P3: 'rss',

        ADMIN_SHOW_ALL_OUTPUT: 'showAllOutput',

        PUBLIC_SHOW_EXPLAIN: 'explainPage',
        PUBLIC_TABLE: 'table',

        MOBILE_EXPLAIN: 'explainMobile',
        MOBILE_TABLE: 'mobile',

        PUBLIC_SHOW_PLAYER: 'podPressPlayer'
    }

    var slashed_media_dir_type = '/' + media_dir_type + '/'
    media_url_dirs.URL_HTML_ADMIN_SAVE_TEST_P1 = slashed_media_dir_type + media_url_dirs.ADMIN_SAVE_TEST_P1
    media_url_dirs.URL_HTML_ADMIN_SHOW_TEST_P2 = slashed_media_dir_type + media_url_dirs.ADMIN_SHOW_TEST_P2
    media_url_dirs.URL_XML_ADMIN_VIEW_TEST_IFRAME_P2 = slashed_media_dir_type + media_url_dirs.ADMIN_VIEW_TEST_IFRAME_P2
    media_url_dirs.URL_HTML_ADMIN_SAVE_REAL_P3 = slashed_media_dir_type + media_url_dirs.ADMIN_SAVE_REAL_P3
    media_url_dirs.URL_XML_ADMIN_VIEW_REAL_IFRAME_P3 = slashed_media_dir_type + media_url_dirs.ADMIN_VIEW_REAL_IFRAME_P3

    media_url_dirs.URL_HTML_ADMIN_SHOW_ALL_OUTPUT = slashed_media_dir_type + media_url_dirs.ADMIN_SHOW_ALL_OUTPUT

    media_url_dirs.URL_HTML_PUBLIC_TABLE = slashed_media_dir_type + media_url_dirs.PUBLIC_TABLE
    media_url_dirs.URL_HTML_MOBILE_TABLE = slashed_media_dir_type + media_url_dirs.MOBILE_TABLE


    media_url_dirs.URL_HTML_PUBLIC_SHOW_PLAYER = slashed_media_dir_type + media_url_dirs.PUBLIC_SHOW_PLAYER

    media_url_dirs.URL_HTML_HOME = slashed_media_dir_type + '*'
    return media_url_dirs
}







