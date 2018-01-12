"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var react_constants = require('../reactConstants');
var PdfTable = require('./PdfTable');
var PdfList = require('./PdfList');
var React = require('react');
var MediaComponent = require('../MediaComponent');
var PdfTitles = require('./PdfTitles');
var PdfDescription = require('./PdfDescription');

var PdfComponent = function (_MediaComponent) {
    _inherits(PdfComponent, _MediaComponent);

    _createClass(PdfComponent, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            PdfTable;
            PdfTitles;
            PdfDescription;
            React;
        }
    }]);

    function PdfComponent(props) {
        _classCallCheck(this, PdfComponent);

        var _this = _possibleConstructorReturn(this, (PdfComponent.__proto__ || Object.getPrototypeOf(PdfComponent)).call(this, props));

        _this.site_url = props['site_url'];

        _this.story_count = props['data_list'].length;
        _this.pdfs_count = props.media_options.pdfs_count;
        _this.search_columns = ['book author', 'book title', 'pdf info 1', 'pdf country 1', 'pdf info 2', 'pdf country 2', 'pdf info 3', 'pdf country 3', 'pdf info 4', 'pdf country 4', 'pdf page count 1'];
        var props_array = props['data_list'];
        _this.pdf_list = new PdfList(props_array, _this.search_columns);
        _this.displayed_columns = {
            'pdf_text_cell': ['episode_number', 'book author', 'first_name', 'last_name', 'book title', 'start_title', 'end_title', 'story link on wikipedia', 'author wikipedia entry', 'pdf link 1', 'pdf page count 1', 'pdf country 1', 'pdf info 1', 'pdf link 2', 'pdf page count 2', 'pdf country 2', 'pdf info 2', 'pdf link 3', 'pdf page count 3', 'pdf country 3', 'pdf info 3', 'pdf link 4', 'pdf page count 4', 'pdf country 4', 'pdf info 4']
        };
        _this.pdf_list.initialOrder();
        _this.state = {
            associated_pdf_list: _this.pdf_list
        };
        return _this;
    }

    _createClass(PdfComponent, [{
        key: 'changeGrid',
        value: function changeGrid(changed_data) {
            this.saveRestrictions(changed_data);
            var sortIndexes = this.pdf_list.initialOrder();

            if (this.filter_text === '') {
                this.search_matches = {};
            } else {
                var _pdf_list$filterDataS = this.pdf_list.filterDataSet(this.filter_text, sortIndexes),
                    filteredIndexes = _pdf_list$filterDataS.filteredIndexes,
                    search_matches = _pdf_list$filterDataS.search_matches;

                sortIndexes = filteredIndexes;
                this.search_matches = search_matches;
            }
            if (this.sort_column !== '') {
                sortIndexes = this.pdf_list.sortIndexesByColumn(this.sort_column, this.sort_dir, sortIndexes);
            }
            var indexes_as_str = '';
            if (this.record_cell_order_testing) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = sortIndexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var an_index = _step.value;

                        indexes_as_str += ',' + an_index;
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
            this.TEST_EPISODE_ORDER = indexes_as_str;
            this.pdf_list.currentMap(sortIndexes);

            this.setState({
                associated_pdf_list: this.pdf_list,
                table_width: this.table_width,
                table_height: this.table_height
            });
            var number_matches = sortIndexes.length;
            return number_matches;
        }
    }, {
        key: 'saveRestrictions',
        value: function saveRestrictions(changed_data) {
            if (undefined !== changed_data.table_width) {
                this.table_width = changed_data.table_width;
            }
            if (undefined !== changed_data.table_height) {
                this.table_height = changed_data.table_height;
            }
            if (undefined !== changed_data.filter_text) {
                this.filter_text = changed_data.filter_text;
            }
            if (undefined !== changed_data.sort_column) {
                this.sort_column = changed_data.sort_column;
            }
            if (undefined !== changed_data.sort_dir) {
                this.sort_dir = changed_data.sort_dir;
            }
        }
    }, {
        key: 'clearAllFilters',
        value: function clearAllFilters() {
            var changed_data = {
                filter_text: '',
                sort_column: '',
                sort_dir: ''
            };
            this.number_matches = this.changeGrid(changed_data);
            var fn_updateTableSize = this.refs.the_pdf_table._updateTableSize;
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(fn_updateTableSize, react_constants.REACT_UPDATE_DELAY);
        }
    }, {
        key: '_cssGeneration',
        value: function _cssGeneration() {
            var dark_blue = react_constants.SFF_DARK_BLUE;
            var column_sort_css = '\n      .sort-pdf-page-count-1 { color: #' + dark_blue + '; font-weight: bold; }\n      .search-highlight       { color: #' + dark_blue + '; font-weight: bold; }\n\n      .first-book-author      { color: #' + dark_blue + '; font-weight: bold; }\n      .last-book-author       { color: #' + dark_blue + '; font-weight: bold; font-size: 120%; }\n\n      .start-book-title       { color: #' + dark_blue + '; font-weight: bold; }\n      .end-book-title         { color: #' + dark_blue + '; font-weight: bold; font-size: 120%; }\n\n       ';
            return column_sort_css;
        }
    }, {
        key: 'render',
        value: function render() {
            var _generateCss = this.generateCss(),
                pdf_clear_css = _generateCss.pdf_clear_css,
                clear_hover_css = _generateCss.clear_hover_css,
                column_sort_css = _generateCss.column_sort_css;

            var my_searches = this.search_matches;
            var match_message = this.numberMatchesLong();
            if (this.pdfs_count) {
                var the_counts = ' There are ' + this.story_count + ' stories with ' + this.pdfs_count + ' unique PDFs';
            } else {
                var the_counts = ' There are ' + this.story_count + ' stories';
            }
            return React.createElement(
                'div',
                { id: 'pdf-media-container' },
                React.createElement(PdfDescription, { pdf_description: this.media_description }),
                the_counts,
                React.createElement('br', null),
                React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: clear_hover_css } }),
                React.createElement(
                    'button',
                    { onClick: this.clearAllFilters, style: pdf_clear_css, className: 'pdf-clear CLEAR-TEXT' },
                    'Reset'
                ),
                React.createElement('input', { onChange: this._onFilterChange,
                    className: 'TEXT-FILTER filter-text',
                    value: this.filter_text,
                    autoComplete: 'off',
                    placeholder: 'Search ...' }),
                ' ',
                match_message,
                React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: column_sort_css } }),
                React.createElement(PdfTitles, { cb_PdfComponent_titleSort: this._onSortChange }),
                React.createElement(PdfTable, { data: this.pdf_list,
                    filter_text: this.filter_text,
                    search_matches: my_searches,
                    ref: 'the_pdf_table',
                    media_container_name: 'pdf-media-container',
                    site_url: this.site_url,
                    search_columns: this.search_columns,
                    displayed_columns: this.displayed_columns,
                    sort_column: this.sort_column }),
                React.createElement(
                    'div',
                    { className: 'TEST-EPISODE-ORDER' },
                    this.TEST_EPISODE_ORDER
                )
            );
        }
    }]);

    return PdfComponent;
}(MediaComponent);

module.exports = PdfComponent;