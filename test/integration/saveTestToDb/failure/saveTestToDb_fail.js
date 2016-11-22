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


describe('test/integration/saveTestToDb/failure/saveTestToDb.js', function () {

    before(testHelpers.dropMediaCollectionDoneCallback(rsd_media))

    context("[yuletide yak] bad date # should", function () {
        var test_name = 'bad_date'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
    
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
    
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    
    
    })
    
    context("[zero zebra] bad episode # should", function () {
        var test_name = 'bad_episode'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
    
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
    
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    
    })
    
    
    context("[fancy flags] bad link should", function () {
        var test_name = 'bad_link'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
    
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
    
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    
    })
    
    
    context("[grim gold] bad filename should", function () {
        var test_name = 'bad_filename'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
    
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
    
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
         })
    
    
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output 2314')
        })
    
    })
    
    context("[indian iris] bad hhMMss should", function () {
        var test_name = 'bad_hhMMss'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
    
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
    
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
    
    
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output 234234')
        })
    
    })
    
    context("[red blue] bad size should", function () {
        var test_name = 'bad_size'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
    
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
    
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
    
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    
    })
    
    context("[strong bad] bad participants should", function () {
        var test_name = 'bad_participants'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
    
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
    
    
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    
    })
    
    context("[artificial art] bad title should", function () {
        var test_name = 'bad_title'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
    
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    })
    
    context("[somber sombraro] bad genre should", function () {
        var test_name = 'bad_genre'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
    
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
           })
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    })
    
    context("[goofy golf] bad pdf should", function () {
        var test_name = 'bad_pdf'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
    
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    })
    
    context("[trex apex] bad youtube should", function () {
        var test_name = 'bad_youtube'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })
        })
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    })
    
    
    
    
    
    
    context("[same same] bad description should", function () {
        var test_name = 'bad_description'
        var produced_file = actual_directory + test_name + '.html'
        var expected_rss = expected_directory + test_name + '.html'
        var bad_data = data_directory + test_name + '.tsv'
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'

        before(function (done) {
            testHelpers.unlink_async(produced_file, done)
        })
        before(function (done) {
            var parser_tsv = di_factory.ParserTsvFileCreate(bad_data)
            var variables_tsv = di_factory.VariablesTsvFileCreate(generic_rsd_variables)
            screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, rsd_media, the_information, media_file_loc)
                .then(function () {
                    done()
                })
                .catch(function (e) {
                    miscMethods.saveLocalFile(produced_file, e)
                        .then(function () {
                        console.log('I am here')
                            done()
                        })
                        .catch(function (e) {
                                miscMethods.serverError(e)
                                done(e)
                            }
                        )
                })

        })
        it('produce correct html', function () {
            var the_diff = testHelpers.whiteSpaceFileDiff(produced_file, expected_rss)
            expect(the_diff).toEqual('', 'expect output !== actual output')
        })
    })




})













