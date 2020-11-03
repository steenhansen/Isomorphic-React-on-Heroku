'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var react_constants = require('./reactConstants');



class MediaTable extends React.Component {
  constructor(props) {
    super(props);
    this.site_url = props['site_url'];
    this.EXTRA_WIDTH_STOP_SCROLL = react_constants.HORIZONTAL_TABLE_MARGIN;
    this.data = props.data;
    this.filter_text = props.filter_text;
    this.search_matches = props.search_matches;
    this.search_columns = props.search_columns;
    this.displayed_columns = props.displayed_columns;
    this.calced_row_height = react_constants.TABLE_UI_LINE_HEIGHT;
    this.sort_column = props.sort_column;
    this.state = {
      row_count: this.data.getSize(),
      table_width: 1,
      table_height: 1,
      id_cell_width: 1,
      text_cell_width: 1,
    };
    this._onResizeWindow = this._onResizeWindow.bind(this);
    this._updateTableSize = this._updateTableSize.bind(this);
    this.getRowHeight = this.getRowHeight.bind(this);
    this.tableGetsFocus = this.focusDiv.bind(this);
  }

  focusDiv() {
    if (this.refs.media_table_focus) {
      ReactDOM.findDOMNode(this.refs.media_table_focus).focus(); // https://stackoverflow.com/questions/39174887/focusing-div-elements-with-react
    }
  }

  componentDidMount() {
    this._updateTableSize();
    if (window.addEventListener) {
      window.addEventListener('resize', this._onResizeWindow, false);
    } else if (window.attachEvent) {
      window.attachEvent('onresize', this._onResizeWindow);
    } else {
      window.onresize = this._onResizeWindow;
    }
    this.focusDiv();
  }
  componentDidUpdate() {
    if (this.state.active) {
      this.focusDiv();
    }
  }

  _onResizeWindow() {
    clearTimeout(this._updateTimer);
    this._updateTimer = setTimeout(this._updateTableSize, react_constants.REACT_UPDATE_DELAY);
  }

  _updateTableSize() {
    let media_container = document.getElementById(this.media_container_name);
    if (media_container === null) {
      var table_width = react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH - this.EXTRA_WIDTH_STOP_SCROLL;                   
    } else {
      var table_width = media_container.parentElement.clientWidth - this.EXTRA_WIDTH_STOP_SCROLL;
    }
    var { number_rows, id_cell_width } = this.rowsMainCellWidth(table_width);
    this.calced_row_height = number_rows * 36;
    var text_cell_width = table_width - id_cell_width;

    var table_height = window.innerHeight - react_constants.VERTICAL_TABLE_MARGIN;
    this.setState({
      row_count: this.data.getSize(),
      table_width: table_width,
      table_height: table_height,
      id_cell_width: id_cell_width,
      text_cell_width: text_cell_width,
    });
  }

  getRowHeight() {
    return this.calced_row_height;
  }
}

module.exports = MediaTable;
