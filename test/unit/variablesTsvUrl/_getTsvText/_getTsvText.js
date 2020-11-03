"use strict";

var rsd_information = rootAppRequire("mediaServer/modules/rsdSchema");
var di_factory = rootAppRequire("mediaServer/modules/base/diFactory")(
  rsd_information
);

var testHelpers = rootAppRequire("test/testHelpers");
var miscMethods = rootAppRequire("mediaServer/modules/base/miscMethods");

var expect = require("expect");

describe("test/unit/variablesTsvUrl/_getTsvText/_getTsvText.js", function () {
  var actual_file = __dirname + "/actual_results.txt";
  var expected_file = __dirname + "/expected_results.txt";

  var TEST_FAIL_CHECK_DOC = "https://docs.google.com/";
  //    rsd_information.google_variables_tab = TEST_FAIL_CHECK_DOC

  var variables_tsv_url = di_factory.VariablesTsvUrlCreate(
    rsd_information.google_variables_tab
  );

  before(function (done) {
    testHelpers.unlink_async(actual_file, done);
  });

  context("[witless wombat] variablesTsvUrl._getTsvText()", function () {
    before(function (done) {
      variables_tsv_url
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
      var xml_diff_1 = testHelpers.whiteSpaceFileDiff(
        actual_file,
        expected_file
      );
      expect(xml_diff_1).toBe("");
    });
  });
});
