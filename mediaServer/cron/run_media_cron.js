'use strict'
var config_environment = rootAppRequire('configEnvironment')

module.exports = function (the_information, di_factory, the_media) {

    function exitCallback() {
        process.exit()
    }

    function callMediaCron(variables_tsv, parser_tsv) {
        var save_rss_items = rootAppRequire('mediaServer/modules/base/saveRssItems')(di_factory)
        var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(the_information)
        var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
        var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')(the_media)
        var screenOutput = rootAppRequire('mediaServer/modules/base/screenOutput')(save_rss_items, media_url_dirs)
        miscMethods.setTimeZone(config_environment.TIME_ZONE)
        miscMethods.connectToMongoose(config_environment.NODE_DATABASE)

        screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, the_media, the_information, media_file_loc)
            .then(
                function () {
                    global.Method_logger.chronicle('info', 'cron end', module.filename, exitCallback)
                }
            ).catch(function (e) {
            miscMethods.serverError(e)
        })

    }

    return callMediaCron
}
