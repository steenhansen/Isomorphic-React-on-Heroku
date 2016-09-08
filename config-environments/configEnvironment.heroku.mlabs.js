'use strict'


// mlabs 26 records config


var config_environment = {

//  https://devcenter.heroku.com/
//  https://mlab.com/

    NODE_DATABASE : "mongodb://heroku_abcdefgh:12345678901234567890123456@ab123456.mlab.com:12345/heroku_abcdefgh",    // NB fake
    LOCALHOST_PORT: 5000,

//  user/pass to access http://localhost:5000/change
    HTACCESS_USERNAME: 'user',
    HTACCESS_PASSWORD: 'pass',

    TIME_ZONE_PUBLISH: 'MDT',

    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1uWtJWX6ZqRmw7ThEpXA1Jww6QUxWrYqdn5jyfK5HYDY/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1uWtJWX6ZqRmw7ThEpXA1Jww6QUxWrYqdn5jyfK5HYDY/export?format=tsv&gid=709201284",
}
module.exports = config_environment







