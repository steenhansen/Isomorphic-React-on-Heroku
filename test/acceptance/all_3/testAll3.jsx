'use strict';

var fs = require('fs');
var expect = require('expect');

var testHelpers = rootAppRequire('test/testHelpers');

var rsd_component_props = require('./rsd_test_data');
var pdf_component_props = require('./pdf_test_all3_data');
var podcast_component_props = require('./podcast_test_all3_data');






var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
var send_table = rootAppRequire('mediaServer/react/js/sendTable');
var rsd_media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('rsd');
var pdf_media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('pdf');
var podcast_media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('podcast');

 var rsd_information = rootAppRequire('mediaServer/modules/rsdSchema');
 var pdf_information = rootAppRequire('mediaServer/modules/pdfSchema');
 var podcast_information = rootAppRequire('mediaServer/modules/podcastSchema');
  
var test_log_dir = fromAppRoot('logs');

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')(test_log_dir, 'test');

describe('test/acceptance/component/testAll3.jsx', function () {
 
                
             
                
    var produced_rsd = send_table.marshallServerHtml('rsd', rsd_component_props, rsd_media_url_dirs.PUBLIC_SHOW_EXPLAIN,  'no req.headers.host', rsd_information);
    var produced_pdf = send_table.marshallServerHtml('pdf', pdf_component_props, pdf_media_url_dirs.PUBLIC_SHOW_EXPLAIN,   'no req.headers.host', pdf_information);
    var produced_podcast = send_table.marshallServerHtml('podcast', podcast_component_props, podcast_media_url_dirs.PUBLIC_SHOW_EXPLAIN,  'no req.headers.host', podcast_information);

var produced_data= produced_rsd+produced_pdf +produced_podcast;

    var produced_file = __dirname + '/produced_rsd_component.html';

    before(function (done) {
        testHelpers.unlink_async(produced_file, done);
    });

    context("[brave bart] should be ", function () {
        before(function (done) {
            miscMethods.saveLocalFile(produced_file, produced_data)
                .then(function () {
                    done();
                })
                .catch(function (e) {
                        miscMethods.serverError(e);
                        done(e);
                    }
                );
        });
    
        it(" same ", function () {
            var expected_file = __dirname + '/expected_rsd_component.html';
            var xml_diff_1 = testHelpers.whiteSpaceFileDiff(expected_file, produced_file);
            expect(xml_diff_1).toBe('');
        });
    
    });
    
    

    
    
    
    
});
