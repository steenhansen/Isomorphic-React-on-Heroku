'use strict'

var expect = require('expect')
var fs = require('fs')


var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information
)
var the_media = di_factory.RsdMediaCreate()
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var testHelpers = rootAppRequire('test/testHelpers')
testHelpers.testMongooseConnect()

describe('test/unit/RsdMedia/upsertDocument.js', function () {

    before(testHelpers.dropMediaCollectionDoneCallback(the_media))
    context("[timorous tigers] 1 should ", function () {

        var test_desc_start = 'the_13_value'
        var test_desc_end = 'the_13_value'
        

        var TEST_FAIL_CHECK_DESC = 'the_177_value'
        //test_desc_end = TEST_FAIL_CHECK_DESC

        it("save real data to database", function (done) {
            the_media.upsertDocument('doc_name', media_constants.TESTING_FIELD_NAME, test_desc_start, media_constants.REAL_DATA)
                .then(function () {
                    return the_media.getDocument('doc_name', media_constants.TESTING_FIELD_NAME, media_constants.REAL_DATA)
                })
                .then(function (val) {
                    expect(val).toBe(test_desc_end)
                    done()
                })
        })

    })


})

