'use strict'

var expect = require('expect')
var fs = require('fs')
var mongoose = require('mongoose')

var the_information = rootAppRequire('mediaServer/modules/rsdInformation')
var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information
)
var the_media = di_factory.RsdMediaCreate()
var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
var testHelpers = rootAppRequire('test/testHelpers')
testHelpers.testMongooseConnect()

describe('test/unit/RsdMedia/RsdMedia.js', function () {

    describe(" 1 should ", function () {

        beforeEach(function (done) {
            the_media.upsertDocument('doc_name', media_constants.TESTING_FIELD_NAME, 'the_13_value', media_constants.REAL_DATA).then(
                function onFulfilled() {
                    done()
                }, function onRejected() {
                    expect(true).toBe(false)
                    done()
                }
            )
        })
        it("save real data to database", function (done) {
            the_media.getDocument('doc_name', media_constants.TESTING_FIELD_NAME, media_constants.REAL_DATA).then(
                function onFulfilled(success_var) {
                    expect(success_var).toBe('the_13_value')
                    done()
                }, function onRejected(err_cond) {
                    expect(true).toBe(false)
                    done()
                }
            )

        })

    })

    describe(" 2 should ", function () {
        beforeEach(function (done) {
            the_media.upsertDocument('doc_name', media_constants.TESTING_FIELD_NAME, 'the_17_value', media_constants.TEST_DATA).then(
                function onFulfilled() {
                    done()
                }, function onRejected() {
                    expect(true).toBe(false)

                    done()
                }
            )
        })
        it("save test data to database", function (done) {
            the_media.getDocument('doc_name', media_constants.TESTING_FIELD_NAME, media_constants.TEST_DATA).then(
                function onFulfilled(success_var) {
                    expect(success_var).toBe('the_17_value')
                    done()
                }, function onRejected(err_cond) {
                    expect(true).toBe(false)
                    done()
                }
            )

        })

    })


})

