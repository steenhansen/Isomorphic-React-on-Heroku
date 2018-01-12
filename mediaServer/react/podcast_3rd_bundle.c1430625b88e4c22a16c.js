webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict'

	window.onerror = function (msg, url, lineNo, columnNo, error) {
	    var message = ['Message: ' + msg,
	        'URL: ' + url,
	        'Line: ' + lineNo,
	        'Column: ' + columnNo,
	        'Error object: ' + JSON.stringify(error)
	    ].join(' - ')
	    console.log(message)
	    return true
	}

	var React = __webpack_require__(5)
	var shared_constants = __webpack_require__(246)
	var ReactDOM = __webpack_require__(60)
	var browser_MediaComponent = __webpack_require__(253)
	var browser_media_factory = React.createFactory(browser_MediaComponent)
	var podcast_props = window.PODCAST_MEDIA_PROPS_SCRIPT
	var browser_podcast_component = browser_media_factory(podcast_props)
	var podcast_div_name = shared_constants.PODCAST_REACT_CONTAINTER
	var react_element_container = document.getElementById(podcast_div_name)

	ReactDOM.render(browser_podcast_component, react_element_container)


/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

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

	var react_constants = __webpack_require__(238);
	var PodcastTable = __webpack_require__(254);
	var PodcastList = __webpack_require__(257);
	var MediaComponent = __webpack_require__(237);
	var KindSelect = __webpack_require__(258);
	var PodcastTitles = __webpack_require__(259);
	var PodcastDescription = __webpack_require__(260);
	var React = __webpack_require__(5);

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
	                var _podcast_list$filterD = this.podcast_list.filterDataSet(this.filter_text, sortIndexes),
	                    filteredIndexes = _podcast_list$filterD.filteredIndexes,
	                    search_matches = _podcast_list$filterD.search_matches;

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
	            var _generateCss = this.generateCss(),
	                podcast_clear_css = _generateCss.podcast_clear_css,
	                clear_hover_css = _generateCss.clear_hover_css,
	                column_sort_css = _generateCss.column_sort_css;

	            var my_searches = this.search_matches;
	            var match_message = this.numberMatchesShort();
	            return React.createElement('div', { id: 'podcast-media-container' }, React.createElement(PodcastDescription, { podcast_description: this.media_description }), React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: clear_hover_css } }), React.createElement('button', { onClick: this.clearAllFilters, style: podcast_clear_css, className: 'podcast-clear CLEAR-TEXT' }, 'Reset'), React.createElement('input', { onChange: this._onFilterChange,
	                className: 'TEXT-FILTER filter-text',
	                value: this.filter_text,
	                autoComplete: 'off',
	                placeholder: 'Search ...' }), ' ', match_message, React.createElement(KindSelect, { cb_PodcastComponent_filterByKind: this.filterByKind,
	                className: 'PODCAST-SELECT',
	                category_choice: this.kind_choice_filter }), React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: column_sort_css } }), React.createElement(PodcastTitles, { cb_PodcastComponent_titleSort: this._onSortChange }), React.createElement(PodcastTable, { data: this.podcast_list,
	                filter_text: this.filter_text,
	                search_matches: my_searches,
	                ref: 'the_podcast_table',
	                media_container_name: 'podcast-media-container',
	                search_columns: this.search_columns,
	                displayed_columns: this.displayed_columns,
	                sort_column: this.sort_column }), React.createElement('div', { className: 'TEST-EPISODE-ORDER' }, this.TEST_EPISODE_ORDER));
	        }
	    }]);

	    return PodcastComponent;
	}(MediaComponent);

	module.exports = PodcastComponent;

