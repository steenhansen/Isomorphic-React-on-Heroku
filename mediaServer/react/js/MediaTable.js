"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var React = require('react');
var react_constants = require('./reactConstants');

var MediaTable = function (_React$Component) {
    _inherits(MediaTable, _React$Component);

    function MediaTable(props) {
        _classCallCheck(this, MediaTable);

        var _this = _possibleConstructorReturn(this, (MediaTable.__proto__ || Object.getPrototypeOf(MediaTable)).call(this, props));

        _this.site_url = props['site_url'];
        _this.EXTRA_WIDTH_STOP_SCROLL = react_constants.HORIZONTAL_TABLE_MARGIN;
        _this.data = props.data;
        _this.filter_text = props.filter_text;
        _this.search_matches = props.search_matches;
        _this.search_columns = props.search_columns;
        _this.displayed_columns = props.displayed_columns;
        _this.calced_row_height = react_constants.TABLE_UI_LINE_HEIGHT;
        _this.sort_column = props.sort_column;
        _this.state = {
            row_count: _this.data.getSize(),
            table_width: 1,
            table_height: 1,
            id_cell_width: 1,
            text_cell_width: 1
        };
        _this._onResizeWindow = _this._onResizeWindow.bind(_this);
        _this._updateTableSize = _this._updateTableSize.bind(_this);
        _this.getRowHeight = _this.getRowHeight.bind(_this);
        return _this;
    }

    _createClass(MediaTable, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._updateTableSize();
            if (window.addEventListener) {
                window.addEventListener('resize', this._onResizeWindow, false);
            } else if (window.attachEvent) {
                window.attachEvent('onresize', this._onResizeWindow);
            } else {
                window.onresize = this._onResizeWindow;
            }
        }
    }, {
        key: '_onResizeWindow',
        value: function _onResizeWindow() {
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(this._updateTableSize, react_constants.REACT_UPDATE_DELAY);
        }
    }, {
        key: '_updateTableSize',
        value: function _updateTableSize() {
            var media_container = document.getElementById(this.media_container_name);
            if (media_container === null) {
                var table_width = react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH - this.EXTRA_WIDTH_STOP_SCROLL;
            } else {
                var table_width = media_container.parentElement.clientWidth - this.EXTRA_WIDTH_STOP_SCROLL;
            }

            var _rowsMainCellWidth = this.rowsMainCellWidth(table_width);

            var number_rows = _rowsMainCellWidth.number_rows;
            var id_cell_width = _rowsMainCellWidth.id_cell_width;

            this.calced_row_height = number_rows * 36;
            var text_cell_width = table_width - id_cell_width;

            var table_height = window.innerHeight - react_constants.VERTICAL_TABLE_MARGIN;
            this.setState({
                row_count: this.data.getSize(),
                table_width: table_width,
                table_height: table_height,
                id_cell_width: id_cell_width,
                text_cell_width: text_cell_width
            });
        }
    }, {
        key: 'getRowHeight',
        value: function getRowHeight() {
            return this.calced_row_height;
        }
    }]);

    return MediaTable;
}(React.Component);

module.exports = MediaTable;