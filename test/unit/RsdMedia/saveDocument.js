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

describe("test/unit/RsdMedia/saveDocument.js", function () {
  var test_desc_start = "some words";
  var test_desc_end = "some words";

  var TEST_FAIL_CHECK_DESC = "the_177_value";

  it("[gazorpa zorp] save real data to database", function (done) {

    this.timeout(33033);
    testHelpers.dropCollection2(the_media)
    .catch(function(e) {  });

        the_media.saveDocument(
          "description",
          "itunes_summary",
          test_desc_start,
          media_constants.TEST_DATA                             
        ) 
      .then(function () {
        return the_media.getDocument(
          "description",
          "itunes_summary",
          media_constants.TEST_DATA
        );
      })
      .then(function (val) {
        expect(val).toBe(test_desc_end);
        testHelpers.dropCollection2(the_media);
        done();
      });





  });
});
