'use strict'

var express = require('express')
var bodyParser = require('body-parser')
var compression = require('compression')

var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var basic_http_auth = miscMethods.basicHttpAuth
var rsd_items_db = require('../models/rsdItemsDb')
var pdf_items_db = require('../models/pdfItemsDb')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('rsd')
var router = express.Router()

pdf_items_db.register(router, '/pdf')
rsd_items_db.register(router, '/rsd')

function logExpressErrors(err, req, res, next) {
    global.Method_logger.chronicle('error', 'express-error', module.filename, ' err.stack', err.stack)
    next(err)
}

function expressErrorHandler(err, req, res, next) {    // NB signature must not change
    res.status(500)
    res.send('SERVER ERROR')
    if (false) {
        next()
    }
}

module.exports = function (public_static_files, localhost_port) {

    var app = express()
    require('./rsdRoutes')(app)
    // require('./pdfRoutes')(app)

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
            show_all_output: media_url_dirs.URL_HTML_ADMIN_SHOW_ALL_OUTPUT,
        })
        res.send(page_html)
    })

    app.get('*', function (req, res) {
        res.redirect('/')
    })

    app.set('port', (process.env.PORT || localhost_port))
    var node_port = app.get('port')
    app.listen(node_port).on('error', function (err) {
        console.log(err)
        process.exit()
    })
    return app

}
