"use strict";

var expect = require("expect");
var fs = require("fs");

var the_information = rootAppRequire("mediaServer/modules/rsdSchema");
var di_factory = rootAppRequire("mediaServer/modules/base/diFactory")(
  the_information
);

var media_constants = rootAppRequire("mediaServer/modules/base/MediaConstants");
var miscMethods = rootAppRequire("mediaServer/modules/base/miscMethods");

var testHelpers = rootAppRequire("test/testHelpers");
var test_directory = __dirname + "/";
var actual_results = "actual_results/";

var media_file_loc = rootAppRequire("mediaServer/modules/base/mediaFileLoc")(
  the_information
);

var actual_directory = test_directory + actual_results;

var data_directory = test_directory + "media_data/";
var expected_directory = test_directory + "expected_results/";

testHelpers.testMongooseConnect();
var media_url_dirs = rootAppRequire("mediaServer/modules/base/urlDirs")("rsd");
var save_rss_items = rootAppRequire("mediaServer/modules/base/saveRssItems")(
  di_factory
);
var screenOutput = rootAppRequire("mediaServer/modules/base/screenOutput")(
  save_rss_items,
  media_url_dirs
);

var rsd_media = di_factory.RsdMediaCreate();

describe("test/integration/saveTestToDb/success/saveTestToDb_pass.js", function () {
  var test_name_1 = "good_data";
  var test_name_2 = "good_xml";
  var produced_file_1 = actual_directory + test_name_1 + ".html";
  var produced_file_2 = actual_directory + test_name_2 + ".html";

  before(function (done) {
    testHelpers.unlink_async(produced_file_1, done);
  });
  before(function (done) {
    testHelpers.unlink_async(produced_file_2, done);
  });

  context("[dread deer] good data should", function () {
    var expected_rss = expected_directory + test_name_1 + ".html";
    var good_data = data_directory + test_name_1 + ".tsv";
    var generic_rsd_variables =
      fromAppRoot("test") + "/generic_rsd_variables.tsv";

    before(function (done) {
      var parser_tsv = di_factory.ParserTsvFileCreate(good_data);
      var variables_tsv = di_factory.VariablesTsvFileCreate(
        generic_rsd_variables
      );


    this.timeout(6033);
    testHelpers.dropCollection2(rsd_media)
    .catch(function(e) {  })
    .then(function(){ return screenOutput.html_saveTestToDb_P1(
          variables_tsv,
          parser_tsv,
          rsd_media,
          the_information,
          media_file_loc);})

        .then(function () {
          return screenOutput.html_saveTestToRss_P2(
            variables_tsv,
            parser_tsv,
            rsd_media,
            media_file_loc
          );
        })
        .then(function (html) {
          return miscMethods.saveLocalFile(produced_file_1, html);
        })
        .then(function () {
          done();
        })
        .catch(function (e) {
          miscMethods.serverError(e);
          done(e);
        });
    });
    it("produce correct html", function () {
      var the_diff = testHelpers.whiteSpaceFileDiff(
        produced_file_1,
        expected_rss
      );
      expect(the_diff).toEqual("", "expect output !== actual output 2343");
    });
  });

  context("[eloping elephants] good data should", function () {
    var expected_rss = expected_directory + test_name_2 + ".html";
    before(function (done) {
      rsd_media
        .getDocument("rss_document", "all_rss_xml", media_constants.TEST_DATA)
        .then(function (rsd_rss_xml) {
          return miscMethods.saveLocalFile(produced_file_2, rsd_rss_xml);
        })
        .then(function () {
          done();
        })
        .catch(function (e) {
          miscMethods.serverError(e);
          done(e);
        });
    });

    it("[aardvarks anonymous] produce correct rss xml", function () {
      var the_diff = testHelpers.whiteSpaceFileDiff(
        produced_file_2,
        expected_rss
      );
      expect(the_diff).toEqual(
        "",
        "expect output !== actual output 12312232344323"
      );
    });
  });
});
