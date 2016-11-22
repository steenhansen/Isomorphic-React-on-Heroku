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

var react_constants = require('../reactConstants');
var RsdTable = require('./RsdTable');
var RsdList = require('./RsdList');
var MediaComponent = require('../MediaComponent');
var GenreSelect = require('./GenreSelect');
var RsdTitles = require('./RsdTitles');
var RsdDescription = require('./RsdDescription');

var React = require('react');

var RsdComponent = function (_MediaComponent) {
    _inherits(RsdComponent, _MediaComponent);

    _createClass(RsdComponent, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            React;
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
        _this.rsd_list = new RsdList(props_array, _this.search_columns);
        _this.genre_choice_filter = '';
        _this.displayed_columns = {
            'rsd_id_cell': ['episode_number', 'hh_mm', 'mp3_url'],
            'rsd_text_cell': ['episode_number', 'book author', 'first_name', 'last_name', 'book title', 'start_title', 'end_title', 'hh:mm:ss', 'hh_mm', 'post link', 'file name', 'genre type', 'pdf link', 'video link']
        };
        _this.rsd_list.initialOrder();
        _this.state = {
            associated_rsd_list: _this.rsd_list
        };
        _this.filterByGenre = _this.filterByGenre.bind(_this); // <GenreSelect cb_RsdComponent_filterByGenre={this.filterByGenre}
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
            this.number_matches = this.changeGrid(changed_data);
            var fn_updateTableSize = this.refs.the_rsd_table._updateTableSize;
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(fn_updateTableSize, react_constants.REACT_UPDATE_DELAY);
        }
    }, {
        key: '_cssGeneration',
        value: function _cssGeneration() {
            var dark_blue = react_constants.SFF_DARK_BLUE;
            var column_sort_css = '\n      .sort-by-episode_number { color: #' + dark_blue + '; font-weight: bold; }\n      .sort-by-hh-mm-ss       { color: #' + dark_blue + '; font-weight: bold; }\n      .search-highlight       { color: #' + dark_blue + '; font-weight: bold; }\n\n      .first-book-author      { color: #' + dark_blue + '; font-weight: bold; }\n      .last-book-author       { color: #' + dark_blue + '; font-weight: bold; font-size: 120%; }\n\n      .start-book-title       { color: #' + dark_blue + '; font-weight: bold; }\n      .end-book-title         { color: #' + dark_blue + '; font-weight: bold; font-size: 120%; }\n\n       ';
            return column_sort_css;
        }
    }, {
        key: 'filterByGenre',
        value: function filterByGenre(genre_choice_filter) {
            var changed_data = {
                genre_choice_filter: genre_choice_filter
            };
            this.number_matches = this.changeGrid(changed_data);
        }
    }, {
        key: 'render',
        value: function render() {
            var _generateCss = this.generateCss();

            var rsd_clear_css = _generateCss.rsd_clear_css;
            var clear_hover_css = _generateCss.clear_hover_css;
            var column_sort_css = _generateCss.column_sort_css;

            var my_searches = this.search_matches;
            var match_message = this.numberMatchesShort();
            return React.createElement('div', { id: 'rsd-media-container' }, React.createElement(RsdDescription, { rsd_description: this.media_description }), React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: clear_hover_css } }), React.createElement('button', { onClick: this.clearAllFilters, style: rsd_clear_css, className: 'rsd-clear CLEAR-TEXT' }, 'Reset'), React.createElement('input', { onChange: this._onFilterChange,
                className: 'TEXT-FILTER filter-text',
                value: this.filter_text,
                autoComplete: 'off',
                placeholder: 'Search ...' }), '     ', match_message, React.createElement(GenreSelect, { cb_RsdComponent_filterByGenre: this.filterByGenre,
                className: 'RSD-SELECT',
                category_choice: this.genre_choice_filter }), React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: column_sort_css } }), React.createElement(RsdTitles, { cb_RsdComponent_titleSort: this._onSortChange }), React.createElement(RsdTable, { data: this.rsd_list,
                filter_text: this.filter_text,
                search_matches: my_searches,
                ref: 'the_rsd_table',
                media_container_name: 'rsd-media-container',
                search_columns: this.search_columns,
                displayed_columns: this.displayed_columns,
                sort_column: this.sort_column }), React.createElement('div', { className: 'TEST-EPISODE-ORDER' }, this.TEST_EPISODE_ORDER));
        }
    }]);

    return RsdComponent;
}(MediaComponent);

module.exports = RsdComponent;