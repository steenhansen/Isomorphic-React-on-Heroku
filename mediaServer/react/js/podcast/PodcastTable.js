"use strict";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var React = require('react');

var MediaTable = require('../MediaTable');

var FixedDataTable = require('fixed-data-table-2');

const {
  Column,
  Table
} = FixedDataTable;

var PodcastIdCell = require('./PodcastIdCell');

var PodcastTextCell = require('./PodcastTextCell');

var react_constants = require('../reactConstants');

class PodcastTable extends MediaTable {
  constructor(props) {
    super(props);
    this.media_container_name = props.media_container_name;
  }

  _pass_lint_() {
    React;
    Column;
    PodcastIdCell;
    PodcastTextCell;
    Table;
  }

  rowsMainCellWidth(table_width) {
    if (table_width > 1370) {
      var number_rows = 1;
      var id_cell_width = 115;
    } else if (table_width > 750) {
      // podcast #274 has the most text
      var number_rows = 2;
      var id_cell_width = 66;
    } else if (table_width > 410) {
      // podcast #381 has the widest time 16:50:36              
      var number_rows = 3;
      var id_cell_width = 45;
    } else if (table_width > 332) {
      var number_rows = 4;
      var id_cell_width = 45;
    } else {
      var number_rows = 5;
      var id_cell_width = 45;
    }

    this.number_rows = number_rows;
    return {
      number_rows,
      id_cell_width
    };
  }

  render() {
    var {
      table_width,
      table_height,
      id_cell_width,
      text_cell_width
    } = this.state; // bug fix call rowsMainCellWidth, so that this.number_rows is not NAN

    this.rowsMainCellWidth(table_width);
    var row_count = this.props.data.getSize();
    var row_height = react_constants.TABLE_UI_LINE_HEIGHT * this.number_rows;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Table, _extends({
      ref: "media_table_focus",
      rowHeight: row_height,
      rowsCount: row_count,
      headerHeight: 0,
      stopReactWheelPropagation: true,
      keyboardScrollEnabled: true,
      keyboardPageEnabled: true,
      touchScrollEnabled: true,
      width: table_width,
      height: table_height,
      rowHeightGetter: this.getRowHeight
    }, this.props), /*#__PURE__*/React.createElement(Column, {
      columnKey: "podcast_id_column",
      cell: /*#__PURE__*/React.createElement(PodcastIdCell, {
        data: this.props.data,
        displayed_columns: this.displayed_columns['podcast_id_cell'],
        tableGetsFocus: this.tableGetsFocus,
        sort_column: this.props.sort_column
      }),
      flexGrow: 1,
      width: id_cell_width
    }), /*#__PURE__*/React.createElement(Column, {
      columnKey: "podcast_text_column",
      cell: /*#__PURE__*/React.createElement(PodcastTextCell, {
        data: this.props.data,
        filter_text: this.props.filter_text,
        search_matches: this.props.search_matches,
        search_columns: this.props.search_columns,
        displayed_columns: this.displayed_columns['podcast_text_cell'],
        tableGetsFocus: this.tableGetsFocus,
        sort_column: this.props.sort_column
      }),
      flexGrow: 1,
      width: text_cell_width
    })));
  }

}

module.exports = PodcastTable;