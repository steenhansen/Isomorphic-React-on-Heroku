"use strict";

var React = require('react');

class MediaDescription extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var the_description = this.the_description;
    return /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: the_description
      }
    });
  }

}

module.exports = MediaDescription;