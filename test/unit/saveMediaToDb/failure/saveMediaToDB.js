'use strict'

var the_information = rootAppRequire('mediaServer/modules/rsdInformation')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
var the_media = di_factory.RsdMediaCreate()

var expect = require('expect')
var save_rss = rootAppRequire('mediaServer/modules/base/saveRss')(di_factory)
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')

var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')

var testHelpers = rootAppRequire('test/testHelpers')
var test_directory = __dirname + '/'
var actual_results = 'actual_results/'

var media_directory = test_directory + 'media_data/'

////////////////////////////////////////////
testHelpers.testMongooseConnect()

describe('test/unit/saveMediaToDb/failure/saveMediaToDB.js', function () {

    beforeEach(testHelpers.dropMediaCollectionDoneCallback(the_media))

    describe("[evolving eel] should 1", function () {
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        var tsv_data_1 = media_directory + 'rsd_data_1.tsv'
        it('fail when header do not match', function (doneCallback) {
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            var parser_tsv = di_factory.ParserTsvFileCreate(tsv_data_1)
            save_rss.saveMediaToDb(variables_tsv, parser_tsv, the_media, media_constants.REAL_DATA, the_information).then(
                function onFulfilled() {
                    doneCallback()
                },
                function onRejected(err_cond) {
                    expect(err_cond).toBeA(Error)
                    doneCallback()
                }
            )
        })


    })


})

