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
var FixedDataTable = require('fixed-data-table-2');
var Cell = FixedDataTable.Cell;

var MediaTextCell = function (_React$Component) {
    _inherits(MediaTextCell, _React$Component);

    function MediaTextCell(props) {
        _classCallCheck(this, MediaTextCell);

        var _this = _possibleConstructorReturn(this, (MediaTextCell.__proto__ || Object.getPrototypeOf(MediaTextCell)).call(this, props));

        _this.displayed_data = {};
        _this.site_url = props['site_url'];
        return _this;
    }

    _createClass(MediaTextCell, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            Cell;
        }
    }, {
        key: 'colorSortedText',
        value: function colorSortedText(displayed_columns, sort_column) {
            if (sort_column === 'book author_') {
                var first_name = this.displayed_data['first_name'];
                var last_name = this.displayed_data['last_name'];
                this.displayed_data['book author'] = '<span class="first-book-author">' + first_name + '</span> <span class="last-book-author">' + last_name + '</span>';
            } else if (sort_column === 'book title_') {
                var start_title = this.displayed_data['start_title'];
                var end_title = this.displayed_data['end_title'];
                this.displayed_data['book title'] = '<span class="start-book-title">' + start_title + '</span><span class="end-book-title">' + end_title + '</span>'; // NB, no spaces betwixt spans
            } else if (sort_column === 'hh:mm:ss') {
                var hh_mm = this.displayed_data['hh_mm'];
                this.displayed_data['hh_mm'] = '<span class="sort-by-hh-mm-ss">' + hh_mm + '</span>';
            } else if (sort_column === 'pdf page count 1') {
                var pdf_page_count_1 = this.displayed_data['pdf page count 1'];
                this.displayed_data['pdf page count 1'] = '<span class="sort-pdf-page-count-1">' + pdf_page_count_1 + '</span>';
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
        key: 'boldSearchText',
        value: function boldSearchText(id, search_columns, search_matches, filter_text) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = search_columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var search_column = _step2.value;

                    var start_replace = search_matches[id][search_column];
                    if (start_replace !== -1) {
                        if (this.displayed_data[search_column]) {
                            var plain_text = this.displayed_data[search_column];
                            if (typeof plain_text === 'number') {
                                var plain_text = plain_text.toString();
                            }
                            var end_replace = start_replace + filter_text.length;
                            var before_highlight = plain_text.substring(0, start_replace);
                            var highlight_text = plain_text.substring(start_replace, end_replace);
                            var after_highlight = plain_text.substring(end_replace);
                            this.displayed_data[search_column] = before_highlight + '<span class="search-highlight">' + highlight_text + '</span>' + after_highlight; // this should be some css
                        }
                    }
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
        }
    }, {
        key: 'fixTheText',
        value: function fixTheText() {
            var _props = this.props;
            var rowIndex = _props.rowIndex;
            var data = _props.data;
            var displayed_columns = _props.displayed_columns;
            var sort_column = _props.sort_column;
            var filter_text = _props.filter_text;
            var search_columns = _props.search_columns;
            var search_matches = _props.search_matches;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = displayed_columns[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var displayed_column = _step3.value;

                    this.displayed_data[displayed_column] = data.getObjectAt(rowIndex)[displayed_column];
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            if (filter_text !== '') {
                var id = data.getObjectAt(rowIndex)['_id'];
                this.boldSearchText(id, search_columns, search_matches, filter_text);
            }
            if (sort_column !== '') {
                this.colorSortedText(displayed_columns, sort_column);
            }
        }
    }]);

    return MediaTextCell;
}(React.Component);

module.exports = MediaTextCell;