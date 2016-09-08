"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var react_constants = require('../reactConstants');
var RsdTable = require('./RsdTable');
var RsdList = require('./RsdList');
var React = require('react');
var GenreSelect = require('./GenreSelect');
var RsdTitles = require('./RsdTitles');
var RsdDescription = require('./RsdDescription');

var RsdComponent = function (_React$Component) {
    _inherits(RsdComponent, _React$Component);

    _createClass(RsdComponent, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            RsdTable;
            GenreSelect;
            RsdTitles;
            RsdDescription;
        }
    }]);

    function RsdComponent(props) {
        _classCallCheck(this, RsdComponent);

        var _this = _possibleConstructorReturn(this, (RsdComponent.__proto__ || Object.getPrototypeOf(RsdComponent)).call(this, props));

        _this.search_columns = ['episode_number', 'book author', 'book title'];
        var props_array = props['data_list'];
        _this.media_description = props['media_description'];
        _this.device_type = props['device_type'];
        _this.record_cell_order_testing = props['record_cell_order_testing'];
        _this.rsd_list = new RsdList(props_array, _this.search_columns);
        _this.filter_text = '';
        _this.genre_choice_filter = '';
        _this.sort_column = '';
        _this.sort_dir = '';
        _this.search_matches = [];
        _this.displayed_columns = {
            'rsd_id_cell': ['episode_number', 'file name', 'mm_ss'],
            'rsd_text_cell': ['episode_number', 'book author', 'first_name', 'last_name', 'book title', 'start_title', 'end_title', 'hh:mm:ss', 'mm_ss', 'post link', 'file name', 'genre type', 'pdf link', 'video link']
        };
        _this.rsd_list.initialOrder();
        _this.state = {
            associated_rsd_list: _this.rsd_list
        };
        _this.clearAllFilters = _this.clearAllFilters.bind(_this); //<button onClick={this.clearAllFilters} >
        _this._onFilterChange = _this._onFilterChange.bind(_this); // <input onChange={this._onFilterChange}
        _this.filterByGenre = _this.filterByGenre.bind(_this); // <GenreSelect cb_RsdComponent_filterByGenre={this.filterByGenre}
        _this._onSortChange = _this._onSortChange.bind(_this); // <RsdTitles cb_RsdComponent_titleSort={this._onSortChange}
        return _this;
    }

    _createClass(RsdComponent, [{
        key: 'changeGrid',
        value: function changeGrid(changed_data) {
            this.saveRestrictions(changed_data);
            var sortIndexes = this.rsd_list.initialOrder();
            if (this.genre_choice_filter !== '') {
                sortIndexes = this.rsd_list.selectDataSet(this.genre_choice_filter, sortIndexes);
            }
            if (this.filter_text === '') {
                this.search_matches = {};
            } else {
                var _rsd_list$filterDataS = this.rsd_list.filterDataSet(this.filter_text, sortIndexes);

                var filteredIndexes = _rsd_list$filterDataS.filteredIndexes;
                var search_matches = _rsd_list$filterDataS.search_matches;

                sortIndexes = filteredIndexes;
                this.search_matches = search_matches;
            }
            if (this.sort_column !== '') {
                sortIndexes = this.rsd_list.sortIndexesByColumn(this.sort_column, this.sort_dir, sortIndexes);
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
            this.rsd_list.currentMap(sortIndexes);
            this.setState({
                associated_rsd_list: this.rsd_list,
                table_width: this.table_width,
                table_height: this.table_height
            });
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
            if (undefined !== changed_data.genre_choice_filter) {
                this.genre_choice_filter = changed_data.genre_choice_filter;
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
                genre_choice_filter: '',
                sort_column: '',
                sort_dir: ''
            };
            this.changeGrid(changed_data);
            var fn_updateTableSize = this.refs.the_rsd_table._updateTableSize;
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(fn_updateTableSize(), 16);
        }
    }, {
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
            this.changeGrid(changed_data);
        }
    }, {
        key: '_cssGeneration',
        value: function _cssGeneration() {
            var dark_blue = react_constants.SFF_DARK_BLUE;
            var column_sort_css = '\n      .sort-by-episode_number { color: #' + dark_blue + '; font-weight: bold; }\n      .sort-by-hh-mm-ss       { color: #' + dark_blue + '; font-weight: bold; }\n      .search-highlight       { color: #' + dark_blue + '; font-weight: bold; }\n\n      .first-book-author      { color: #' + dark_blue + '; font-weight: bold; }\n      .last-book-author       { color: #' + dark_blue + '; font-weight: bold; font-size: 120%; }\n\n      .start-book-title       { color: #' + dark_blue + '; font-weight: bold; }\n      .end-book-title         { color: #' + dark_blue + '; font-weight: bold; font-size: 120%; }\n\n       ';
            //      .story-link {vertical-align:middle; margin-top: -4 }  `
            return column_sort_css;
        }
    }, {
        key: 'filterByGenre',
        value: function filterByGenre(genre_choice_filter) {
            var changed_data = {
                genre_choice_filter: genre_choice_filter
            };
            this.changeGrid(changed_data);
        }
    }, {
        key: '_onSortChange',
        value: function _onSortChange(columnKey, sortDir) {
            var changed_data = {
                sort_column: columnKey,
                sort_dir: sortDir
            };
            this.changeGrid(changed_data);
        }
    }, {
        key: 'render',
        value: function render() {
            var rsd_clear_css = { cursor: 'pointer', padding: 0, margin: 3 };
            var dark_blue = react_constants.SFF_DARK_BLUE;
            var light_blue = react_constants.SFF_LIGHT_BLUE;
            var clear_hover_css = ' .rsd-clear      { color: #' + light_blue + '; font-size:1em }\n                               .rsd-clear:hover { color: #' + dark_blue + ' } ';
            var column_sort_css = this._cssGeneration();
            var my_searches = this.search_matches;
            return React.createElement(
                'div',
                { id: 'media-container' },
                React.createElement(RsdDescription, { rsd_description: this.media_description }),
                React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: clear_hover_css } }),
                React.createElement(
                    'button',
                    { onClick: this.clearAllFilters, style: rsd_clear_css, className: 'rsd-clear CLEAR-TEXT' },
                    'Clear'
                ),
                React.createElement('input', { onChange: this._onFilterChange,
                    id: 'filter-text',
                    className: 'TEXT-FILTER',
                    value: this.filter_text,
                    autoComplete: 'off',
                    placeholder: 'Filter ...' }),
                React.createElement(GenreSelect, { cb_RsdComponent_filterByGenre: this.filterByGenre,
                    className: 'RSD-SELECT',
                    category_choice: this.genre_choice_filter }),
                React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: column_sort_css } }),
                React.createElement(RsdTitles, { cb_RsdComponent_titleSort: this._onSortChange }),
                React.createElement(RsdTable, { data: this.rsd_list,
                    filter_text: this.filter_text,
                    search_matches: my_searches,
                    ref: 'the_rsd_table',
                    device_type: this.device_type,
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

    return RsdComponent;
}(React.Component);

module.exports = RsdComponent;