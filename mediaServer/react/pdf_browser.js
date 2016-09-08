'use strict'

var ReactDOM = require('react-dom')
var React = require('react')

var MediaComponent = require('./js/DataList')
var media_component = React.createFactory(MediaComponent)
//var create_media_table = require('./js/createMediaComponent')
//
//var pdf_media_component = create_media_table.createMediaComponent('pdf')
//
//var div_name = create_media_table.div_name  // content_x ==> media_content_div
var div_name ='react-container'
ReactDOM.render(pdf_media_component(window.MEDIA_PROPS_SCRIPT), document.getElementById(div_name))