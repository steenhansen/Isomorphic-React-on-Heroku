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
var browser_MediaComponent = require('./js/podcast/PodcastComponent')
var browser_media_factory = React.createFactory(browser_MediaComponent)
var podcast_props = window.PODCAST_MEDIA_PROPS_SCRIPT
var browser_podcast_component = browser_media_factory(podcast_props)
var podcast_div_name = shared_constants.PODCAST_REACT_CONTAINTER
var react_element_container = document.getElementById(podcast_div_name)

ReactDOM.render(browser_podcast_component, react_element_container)
