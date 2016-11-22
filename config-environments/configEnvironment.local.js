'use strict'

var config_environment = {

    NODE_DATABASE: 'mongodb://localhost/media_server_db',
    LOCALHOST_PORT: 5000,

//  user/pass to access http://localhost:5000/change
    HTACCESS_USERNAME: 'user',
    HTACCESS_PASSWORD: 'pass',

    TIME_ZONE_PUBLISH: 'MDT',

     RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/19SV8Dk5yc49gMBoUVSE6aGOigdTWJ0cgggFo3AdQl6Y/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/19SV8Dk5yc49gMBoUVSE6aGOigdTWJ0cgggFo3AdQl6Y/export?format=tsv&gid=1799638635",       // test rsd

    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv",   
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1DKkNYP_s5SU5uloXzX5JjOTEZquTlVbKurIGQTe3_Wk/export?format=tsv&gid=607409390",   // test podcast
                            
    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc/export?format=tsv",          
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/17TwPecDRNw5JS9_WT6t3cl40e5M46z8ALwnvFalHDZc/export?format=tsv&gid=1750187409"    // test pdf

}
module.exports = config_environment