/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

	var React = __webpack_require__(5);
	var MediaTable = __webpack_require__(244);
	var FixedDataTable = __webpack_require__(1);
	var Column = FixedDataTable.Column,
	    Table = FixedDataTable.Table;

	var PodcastIdCell = __webpack_require__(255);
	var PodcastTextCell = __webpack_require__(256);
	var react_constants = __webpack_require__(238);

	var PodcastTable = function (_MediaTable) {
	    _inherits(PodcastTable, _MediaTable);

	    function PodcastTable(props) {
	        _classCallCheck(this, PodcastTable);

	        var _this = _possibleConstructorReturn(this, (PodcastTable.__proto__ || Object.getPrototypeOf(PodcastTable)).call(this, props));

	        _this.media_container_name = props.media_container_name;
	        return _this;
	    }

	    _createClass(PodcastTable, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            React;
	            Column;
	            PodcastIdCell;
	            PodcastTextCell;
	            Table;
	        }
	    }, {
	        key: 'rowsMainCellWidth',
	        value: function rowsMainCellWidth(table_width) {
	            //  console.log('table_width=', table_width)
	            if (table_width > 1370) {
	                var number_rows = 1;
	                var id_cell_width = 115;
	            } else if (table_width > 750) {
	                // podcast #274 has the most text
	                var number_rows = 2;
	                var id_cell_width = 66;
	            } else if (table_width > 410) {
	                // podcast #381 has the widest time 16:50:36              
	                var number_rows = 3;
	                var id_cell_width = 45;
	            } else if (table_width > 332) {
	                var number_rows = 4;
	                var id_cell_width = 45;
	            } else {
	                var number_rows = 5;
	                var id_cell_width = 45;
	            }
	            this.number_rows = number_rows;
	            return { number_rows: number_rows, id_cell_width: id_cell_width };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _state = this.state,
	                row_count = _state.row_count,
	                table_width = _state.table_width,
	                table_height = _state.table_height,
	                id_cell_width = _state.id_cell_width,
	                text_cell_width = _state.text_cell_width;

	            var row_count = this.props.data.getSize();
	            var row_height = react_constants.TABLE_UI_LINE_HEIGHT * this.number_rows;
	            return React.createElement('div', null, React.createElement(Table, _extends({ rowHeight: row_height,
	                rowsCount: row_count,
	                headerHeight: 0,
	                touchScrollEnabled: true,
	                width: table_width,
	                height: table_height,
	                rowHeightGetter: this.getRowHeight
	            }, this.props), React.createElement(Column, { columnKey: 'podcast_id_column',
	                cell: React.createElement(PodcastIdCell, { data: this.props.data,
	                    displayed_columns: this.displayed_columns['podcast_id_cell'],
	                    sort_column: this.props.sort_column }),
	                flexGrow: 1,
	                width: id_cell_width }), React.createElement(Column, { columnKey: 'podcast_text_column',
	                cell: React.createElement(PodcastTextCell, { data: this.props.data,
	                    filter_text: this.props.filter_text,
	                    search_matches: this.props.search_matches,
	                    search_columns: this.props.search_columns,
	                    displayed_columns: this.displayed_columns['podcast_text_cell'],
	                    sort_column: this.props.sort_column }),
	                flexGrow: 1,
	                width: text_cell_width })));
	        }
	    }]);

	    return PodcastTable;
	}(MediaTable);

	module.exports = PodcastTable;

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

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

	var FixedDataTable = __webpack_require__(1);
	var MediaIdCell = __webpack_require__(240);
	var Cell = FixedDataTable.Cell;

	var React = __webpack_require__(5);

	var PodcastIdCell = function (_MediaIdCell) {
	    _inherits(PodcastIdCell, _MediaIdCell);

	    function PodcastIdCell(props) {
	        _classCallCheck(this, PodcastIdCell);

	        return _possibleConstructorReturn(this, (PodcastIdCell.__proto__ || Object.getPrototypeOf(PodcastIdCell)).call(this, props));
	    }

	    _createClass(PodcastIdCell, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            Cell;
	            React;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var my_visible_text = this.deriveEpisodeM3MmSS();
	            return React.createElement(Cell, { className: 'PODCAST-EPISODE' }, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } }));
	        }
	    }]);

	    return PodcastIdCell;
	}(MediaIdCell);

	module.exports = PodcastIdCell;

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

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

	var FixedDataTable = __webpack_require__(1);
	var Cell = FixedDataTable.Cell;

	var MediaTextCell = __webpack_require__(241);
	var React = __webpack_require__(5);

	var PodcastTextCell = function (_MediaTextCell) {
	    _inherits(PodcastTextCell, _MediaTextCell);

	    function PodcastTextCell(props) {
	        _classCallCheck(this, PodcastTextCell);

	        return _possibleConstructorReturn(this, (PodcastTextCell.__proto__ || Object.getPrototypeOf(PodcastTextCell)).call(this, props));
	    }

	    _createClass(PodcastTextCell, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            Cell;
	            React;
	        }
	    }, {
	        key: 'description_kind',
	        value: function description_kind() {
	            var _displayed_data = this.displayed_data,
	                about = _displayed_data.about,
	                narrator = _displayed_data.narrator,
	                participants = _displayed_data.participants,
	                kind = _displayed_data.kind,
	                book_author = _displayed_data["book author"],
	                book_title = _displayed_data["book title"];

	            switch (kind) {
	                case "AUDIOBOOK":
	                    var kind_description = book_title + ' by ' + book_author + ', an audiobook, narrated by ' + narrator;
	                    break;
	                case "AUDIOBOOK/READALONG":
	                    var kind_description = book_title + ' by ' + book_author + ', an audiobook/readalong, narrated by ' + narrator + ', with ' + participants;
	                    break;
	                case "NEW RELEASES/RECENT ARRIVALS":
	                    var kind_description = 'New releases/recent arrivals with ' + participants;
	                    break;
	                case "READALONG":
	                    var kind_description = book_title + ' by ' + book_author + ', a readalong, with ' + participants;
	                    break;
	                case "TALK TO":
	                    var kind_description = about;
	                    break;
	                case "TOPIC":
	                    var kind_description = about + ' with ' + participants;
	                    break;
	                default:
	                    var kind_description = '';
	            }

	            kind_description = kind_description + '.';
	            return kind_description;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.fixTheText();
	            var kind_description = this.description_kind();
	            var post_url = this.displayed_data['post_link'];
	            var my_visible_text = '<a href="' + post_url + '" target="_blank" >' + kind_description + '</a>';
	            return React.createElement(Cell, null, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } }));
	        }
	    }]);

	    return PodcastTextCell;
	}(MediaTextCell);

	module.exports = PodcastTextCell;

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

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

	var _get = function get(object, property, receiver) {
	    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
	        var parent = Object.getPrototypeOf(object);if (parent === null) {
	            return undefined;
	        } else {
	            return get(parent, property, receiver);
	        }
	    } else if ("value" in desc) {
	        return desc.value;
	    } else {
	        var getter = desc.get;if (getter === undefined) {
	            return undefined;
	        }return getter.call(receiver);
	    }
	};

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

	var MediaList = __webpack_require__(242);

	var PodcastList = function (_MediaList) {
	    _inherits(PodcastList, _MediaList);

	    function PodcastList(props, search_columns) {
	        _classCallCheck(this, PodcastList);

	        return _possibleConstructorReturn(this, (PodcastList.__proto__ || Object.getPrototypeOf(PodcastList)).call(this, props, search_columns));
	    }

	    _createClass(PodcastList, [{
	        key: 'bookAndAuthorsOnly',
	        value: function bookAndAuthorsOnly(sortIndexes) {
	            var selected_indexes = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = sortIndexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var row_number = _step.value;

	                    var kind_type = this.getOriginalObjectAt(row_number)['kind'];
	                    var lower_kind_type = kind_type.toLowerCase();
	                    if (lower_kind_type === 'audiobook' || lower_kind_type === 'readalong' || lower_kind_type === 'audiobook/readalong') {
	                        selected_indexes.push(row_number);
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

	            return selected_indexes;
	        }
	    }, {
	        key: 'selectDataSet',
	        value: function selectDataSet(kind_choice_filter, sortIndexes) {
	            return _get(PodcastList.prototype.__proto__ || Object.getPrototypeOf(PodcastList.prototype), 'selectDataSet', this).call(this, kind_choice_filter, sortIndexes, 'kind');
	        }
	    }]);

	    return PodcastList;
	}(MediaList);

	module.exports = PodcastList;

/***/ }),

