"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

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
var MediaTable = require('../MediaTable');
var FixedDataTable = require('fixed-data-table-2');
var Column = FixedDataTable.Column;
var Table = FixedDataTable.Table;

var RsdIdCell = require('./RsdIdCell');
var RsdTextCell = require('./RsdTextCell');

var RsdTable = function (_MediaTable) {
    _inherits(RsdTable, _MediaTable);

    function RsdTable(props) {
        _classCallCheck(this, RsdTable);

        var _this = _possibleConstructorReturn(this, (RsdTable.__proto__ || Object.getPrototypeOf(RsdTable)).call(this, props));

        _this.media_container_name = props.media_container_name;
        return _this;
    }

    _createClass(RsdTable, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            React;
            Column;
            RsdIdCell;
            RsdTextCell;
            Table;
        }
    }, {
        key: 'rowsMainCellWidth',
        value: function rowsMainCellWidth(table_width) {
            if (table_width > 580) {
                var number_rows = 1;
                var id_cell_width = 110;
            } else if (table_width > 340) {
                // podcast check #4
                var number_rows = 2;
                var id_cell_width = 66; //70
            } else {
                var number_rows = 3;
                var id_cell_width = 45; //48
            }
            return { number_rows: number_rows, id_cell_width: id_cell_width };
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state;
            var init_discarded_row_height = _state.init_discarded_row_height;
            var row_count = _state.row_count;
            var table_width = _state.table_width;
            var table_height = _state.table_height;
            var id_cell_width = _state.id_cell_width;
            var text_cell_width = _state.text_cell_width;

            var row_count = this.props.data.getSize();
            return React.createElement('div', null, React.createElement(Table, _extends({ rowHeight: init_discarded_row_height,
                rowsCount: row_count,
                headerHeight: 0,
                touchScrollEnabled: true,
                width: table_width,
                height: table_height,
                rowHeightGetter: this.getRowHeight
            }, this.props), React.createElement(Column, { columnKey: 'rsd_id_column',
                cell: React.createElement(RsdIdCell, { data: this.props.data,
                    displayed_columns: this.displayed_columns['rsd_id_cell'],
                    sort_column: this.props.sort_column }),
                flexGrow: 1,
                width: id_cell_width }), React.createElement(Column, { columnKey: 'rsd_text_column',
                cell: React.createElement(RsdTextCell, { data: this.props.data,
                    filter_text: this.props.filter_text,
                    search_matches: this.props.search_matches,
                    search_columns: this.props.search_columns,
                    displayed_columns: this.displayed_columns['rsd_text_cell'],
                    sort_column: this.props.sort_column }),
                flexGrow: 1,
                width: text_cell_width })));
        }
    }]);

    return RsdTable;
}(MediaTable);

module.exports = RsdTable;