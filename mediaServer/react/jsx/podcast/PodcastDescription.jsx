"use strict"

var MediaDescription = require('../MediaDescription')

class PodcastDescription extends MediaDescription {
    constructor(props) {
        super(props)
        this.the_description = props['podcast_description']
    }

}

module.exports = PodcastDescription
