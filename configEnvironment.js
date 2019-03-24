'use strict'


// local 26 records config


if (process.env.MONGODB_URI) {
    var node_database = process.env.MONGODB_URI
} else {
    var node_database = 'mongodb://localhost/media_server_db'
}

if (process.env.HTACCESS_USERNAME) {
    var htaccess_username = process.env.HTACCESS_USERNAME
} else {
    var htaccess_username = 'user'
}

if (process.env.HTACCESS_PASSWORD) {
    var htaccess_password = process.env.HTACCESS_PASSWORD
} else {
    var htaccess_password = 'pass'
}

var config_environment = {
    NODE_DATABASE: node_database,
    HTACCESS_USERNAME: htaccess_username,
    HTACCESS_PASSWORD: htaccess_password,

//  user/pass to access http://localhost:5000/change
    LOCALHOST_PORT: 5000,
    TIME_ZONE_PUBLISH: 'MDT',

    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1VFMgWy6wmTkFIpeNW-NkZdWmpz5iZcuULgMpjn8_QgU/export?format=tsv&gid=1799638635",       // test rsd

    PODCAST_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/export?format=tsv",
    PODCAST_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1cWtA1AaY83cBuU_6vt64adDeR-dfT-X1U5VgvCRVMAg/export?format=tsv&gid=607409390",   // test podcast

    PDF_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/export?format=tsv",
    PDF_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1sbQ8NR7hvcm4EjSlyhmte0rYtI_G3vnc1o5KLPAW2lc/export?format=tsv&gid=1750187409"    // test pdf

}
module.exports = config_environment







