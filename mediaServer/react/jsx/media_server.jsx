'use strict';

var shared_constants = require('../sharedConstants');

var create_server_media_table = {

    createServerMediaComponent: function (media_type) {
        if (media_type === 'rsd') {
            var server_MediaComponent = require('./rsd/RsdComponent');    // NB, cannot be a dynmic string, or breaks browserify
        } else if(media_type === 'pdf') {
            var server_MediaComponent = require('./pdf/PdfComponent');        
        } else if(media_type === 'podcast') {
            var server_MediaComponent = require('./podcast/PodcastComponent');        
        } else{
            console.log('ERROR - no media type in createServerMediaComponent');
        }
        var server_media_factory = shared_constants.react_createFactory(server_MediaComponent);



        return server_media_factory;
    },
    getMediaContainerId: function(media_type){
        if (media_type === 'rsd') {
            var media_id =shared_constants.RSD_REACT_CONTAINTER;   // NB, cannot be a dynmic string, or breaks browserify
        } else if(media_type === 'pdf') {
            var media_id =shared_constants.PDF_REACT_CONTAINTER;   
        } else if(media_type === 'podcast') {
            var media_id =shared_constants.PODCAST_REACT_CONTAINTER;   
        } else{
            console.log('ERROR - no media type in createServerMediaComponent');
        }
        return media_id;
    },
    div_name: shared_constants.RSD_REACT_CONTAINTER

};
module.exports = create_server_media_table;
