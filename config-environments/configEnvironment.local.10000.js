'use strict'


// local 10,000 records config


var config_environment = {
    NODE_DATABASE: 'mongodb://localhost/media_server_db',

    LOCALHOST_PORT: 5000,

//  user/pass to access http://localhost:5000/change
    HTACCESS_USERNAME: 'user',
    HTACCESS_PASSWORD: 'pass',

    TIME_ZONE_PUBLISH: 'MDT',


    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv&gid=607409390",



    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/",
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/"

}
module.exports = config_environment






