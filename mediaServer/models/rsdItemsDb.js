'use strict'

var restful = require('node-restful')
var mongoose = restful.mongoose
var rsd_information = rootAppRequire('mediaServer/modules/rsdInformation')
var rsd_schema = new mongoose.Schema(rsd_information.item_schema)
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var rsd_items_db = restful.model('RsdItems', rsd_schema)

rsd_items_db.methods(['get'])

rsd_items_db.after('get', function (req, res, next) {
    miscMethods.returnOnlyRealData(req, res, next)
})

rsd_items_db.mediaFactory = function (data_columns) {
    var rsd_item = new rsd_items_db(data_columns, function (err_cond) {
        if (err_cond) {
            global.Method_logger.chronicle('error', 'mediaFactory-ERROR-1', module.filename, 'err_cond', err_cond)
            return new Error(err_cond)
        }
    })
    return rsd_item
}

module.exports = rsd_items_db
