'use strict'

var the_information = rootAppRequire('mediaServer/modules/rsdInformation')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
var the_media = di_factory.RsdMediaCreate()

var expect = require('expect')

var save_rss = rootAppRequire('mediaServer/modules/base/saveRss')(di_factory)
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')


var test_directory = __dirname + '/'
var actual_results = 'actual_results/'

var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(the_information)

var actual_directory = test_directory + actual_results
var media_directory = test_directory + 'media_data/'
var expected_directory = test_directory + 'expected_results/'
var testHelpers = rootAppRequire('test/testHelpers')
////////////////////////////////////////////
testHelpers.testMongooseConnect()

describe('test/unit/saveXmlToDb/success/saveXmlToDb.js', function () {

    beforeEach(testHelpers.dropMediaCollectionDoneCallback(the_media))

    describe("[belitted beatle] should 1", function () {
        var actual_file_1 = actual_directory + 'dash_test_rss.xml'
        var expected_file_1 = expected_directory + 'expected_dash_test_rss_1.xml'
        var tsv_var_1 = media_directory + 'rsd_var_1.tsv'
        var tsv_data_1 = media_directory + 'rsd_data_1.tsv'

        beforeEach(function (doneCallback) {
            var variables_tsv = di_factory.VariablesTsvFileCreate(tsv_var_1)
            var parser_tsv = di_factory.ParserTsvFileCreate(tsv_data_1)
            save_rss.saveXmlToDb(variables_tsv, parser_tsv, the_media, media_constants.TEST_DATA, the_information, media_file_loc).then(
                function onFulfilled() {
                    doneCallback()
                }, function onRejected() {
                    doneCallback()
                }
            )
        })
        it("produce correct rss file 1", function () {
            var xml_diff_1 = testHelpers.whiteSpaceFileDiff(actual_file_1, expected_file_1)
            expect(xml_diff_1).toBe('')
        })
    })


})

