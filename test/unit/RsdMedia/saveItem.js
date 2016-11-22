'use strict'

var expect = require('expect')
var fs = require('fs')
var Promise = require('bluebird')

var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
var the_media = di_factory.RsdMediaCreate()
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var testHelpers = rootAppRequire('test/testHelpers')
testHelpers.testMongooseConnect()


describe('test/unit/RsdMedia/saveItem.js', function () {

    before(testHelpers.dropMediaCollectionDoneCallback(the_media))

    context('[slathering snakes] test/unit/RsdMedia/saveItem.js', function () {
        var media_rows = [{"episode number": 17, "book title": "_17-"},
            {"episode number": 13, "book title": "_13-"},
            {"episode number": 19, "book title": "_19-"}]
        var promises_arr = []
        
        let answer_1 = "_17-"
        let answer_2 = "_13-"
        let answer_3 = "_19-"

  var TEST_FAIL_CHECK_DESC = 'the_177_value'
  //   answer_1 = TEST_FAIL_CHECK_DESC
     //    answer_2 = TEST_FAIL_CHECK_DESC
   //      answer_3 = TEST_FAIL_CHECK_DESC

        before(function (done) {
            function save_item_promise(data_row, real_or_test) {
                var my_ret = the_media.saveItem(data_row, real_or_test, data_row)
                return my_ret
            }

            for (var i = media_rows.length - 1; i >= 0; i--) {
                var row_promise = save_item_promise(media_rows[i], media_constants.REAL_DATA)
                promises_arr.push(row_promise)
            }
            done()
        })


        it("save real data to database", function (done) {
            Promise.all(promises_arr)
                .then(function () {
                    return the_media.getDocument(17, 'book title', media_constants.REAL_DATA)
                })
                .then(function (val) {
                    expect(val).toBe(answer_1)
                })
                .then(function () {
                    return the_media.getDocument(13, 'book title', media_constants.REAL_DATA)
                })
                .then(function (val) {
                    expect(val).toBe(answer_2)
                })
                .then(function () {
                    return the_media.getDocument(19, 'book title', media_constants.REAL_DATA)
                })
                .then(function (val) {
                    expect(val).toBe(answer_3)
                    done()
                })
        });


    })

})
