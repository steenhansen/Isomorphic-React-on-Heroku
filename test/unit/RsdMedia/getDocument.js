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

describe("test/unit/RsdMedia/getDocument.js", function () {
  var test_desc_start = "some words 13";
  var test_desc_end = "some words 13";

  var TEST_FAIL_CHECK_DESC = "the_177_value";

  context("[riksy rhino] bad episode # should", function () {
    it("save real data to database", function (done) {
      this.timeout(33033);
    

   testHelpers.dropCollection2(the_media)
       .catch(function(e) {  })
       .then(function(){ return the_media.saveDocument(
          "description",
          "itunes_summary",
          test_desc_start,
          media_constants.TEST_DATA
        );})  
        .then(function () {
          return the_media.getDocument(
            "description",
            "itunes_summary",
            media_constants.TEST_DATA
          );
        })

        .then(function (val) {
          expect(val).toBe(test_desc_end);
          done();
        });
    });
  });
});
