'use strict'

var rsd_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(rsd_information)


var testHelpers = rootAppRequire('test/testHelpers')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')

var expect = require('expect')


describe('test/unit/VariablesTsvText/allVariables/allVariables.js', function () {
    var actual_file = __dirname + '/actual_results.txt'
    var expected_file = __dirname + '/expected_results.txt'

    var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'

    var TEST_FAIL_CHECK_TSV = __dirname + '/' + 'fail_var.tsv'
    //generic_rsd_variables = TEST_FAIL_CHECK_TSV

    var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)

    before(function (done) {
        testHelpers.unlink_async(actual_file, done)
    })

    context("[vivacious vixen] VariablesTsvText.allVariables()", function () {

        before(function (done) {
            var verify_tsv_variables = di_factory.VerifyTsvVariablesCreate()
            variables_tsv.allVariables(verify_tsv_variables)
                .then(function (variables_arr) {
                    var variables_as_string = testHelpers.arrayOfObjectsToString(variables_arr);
                    return miscMethods.saveLocalFile(actual_file, variables_as_string)
                })
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.serverError(e)
                })
        })

        it("should match expected", function () {
            var xml_diff_1 = testHelpers.whiteSpaceFileDiff(actual_file, expected_file)
            expect(xml_diff_1).toBe('')
        })
    })

})
