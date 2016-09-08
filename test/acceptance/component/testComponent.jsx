'use strict'

var fs = require('fs')
var expect = require('expect')

var testHelpers = rootAppRequire('test/testHelpers')
var rsd_component_props = require('./rsd_test_data')

var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var send_table = rootAppRequire('mediaServer/react/js/sendTable')
var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('rsd')

var test_log_dir = fromAppRoot('logs')

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')(test_log_dir, 'test')

describe('test/acceptance/component/testComponent.jsx', function () {
    describe(" should be ", function () {

        var produced_data = send_table.marshallServerHtml('rsd', rsd_component_props, media_url_dirs.PUBLIC_SHOW_EXPLAIN)
        var produced_file = __dirname + '/produced_rsd_component.html'
        beforeEach(function (done) {

            miscMethods.saveLocalFile(produced_file, produced_data).then(
                function onFulfilled() {
                    done()
                }, function onRejected() {
                    console.log('RSD component beforeEach FAIL')
                    done()
                }
            )
        })

        it(" same ", function () {
            var expected_file = __dirname + '/expected_rsd_component.html'
            var xml_diff_1 = testHelpers.whiteSpaceFileDiff(expected_file, produced_file)
            expect(xml_diff_1).toBe('')
        })

    })
})