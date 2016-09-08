'use strict'
var config_environment = rootAppRequire('configEnvironment')

module.exports = function (the_information, di_factory, the_media) {

    function exitCallback() {
        process.exit()
    }

    function callMediaCron(variables_tsv, parser_tsv) {
        var media_constants = rootAppRequire('mediaServer/modules/base/MediaConstants')
        var save_rss = rootAppRequire('mediaServer/modules/base/saveRss')(di_factory)
        var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(the_information)
        var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
        var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')(the_media)
        var screenOutput = rootAppRequire('mediaServer/modules/base/screenOutput')(save_rss, media_url_dirs)
        miscMethods.setTimeZone(config_environment.TIME_ZONE)
        miscMethods.connectToMongoose(config_environment.NODE_DATABASE)

        screenOutput.htmlAdminSaveTestP1(variables_tsv, parser_tsv, the_media, media_constants.TEST_DATA, the_information, media_file_loc).then(
            function onFulfilled() {
                global.Method_logger.chronicle('info', 'cron end', module.filename, exitCallback)
            },
            function onRejected() {
                global.Method_logger.chronicle('info', 'cron end ERROR', module.filename, exitCallback)
            }
        )

    }

    return callMediaCron
}
