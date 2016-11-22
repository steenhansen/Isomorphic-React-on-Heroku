'use strict'

var rsd_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(rsd_information)




var testHelpers = rootAppRequire('test/testHelpers')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')

var expect = require('expect')


describe('test/unit/ParserTsvUrl/_getTsvText/_getTsvText.js', function () {
    var actual_media_file = __dirname + '/actual_media_results.txt'
    var expected_media_file = __dirname + '/expected_media_results.txt'

    before(function (done) { testHelpers.unlink_async(actual_media_file, done) })


    context("[primative pals] ParserTsvUrl._getTsvText(media)", function () {

        before(function (done) {
            var parser_tsv_url = di_factory.ParserTsvUrlCreate(rsd_information.google_media_tab)
            parser_tsv_url._getTsvText()
                .then(function (file_data) {
                    return miscMethods.saveLocalFile(actual_media_file, file_data)
                })
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.serverError(e)
                })
        })




        it("should match expected media", function () {
              var xml_diff = testHelpers.whiteSpaceFileDiff(actual_media_file, expected_media_file)
            //console.log(' 44444444444444', xml_diff, actual_media_file, expected_media_file, '3333333333333333')
            const difference_mess = xml_diff.split('~~~~')
           // console.log(' ', difference_mess[1])
            expect(difference_mess[0]).toBe('')
        })
    })



    context("[quaint quisling] ParserTsvUrl._getTsvText(variables)", function () {
        var actual_variables_file = __dirname + '/actual_variables_results.txt'
        var expected_variables_file = __dirname + '/expected_variables_results.txt'

        before(function (done) { testHelpers.unlink_async(actual_variables_file, done) })

        before(function (done) {
            var parser_tsv_url = di_factory.ParserTsvUrlCreate(rsd_information.google_variables_tab)
            parser_tsv_url._getTsvText()
                .then(function (file_data) {
                    return miscMethods.saveLocalFile(actual_variables_file, file_data)
                })
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.serverError(e)
                })
        })
        it("should match expected variables", function () {
            var xml_diff = testHelpers.whiteSpaceFileDiff(actual_variables_file, expected_variables_file)
            const difference_mess = xml_diff.split('~~~~')
            //console.log(' ', difference_mess[1])
            expect(difference_mess[0]).toBe('')
            
        })
    })

})
