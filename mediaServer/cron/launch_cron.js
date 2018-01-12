
rootWorkingDir()

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')('logs', 'cron')
global.Method_logger.chronicle('info', 'cron start', module.filename)


var media_type = process.argv[2]
var host_url = 'http://sffaudio.herokuapp.com/'

if (media_type) {
    if (media_type === 'rsd') {
        var the_information = rootAppRequire('mediaServer/modules/rsdSchema')
        var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
        var the_media = di_factory.RsdMediaCreate()
    } else if (media_type === 'pdf') {
        var the_information = rootAppRequire('mediaServer/modules/pdfSchema')
        var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
        var the_media = di_factory.PdfMediaCreate()
    } else if (media_type === 'podcast') {
        var the_information = rootAppRequire('mediaServer/modules/podcastSchema')
        var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(the_information)
        var the_media = di_factory.PodcastMediaCreate()
    }
    var callMediaCron = require('./run_media_cron')(the_information, di_factory, the_media)
    var variables_tsv = di_factory.VariablesTsvUrlCreate(the_information.google_variables_tab)
    var parser_tsv = di_factory.ParserTsvUrlCreate(the_information.google_media_tab)
    callMediaCron(variables_tsv, parser_tsv, host_url)
}

