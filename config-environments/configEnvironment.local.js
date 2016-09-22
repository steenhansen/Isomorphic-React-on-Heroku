'use strict'


// local 26 records config


var config_environment = {

    NODE_DATABASE: 'mongodb://localhost/media_server_db',
    LOCALHOST_PORT: 5000,

//  user/pass to access http://localhost:5000/change
    HTACCESS_USERNAME: 'user',
    HTACCESS_PASSWORD: 'pass',

    TIME_ZONE_PUBLISH: 'MDT',

    RSD_GOOGLE_DATA: "https://docs.google.com/spreadsheets/d/1uWtJWX6ZqRmw7ThEpXA1Jww6QUxWrYqdn5jyfK5HYDY/export?format=tsv",
    RSD_GOOGLE_VARIABLES: "https://docs.google.com/spreadsheets/d/1uWtJWX6ZqRmw7ThEpXA1Jww6QUxWrYqdn5jyfK5HYDY/export?format=tsv&gid=709201284",

}
module.exports = config_environment







