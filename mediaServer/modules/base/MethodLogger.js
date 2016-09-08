'use strict'

var winston = require('winston')

function variableData(variable_name, variable_value, caller_location) {
    var log_message = ':: var ' + variable_name + " = "
    if (typeof variable_value === 'function') {
        var func_value = variable_value.toString()
        var short_func = 'FUNC ' + func_value.substring(0, 10)
        log_message += short_func
    } else {
        if (variable_value === null) {
            var throw_message = variable_name + ' is null in ' + caller_location
            console.log(throw_message)
            throw(throw_message)
        } else if (variable_value === undefined) {
            var throw_message = variable_name + ' is undefined in ' + caller_location
            console.log(throw_message)
            throw(throw_message)
        } else {
            log_message += JSON.stringify(variable_value)
        }
    }
    return log_message
}

function methodAndFile(method_name, method_file) {
    var file_name = method_file.replace(/^.*[\\\/]/, '')
    var caller_location = method_name + '() ' + file_name
    return caller_location
}

module.exports = function (log_dir, environment_type) {
    var log_path = log_dir + '/' + environment_type + '/'
    var debug_log = log_path + 'debug_' + environment_type + '.log'
    var info_log = log_path + 'info_' + environment_type + '.log'
    var error_log = log_path + 'error_' + environment_type + '.log'
    var exception_log = log_path + 'exception_' + environment_type + '.log'

    var Method_Logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({
                name: 'error-file',
                filename: error_log,
                level: 'error'
            }),
            new (winston.transports.File)({
                name: 'info-file',
                filename: info_log,
                level: 'info'
            }),
            new (winston.transports.File)({
                name: 'debug-file',
                filename: debug_log,
                level: 'debug'
            }),
            new (winston.transports.File)({
                name: 'exception-file',
                filename: exception_log,
                handleExceptions: true,
                humanReadableUnhandledException: true,
                level: 'exception'
            })
        ]
    })


    var functionLogger = {
        chronicle: function (log_type, method_name, method_file) {  //, var1_name, var1_value, var2_name, var2_value, var3_name, var3_value
            var callbackFunction = false
            var caller_location = methodAndFile(method_name, method_file)
            var log_message = caller_location
            for (var i = 3; i < arguments.length; i = i + 2) {
                var variable_name = arguments[i]
                if (typeof variable_name === 'function') {
                    callbackFunction = variable_name
                    break   // since last
                }
                var variable_value = arguments[i + 1]
                log_message += variableData(variable_name, variable_value, caller_location)
            }
            if ((  log_type === 'error') || ( log_type === 'exception')) {
                console.log(log_type, log_message)
            }

            // log_message = '****' + log_message

            Method_Logger.log(log_type, log_message, callbackFunction)
            return new Error(log_type + ' ' + log_message)
        }
    }
    return functionLogger
}
