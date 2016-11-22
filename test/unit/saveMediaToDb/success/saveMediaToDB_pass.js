'use strict'

var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
var the_media = di_factory.RsdMediaCreate()

var expect = require('expect')

var save_rss_items = rootAppRequire('mediaServer/modules/base/saveRssItems')(di_factory)
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')


var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')

var testHelpers = rootAppRequire('test/testHelpers')
var test_directory = __dirname + '/'
var actual_results = 'actual_results/'


var actual_directory = test_directory + actual_results
var media_directory = test_directory + 'media_data/'
var expected_directory = test_directory + 'expected_results/'

////////////////////////////////////////////
testHelpers.testMongooseConnect()

describe('test/unit/saveMediaToDb/success/saveMediaToDB.js', function () {
    var actual_file_1 = actual_directory + 'dash_test_rss.obj'
    var expected_file_1 = expected_directory + 'expected_dash_test_rss_1.obj'
    var tsv_var_1 = media_directory + 'rsd_var_1.tsv'
    var tsv_data_1 = media_directory + 'rsd_data_1.tsv'
 
  var TEST_FAIL_CHECK_TSV = media_directory + 'fail_var.tsv'
 //    tsv_var_1 = TEST_FAIL_CHECK_TSV
var variables_tsv = di_factory.VariablesTsvFileCreate(tsv_var_1)

    before(testHelpers.dropMediaCollectionDoneCallback(the_media))
    before(function (done) {testHelpers.unlink_async(actual_file_1, done)})

    context("[foolish fan] should 1", function () {

        before(function (done) {
            
            var parser_tsv = di_factory.ParserTsvFileCreate(tsv_data_1)
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            save_rss_items.saveItemsToDb(variables_tsv, parser_tsv, the_media, media_constants.REAL_DATA, verify_tsv)
                .then( function () {
                    return the_media.collectionAsString_test()})
                .then(
                        function (collection_as_string) {
                            return miscMethods.saveLocalFile(actual_file_1, collection_as_string)
                        })
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.serverError(e)
                })
        })
        it("produce correct rss file", function () {
            var xml_diff = testHelpers.whiteSpaceFileDiff(actual_file_1, expected_file_1)
            const difference_mess = xml_diff.split('~~~~')
            console.log(' ', difference_mess[1])
            expect(difference_mess[0]).toBe('')
        })
    })


})

