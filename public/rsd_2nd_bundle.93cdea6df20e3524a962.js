webpackJsonp([3],{

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
	var browser_MediaComponent = __webpack_require__(261)
	var browser_media_factory = React.createFactory(browser_MediaComponent)
	var rsd_props = window.RSD_MEDIA_PROPS_SCRIPT
	var browser_rsd_component = browser_media_factory(rsd_props)
	var rsd_div_name = shared_constants.RSD_REACT_CONTAINTER
	var react_element_container = document.getElementById(rsd_div_name)

	ReactDOM.render(browser_rsd_component, react_element_container)



/***/ }),

/***/ 261:
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
	var RsdTable = __webpack_require__(262);
	var RsdList = __webpack_require__(265);
	var MediaComponent = __webpack_require__(237);
	var GenreSelect = __webpack_require__(266);
	var RsdTitles = __webpack_require__(267);
	var RsdDescription = __webpack_require__(268);

	var React = __webpack_require__(5);

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
	                var _rsd_list$filterDataS = this.rsd_list.filterDataSet(this.filter_text, sortIndexes),
	                    filteredIndexes = _rsd_list$filterDataS.filteredIndexes,
	                    search_matches = _rsd_list$filterDataS.search_matches;

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
	            var _generateCss = this.generateCss(),
	                rsd_clear_css = _generateCss.rsd_clear_css,
	                clear_hover_css = _generateCss.clear_hover_css,
	                column_sort_css = _generateCss.column_sort_css;

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

/***/ }),

/***/ 262:
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

	var RsdIdCell = __webpack_require__(263);
	var RsdTextCell = __webpack_require__(264);
	var react_constants = __webpack_require__(238);

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
	                var id_cell_width = 66;
	            } else {
	                var number_rows = 3;
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

/***/ }),

/***/ 263:
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

	var RsdIdCell = function (_MediaIdCell) {
	    _inherits(RsdIdCell, _MediaIdCell);

	    function RsdIdCell(props) {
	        _classCallCheck(this, RsdIdCell);

	        return _possibleConstructorReturn(this, (RsdIdCell.__proto__ || Object.getPrototypeOf(RsdIdCell)).call(this, props));
	    }

	    _createClass(RsdIdCell, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            Cell;
	            React;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var my_visible_text = this.deriveEpisodeM3MmSS();
	            return React.createElement(Cell, { className: 'RSD-EPISODE' }, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } }));
	        }
	    }]);

	    return RsdIdCell;
	}(MediaIdCell);

	module.exports = RsdIdCell;

/***/ }),

/***/ 264:
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

	var RsdTextCell = function (_MediaTextCell) {
	    _inherits(RsdTextCell, _MediaTextCell);

	    function RsdTextCell(props) {
	        _classCallCheck(this, RsdTextCell);

	        return _possibleConstructorReturn(this, (RsdTextCell.__proto__ || Object.getPrototypeOf(RsdTextCell)).call(this, props));
	    }

	    _createClass(RsdTextCell, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            Cell;
	            React;
	        }
	    }, {
	        key: 'storyLink',
	        value: function storyLink() {
	            if (this.displayed_data['pdf link']) {
	                var pdf_link = this.displayed_data['pdf link'];
	                var story_icon_link = ' <a href="' + pdf_link + '" target="_blank" >\n                                       <i class="my-pdf fa fa-file-pdf-o"></i>\n                                 </a>';
	            } else if (this.displayed_data['video link']) {
	                var youtube_link = this.displayed_data['video link'];
	                var story_icon_link = ' <a href="' + youtube_link + '" target="_blank" >\n                                     <i class="my-you fa fa-youtube-play"></i>\n                                 </a>';
	            } else {
	                story_icon_link = '';
	            }
	            return story_icon_link;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.fixTheText();
	            var pdf_link = this.storyLink();
	            var _displayed_data = this.displayed_data,
	                book_author = _displayed_data["book author"],
	                book_title = _displayed_data["book title"],
	                genre_type = _displayed_data["genre type"],
	                post_url = _displayed_data['post link'];

	            if (genre_type === 'Story') {
	                var genre_clip = ', a  story,';
	            } else if (genre_type === 'Poem') {
	                var genre_clip = ', a  poem,';
	            } else {
	                var genre_clip = '';
	            }

	            var my_description = '' + book_title + genre_clip + ' by ' + book_author + '.';
	            var my_visible_text = '   <a href="' + post_url + '" target="_blank" >' + my_description + '</a> ' + pdf_link + ' ';
	            return React.createElement(Cell, null, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } }));
	        }
	    }]);

	    return RsdTextCell;
	}(MediaTextCell);

	module.exports = RsdTextCell;

/***/ }),

