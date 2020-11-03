//rootWorkingDir();

global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')(
  'logs',
  'cron'
);
global.Method_logger.chronicle('info', 'cron start', module.filename);
var host_url = 'http://sffaudio.herokuapp.com/';

console.log(' cron is ', process.env.CRON_TYPE, process.env.THE_HOST_URL);

/*

 8:30utc = 12:30 pacific time

 21:00Pac == 05:00Utc
 therefore
 21+3:30=24:30 ===== 5+3:30=8:30

 add 8 hours to utc to get pacific
 therefor 4:30pm== 16:30UTC = 24:30Pac

 node run-cron pdf
 hobby   daily    14:30 utc

 21:30 utc

 7:30 utc
 */
var d = new Date();
var day_index = d.getDay(); // sunday=0, mon=1, tues=2, wed=3, thurs=4, fri=5, sat=6

// Heroku runs on 'day_index===3', locally by '$ node run-cron rsd'

if ( (day_index === 3) || (process.env.CRON_TYPE==='rsd')) {          
  //        wed 00:30
  var the_information = rootAppRequire('mediaServer/modules/rsdSchema');
  var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(
    the_information
  );
  var the_media = di_factory.RsdMediaCreate();
  var callMediaCron = require('./run_media_cron')(
    the_information,
    di_factory,
    the_media
  );
  var variables_tsv = di_factory.VariablesTsvUrlCreate(
    the_information.google_variables_tab
  );
  var parser_tsv = di_factory.ParserTsvUrlCreate(
    the_information.google_media_tab
  );
  callMediaCron(variables_tsv, parser_tsv, host_url);
} else if ( (day_index === 6) || (process.env.CRON_TYPE==='pdf')) {
  // sat 00:30
  var the_information = rootAppRequire('mediaServer/modules/pdfSchema');
  var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(
    the_information
  );
  var the_media = di_factory.PdfMediaCreate();
  var callMediaCron = require('./run_media_cron')(
    the_information,
    di_factory,
    the_media
  );
  var variables_tsv = di_factory.VariablesTsvUrlCreate(
    the_information.google_variables_tab
  );
  var parser_tsv = di_factory.ParserTsvUrlCreate(
    the_information.google_media_tab
  );
  callMediaCron(variables_tsv, parser_tsv, host_url);
} else if ((day_index === 1) || (process.env.CRON_TYPE==='podcast')) {
  // Monday 00:30
  var the_information = rootAppRequire('mediaServer/modules/podcastSchema');
  var di_factory = rootAppRequire('mediaServer/modules/base/diFactory')(
    the_information
  );
  var the_media = di_factory.PodcastMediaCreate();
  var callMediaCron = require('./run_media_cron')(
    the_information,
    di_factory,
    the_media
  );
  var variables_tsv = di_factory.VariablesTsvUrlCreate(
    the_information.google_variables_tab
  );
  var parser_tsv = di_factory.ParserTsvUrlCreate(
    the_information.google_media_tab
  );
  callMediaCron(variables_tsv, parser_tsv, host_url);
}
