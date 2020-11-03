"use strict";

var FixedDataTable = require('fixed-data-table-2');

var MediaIdCell = require('../MediaIdCell');

const {
  Cell
} = FixedDataTable;

var React = require('react');

class RsdIdCell extends MediaIdCell {
  constructor(props) {
    super(props);
  }

  _pass_lint_() {
    Cell;
    React;
  }

  render() {
    let my_visible_text = this.deriveEpisodeM3MmSS();
    return /*#__PURE__*/React.createElement(Cell, {
      className: "RSD-EPISODE",
      onMouseEnter: this.props.tableGetsFocus
    }, /*#__PURE__*/React.createElement("div", {
      dangerouslySetInnerHTML: {
        __html: my_visible_text
      }
    }));
  }

}

module.exports = RsdIdCell;