'use strict'

var rsd_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(rsd_information)




var testHelpers = rootAppRequire('test/testHelpers')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')

var expect = require('expect')


describe('test/unit/ParserTsvUrl/allRows/allRows.js', function () {
    var actual_file = __dirname + '/actual_results.txt'
    var expected_file = __dirname + '/expected_results.txt'

    before(function (done) { testHelpers.unlink_async(actual_file, done) })


    context("[nattering nabobs] ParserTsvText.allRows()", function () {

        before(function (done) {
            var tsv = '#Welcome\n"title","author","pdf link 1"\n"a1","t1","x.pdf"\n"a2","t2","z.pdf"'
            var parser_tsv_text = di_factory.ParserTsvTextCreate(tsv)
            parser_tsv_text._getTsvText()
                .then ( parser_tsv_text.allRows() )
                .then(function (file_data) {
                    return miscMethods.saveLocalFile(actual_file, file_data)
                })
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.serverError(e)
                })
        })




        it("should match expectedxx", function () {
         var xml_diff = testHelpers.whiteSpaceFileDiff(actual_file, expected_file)
            const difference_mess = xml_diff.split('~~~~')
            console.log(' ', difference_mess[1])
            expect(difference_mess[0]).toBe('')
        })
    })

})
