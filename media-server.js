'use strict'

require('./rootAppRequire')

var config_environment = rootAppRequire('configEnvironment')

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')('logs', 'server')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
miscMethods.consoleUncaughtException()

var app = rootAppRequire('mediaServer/routes/api')('public', config_environment.LOCALHOST_PORT)

var port_number = app.get('port')

miscMethods.setTimeZone(config_environment.TIME_ZONE)
miscMethods.connectToMongoose(config_environment.NODE_DATABASE, port_number)



