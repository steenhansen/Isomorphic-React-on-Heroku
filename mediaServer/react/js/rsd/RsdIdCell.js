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

function _objectWithoutProperties(obj, keys) {
    var target = {};for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
    }return target;
}

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
var FixedDataTable = require('fixed-data-table-2');
var Cell = FixedDataTable.Cell;

var RsdIdCell = function (_React$Component) {
    _inherits(RsdIdCell, _React$Component);

    function RsdIdCell(props) {
        _classCallCheck(this, RsdIdCell);

        var _this = _possibleConstructorReturn(this, (RsdIdCell.__proto__ || Object.getPrototypeOf(RsdIdCell)).call(this, props));

        _this.displayed_data = {};
        return _this;
    }

    _createClass(RsdIdCell, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            Cell;
        }
    }, {
        key: 'colorSortedText',
        value: function colorSortedText(displayed_columns, sort_column) {
            if (sort_column === 'hh:mm:ss') {
                var mm_ss = this.displayed_data['mm_ss'];
                this.displayed_data['mm_ss'] = '<span class="sort-by-hh-mm-ss">' + mm_ss + '</span>';
            } else {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = displayed_columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var displayed_column = _step.value;

                        if (displayed_column === sort_column) {
                            var sort_hightlight = 'sort-by-' + sort_column;
                            var plain_bold_text = this.displayed_data[displayed_column];
                            this.displayed_data[displayed_column] = '<span class="' + sort_hightlight + '">' + plain_bold_text + '</span>';
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }, {
        key: 'mp3Link',
        value: function mp3Link() {
            var mp3_file = 'http://www.coquitlamwebsolutions.ca/rsd/' + this.displayed_data['file name'];
            var mp3_link = ' <a href="' + mp3_file + '" target="_blank" >\n                                   <i class="my-mp3 fa fa-volume-up"></i>\n                         </a>';
            return mp3_link;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var rowIndex = _props.rowIndex;
            var data = _props.data;
            var displayed_columns = _props.displayed_columns;
            var sort_column = _props.sort_column;

            var rest_props = _objectWithoutProperties(_props, ['rowIndex', 'data', 'displayed_columns', 'sort_column']);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = displayed_columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var displayed_column = _step2.value;

                    this.displayed_data[displayed_column] = data.getObjectAt(rowIndex)[displayed_column];
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (sort_column !== '') {
                this.colorSortedText(displayed_columns, sort_column);
            }
            var mp3_link = this.mp3Link();
            var _displayed_data = this.displayed_data;
            var episode_number = _displayed_data["episode_number"];
            var mm_ss = _displayed_data['mm_ss'];

            var my_visible_text = ' #' + episode_number + '  ' + mp3_link + '   ' + mm_ss + ' ';
            return React.createElement(Cell, _extends({}, rest_props, { className: 'RSD-EPISODE' }), React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } }));
        }
    }]);

    return RsdIdCell;
}(React.Component);

module.exports = RsdIdCell;