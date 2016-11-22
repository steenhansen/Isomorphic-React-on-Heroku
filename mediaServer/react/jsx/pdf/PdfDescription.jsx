"use strict"
var MediaDescription = require('../MediaDescription')


class PdfDescription extends MediaDescription {
    constructor(props) {
        super(props)
        this.the_description = props['pdf_description']
    }

 
}

module.exports = PdfDescription
