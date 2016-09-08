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

        _this.SINGLE_LINE_HEIGHT = 36; // height of rows for desktop, horizontal columns of wide content
        _this.data = props.data;
        _this.filter_text = props.filter_text;

        _this.device_type = props.device_type;

        _this.search_matches = props.search_matches;
        _this.search_columns = props.search_columns;
        _this.displayed_columns = props.displayed_columns;
        _this.calced_row_height = _this.SINGLE_LINE_HEIGHT;
        _this.sort_column = props.sort_column;
        _this.state = {
            init_discarded_row_height: _this.SINGLE_LINE_HEIGHT,
            row_count: _this.data.getSize(),
            table_width: 1,
            table_height: 1,
            id_cell_width: 1,
            text_cell_width: 1
        };
        _this._onResizeWindow = _this._onResizeWindow.bind(_this);
        _this._updateTableSize = _this._updateTableSize.bind(_this);
        _this.getRowHeight = _this.getRowHeight.bind(_this);
        _this.deriveIconCellWidth = _this.deriveIconCellWidth.bind(_this);
        //   this.componentWillMount= this.componentWillMount.bind(this)
        return _this;
    }

    //componentWillMount() {
    //    this._updateTableSize()
    //}


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
            this._updateTimer = setTimeout(this._updateTableSize, 16);
        }
    }, {
        key: 'deriveRowHeight',
        value: function deriveRowHeight(table_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2) {
            if (table_width >= react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH) {
                row_height_int = this.SINGLE_LINE_HEIGHT;
            } else if (table_width <= this.MOBILE_SMALLEST_TABLE_WIDTH) {
                row_height_int = this.TALLEST_SKINNY_ROW;
            } else {
                var num_rows = (react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH - table_width) / height_row_divisor + HEIGHT_ADJUST_FACTOR_1;
                var row_height_float = this.SINGLE_LINE_HEIGHT * num_rows;
                var row_height_int = Math.floor(row_height_float) + HEIGHT_ADJUST_FACTOR_2;
            }
            return row_height_int;
        }
    }, {
        key: '_updateTableSize',
        value: function _updateTableSize() {
            if (document.getElementById('media-container') === null) {
                var table_width = react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH - this.EXTRA_WIDTH_STOP_SCROLL;
            } else {
                var table_width = document.getElementById('media-container').parentElement.clientWidth - this.EXTRA_WIDTH_STOP_SCROLL;
            }
            var WIDTH_ADJUST_FACTOR_1 = this.WIDTH_ADJUST_FACTOR_1;
            var WIDTH_ADJUST_FACTOR_2 = this.WIDTH_ADJUST_FACTOR_2;
            var id_cell_width = this.deriveIconCellWidth(table_width, WIDTH_ADJUST_FACTOR_1, WIDTH_ADJUST_FACTOR_2);
            var text_cell_width = table_width - id_cell_width;
            var height_row_divisor = this.HEIGHT_ROW_DIVISOR;
            var HEIGHT_ADJUST_FACTOR_1 = this.HEIGHT_ADJUST_FACTOR_1;
            var HEIGHT_ADJUST_FACTOR_2 = this.HEIGHT_ADJUST_FACTOR_2;
            this.calced_row_height = this.deriveRowHeight(table_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2);

            if (this.device_type === 'desktop_device') {
                var table_height = window.innerHeight - 100;
            } else {
                var table_height = this.calced_row_height * this.data.getSize();
            }
            this.setState({
                init_discarded_row_height: this.SINGLE_LINE_HEIGHT,
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

        //   320------------100--------------------570 table_width
        //   60              80                    130 first cell width

    }, {
        key: 'deriveIconCellWidth',
        value: function deriveIconCellWidth(table_width, WIDTH_ADJUST_FACTOR_1, WIDTH_ADJUST_FACTOR_2) {
            if (table_width >= react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH) {
                first_cell_width = this.ICONS_CELL_MAX_WIDTH;
            } else if (table_width <= this.MOBILE_SMALLEST_TABLE_WIDTH) {
                first_cell_width = this.ICONS_CELL_MIN_WIDTH;
            } else {
                var cell_divisor = (react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH - table_width) / this.ICONS_CELL_MAX_WIDTH + WIDTH_ADJUST_FACTOR_1;
                var first_cell_width = table_width / cell_divisor + WIDTH_ADJUST_FACTOR_2;
            }
            return first_cell_width;
        }
    }]);

    return MediaTable;
}(React.Component);

module.exports = MediaTable;