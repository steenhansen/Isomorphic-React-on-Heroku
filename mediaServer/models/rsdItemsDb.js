'use strict'

var restful = require('node-restful')
var mongoose = restful.mongoose
var rsd_information = rootAppRequire('mediaServer/modules/rsdSchema')
var rsd_schema = new mongoose.Schema(rsd_information.item_schema)
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var Promise = require('bluebird')
var rsd_items_db = Promise.promisifyAll(restful.model('RsdItems', rsd_schema))
rsd_items_db.methods(['get'])

rsd_items_db.after('get', function (req, res, next) {
    miscMethods.returnOnlyRealData(req, res, next)
})

// NB, this handles databse interactions of routable data, like www.sffaudio.com/1/ will show item #1
rsd_items_db.mediaFactory = function (data_columns) {
    var rsd_item = new rsd_items_db(data_columns, function (e) {
        if (e) {
            throw e
        }
    })
    return rsd_item
}

module.exports = rsd_items_db
