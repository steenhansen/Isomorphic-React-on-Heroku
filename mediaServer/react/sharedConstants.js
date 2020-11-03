'use strict';

var React = require('react');

let react_createFactory = (type) => React.createElement.bind(null, type);

var shared_constants = {
  RSD_REACT_CONTAINTER: 'rsd-react-container',
  PDF_REACT_CONTAINTER: 'pdf-react-container',
  PODCAST_REACT_CONTAINTER: 'podcase-react-container',

  LARGEST_TABLE_WIDTH_SFFAUDIO: 570,

  react_createFactory: react_createFactory,

  FONT_AWESOME_CDN: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css',

  WEBPACK_CHUNKS_DIR: './mediaServer/chunks/',     
  CSS_CHUNK_FILE: './manifest-css.json',
  JS_CHUNK_FILE: './manifest-js.json'
};

shared_constants.JS_CHUNK_PATH =  './public/' + shared_constants.JS_CHUNK_FILE;
shared_constants.CSS_CHUNK_PATH = './public/' + shared_constants.CSS_CHUNK_FILE;

module.exports = shared_constants;
