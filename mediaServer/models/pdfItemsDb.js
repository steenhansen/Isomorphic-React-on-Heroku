'use strict'

var restful = require('node-restful')
var mongoose = restful.mongoose
var pdf_information = rootAppRequire('mediaServer/modules/pdfSchema')
var pdf_schema = new mongoose.Schema(pdf_information.item_schema)
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var Promise = require('bluebird')
var pdf_items_db = Promise.promisifyAll(restful.model('PdfItems', pdf_schema))
pdf_items_db.methods(['get'])

pdf_items_db.after('get', function (req, res, next) {
    miscMethods.returnOnlyRealData(req, res, next)
})

pdf_items_db.mediaFactory = function (data_columns) {
    var pdf_item = new pdf_items_db(data_columns, function (e) {
        if (e) {
            throw e
        }
    })
    return pdf_item
}

module.exports = pdf_items_db



