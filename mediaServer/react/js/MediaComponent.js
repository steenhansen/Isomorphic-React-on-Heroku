"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var MediaComponent = function (_React$Component) {
    _inherits(MediaComponent, _React$Component);

    function MediaComponent(props) {
        _classCallCheck(this, MediaComponent);

        var _this = _possibleConstructorReturn(this, (MediaComponent.__proto__ || Object.getPrototypeOf(MediaComponent)).call(this, props));

        _this.media_description = props['media_description'];
        _this.site_url = props['site_url'];

        _this.record_cell_order_testing = props['record_cell_order_testing'];
        _this.filter_text = '';
        _this.sort_column = '';
        _this.sort_dir = '';
        _this.search_matches = [];

        _this.clearAllFilters = _this.clearAllFilters.bind(_this); //<button onClick={this.clearAllFilters} >
        _this._onFilterChange = _this._onFilterChange.bind(_this); // <input onChange={this._onFilterChange}
        _this._onSortChange = _this._onSortChange.bind(_this); // <RsdTitles cb_RsdComponent_titleSort={this._onSortChange}
        return _this;
    }

    _createClass(MediaComponent, [{
        key: '_onFilterChange',
        value: function _onFilterChange(e) {
            if (!e.target.value) {
                var filter_text = '';
            } else {
                filter_text = e.target.value;
            }
            var changed_data = {
                filter_text: filter_text
            };
            this.number_matches = this.changeGrid(changed_data);
        }
    }, {
        key: '_onSortChange',
        value: function _onSortChange(columnKey, sortDir) {
            var changed_data = {
                sort_column: columnKey,
                sort_dir: sortDir
            };
            this.number_matches = this.changeGrid(changed_data);
        }
    }, {
        key: 'generateCss',
        value: function generateCss() {
            var clear_css = { cursor: 'pointer', padding: 0, margin: 3 };
            var dark_blue = react_constants.SFF_DARK_BLUE;
            var light_blue = react_constants.SFF_LIGHT_BLUE;
            var clear_hover_css = ' .rsd-clear      { color: #' + light_blue + '; font-size:1em }\n                               .rsd-clear:hover { color: #' + dark_blue + ' } ';
            var column_sort_css = this._cssGeneration();
            return { clear_css: clear_css, clear_hover_css: clear_hover_css, column_sort_css: column_sort_css };
        }
    }, {
        key: 'numberMatchesLong',
        value: function numberMatchesLong() {
            if (this.filter_text === '') {
                var match_message = '';
            } else {
                var number_matches = this.number_matches;
                if (number_matches === 1) {
                    var match_message = ' 1 match';
                } else {
                    var match_message = ' ' + number_matches + ' matches';
                }
            }
            return match_message;
        }
    }, {
        key: 'numberMatchesShort',
        value: function numberMatchesShort() {
            if (this.filter_text === '') {
                return ' ';
            } else {
                return ' ' + this.number_matches + ' ';
            }
        }
    }]);

    return MediaComponent;
}(React.Component);

module.exports = MediaComponent;