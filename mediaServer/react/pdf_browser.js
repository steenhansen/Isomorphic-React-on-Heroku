'use strict';

window.onerror = function (msg, url, lineNo, columnNo, error) {
  var message = [
    'Message: ' + msg,
    'URL: ' + url,
    'Line: ' + lineNo,
    'Column: ' + columnNo,
    'Error object: ' + JSON.stringify(error)
  ].join(' - ');
  console.log(message);
  return true;
};

var shared_constants = require('./sharedConstants');
var ReactDOM = require('react-dom');
var browser_MediaComponent = require('./js/pdf/PdfComponent');

var browser_media_factory = shared_constants.react_createFactory(
  browser_MediaComponent
);

var pdf_props = window.PDF_MEDIA_PROPS_SCRIPT;
var browser_pdf_component = browser_media_factory(pdf_props);
var pdf_div_name = shared_constants.PDF_REACT_CONTAINTER;
var react_element_container = document.getElementById(pdf_div_name);

ReactDOM.render(browser_pdf_component, react_element_container);
