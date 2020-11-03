
//    gulp test --test-isomorphic-react-credentials.js    // db secrets from outiside git

const { dest, series, src, watch } = require('gulp');

const mocha = require('gulp-mocha');

require('../server-funcs/rootAppRequire');

process.env.I_AM_TESTING ='yes';

function call_tests () {
  console.log();
  console.log(' *** The tests use a MongoDB Atlas database, so you may get some failures at the end with heavier database use');
  var credentials_dash_dash = process.argv[3];
  try{
    var cred_file = credentials_dash_dash.substring(2);
  }catch (e){
  	console.log(' *** You forgot the credentials file: gulp test --test-isomorphic-react-credentials.js');
  	process.exit();
  }
var config_data = rootAppRequire('server-funcs/configEnvironment');

config_data.readConfigFile(cred_file);
var config_environment = config_data.makeConfigData();

var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
miscMethods.setTimeZone(config_environment.TIME_ZONE);
global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')(
  'logs',
  'test'
);
global.Method_logger.clearAll();
miscMethods.testingUncaughtException();
   return src('./test/call-tests.js', {read: false})
   .pipe(mocha({reporter: 'list', exit: true}));  
}

const test_series = series(call_tests);
exports.run_test = test_series;
