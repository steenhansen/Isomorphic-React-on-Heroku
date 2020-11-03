"use strict";

var React = require('react');

class Option extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var visible_text = this.props.category;
    var hidden_value = this.props.hidden_category;
    return /*#__PURE__*/React.createElement("option", {
      value: hidden_value
    }, visible_text);
  }

}

module.exports = Option;