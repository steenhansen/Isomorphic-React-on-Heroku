'use strict'

var expect = require('expect')
var fs = require('fs')

var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
var the_media = di_factory.RsdMediaCreate()
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var testHelpers = rootAppRequire('test/testHelpers')



testHelpers.testMongooseConnect()



describe('test/unit/RsdMedia/saveDocument.js', function () {

    before(testHelpers.dropMediaCollectionDoneCallback(the_media))
    var test_desc_start = 'some words'
          var test_desc_end = 'some words'
          
             var TEST_FAIL_CHECK_DESC = 'the_177_value'
      //  test_desc_end = TEST_FAIL_CHECK_DESC

    it("[thanks obama] save real data to database", function (done) {
        the_media.deleteDocument('description', 'itunes_summary')
            .then(the_media.saveDocument('description', 'itunes_summary', test_desc_start, media_constants.REAL_DATA))
            .then(function () {
                return the_media.getDocument('description', 'itunes_summary', media_constants.REAL_DATA)
            })
            .then(function (val) {
                expect(val).toBe(test_desc_end)
                done()
            })
    })
})

