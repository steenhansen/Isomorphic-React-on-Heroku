'use strict'
/* @flow */

var Q = require('q')
var swig = require('swig')
var miscMethods = require('./miscMethods')
var media_constants = require('./MediaConstants')
var miscMethods = require('./miscMethods')
var shared_methods = require('../../react/sharedMethods')

var BaseMedia = function (index_field/*:string*/, test_id_prefix/*:string*/) {
    this._index_field = index_field
    this._test_id_prefix = test_id_prefix
    this._class_name = 'BaseMedia'
}

BaseMedia.prototype.dropCollection = function (itemsDb) {
    var the_collection = itemsDb.collection
    the_collection.drop()              // NB blocks
}

BaseMedia.prototype.deleteItems = function (itemsDb, real_or_test/*:string*/) {
    var deferred = Q.defer()
    var realOrTest_indexKeyExists = {real_or_test: real_or_test}
    realOrTest_indexKeyExists[this._index_field] = {$exists: true}
    itemsDb.remove(realOrTest_indexKeyExists, function (err_cond) {
        if (err_cond) {
            deferred.reject(err_cond)
        }
        deferred.resolve('del all ok')
    })
    return deferred.promise
}

BaseMedia.prototype.getDocument = function (itemsDb, document_id/*:string*/, field_id/*:string*/, real_or_test/*:string*/) {
    var deferred = Q.defer()
    if (media_constants.TEST_DATA === real_or_test) {
        var the_document_id = this._test_id_prefix + document_id
    } else {
        var the_document_id = document_id
    }
    itemsDb.findOne({_id: the_document_id}, function (err_cond, data) {
        if (err_cond) {
            deferred.reject(err_cond)
        } else {
            try {
                if (media_constants.ENTIRE_DOCUMENT === field_id) {
                    var data_value = data
                } else {
                    var data_value = data[field_id]
                }
            } catch (err_cond) {
                deferred.resolve(0)       // don't crash on missing data, when null
            }
            deferred.resolve(data_value)
        }
    })
    return deferred.promise
}

BaseMedia.prototype.deriveData = function (data_columns) {
    if ('publish date' in data_columns) {
        var media_publish_date = data_columns['publish date']
    } else {
        var media_publish_date = miscMethods.nowPublishDate(new Date())
    }
    var media_publish_long = miscMethods.convertMediaPublishDate(media_publish_date)
    var itunes_pub_date = miscMethods.itunesPubDate(media_publish_long)
    data_columns['itunes_pubDate'] = itunes_pub_date
    return data_columns
}

BaseMedia.prototype.deriveVersions = function (media_rows/*:Array<MediaRows>*/) {
    return media_rows
}

BaseMedia.prototype.databaseItem = function () {
    return new Error("BaseMedia.prototype.databaseItem is abstract")
}

BaseMedia.prototype.saveItem = function (data_columns, real_or_test/*:string*/) {
    if ((data_columns instanceof Array) || (!(data_columns instanceof Object))) {
        var the_error = new Error("data_columns not object :" + data_columns)
        global.Method_logger.chronicle('error', 'BaseMedia.prototype.saveItem', module.filename, 'the_error', the_error)
    }
    if (media_constants.TEST_DATA === real_or_test) {
        data_columns._id = this._test_id_prefix + data_columns[this._index_field]
    } else {
        data_columns._id = data_columns[this._index_field]
    }
    data_columns.real_or_test = real_or_test
    var derived_columns = this.deriveData(data_columns)
    if (derived_columns instanceof Error) {
        global.Method_logger.chronicle('error', 'BaseMedia.prototype.saveItem', module.filename, 'derived_columns', derived_columns)
    }
    var media_item = this.databaseItem(derived_columns)
    if (media_item instanceof Error) {
        global.Method_logger.chronicle('error', 'BaseMedia.prototype.saveItem', module.filename, 'media_item', media_item)
    }
    media_item.save(function (err_cond) {
        if (err_cond) {
            global.Method_logger.chronicle('error', 'BaseMedia.prototype.saveItem', module.filename, 'err_cond', err_cond)
        }
    })
}

