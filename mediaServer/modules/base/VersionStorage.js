'use strict'
/* @flow */

var Q = require('q')

var VersionStorage = function (current_media/*:BaseMedia*/, media_description_text/*:string*/) {
    this._current_media = current_media
    this._media_description_text = media_description_text
    this._class_name = 'VersionStorage'
}

VersionStorage.prototype.saveNewVersion = function (media_rows/*:Array<MediaRows>*/, real_or_test/*:string*/) {
    var deferred = Q.defer()
    var delete_all = this._current_media.deleteItems(real_or_test)
    if (delete_all instanceof Error) {
        global.Method_logger.chronicle('error', 'saveNewVersion-ERROR-1', module.filename, 'delete_all', delete_all)
        return delete_all
    }
    var this_versionStorage = this
    this._current_media.deleteItems(real_or_test).then(
        function onSucces() {
            this_versionStorage._insertRows(media_rows, real_or_test).then(
                function onSucces(media_item) {
                    deferred.resolve(media_item)
                }, function onRejected(err_cond) {
                    deferred.reject(err_cond)
                }
            )
        }, function onRejected(err_cond) {
            deferred.reject(err_cond)
        }
    )
    return deferred.promise
}

VersionStorage.prototype._insertRows = function (media_rows/*:Array<MediaRows>*/, real_or_test/*:string*/) {
    var deferred = Q.defer()
    var this_versionStorage = this
    this._current_media.saveDescription(this._media_description_text, real_or_test).then(
        function onFulfilled() {
            var number_rows = media_rows.length
            var promises = []
            for (var i = 0; i < number_rows; i++) {
                var promise = this_versionStorage._current_media.saveItem(media_rows[i], real_or_test)
                promises.push(promise)
            }
            var all_promises = Q.all(promises)
            all_promises.spread(function () {
                deferred.resolve(number_rows)
            })
        }, function onRejected(err_cond) {
            deferred.reject(err_cond)
        }
    )
    return deferred.promise
}

module.exports = VersionStorage
