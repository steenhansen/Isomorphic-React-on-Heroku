'use strict';

var fs = require('fs');
var expect = require('expect');

var testHelpers = rootAppRequire('test/testHelpers');
var pdf_component_props = require('./pdf_test_data');

var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
var send_table = rootAppRequire('mediaServer/react/js/sendTable');
var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('pdf');
var pdf_information = rootAppRequire('mediaServer/modules/pdfSchema');

var test_log_dir = fromAppRoot('logs');

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')(test_log_dir, 'test');

describe('test/acceptance/pdf/component/testComponent.jsx', function () {

    var produced_data = send_table.marshallServerHtml('pdf', pdf_component_props, media_url_dirs.PUBLIC_SHOW_EXPLAIN, 'no req.headers.host', pdf_information);
    var produced_file = __dirname + '/produced_pdf_component.html';

    before(function (done) {
        testHelpers.unlink_async(produced_file, done);
    });

    context("[cheap ceasar] should be ", function () {
        before(function (done) {
            miscMethods.saveLocalFile(produced_file, produced_data).then(function () {
                done();
            }).catch(function (e) {
                miscMethods.serverError(e);
                done(e);
            });
        });

        it(" same ", function () {
            var expected_file = __dirname + '/expected_pdf_component.html';
            var xml_diff_1 = testHelpers.whiteSpaceFileDiff(expected_file, produced_file);
            expect(xml_diff_1).toBe('');
        });
    });
});