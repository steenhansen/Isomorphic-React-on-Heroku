"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var react_constants = require('../reactConstants');
var PodcastTable = require('./PodcastTable');
var PodcastList = require('./PodcastList');
var MediaComponent = require('../MediaComponent');
var KindSelect = require('./KindSelect');
var PodcastTitles = require('./PodcastTitles');
var PodcastDescription = require('./PodcastDescription');
var React = require('react');

var PodcastComponent = function (_MediaComponent) {
    _inherits(PodcastComponent, _MediaComponent);

    _createClass(PodcastComponent, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            PodcastTable;
            KindSelect;
            PodcastTitles;
            PodcastDescription;
            React;
        }
    }]);

    function PodcastComponent(props) {
        _classCallCheck(this, PodcastComponent);

        var _this = _possibleConstructorReturn(this, (PodcastComponent.__proto__ || Object.getPrototypeOf(PodcastComponent)).call(this, props));

        _this.search_columns = ['episode_number', 'book author', 'book title', 'narrator', 'participants', 'about'];
        var props_array = props['data_list'];
        _this.podcast_list = new PodcastList(props_array, _this.search_columns);
        _this.kind_choice_filter = '';
        _this.displayed_columns = {
            'podcast_id_cell': ['episode_number', 'hh_mm', 'mp3_url'],
            'podcast_text_cell': ['episode_number', 'book author', 'first_name', 'last_name', 'book title', 'start_title', 'end_title', 'hh:mm:ss', 'hh_mm', 'post_link', 'file name', 'kind type', 'about', 'narrator', 'participants', 'kind']
        };
        _this.podcast_list.initialOrder();
        _this.state = {
            associated_podcast_list: _this.podcast_list
        };
        _this.filterByKind = _this.filterByKind.bind(_this); // <KindSelect cb_PodcastComponent_filterByKind={this.filterByKind}
        return _this;
    }

    _createClass(PodcastComponent, [{
        key: 'filterHasAuthorsAndTitles',
        value: function filterHasAuthorsAndTitles() {
            var kind = this.kind_choice_filter;
            if (kind === '' || kind === 'Audiobook' || kind === 'Audiobook/Readalong' || kind === 'Readalong') {
                return true;
            }
            return false;
        }
    }, {
        key: 'changeGrid',
        value: function changeGrid(changed_data) {
            this.saveRestrictions(changed_data);
            var sortIndexes = this.podcast_list.initialOrder();
            if (this.kind_choice_filter !== '') {
                sortIndexes = this.podcast_list.selectDataSet(this.kind_choice_filter, sortIndexes);
            }
            if (this.filter_text === '') {
                this.search_matches = {};
            } else {
                var _podcast_list$filterD = this.podcast_list.filterDataSet(this.filter_text, sortIndexes);

                var filteredIndexes = _podcast_list$filterD.filteredIndexes;
                var search_matches = _podcast_list$filterD.search_matches;

                sortIndexes = filteredIndexes;
                this.search_matches = search_matches;
            }

            if (this.sort_column !== '') {
                if (this.sort_column === 'book author_' || this.sort_column === 'book title_') {
                    if (this.filterHasAuthorsAndTitles()) {
                        sortIndexes = this.podcast_list.bookAndAuthorsOnly(sortIndexes);
                    }
                }
                sortIndexes = this.podcast_list.sortIndexesByColumn(this.sort_column, this.sort_dir, sortIndexes);
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
            this.podcast_list.currentMap(sortIndexes);
            this.setState({
                associated_podcast_list: this.podcast_list,
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
            if (undefined !== changed_data.kind_choice_filter) {
                this.kind_choice_filter = changed_data.kind_choice_filter;
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
                kind_choice_filter: '',
                sort_column: '',
                sort_dir: ''
            };
            this.number_matches = this.changeGrid(changed_data);
            var fn_updateTableSize = this.refs.the_podcast_table._updateTableSize;
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
        key: 'filterByKind',
        value: function filterByKind(kind_choice_filter) {
            var changed_data = {
                kind_choice_filter: kind_choice_filter
            };
            this.number_matches = this.changeGrid(changed_data);
        }
    }, {
        key: 'render',
        value: function render() {
            var _generateCss = this.generateCss();

            var podcast_clear_css = _generateCss.podcast_clear_css;
            var clear_hover_css = _generateCss.clear_hover_css;
            var column_sort_css = _generateCss.column_sort_css;

            var my_searches = this.search_matches;
            var match_message = this.numberMatchesShort();
            return React.createElement(
                'div',
                { id: 'podcast-media-container' },
                React.createElement(PodcastDescription, { podcast_description: this.media_description }),
                React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: clear_hover_css } }),
                React.createElement(
                    'button',
                    { onClick: this.clearAllFilters, style: podcast_clear_css, className: 'podcast-clear CLEAR-TEXT' },
                    'Reset'
                ),
                React.createElement('input', { onChange: this._onFilterChange,
                    className: 'TEXT-FILTER filter-text',
                    value: this.filter_text,
                    autoComplete: 'off',
                    placeholder: 'Search ...' }),
                ' ',
                match_message,
                React.createElement(KindSelect, { cb_PodcastComponent_filterByKind: this.filterByKind,
                    className: 'PODCAST-SELECT',
                    category_choice: this.kind_choice_filter }),
                React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: column_sort_css } }),
                React.createElement(PodcastTitles, { cb_PodcastComponent_titleSort: this._onSortChange }),
                React.createElement(PodcastTable, { data: this.podcast_list,
                    filter_text: this.filter_text,
                    search_matches: my_searches,
                    ref: 'the_podcast_table',
                    media_container_name: 'podcast-media-container',
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

    return PodcastComponent;
}(MediaComponent);

module.exports = PodcastComponent;