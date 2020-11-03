'use strict';

var fs = require('fs');
var expect = require('expect');

var testHelpers = rootAppRequire('test/testHelpers');
var podcast_component_props = require('./podcast_test_data');

var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
var send_table = rootAppRequire('mediaServer/react/js/sendTable');
var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')('podcast');
  var podcast_information = rootAppRequire('mediaServer/modules/podcastSchema');
  
var test_log_dir = fromAppRoot('logs');

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')(test_log_dir, 'test');

describe('test/acceptance/podcast/component/testComponent.jsx', function () {
 
                
             
                
    var produced_data = send_table.marshallServerHtml('podcast', podcast_component_props, media_url_dirs.PUBLIC_SHOW_EXPLAIN,  'no req.headers.host', podcast_information);
    var produced_file = __dirname + '/produced_podcast_component.html';

    before(function (done) {
        testHelpers.unlink_async(produced_file, done);
    });

    context("[hello heli] should be ", function () {
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
            var expected_file = __dirname + '/expected_podcast_component.html';
            var xml_diff_1 = testHelpers.whiteSpaceFileDiff(expected_file, produced_file);
            expect(xml_diff_1).toBe('');
        });
    
    });
    
    

    
    
    
    
});
