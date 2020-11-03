'use strict';

var restful = require('node-restful');
var mongoose = restful.mongoose;
var podcast_information = rootAppRequire('mediaServer/modules/podcastSchema');
var podcast_schema = new mongoose.Schema(podcast_information.item_schema);
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
var Promise = require('bluebird');
var podcast_items_db = Promise.promisifyAll(
  restful.model('PodcastItems', podcast_schema)
);
podcast_items_db.methods(['get']);

podcast_items_db.after('get', function (req, res, next) {
  miscMethods.returnOnlyRealData(req, res, next);
});

// NB, this handles databse interactions of routable data, like www.sffaudio.com/1/ will show item #1
podcast_items_db.mediaFactory = function (data_columns) {
  var podcast_item = new podcast_items_db(data_columns, function (e) {
    if (e) {
      throw e;
    }
  });
  return podcast_item;
};

module.exports = podcast_items_db;
