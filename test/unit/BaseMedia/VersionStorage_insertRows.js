"use strict";

var expect = require("expect");
var fs = require("fs");

var the_information = rootAppRequire("mediaServer/modules/rsdSchema");
var di_factory = rootAppRequire("mediaServer/modules/base/diFactory")(
  the_information
);
var the_media = di_factory.RsdMediaCreate();

var media_constants = rootAppRequire("mediaServer/modules/base/MediaConstants");
var testHelpers = rootAppRequire("test/testHelpers");

testHelpers.testMongooseConnect();

var version_storage = di_factory.VersionStorageCreate(
  the_media,
  "itunes_description_em_dash"
);

describe("test/unit/BaseMedia/VersionStorage_insertRows.js", function () {

  var media_rows = [
    { "episode number": 17, "book title": "_17-" },
    { "episode number": 13, "book title": "_13-" },
    { "episode number": 19, "book title": "_19-" },
  ];

  let answer_1 = "_17-";
  let answer_2 = "_13-";
  let answer_3 = "_19-";

  var TEST_FAIL_CHECK_DESC = "the_177_value";
     // answer_1 = TEST_FAIL_CHECK_DESC
     //  answer_2 = TEST_FAIL_CHECK_DESC
     // answer_3 = TEST_FAIL_CHECK_DESC

  it("[clinky cranky] save real data to database", function (done) {
      this.timeout(3033);

    var generic_rsd_variables =
      fromAppRoot("test") + "/generic_rsd_variables.tsv";
    the_media.getTsvVariables(generic_rsd_variables);

     testHelpers.dropCollection2(the_media)
     .catch(function(e) {   })
     .then(function(){ return version_storage._insertRows(media_rows, media_constants.TEST_DATA);})
      .then(function () {
             return the_media.getDocument(
          17,
          "book title",
          media_constants.TEST_DATA
        );
      })
      .then(function (val) {
        expect(val).toBe(answer_1);
      })
      .then(function () {
        return the_media.getDocument(
          13,
          "book title",
          media_constants.TEST_DATA
        );
      })
      .then(function (val) {
        expect(val).toBe(answer_2);
      })
      .then(function () {
        return the_media.getDocument(
          19,
          "book title",
          media_constants.TEST_DATA
        );
      })
      .then(function (val) {
        expect(val).toBe(answer_3);
        done();

      });



  });



});
