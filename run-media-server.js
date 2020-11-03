'use strict';

process.env.I_AM_TESTING ='NO';
require('./server-funcs/rootAppRequire');
var ip = require("ip");

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')(
  'logs',
  'server'
);

var config_data = rootAppRequire('server-funcs/configEnvironment');
const cred_file = process.argv[2];
if (cred_file) {
  config_data.readConfigFile(cred_file);
  console.log('Atlas Database with a credentials file :', cred_file);
} else {
  console.log('Production Atlas Database : process.env.ATLAS_MONGODB');
}

var config_environment = config_data.makeConfigData();
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
var app = rootAppRequire('mediaServer/routes/api')('public', process.env.LOCALHOST_PORT);
var port_number = app.get('port');


var host_addr = process.env.THE_HOST_URL + '/rsd/table';
console.log('Control-C to quit. Set browser to', host_addr);

var ip_addr = ip.address();
var host_addr = ip_addr + ':' + port_number + '/rsd/table';
console.log('Local network. Set browser to', host_addr);
console.log();

miscMethods.setTimeZone(config_environment.TIME_ZONE);
miscMethods.connectToMongoose(config_environment.ATLAS_MONGODB, port_number);
