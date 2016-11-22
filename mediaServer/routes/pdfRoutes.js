'use strict'

var Promise = require('bluebird')

var send_table = rootAppRequire('mediaServer/react/js/sendTable')
var react_constants = rootAppRequire('mediaServer/react/js/reactConstants')
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var pdf_information = rootAppRequire('mediaServer/modules/pdfSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(pdf_information)
var save_rss_items = rootAppRequire('mediaServer/modules/base/saveRssItems')(di_factory)
var variables_tsv = di_factory.VariablesTsvUrlCreate(pdf_information.google_variables_tab)
var parser_tsv = di_factory.ParserTsvUrlCreate(pdf_information.google_media_tab)
var basic_http_auth = miscMethods.basicHttpAuth
var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(pdf_information)
var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('pdf')
var screenOutput = rootAppRequire('mediaServer/modules/base/screenOutput')(save_rss_items, media_url_dirs)

module.exports = function (app) {

    function createMedia() {
        var pdf_media = di_factory.PdfMediaCreate()
        return pdf_media
    }

    app.get(media_url_dirs.URL_HTML_ADMIN_saveTestToDb_P1, basic_http_auth, function (req, res) {
        if (parser_tsv instanceof Error) {
            var save_test_to_db_html = media_file_loc.htmlFiles('saveTestToDb_fail')
            var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                error_message: parser_tsv
            })
            res.send(page_html)
        } else {
            var the_media = createMedia()
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, the_media, pdf_information, media_file_loc)
                .then(function (page_html) {
                        res.send(page_html)
                    }
                ).catch(function (e_page_html) {
                res.send(e_page_html)
            })
        }
    })

    app.get(media_url_dirs.URL_HTML_ADMIN_saveTestToRss_P2, basic_http_auth, function (req, res) {
        var the_media = createMedia()
        var host_url = 'http://' + req.headers.host + '/'
        screenOutput.html_saveTestToRss_P2(variables_tsv, parser_tsv, the_media, media_file_loc, host_url)
            .then(function (page_html) {
                    res.send(page_html)
                }
            ).catch(function (e_page_html) {
            res.send(e_page_html)
        })
    })


    app.get(media_url_dirs.URL_HTML_ADMIN_viewTestRss_P3, basic_http_auth, function (req, res) {
        var page_html = screenOutput.html_viewTestRss_P3(pdf_information, media_file_loc)
        res.send(page_html)
    })


    app.get(media_url_dirs.URL_XML_ADMIN_IFRAME_showTestRss_P3, basic_http_auth, function (req, res) {
        var the_media = createMedia()
        the_media.getDocument('rss_document', 'all_rss_xml', media_constants.TEST_DATA)
            .then(function (pdf_rss_xml) {
                //throw new Error ('exception test - URL_XML_ADMIN_IFRAME_showTestRss_P3')    //  @@@@
                res.header("Content-Type", "application/rss+xml")
                res.send(pdf_rss_xml)
            }).catch(function (e) {
            var html_error = global.Method_logger.exception('URL_XML_ADMIN_IFRAME_showTestRss_P3', module.filename, e)
            res.send(html_error)
        })
    })


    app.get(media_url_dirs.URL_HTML_ADMIN_saveRealToDb_P4, basic_http_auth, function (req, res) {
        var the_media = createMedia()
        screenOutput.html_saveRealToDb_P4(variables_tsv, parser_tsv, the_media, pdf_information, media_file_loc)
            .then(function (page_html) {
                    //throw new Error ('exception test - URL_HTML_ADMIN_saveRealToDb_P4')   
                    res.send(page_html)
                }
            ).catch(function (e) {
            var html_error = global.Method_logger.exception('URL_HTML_ADMIN_saveRealToDb_P4', module.filename, e)
            res.send(html_error)
        })
    })


    app.get(media_url_dirs.URL_XML_ADMIN_IFRAME_rss_P5, function (req, res) {
        var the_media = createMedia()
        the_media.getDocument('rss_document', 'all_rss_xml', media_constants.REAL_DATA)
            .then(function (pdf_rss_xml) {
                //throw new Error ('exception test - URL_XML_ADMIN_IFRAME_rss_P5')
                var now_yyyy_mm_dd_hh_mm = miscMethods.serverYYYYMMDDHHmm()
                var current_rss = miscMethods.ignoreFutureItems(pdf_rss_xml, now_yyyy_mm_dd_hh_mm)
                if (!current_rss) {
                    current_rss = pdf_rss_xml
                }
                miscMethods.serveGzipContent(req, res, "application/rss+xml", current_rss)
            }).catch(function (e) {
            var html_error = global.Method_logger.exception('URL_XML_ADMIN_IFRAME_rss_P5', module.filename, e)
            res.send(html_error)
        })
    })


    app.get(media_url_dirs.URL_HTML_ADMIN_saveRealToRss_P5, basic_http_auth, function (req, res) {
        var the_media = createMedia()
        var host_url = 'http://' + req.headers.host + '/'
        screenOutput.html_saveRealToRss_P5(variables_tsv, parser_tsv, the_media, media_file_loc, host_url)
            .then(function (page_html) {
                    //throw new Error ('exception test - URL_HTML_ADMIN_saveRealToRss_P5')
                    res.send(page_html)
                }
            ).catch(function (e) {
            var html_error = global.Method_logger.exception('URL_HTML_ADMIN_saveRealToRss_P5', module.filename, e)
            res.send(html_error)
        })
    })

    app.get(media_url_dirs.URL_HTML_ADMIN_SHOW_ALL_OUTPUT, basic_http_auth, function (req, res) {
        var host_url = 'http://' + req.headers.host
        var page_html = screenOutput.htmlAdminShowAll(pdf_information, media_file_loc, host_url)
        res.send(page_html)
    })

    app.get(media_url_dirs.URL_HTML_PUBLIC_TABLE, function (req, res) {
        var pdf_media = createMedia()
        var promise_pdfs_items = pdf_media.currentList(react_constants.MAX_DESKTOP_ITEMS)
        var promise_pdfs_count = pdf_media.countPdfs()
        Promise.all([promise_pdfs_items, promise_pdfs_count])
            .spread(function (pdf_items, pdfs_count) {
                let media_options = {
                    pdfs_count: pdfs_count / 2        // NB, test + real == twice actual number
                }
                //throw new Error ('exception test - URL_HTML_PUBLIC_TABLE')
                var table_html = send_table.marshallServerHtml('pdf', pdf_items, media_url_dirs.PUBLIC_SHOW_EXPLAIN, req.headers.host, pdf_information, media_options)
                var page_html = send_table.encaseTable('pdf_4th_bundle', table_html, req.headers.host, 'desktop_device')
                miscMethods.serveGzipContent(req, res, "text/html; charset=utf-8", page_html)
            })
            .catch(function (e) {
                var html_error = global.Method_logger.exception('URL_HTML_PUBLIC_SHOW_PLAYER', module.filename, e)
                res.send(html_error)
            })
    })

    app.get(media_url_dirs.URL_HTML_MOBILE_TABLE, function (req, res) {
        var pdf_media = createMedia()
        var promise_pdfs_items = pdf_media.currentList(react_constants.MAX_MOBILE_ITEMS)
        var promise_pdfs_count = pdf_media.countPdfs()
        Promise.all([promise_pdfs_items, promise_pdfs_count])
            .spread(function (pdf_items, pdfs_count) {
                    let media_options = {
                        pdfs_count: pdfs_count / 2
                    }
                    //  throw new Error ('exception test - URL_HTML_MOBILE_TABLE')
                    var table_html = send_table.marshallServerHtml('pdf', pdf_items, media_url_dirs.MOBILE_EXPLAIN, req.headers.host, pdf_information, media_options)
                    var page_html = send_table.encaseTable('pdf_4th_bundle', table_html, req.headers.host, 'mobile_device')
                    miscMethods.serveGzipContent(req, res, "text/html; charset=utf-8", page_html)
                }
            )
            .catch(function (e) {
                var html_error = global.Method_logger.exception('URL_HTML_PUBLIC_SHOW_PLAYER', module.filename, e)
                res.send(html_error)

            })
    })

}