BaseMedia.prototype.deleteDocument = function (itemsDb, document_name/*:string*/) {
    var deferred = Q.defer()
    itemsDb.remove({_id: document_name}, function (err_cond) {
        if (err_cond) {
            deferred.reject(err_cond)
        }
        deferred.resolve()
    })
    return deferred.promise
}

BaseMedia.prototype.saveDescription = function (itemsDb, description_text/*:string*/, real_or_test/*:string*/) {
    var deferred = Q.defer()
    BaseMedia.prototype.upsertDocument.call(this, itemsDb, 'description', 'itunes_summary', description_text, real_or_test).then(
        function onSucces(media_item) {
            deferred.resolve(media_item)
        }, function onRejected(err_cond) {
            deferred.reject(err_cond)
        }
    ).catch(function (error) {
        miscMethods.serverError(error)
    })
    return deferred.promise
}

BaseMedia.prototype.upsertDocument = function (itemsDb, document_name, variable_name, the_value, real_or_test/*:string*/) {
    var deferred = Q.defer()
    var this_BaseMedia = this
    if (real_or_test === media_constants.TEST_DATA) {
        var document_name_remove = this._test_id_prefix + document_name
    } else {
        var document_name_remove = document_name
    }
    itemsDb.remove({_id: document_name_remove, real_or_test: real_or_test}, function (err_cond) {
        if (err_cond) {
            deferred.reject(err_cond)
        }
        this_BaseMedia.saveDocument.call(this_BaseMedia, document_name, variable_name, the_value, real_or_test).then(
            function onFulfilled(media_item) {
                deferred.resolve(media_item)
            }, function onRejected(err_cond) {
                deferred.reject(err_cond)
            }
        ).catch(function (error) {
            miscMethods.serverError(error)
        })
    })
    return deferred.promise
}

BaseMedia.prototype.saveDocument = function (_id, key, value, real_or_test) {
    var deferred = Q.defer()
    if (media_constants.TEST_DATA === real_or_test) {
        var description_columns = {_id: this._test_id_prefix + _id, real_or_test: real_or_test}
    } else {
        var description_columns = {_id: _id, real_or_test: real_or_test}
    }
    description_columns[key] = value
    var media_item = this.databaseItem(description_columns)
    if (media_item instanceof Error) {
        deferred.reject(media_item)
    }
    media_item.save(function (err_cond, media_item) {
        if (err_cond) {
            deferred.reject(err_cond)
        }
        deferred.resolve(media_item)
    })
    return deferred.promise
}

BaseMedia.prototype.rssItems = function (data_rows, item_template_file) {
    var swig_item_template = swig.compileFile(item_template_file)
    var rsd_items_html = ''
    var rsd_episode_digits = 0
    for (var the_row of data_rows) {
        if (rsd_episode_digits === 0) {
            var first_id = the_row['episode number']
            rsd_episode_digits = shared_methods.sizeOfLargestId(first_id)
        }
        var template_vars = this._itemTemplateVars(the_row, rsd_episode_digits)
        var item_html = swig_item_template(template_vars)
        rsd_items_html += item_html
    }
    return rsd_items_html
}

BaseMedia.prototype.rssFeed = function (data_rows, tsv_variable_information, item_template, page_template_file, itunes_summary) {
    var rss_items_html = this.rssItems(data_rows, item_template)
    var swig_page_template = swig.compileFile(page_template_file)
    var template_vars = this._pageTemplateVars(rss_items_html, tsv_variable_information, itunes_summary)
    var page_html = swig_page_template(template_vars)
    return page_html
}


// FOR TESTING
BaseMedia.prototype.collectionAsString = function (itemsDb) {
    var deferred = Q.defer()
    itemsDb.collection.find({}, function (err, cursor) {
        cursor.sort({'episode number': -1})
        cursor.toArray().then(
            function onFulfilled(collection_arr) {
                var number_rows = collection_arr.length
                var my_str = ''
                for (var i = 0; i < number_rows; i++) {
                    my_str += JSON.stringify(collection_arr[i], null, "\t")
                }
                deferred.resolve(my_str)
            }, function onRejected(err_cond) {
                deferred.reject(err_cond)
            }
        ).catch(function (error) {
            miscMethods.serverError(error)
        })
    })
    return deferred.promise
}

module.exports = BaseMedia