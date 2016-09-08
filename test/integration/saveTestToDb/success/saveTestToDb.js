'use strict'

var expect = require('expect')
var the_information = rootAppRequire('mediaServer/modules/rsdInformation')
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
var save_rss = rootAppRequire('mediaServer/modules/base/saveRss')(di_factory)
var screenOutput = rootAppRequire('mediaServer/modules/base/screenOutput')(save_rss, media_url_dirs)

var rsd_media = di_factory.RsdMediaCreate()


describe('test/integration/saveTestToDb/success/saveTestToDb.js', function () {

    describe("good data should", function () {
        var test_name = 'good_data'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var good_data = data_directory + test_name + '.tsv'

        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        var correct_test_path = false

        beforeEach(function (doneCallback) {
            var parser_tsv = di_factory.ParserTsvFileCreate(good_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.htmlAdminSaveTestP1(variables_tsv, parser_tsv, rsd_media, media_constants.TEST_DATA, the_information, media_file_loc).then(
                function onFulfilled(html) {
                    correct_test_path = true
                    miscMethods.saveLocalFile(produced_file, html).then(
                        function onFulfilled() {
                            doneCallback()
                        }, function onRejected() {
                            doneCallback()
                        }
                    )
                },
                function onRejected() {
                    doneCallback()
                }
            )
        })

        it('follow correct program path', function () {
            expect(correct_test_path).toBe(true, 'Did not follow expected bad date path')
        })

        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output 2343')
        })

    })


    describe("good data should", function () {
        var correct_test_path = false
        var test_name = 'good_xml'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'


        beforeEach(function (doneCallback) {

            screenOutput.xmlAdminViewTestIframeP2(rsd_media, media_constants.TEST_DATA).then(
                function onFulfilled(rsd_rss_xml) {
                    miscMethods.saveLocalFile(produced_file, rsd_rss_xml).then(
                        function onFulfilled() {
                            correct_test_path = true
                            doneCallback()
                        }, function onRejected() {
                            doneCallback()
                        }
                    )
                },
                function onRejected(err) {
                    doneCallback()
                }
            )

        })

        it('follow correct program path', function () {
            expect(correct_test_path).toBe(true, 'Did not follow expected bad date path')

        })

        it('[aardvarks anonymous] produce correct rss xml', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output 12312232344323')
        })

    })


})










