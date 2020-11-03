'use strict';

function readConfigFile(cred_file){
  const outside_repo = "../" + cred_file;
  const hidden_credentials= rootAppRequire(outside_repo);
  process.env.ATLAS_MONGODB              = hidden_credentials.ATLAS_MONGODB;
  process.env.LOCALHOST_PORT           = hidden_credentials.LOCALHOST_PORT;
  process.env.HTACCESS_USERNAME        = hidden_credentials.HTACCESS_USERNAME;
  process.env.HTACCESS_PASSWORD        = hidden_credentials.HTACCESS_PASSWORD;
  process.env.THE_HOST_URL             = hidden_credentials.THE_HOST_URL;
  process.env.TIME_ZONE_PUBLISH        = hidden_credentials.TIME_ZONE_PUBLISH;

  process.env.RSD_GOOGLE_DATA          = hidden_credentials.RSD_GOOGLE_DATA;
  process.env.RSD_GOOGLE_VARIABLES     = hidden_credentials.RSD_GOOGLE_VARIABLES;
  process.env.PODCAST_GOOGLE_DATA      = hidden_credentials.PODCAST_GOOGLE_DATA;
  process.env.PODCAST_GOOGLE_VARIABLES = hidden_credentials.PODCAST_GOOGLE_VARIABLES;
  process.env.PDF_GOOGLE_DATA          = hidden_credentials.PDF_GOOGLE_DATA;      
  process.env.PDF_GOOGLE_VARIABLES     = hidden_credentials.PDF_GOOGLE_VARIABLES;
}

function makeConfigData(){

  if (!process.env.ATLAS_MONGODB){
    console.log(' *** You forgot the credentials file: npm start --  hidden_credentials.js');
    process.exit();
  }

  const config_data ={
    ATLAS_MONGODB: process.env.ATLAS_MONGODB,
    HTACCESS_USERNAME: process.env.HTACCESS_USERNAME,
    HTACCESS_PASSWORD: process.env.HTACCESS_PASSWORD,

    LOCALHOST_PORT: process.env.LOCALHOST_PORT,
    THE_HOST_URL:   process.env.THE_HOST_URL,
    TIME_ZONE_PUBLISH:   process.env.TIME_ZONE_PUBLISH ,

    RSD_GOOGLE_DATA: process.env.RSD_GOOGLE_DATA,
    RSD_GOOGLE_VARIABLES: process.env.RSD_GOOGLE_VARIABLES,

    PODCAST_GOOGLE_DATA: process.env.PODCAST_GOOGLE_DATA,
    PODCAST_GOOGLE_VARIABLES: process.env.PODCAST_GOOGLE_VARIABLES,

    PDF_GOOGLE_DATA: process.env.PDF_GOOGLE_DATA,
    PDF_GOOGLE_VARIABLES: process.env.PDF_GOOGLE_VARIABLES
  };
  return config_data;
}

var config_environment = {
  readConfigFile:readConfigFile,
  makeConfigData:makeConfigData
};

module.exports = config_environment;
