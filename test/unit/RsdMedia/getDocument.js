'use strict'

var expect = require('expect')
var fs = require('fs')

var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
var the_media = di_factory.RsdMediaCreate()
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var testHelpers = rootAppRequire('test/testHelpers')


testHelpers.testMongooseConnect()


describe('test/unit/RsdMedia/getDocument.js', function () {
    var test_desc_start = 'some words 13'
       var test_desc_end = 'some words 13'
       
         var TEST_FAIL_CHECK_DESC = 'the_177_value'
        //test_desc_end = TEST_FAIL_CHECK_DESC
        
    before(testHelpers.dropMediaCollectionDoneCallback(the_media))

    context("[riksy rhino] bad episode # should", function () {
      //  before(the_media.saveDocument('description', 'itunes_summary', test_desc, media_constants.REAL_DATA) )

        it("save real data to database", function (done) {
            the_media.saveDocument('description', 'itunes_summary', test_desc_start, media_constants.REAL_DATA)
                .then(function () {
                    return the_media.getDocument('description', 'itunes_summary', media_constants.REAL_DATA)
                })

                .then(function (val) {
                   console.log('to be', val)
                    expect(val).toBe(test_desc_end)
                    done()
                })
        })

    })
               // also test media_constants.ENTIRE_DOCUMENT  !!!

})

