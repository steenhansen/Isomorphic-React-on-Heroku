'use strict'


var send_table = rootAppRequire('mediaServer/react/js/sendTable')
var react_constants = rootAppRequire('mediaServer/react/js/reactConstants')
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var rsd_information = rootAppRequire('mediaServer/modules/rsdInformation')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(rsd_information)
var save_rss = rootAppRequire('mediaServer/modules/base/saveRss')(di_factory)
var variables_tsv = di_factory.VariablesTsvUrlCreate(rsd_information.google_variables_tab)
var parser_tsv = di_factory.ParserTsvUrlCreate(rsd_information.google_media_tab)
var basic_http_auth = miscMethods.basicHttpAuth
var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(rsd_information)    //the change
var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('rsd')
var screenOutput = rootAppRequire('mediaServer/modules/base/screenOutput')(save_rss, media_url_dirs)

module.exports = function (app) {

    app.get(media_url_dirs.URL_HTML_ADMIN_saveTestToDb_P1, basic_http_auth, function (req, res) {
        if (parser_tsv instanceof Error) {
            var save_test_to_db_html = media_file_loc.htmlFiles('saveTestToDb_fail')
            var page_html = miscMethods.getFillSwig(save_test_to_db_html, {
                error_message: parser_tsv
            })
            res.send(page_html)
        } else {

            var rsd_media = di_factory.RsdMediaCreate()
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, media_constants.TEST_DATA, rsd_information, media_file_loc).then(
                function onFulfilled(page_html) {
                    res.send(page_html)
                },
                function onRejected(page_html) {
                    res.send(page_html)
                }
            ).catch(function (error) {
                miscMethods.serverError(error, res)
            })
        }
    })

    app.get(media_url_dirs.URL_HTML_ADMIN_saveTestToRss_P2, basic_http_auth, function (req, res) {
        var rsd_media = di_factory.RsdMediaCreate()
        screenOutput.html_saveTestToRss_P2(variables_tsv, parser_tsv, rsd_media, media_constants.TEST_DATA, rsd_information, media_file_loc).then(
            function onFulfilled(page_html) {
                res.send(page_html)
            },
            function onRejected(page_html) {
                global.Method_logger.chronicle('error', 'media_url_dirs.URL_HTML_ADMIN_saveTestToRss_P2-rejected', module.filename)
                res.send(page_html)
            }
        ).catch(function (error) {
            miscMethods.serverError(error, res)
        })
    })

    app.get(media_url_dirs.URL_HTML_ADMIN_viewTestRss_P3, basic_http_auth, function (req, res) {
        var page_html = screenOutput.html_viewTestRss_P3(rsd_information, media_file_loc)
        res.send(page_html)
    })

    app.get(media_url_dirs.URL_XML_ADMIN_IFRAME_showTestRss_P3, basic_http_auth, function (req, res) {
        var rsd_media = di_factory.RsdMediaCreate()
        screenOutput.xmlAdminViewTestIframeP2(rsd_media, media_constants.TEST_DATA).then(
            function onFulfilled(rsd_rss_xml) {
                res.header("Content-Type", "application/rss+xml")
                res.send(rsd_rss_xml)
            },
            function onRejected(err) {
                global.Method_logger.chronicle('error', 'media_url_dirs.URL_XML_ADMIN_IFRAME_showTestRss_P3-rejected', module.filename)
                res.send(err)
            }
        ).catch(function (error) {
            miscMethods.serverError(error, res)
        })
    })

    app.get(media_url_dirs.URL_HTML_ADMIN_saveRealToDb_P4, basic_http_auth, function (req, res) {
        var rsd_media = di_factory.RsdMediaCreate()
        screenOutput.html_saveRealToDb_P4(variables_tsv, parser_tsv, rsd_media, media_constants.REAL_DATA, rsd_information, media_file_loc).then(
            function onFulfilled(page_html) {
                res.send(page_html)
            },
            function onRejected(page_html) {
                global.Method_logger.chronicle('error', 'media_url_dirs.URL_HTML_ADMIN_saveRealToDb_P4-rejected', module.filename)
                res.send(page_html)
            }
        ).catch(function (error) {
            miscMethods.serverError(error, res)
        })
    })

    app.get(media_url_dirs.URL_HTML_ADMIN_saveRealToRss_P5, basic_http_auth, function (req, res) {
        var rsd_media = di_factory.RsdMediaCreate()
        screenOutput.html_saveRealToRss_P5(variables_tsv, parser_tsv, rsd_media, media_constants.REAL_DATA, rsd_information, media_file_loc).then(
            function onFulfilled(page_html) {
                res.send(page_html)
            },
            function onRejected(page_html) {
                global.Method_logger.chronicle('error', 'media_url_dirs.URL_HTML_ADMIN_saveRealToRss_P5-rejected', module.filename)
                res.send(page_html)
            }
        ).catch(function (error) {
            miscMethods.serverError(error, res)
        })
    })

    app.get(media_url_dirs.URL_HTML_PUBLIC_SHOW_PLAYER, function (req, res) {
        var id = req.query['id']
        var rsd_media = di_factory.RsdMediaCreate()
        screenOutput.htmlPublicShowPlayer(id, rsd_media, rsd_information, media_file_loc).then(
            function onFulfilled(player_html) {
                res.send(player_html)
            }, function onRejected(player_html) {
                global.Method_logger.chronicle('error', 'media_url_dirs.URL_HTML_PUBLIC_SHOW_PLAYER-rejected', module.filename, 'player_html', player_html)
                res.send(player_html)
            }
        ).catch(function (error) {
            miscMethods.serverError(error, res)
        })
    })

    app.get(media_url_dirs.URL_XML_ADMIN_IFRAME_rss_P5, function (req, res) {
        var rsd_media = di_factory.RsdMediaCreate()
        screenOutput.xmlAdminViewRealIframeP3(rsd_media, media_constants.REAL_DATA).then(
            function onFulfilled(rsd_rss_xml) {
                var now_yyyy_mm_dd_hh_mm = miscMethods.serverYYYYMMDDHHmm()
                var current_rss = miscMethods.ignoreFutureItems(rsd_rss_xml, now_yyyy_mm_dd_hh_mm)
                if (!current_rss) {
                    current_rss = rsd_rss_xml
                }
                miscMethods.serveGzipContent(req, res, "application/rss+xml", current_rss)
            },
            function onRejected(err) {
                global.Method_logger.chronicle('error', 'media_url_dirs.URL_XML_ADMIN_IFRAME_rss_P5-rejected', module.filename, 'err', err)
                res.send(err)
            }
        ).catch(function (error) {
            miscMethods.serverError(error, res)
        })
    })

    app.get(media_url_dirs.URL_HTML_ADMIN_SHOW_ALL_OUTPUT, basic_http_auth, function (req, res) {
            var host_url = 'http://' + req.headers.host
            var page_html = screenOutput.htmlAdminShowAll(rsd_information, media_file_loc, host_url)
            res.send(page_html)
    })

    app.get(media_url_dirs.URL_HTML_PUBLIC_TABLE, function (req, res) {
        var rsd_media = di_factory.RsdMediaCreate()
        rsd_media.currentList(react_constants.MAX_DESKTOP_ITEMS).then(
            function onFulfilled(props_array) {
                var table_html = send_table.marshallServerHtml('rsd', props_array, media_url_dirs.PUBLIC_SHOW_EXPLAIN, 'desktop_device', req.headers.host)
                var page_html = send_table.encaseTable(table_html, req.headers.host, 'desktop_device')
                miscMethods.serveGzipContent(req, res, "text/html; charset=utf-8", page_html)
            },
            function onRejected(page_html) {
                global.Method_logger.chronicle('error', 'media_url_dirs.URL_HTML_PUBLIC_TABLE-rejected', module.filename)
                res.send(page_html)
            }
        ).catch(function (error) {
            miscMethods.serverError(error, res)
        })
    })

    app.get(media_url_dirs.URL_HTML_MOBILE_TABLE, function (req, res) {
        var rsd_media = di_factory.RsdMediaCreate()
        rsd_media.currentList(react_constants.MAX_MOBILE_ITEMS).then(
            function onFulfilled(props_array) {
                var table_html = send_table.marshallServerHtml('rsd', props_array, media_url_dirs.MOBILE_EXPLAIN, 'mobile_device', req.headers.host)
                var page_html = send_table.encaseTable(table_html, req.headers.host, 'mobile_device')
                miscMethods.serveGzipContent(req, res, "text/html; charset=utf-8", page_html)
            },
            function onRejected(page_html) {
                global.Method_logger.chronicle('error', 'media_url_dirs.URL_HTML_MOBILE_TABLE-rejected', module.filename)
                res.send(page_html)
            }
        ).catch(function (error) {
            miscMethods.serverError(error, res)
        })
    })

}