/***/ 258:
/***/ (function(module, exports, __webpack_require__) {

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

	var React = __webpack_require__(5);
	var Option = __webpack_require__(245);

	var KindSelect = function (_React$Component) {
	    _inherits(KindSelect, _React$Component);

	    function KindSelect(props) {
	        _classCallCheck(this, KindSelect);

	        var _this = _possibleConstructorReturn(this, (KindSelect.__proto__ || Object.getPrototypeOf(KindSelect)).call(this, props));

	        _this.className = _this.props.className;
	        _this.selectByKind = _this.selectByKind.bind(_this); // <select onChange={this.selectByKind}
	        return _this;
	    }

	    _createClass(KindSelect, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            Option;
	        }
	    }, {
	        key: 'selectByKind',
	        value: function selectByKind(event) {
	            var select_text = event.target.value;
	            this.props.cb_PodcastComponent_filterByKind(select_text);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var select_class_name = this.className;
	            return React.createElement('select', { onChange: this.selectByKind,
	                className: select_class_name,
	                value: this.props.category_choice }, React.createElement(Option, { category: 'All Kinds',
	                hidden_category: '',
	                key: 'kind_all' }), React.createElement(Option, { category: 'Audiobook',
	                hidden_category: 'audiobook',
	                key: 'kind_audiobook' }), React.createElement(Option, { category: 'Audiobook/Readalong',
	                hidden_category: 'audiobook/readalong',
	                key: 'kind_audiobook_readalong' }), React.createElement(Option, { category: 'New Releases/Recent Arrivals',
	                hidden_category: 'new releases/recent arrivals',
	                key: 'kind_new_releases_recent_arrivals' }), React.createElement(Option, { category: 'Readalong',
	                hidden_category: 'readalong',
	                key: 'kind_readalong' }), React.createElement(Option, { category: 'Talk To',
	                hidden_category: 'talk to',
	                key: 'kind_talk_to' }), React.createElement(Option, { category: 'Topic',
	                hidden_category: 'topic',
	                key: 'kind_topic' }));
	        }
	    }]);

	    return KindSelect;
	}(React.Component);

	module.exports = KindSelect;

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

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

	var react_constants = __webpack_require__(238);
	var React = __webpack_require__(5);

	var PodacstTitles = function (_React$Component) {
	    _inherits(PodacstTitles, _React$Component);

	    function PodacstTitles(props) {
	        _classCallCheck(this, PodacstTitles);

	        var _this = _possibleConstructorReturn(this, (PodacstTitles.__proto__ || Object.getPrototypeOf(PodacstTitles)).call(this, props));

	        _this.arrow_types = { '-1': react_constants.UP_ARROW_CHAR, '1': react_constants.DOWN_ARROW_CHAR };
	        _this.title_texts = {
	            "episode_number": 'Episode',
	            "book author_": 'Author',
	            "book title_": 'Book',
	            "hh:mm:ss": "Length"
	        };
	        _this.sort_directions = { "episode_number": 1, "book author_": 1, "book title_": 1, "hh:mm:ss": 1 };

	        _this.current_titles = [];
	        _this.current_titles["episode_number"] = 'Episode ' + _this.arrow_types[1];
	        _this.resetAllSorts("episode_number");
	        _this.clickEpisodeNumber = _this.clickEpisodeNumber.bind(_this);
	        _this.clickBookAuthor = _this.clickBookAuthor.bind(_this);
	        _this.clickBookTitle = _this.clickBookTitle.bind(_this);
	        _this.clickHhMmSs = _this.clickHhMmSs.bind(_this);
	        _this.state = { 'current_titles': _this.current_titles };
	        return _this;
	    }

	    _createClass(PodacstTitles, [{
	        key: 'resetAllSorts',
	        value: function resetAllSorts(active_column) {
	            for (var key in this.sort_directions) {
	                if (key !== active_column) {
	                    this.current_titles[key] = this.title_texts[key] + ' ' + this.arrow_types[-1] + this.arrow_types[1];
	                }
	            }
	        }
	    }, {
	        key: 'clickEpisodeNumber',
	        value: function clickEpisodeNumber() {
	            this.handleTitleClick('episode_number');
	        }
	    }, {
	        key: 'clickBookAuthor',
	        value: function clickBookAuthor() {
	            this.handleTitleClick('book author_');
	        }
	    }, {
	        key: 'clickBookTitle',
	        value: function clickBookTitle() {
	            this.handleTitleClick('book title_');
	        }
	    }, {
	        key: 'clickHhMmSs',
	        value: function clickHhMmSs() {
	            this.handleTitleClick('hh:mm:ss');
	        }
	    }, {
	        key: 'handleTitleClick',
	        value: function handleTitleClick(column_name) {
	            var sort_dir = this.sort_directions[column_name] * -1;
	            this.sort_directions[column_name] = sort_dir;
	            this.current_titles[column_name] = this.title_texts[column_name] + this.arrow_types[sort_dir];

	            this.props.cb_PodcastComponent_titleSort(column_name, sort_dir);
	            this.resetAllSorts(column_name);
	            this.setState({ 'current_titles': this.current_titles });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var podcast_sort_css = { cursor: 'pointer', padding: 0, margin: 3 };
	            var dark_blue = react_constants.SFF_DARK_BLUE;
	            var light_blue = react_constants.SFF_LIGHT_BLUE;
	            var sort_hover_css = ' .podcast-sort { color: #' + light_blue + '; font-size:1em }\n                     .podcast-sort:hover { color: #' + dark_blue + ' }          ';
	            var _current_titles = this.current_titles,
	                title_episode_number = _current_titles['episode_number'],
	                title_book_author = _current_titles['book author_'],
	                title_book_title = _current_titles['book title_'],
	                title_hh_mm_ss = _current_titles['hh:mm:ss'];

	            return React.createElement('div', null, React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: sort_hover_css } }), React.createElement('button', { className: 'EPISODE-SORT podcast-sort', onClick: this.clickEpisodeNumber,
	                style: podcast_sort_css }, title_episode_number), React.createElement('button', { className: 'TIME-SORT podcast-sort', onClick: this.clickHhMmSs,
	                style: podcast_sort_css }, title_hh_mm_ss), React.createElement('button', { className: 'TITLE-SORT podcast-sort', onClick: this.clickBookTitle,
	                style: podcast_sort_css }, title_book_title), React.createElement('button', { className: 'AUTHOR-SORT podcast-sort', onClick: this.clickBookAuthor,
	                style: podcast_sort_css }, title_book_author));
	            // UPPERCASE className is for testing!!   EPISODE-SORT
	        }
	    }]);

	    return PodacstTitles;
	}(React.Component);

	module.exports = PodacstTitles;

/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

	var MediaDescription = __webpack_require__(239);

	var PodcastDescription = function (_MediaDescription) {
	    _inherits(PodcastDescription, _MediaDescription);

	    function PodcastDescription(props) {
	        _classCallCheck(this, PodcastDescription);

	        var _this = _possibleConstructorReturn(this, (PodcastDescription.__proto__ || Object.getPrototypeOf(PodcastDescription)).call(this, props));

	        _this.the_description = props['podcast_description'];
	        return _this;
	    }

	    return PodcastDescription;
	}(MediaDescription);

	module.exports = PodcastDescription;

/***/ })

});