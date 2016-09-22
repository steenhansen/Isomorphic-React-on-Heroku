'use strict'

window.onerror = function (msg, url, lineNo, columnNo, error) {
    var message = ['Message: ' + msg,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + columnNo,
        'Error object: ' + JSON.stringify(error)
    ].join(' - ')
    console.log(message)
    return true
}

var React = require('react')
var shared_constants = require('./sharedConstants')
var ReactDOM = require('react-dom')
var browser_MediaComponent = require('./js/rsd/RsdComponent')
var browser_media_factory = React.createFactory(browser_MediaComponent)
var rsd_props = window.MEDIA_PROPS_SCRIPT
var browser_rsd_component = browser_media_factory(rsd_props)
var rsd_div_name = shared_constants.RSD_REACT_CONTAINTER
var react_element_container = document.getElementById(rsd_div_name)

ReactDOM.render(browser_rsd_component, react_element_container)