/***/ 265:
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

	var RsdList = function (_MediaList) {
	    _inherits(RsdList, _MediaList);

	    function RsdList(props, search_columns) {
	        _classCallCheck(this, RsdList);

	        return _possibleConstructorReturn(this, (RsdList.__proto__ || Object.getPrototypeOf(RsdList)).call(this, props, search_columns));
	    }

	    _createClass(RsdList, [{
	        key: 'selectDataSet',
	        value: function selectDataSet(genre_choice_filter, sortIndexes) {
	            return _get(RsdList.prototype.__proto__ || Object.getPrototypeOf(RsdList.prototype), 'selectDataSet', this).call(this, genre_choice_filter, sortIndexes, 'genre type');
	        }
	    }]);

	    return RsdList;
	}(MediaList);

	module.exports = RsdList;

/***/ }),

/***/ 266:
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

	var GenreSelect = function (_React$Component) {
	    _inherits(GenreSelect, _React$Component);

	    function GenreSelect(props) {
	        _classCallCheck(this, GenreSelect);

	        var _this = _possibleConstructorReturn(this, (GenreSelect.__proto__ || Object.getPrototypeOf(GenreSelect)).call(this, props));

	        _this.className = _this.props.className;
	        _this.selectByGenre = _this.selectByGenre.bind(_this); // <select onChange={this.selectByGenre}
	        return _this;
	    }

	    _createClass(GenreSelect, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            Option;
	        }
	    }, {
	        key: 'selectByGenre',
	        value: function selectByGenre(event) {
	            var select_text = event.target.value;
	            this.props.cb_RsdComponent_filterByGenre(select_text);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var select_class_name = this.className;
	            return React.createElement('select', { onChange: this.selectByGenre,
	                className: select_class_name,
	                value: this.props.category_choice }, React.createElement(Option, { category: 'All Genres',
	                hidden_category: '',
	                key: 'genre_all' }), React.createElement(Option, { category: 'Poem',
	                hidden_category: 'poem',
	                key: 'genre_poem' }), React.createElement(Option, { category: 'Story',

	                hidden_category: 'story',
	                key: 'genre_story' }), React.createElement(Option, { category: 'Other',

	                hidden_category: 'other',
	                key: 'genre_other' }));
	        }
	    }]);

	    return GenreSelect;
	}(React.Component);

	module.exports = GenreSelect;

/***/ }),

/***/ 267:
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

	var RsdTitles = function (_React$Component) {
	    _inherits(RsdTitles, _React$Component);

	    function RsdTitles(props) {
	        _classCallCheck(this, RsdTitles);

	        var _this = _possibleConstructorReturn(this, (RsdTitles.__proto__ || Object.getPrototypeOf(RsdTitles)).call(this, props));

	        _this.arrow_types = { '-1': react_constants.UP_ARROW_CHAR, '1': react_constants.DOWN_ARROW_CHAR };
	        _this.title_texts = {
	            "episode_number": 'Episode',
	            "book author_": 'Author',
	            "book title_": 'Title',
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

	    _createClass(RsdTitles, [{
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

	            this.props.cb_RsdComponent_titleSort(column_name, sort_dir);
	            this.resetAllSorts(column_name);
	            this.setState({ 'current_titles': this.current_titles });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var rsd_sort_css = { cursor: 'pointer', padding: 0, margin: 3 };
	            var dark_blue = react_constants.SFF_DARK_BLUE;
	            var light_blue = react_constants.SFF_LIGHT_BLUE;
	            var sort_hover_css = ' .rsd-sort { color: #' + light_blue + '; font-size:1em }\n                     .rsd-sort:hover { color: #' + dark_blue + ' }          ';
	            var _current_titles = this.current_titles,
	                title_episode_number = _current_titles['episode_number'],
	                title_book_author = _current_titles['book author_'],
	                title_book_title = _current_titles['book title_'],
	                title_hh_mm_ss = _current_titles['hh:mm:ss'];

	            return React.createElement('div', null, React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: sort_hover_css } }), React.createElement('button', { className: 'EPISODE-SORT rsd-sort', onClick: this.clickEpisodeNumber,
	                style: rsd_sort_css }, title_episode_number), React.createElement('button', { className: 'TIME-SORT rsd-sort', onClick: this.clickHhMmSs,
	                style: rsd_sort_css }, title_hh_mm_ss), React.createElement('button', { className: 'TITLE-SORT rsd-sort', onClick: this.clickBookTitle,
	                style: rsd_sort_css }, title_book_title), React.createElement('button', { className: 'AUTHOR-SORT rsd-sort', onClick: this.clickBookAuthor,
	                style: rsd_sort_css }, title_book_author));
	            // UPPERCASE className is for testing!!   EPISODE-SORT
	        }
	    }]);

	    return RsdTitles;
	}(React.Component);

	module.exports = RsdTitles;

/***/ }),

/***/ 268:
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

	var RsdDescription = function (_MediaDescription) {
	    _inherits(RsdDescription, _MediaDescription);

	    function RsdDescription(props) {
	        _classCallCheck(this, RsdDescription);

	        var _this = _possibleConstructorReturn(this, (RsdDescription.__proto__ || Object.getPrototypeOf(RsdDescription)).call(this, props));

	        _this.the_description = props['rsd_description'];
	        return _this;
	    }

	    return RsdDescription;
	}(MediaDescription);

	module.exports = RsdDescription;

/***/ })

});