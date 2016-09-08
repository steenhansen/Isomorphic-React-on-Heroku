'use strict'
var util = require('util')
var cronMethods = {

    unixSeconds: function () {
        var unix_seconds_start = Math.floor(Date.now() / 1000)
        return unix_seconds_start
    },

    secondsSpan: function (unix_seconds_start) {
        var unix_seconds_end = Math.floor(Date.now() / 1000)
        var unix_run_seconds = unix_seconds_end - unix_seconds_start
        return unix_run_seconds
    },

    endOfCronLogs: function (cron_result_mess, unix_seconds_start) {
        var unix_run_seconds = cronMethods.secondsSpan(unix_seconds_start)
        var memory_usage = util.inspect(process.memoryUsage())
        global.Method_logger.chronicle('info', 'cron info', module.filename, 'cron_result_mess', cron_result_mess, 'unix_run_seconds', unix_run_seconds, 'memory_usage', memory_usage)
        console.log('----cron result was', cron_result_mess)
        console.log('----cron took', unix_run_seconds, 'seconds, used ', memory_usage, 'bytes')
        return unix_run_seconds
    },

    resolveMediaType: function (current_hours, current_minutes, cron_information) {
        var media_type = 0
        if (process.argv[2]) {
            var command_line_media_type = process.argv[2]           // node ./minute_cron.js rsd
            if (cron_information.cron_media_types[command_line_media_type]) {
                var command_line_type = cron_information.cron_media_types[command_line_media_type]
                return command_line_type
            }
        }
        if (cron_information.cron_media_hours[current_hours]) {
            var cron_hour = cron_information.cron_media_hours[current_hours]
            if (cron_hour[current_minutes]) {
                var media_type = cron_hour[current_minutes]
            }
        }
        return media_type
    }

}

module.exports = cronMethods
