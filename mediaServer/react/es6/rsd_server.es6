'use strict';

var React = require('react');
var shared_constants = require('../sharedConstants');
var create_server_media_table = {

    createServerMediaComponent: function createServerMediaComponent(media_type) {
        if (media_type === 'rsd') {
            var server_MediaComponent = require('./rsd/RsdComponent'); // NB, cannot be a dynmic string, or breaks browserify
        } else if (media_type === 'pdf') {
            var server_MediaComponent = require('./DataList'); // stand-in for ./pdf/PdfComponent
        } else {
            console.log('ERROR - no media type in createServerMediaComponent');
        }
        var server_media_factory = React.createFactory(server_MediaComponent);
        return server_media_factory;
    },
    div_name: shared_constants.RSD_REACT_CONTAINTER

};
module.exports = create_server_media_table;