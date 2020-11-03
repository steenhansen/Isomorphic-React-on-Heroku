"use strict";

var rsd_information = rootAppRequire("mediaServer/modules/rsdSchema");
var di_factory = rootAppRequire("mediaServer/modules/base/diFactory")(
  rsd_information
);

var testHelpers = rootAppRequire("test/testHelpers");
var miscMethods = rootAppRequire("mediaServer/modules/base/miscMethods");

var expect = require("expect");

describe("test/unit/ParserTsvFile/_getTsvText/_getTsvText.js", function () {
  var actual_file = __dirname + "/actual_results.txt";
  var expected_file = __dirname + "/expected_results.txt";

  before(function (done) {
    testHelpers.unlink_async(actual_file, done);
  });

  context("[maroon moon] ParserTsvFile._getTsvText()", function () {
    before(function (done) {
      var generic_rsd_variables =
        fromAppRoot("test") + "/generic_rsd_variables.tsv";
      var parser_tsv_file = di_factory.ParserTsvFileCreate(
        generic_rsd_variables
      );

      parser_tsv_file
        ._getTsvText()
        .then(function (file_data) {
          return miscMethods.saveLocalFile(actual_file, file_data);
        })
        .then(function () {
          done();
        })
        .catch(function (e) {
          miscMethods.serverError(e);
        });
    });

    it("should match expected", function () {
      var xml_diff = testHelpers.whiteSpaceFileDiff(actual_file, expected_file);
      const difference_mess = xml_diff.split("~~~~");
//      console.log(" ", difference_mess[1]);
      expect(difference_mess[0]).toBe("");
    });
  });
});
