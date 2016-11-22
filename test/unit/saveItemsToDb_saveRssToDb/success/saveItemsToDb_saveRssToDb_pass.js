'use strict'
//var Promise = require('bluebird')
var fs = require('fs')
var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
var the_media = di_factory.RsdMediaCreate()

var expect = require('expect')

var save_rss_items = rootAppRequire('mediaServer/modules/base/saveRssItems')(di_factory)
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')


var test_directory = __dirname + '/'
var actual_results = 'actual_results/'
var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(the_information)

var actual_directory = test_directory + actual_results
var media_directory = test_directory + 'media_data/'
var expected_directory = test_directory + 'expected_results/'
var testHelpers = rootAppRequire('test/testHelpers')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')

////////////////////////////////////////////
testHelpers.testMongooseConnect()

describe('test/unit/saveItemsToDb_saveRssToDb/success/saveItemsToDb_saveRssToDb.js', function () {
    var actual_file_1 = actual_directory + 'rss.obj'
    var expected_file_1 = expected_directory + 'expected_rss_1.obj'
    var tsv_var_1 = media_directory + 'rsd_var_1.tsv'
    var tsv_data_1 = media_directory + 'rsd_data_1.tsv'

    var TEST_FAIL_CHECK_TSV = media_directory + 'fail_var.tsv'
    //    tsv_var_1 = TEST_FAIL_CHECK_TSV

    var variables_tsv = di_factory.VariablesTsvFileCreate(tsv_var_1)


    before(testHelpers.dropMediaCollectionDoneCallback(the_media))
    before(function (done) {
        testHelpers.unlink_async(actual_file_1, done)
    })

    context("[thirsty thistle] should 1", function () {
        before(function (done) {

            var parser_tsv = di_factory.ParserTsvFileCreate(tsv_data_1)
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            save_rss_items.saveItemsToDb(variables_tsv, parser_tsv, the_media, media_constants.TEST_DATA, verify_tsv)
                .then(function () {
                    return the_media.collectionAsString_test()
                })
                .then(function (collection_as_string) {
                    return miscMethods.saveLocalFile(actual_file_1, collection_as_string)
                })
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.serverError(e)
                    done(e)
                })
        })
        it("produce correct rss file 1", function () {
            var xml_diff = testHelpers.whiteSpaceFileDiff(actual_file_1, expected_file_1)
            const difference_mess = xml_diff.split('~~~~')
            console.log(' ', difference_mess[1])
            expect(difference_mess[0]).toBe('')
        })
    })


})

///////////////////

describe('test/unit/saveItemsToDb_saveRssToDb_pass/success/saveItemsToDb_saveRssToDb_pass.js', function () {
    var actual_file_1 = actual_directory + 'rss.xml'
    var expected_file_1 = expected_directory + 'expected_rss_1.xml'
    var tsv_data_1 = media_directory + 'rsd_data_1.tsv'
    var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'

    var TEST_FAIL_CHECK_TSV = media_directory + 'fail_var.tsv'
    //    generic_rsd_variables = TEST_FAIL_CHECK_TSV

    var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)

    before(function (done) {
        testHelpers.unlink_async(actual_file_1, done)
    })

    context("[flip fantasia] should 1", function () {
        before(function (done) {

            var parser_tsv = di_factory.ParserTsvFileCreate(tsv_data_1)
             var host_url = 'http://localhost:5000/'
            save_rss_items.saveRssToDb(variables_tsv, parser_tsv, the_media, media_constants.TEST_DATA, media_file_loc, host_url)
                .then(function () {
                        return the_media.getDocument('rss_document', 'all_rss_xml', media_constants.TEST_DATA)
                    }
                )
                .then(function (rss_text) {
                    return miscMethods.saveLocalFile(actual_file_1, rss_text)
                })
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.serverError(e)
                })
        })

        it("produce correct rss file 1", function () {
            var xml_diff = testHelpers.whiteSpaceFileDiff(actual_file_1, expected_file_1)
            const difference_mess = xml_diff.split('~~~~')
            console.log(' ', difference_mess[1])
            expect(difference_mess[0]).toBe('')
        })
    })

})

