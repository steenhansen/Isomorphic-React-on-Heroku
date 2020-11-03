var config_data = rootAppRequire('server-funcs/configEnvironment');

 const hidden_credentials = process.argv[3];
    if (hidden_credentials) {
      config_data.readConfigFile(hidden_credentials);    // $ node run-cron rsd real-isomorphic-react-credentials.js

    }


var config_environment = config_data.makeConfigData();

module.exports = function (the_information, di_factory, the_media) {

  function callMediaCron (variables_tsv, parser_tsv, host_url) {
    var process_port = process.env.process_port || process.env.LOCALHOST_PORT;
    var save_rss_items = rootAppRequire(
      'mediaServer/modules/base/saveRssItems'
    )(di_factory);
    var media_file_loc = rootAppRequire(
      'mediaServer/modules/base/mediaFileLoc'
    )(the_information);
    var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
    var media_url_dirs = rootAppRequire('mediaServer/modules/base/urlDirs')(
      the_media
    );
    var screenOutput = rootAppRequire('mediaServer/modules/base/screenOutput')(
      save_rss_items,
      media_url_dirs
    );
    miscMethods.setTimeZone(config_environment.TIME_ZONE);
    miscMethods.connectToMongoose(
      config_environment.ATLAS_MONGODB,
      process_port
    );
    screenOutput
      .html_saveTestToDb_P1(
        variables_tsv,
        parser_tsv,
        the_media,
        the_information,
        media_file_loc
      )
      .then(() =>
        screenOutput.html_saveTestToRss_P2(
          variables_tsv,
          parser_tsv,
          the_media,
          media_file_loc,
          host_url
        )
      )
      .then(() =>
        screenOutput.html_saveRealToDb_P4(
          variables_tsv,
          parser_tsv,
          the_media,
          the_information,
          media_file_loc
        )
      )
      .then(() =>
        screenOutput.html_saveRealToRss_P5(
          variables_tsv,
          parser_tsv,
          the_media,
          media_file_loc,
          host_url
        )
      )
      .then( ()=>{ console.log(the_media._class_name , 'CRON is done');
                    process.exit(1);
        })
      .catch(function (e) {
        console.log('CRON EXCEPTION : ' + e.message); // heroku logs -a calm-dusk-45367
      });
  }
  return callMediaCron;
};
