'use strict'

var expect = require('expect')
var fs = require('fs')


var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)


var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')

var testHelpers = rootAppRequire('test/testHelpers')
var test_directory = __dirname + '/'
var actual_results = 'actual_results/'

var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(the_information)

var actual_directory = test_directory + actual_results

var data_directory = test_directory + 'media_data/'
var expected_directory = test_directory + 'expected_results/'

testHelpers.testMongooseConnect()


var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('rsd')
var save_rss_items = rootAppRequire('mediaServer/modules/base/saveRssItems')(di_factory)
var screenOutput = rootAppRequire('mediaServer/modules/base/screenOutput')(save_rss_items, media_url_dirs)

var rsd_media = di_factory.RsdMediaCreate()


describe('test/integration/saveRealToDb_p4/success/saveRealToDb.js', function () {
    var produced_p4_html = actual_directory + 'p4_html.html'
    var produced_p4_db = actual_directory + 'p4_db.txt'
    var expected_p4_html = expected_directory + 'p4_html.html'
    var expected_p4_db = expected_directory + 'p4_db.txt'
    var good_data = data_directory + 'good_data.tsv'
    var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'

    before(testHelpers.dropMediaCollectionDoneCallback(rsd_media))
    before(function (done) {testHelpers.unlink_async(produced_p4_html, done)})
    before(function (done) {testHelpers.unlink_async(produced_p4_db, done)})

    context("[dancing dane] good data should", function () {
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(good_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveRealToDb_P4(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function (p4_html) {
                    return miscMethods.saveLocalFile(produced_p4_html, p4_html)
                })
                .then(function () {
                    return rsd_media.collectionAsString_test()
                })
                .then(function (p4_db) {
                    return miscMethods.saveLocalFile(produced_p4_db, p4_db)
                })
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    console.log(e)
                })
        })

        it('produce correct p4 html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_p4_html, expected_p4_html)
            expect(the_diff).toEqual('', 'expected p4 html !== actual p4 html')
        })

        it('produce correct p4 data', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_p4_db, expected_p4_db)
            expect(the_diff).toEqual('', 'expected p4 data !== actual p4 data')
        })

    })

})






