"use strict";
var MediaDescription = require('../MediaDescription');


class RsdDescription extends MediaDescription {
    constructor(props) {
        super(props);
        this.the_description = props['rsd_description'];
    }
  
}

module.exports = RsdDescription;
