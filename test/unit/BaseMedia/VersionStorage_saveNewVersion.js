'use strict'

var expect = require('expect')
var fs = require('fs')

var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
var the_media = di_factory.RsdMediaCreate()
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var testHelpers = rootAppRequire('test/testHelpers')


testHelpers.testMongooseConnect()

var version_storage = di_factory.VersionStorageCreate(the_media, 'itunes_description_em_dash')



//console.log('the media === ', the_media)
describe('test/unit/BaseMedia/VersionStorage_saveNewVersion.js', function () {

    before(testHelpers.dropMediaCollectionDoneCallback(the_media))
    var media_rows = [{"episode number": 99, "book title": "_99-"},
        {"episode number": 98, "book title": "_98-"},
        {"episode number": 97, "book title": "_97-"}]
        
          let answer_1 = "_99-"
        let answer_2 = "_98-"
        let answer_3 = "_97-"

  var TEST_FAIL_CHECK_DESC = 'the_177_value'
   //  answer_1 = TEST_FAIL_CHECK_DESC
   //      answer_2 = TEST_FAIL_CHECK_DESC
    //     answer_3 = TEST_FAIL_CHECK_DESC

    it("[stoned stones] save real data to database", function (done) {
        var generic_rsd_variables = fromAppRoot('test') + '/generic_rsd_variables.tsv'
        the_media.getTsvVariables(generic_rsd_variables)

        version_storage.saveNewVersion(media_rows, media_constants.REAL_DATA)
            .then(function () {
                return the_media.getDocument(99, 'book title', media_constants.REAL_DATA)
            })
            .then(function (val) {
                expect(val).toBe(answer_1)
            })
            .then(function () {
                return the_media.getDocument(98, 'book title', media_constants.REAL_DATA)
            })
            .then(function (val) {
                expect(val).toBe(answer_2)
            })
            .then(function () {
                return the_media.getDocument(97, 'book title', media_constants.REAL_DATA)
            })
            .then(function (val) {
                expect(val).toBe(answer_3)
                done()
            })


    })
})

