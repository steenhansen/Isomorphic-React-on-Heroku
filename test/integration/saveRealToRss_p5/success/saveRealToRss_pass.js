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

describe("test/integration/saveRealToRss_p5/success/saveRealToRss_pass.js", function () {
  var produced_p5_html = actual_directory + "p5_html.html";
  var produced_p5_db = actual_directory + "p5_db.txt";
  var expected_p5_html = expected_directory + "p5_html.html";
  var expected_p5_db = expected_directory + "p5_db.txt";
  var good_data = data_directory + "good_data.tsv";
  var generic_rsd_variables =
    fromAppRoot("test") + "/generic_rsd_variables.tsv";


  before(function (done) {
    testHelpers.unlink_async(produced_p5_html, done);
  });
  before(function (done) {
    testHelpers.unlink_async(produced_p5_db, done);
  });

  context("[catapulting cars] good data should", function () {
    before(function (done) {
      var parser_tsv = di_factory.ParserTsvFileCreate(good_data);
      var variables_tsv = di_factory.VariablesTsvFileCreate(
        generic_rsd_variables
      );

    this.timeout(3033);
      
    testHelpers.dropCollection2(rsd_media)
    .catch(function(e) {  })
    .then(function(){ return screenOutput.html_saveTestToDb_P1( variables_tsv,
          parser_tsv,
          rsd_media,
          the_information,
          media_file_loc
        );})
        .then(function () {
          return screenOutput.html_saveTestToRss_P2(
            variables_tsv,
            parser_tsv,
            rsd_media,
            media_file_loc
          );
        })
        .then(function (p5_html) {
          return miscMethods.saveLocalFile(produced_p5_html, p5_html);
        })
        .then(function () {
          return rsd_media.getDocument(
            "rss_document",
            "all_rss_xml",                        
            media_constants.TEST_DATA
          );
        })
        .then(function (rss_db_data) {
          return miscMethods.saveLocalFile(produced_p5_db, rss_db_data);
        })
        .then(function () {
          done();
        })
        .catch(function (e) {
          console.log(e);
        });
    });

    it("produce correct p5 html", function () {
      var the_diff = testHelpers.whiteSpaceFileDiff(
        produced_p5_html,
        expected_p5_html
      );
      expect(the_diff).toEqual("", "expected p5 html !== actual p5 html");
    });

    it("produce correct p5 data", function () {
      var the_diff = testHelpers.whiteSpaceFileDiff(
        produced_p5_db,
        expected_p5_db
      );
      expect(the_diff).toEqual("", "expected p5 data !== actual p5 data");
    });
  });
});
