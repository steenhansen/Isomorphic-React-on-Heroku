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

var media_directory = test_directory + 'media_data/'

////////////////////////////////////////////
testHelpers.testMongooseConnect()

describe('test/unit/saveMediaToDb/failure/saveMediaToDB.js', function () {

    before(testHelpers.dropMediaCollectionDoneCallback(the_media))

    context("[evolving eel] should", function () {
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        var tsv_data_1 = media_directory + 'rsd_data_1.tsv'
        it('fail when header does not match', function (done) {
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            var parser_tsv = di_factory.ParserTsvFileCreate(tsv_data_1)
            var verify_tsv = di_factory.VerifyTsvDataRowsCreate()
            save_rss_items.saveItemsToDb(variables_tsv, parser_tsv, the_media, media_constants.REAL_DATA, verify_tsv)
                .catch(function (e) {
                    expect(e).toBeA(Error)
                    done()
                })
        })
    })

})

