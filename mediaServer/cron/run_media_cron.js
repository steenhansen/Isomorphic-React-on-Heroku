
var config_environment = rootAppRequire('configEnvironment')

module.exports = function (the_information, di_factory, the_media) {

    function exitCallback() {
        process.exit()
    }

    function callMediaCron(variables_tsv, parser_tsv, host_url) {
        var process_port = process.env.process_port || 5000
        var save_rss_items = rootAppRequire('mediaServer/modules/base/saveRssItems')(di_factory)
        var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(the_information)
        var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
        var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')(the_media)
        var screenOutput = rootAppRequire('mediaServer/modules/base/screenOutput')(save_rss_items, media_url_dirs)
        miscMethods.setTimeZone(config_environment.TIME_ZONE)
        miscMethods.connectToMongoose(config_environment.NODE_DATABASE, process_port)
        screenOutput.html_saveTestToDb_P1(variables_tsv, parser_tsv, the_media, the_information, media_file_loc)
            .then( ()=> screenOutput.html_saveTestToRss_P2(variables_tsv, parser_tsv, the_media, media_file_loc, host_url) )
            .then( ()=> screenOutput.html_saveRealToDb_P4(variables_tsv, parser_tsv, the_media, the_information, media_file_loc))
            .then( ()=> screenOutput.html_saveRealToRss_P5(variables_tsv, parser_tsv, the_media, media_file_loc, host_url))
            .catch(function (e) {
                console.log('CRON EXCEPTION : ' + e.message)         // heroku logs -a calm-dusk-45367
        })

    }
    return callMediaCron
}
