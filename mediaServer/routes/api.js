'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var compression = require('compression')

var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var basic_http_auth = miscMethods.basicHttpAuth
var pdf_items_db = require('../models/pdfItemsDb')
var podcast_items_db = require('../models/podcastItemsDb')
var rsd_items_db = require('../models/rsdItemsDb')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('rsd')
var router = express.Router()
var Promise = require('bluebird')
var react_constants = rootAppRequire('mediaServer/react/js/reactConstants')
var send_table = rootAppRequire('mediaServer/react/js/sendTable')

var rsd_information = rootAppRequire('mediaServer/modules/rsdSchema')
var rsd_di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(rsd_information)

var pdf_information = rootAppRequire('mediaServer/modules/pdfSchema')
var pdf_di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(pdf_information)

var podcast_information = rootAppRequire('mediaServer/modules/podcastSchema')
var podcast_di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(podcast_information)

pdf_items_db.register(router, '/pdf')
podcast_items_db.register(router, '/podcast')
rsd_items_db.register(router, '/rsd')

function logExpressErrors(e, req, res, next) {
    global.Method_logger.chronicle('error', 'express-error', module.filename, ' e.stack', e.stack)
    next(e)
}

function expressErrorHandler(e, req, res, next) {    // NB signature must not change
    res.status(500)
    res.send('SERVER ERROR')
    if (false) {
        next()
    }
}

module.exports = function (public_static_files, localhost_port) {

    var app = express()
    require('./pdfRoutes')(app)
    require('./podcastRoutes')(app)
    require('./rsdRoutes')(app)

    app.use(compression())   // NB, before express.static
    app.use(express.static(public_static_files, {maxAge: '1y'}))
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use('/', router)

    app.use(logExpressErrors)
    app.use(expressErrorHandler)

    app.get('/change', basic_http_auth, function (req, res) {
        var current_date_time = miscMethods.nowPublishDate(new Date())
        var change_html = media_constants.TEMPLATE_DIRECTORY + 'change.html'
        var page_html = miscMethods.getFillSwig(change_html, {
            current_date_time: current_date_time,
            next_page_save_test_to_db: media_url_dirs.ADMIN_saveTestToDb_P1,
            show_current_db_status: media_url_dirs.SHOW_STATUS_PAGE,
            show_all_output: media_url_dirs.ADMIN_SHOW_ALL_OUTPUT,
        })
        res.send(page_html)
    })


    app.get('/all', function (req, res) {

        var pdf_media = pdf_di_factory.PdfMediaCreate()
        var podcast_media = podcast_di_factory.PodcastMediaCreate()
        var rsd_media = rsd_di_factory.RsdMediaCreate()

        var promise_pdf_media = pdf_media.currentList(react_constants.MAX_DESKTOP_ITEMS)
        var promise_pdfs_count = pdf_media.countPdfs()
        var promise_podcast_media = podcast_media.currentList(react_constants.MAX_DESKTOP_ITEMS)
        var promise_rsd_media = rsd_media.currentList(react_constants.MAX_DESKTOP_ITEMS)

        Promise.all([promise_pdf_media, promise_podcast_media, promise_rsd_media, promise_pdfs_count]).spread(function (pdf_props, podcast_props, rsd_props, pdfs_count) {
                let media_options = {
                    pdfs_count: pdfs_count / 2
                }
                var pdf_html = send_table.marshallServerHtml('pdf', pdf_props, media_url_dirs.PUBLIC_SHOW_EXPLAIN, req.headers.host, pdf_information, media_options)
                var podcast_html = send_table.marshallServerHtml('podcast', podcast_props, media_url_dirs.PUBLIC_SHOW_EXPLAIN, req.headers.host, podcast_information)
                var rsd_html = send_table.marshallServerHtml('rsd', rsd_props, media_url_dirs.PUBLIC_SHOW_EXPLAIN, req.headers.host, rsd_information)
                var page_html = send_table.encaseAll(rsd_html, podcast_html, pdf_html, req.headers.host)
                miscMethods.serveGzipContent(req, res, "text/html; charset=utf-8", page_html)
            })
            .catch(function (e) {
                var html_error = global.Method_logger.exception('URL_HTML_PUBLIC_SHOW_PLAYER', module.filename, e)
                res.send(html_error)
            })
    })

    app.get('*', function (req, res) {
        res.redirect('/')
    })

    app.set('port', (process.env.PORT || localhost_port))
    var node_port = app.get('port')
    app.listen(node_port).on('error', function (e) {
        console.log(e)
        process.exit()
    })
    return app

}
