webpackJsonp([1],{

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
	var shared_constants = __webpack_require__(237)
	var ReactDOM = __webpack_require__(52)
	var browser_MediaComponent = __webpack_require__(238)
	var browser_media_factory = React.createFactory(browser_MediaComponent)
	var pdf_props = window.PDF_MEDIA_PROPS_SCRIPT
	var browser_pdf_component = browser_media_factory(pdf_props)
	var pdf_div_name = shared_constants.PDF_REACT_CONTAINTER
	var react_element_container = document.getElementById(pdf_div_name)

	ReactDOM.render(browser_pdf_component, react_element_container)



/***/ }),

/***/ 238:
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

	var react_constants = __webpack_require__(229);
	var PdfTable = __webpack_require__(239);
	var PdfList = __webpack_require__(241);
	var React = __webpack_require__(5);
	var MediaComponent = __webpack_require__(228);
	var PdfTitles = __webpack_require__(242);
	var PdfDescription = __webpack_require__(243);

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
	            return React.createElement('div', { id: 'pdf-media-container' }, React.createElement(PdfDescription, { pdf_description: this.media_description }), the_counts, React.createElement('br', null), React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: clear_hover_css } }), React.createElement('button', { onClick: this.clearAllFilters, style: pdf_clear_css, className: 'pdf-clear CLEAR-TEXT' }, 'Reset'), React.createElement('input', { onChange: this._onFilterChange,
	                className: 'TEXT-FILTER filter-text',
	                value: this.filter_text,
	                autoComplete: 'off',
	                placeholder: 'Search ...' }), ' ', match_message, React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: column_sort_css } }), React.createElement(PdfTitles, { cb_PdfComponent_titleSort: this._onSortChange }), React.createElement(PdfTable, { data: this.pdf_list,
	                filter_text: this.filter_text,
	                search_matches: my_searches,
	                ref: 'the_pdf_table',
	                media_container_name: 'pdf-media-container',
	                site_url: this.site_url,
	                search_columns: this.search_columns,
	                displayed_columns: this.displayed_columns,
	                sort_column: this.sort_column }), React.createElement('div', { className: 'TEST-EPISODE-ORDER' }, this.TEST_EPISODE_ORDER));
	        }
	    }]);

	    return PdfComponent;
	}(MediaComponent);

	module.exports = PdfComponent;

/***/ }),

/***/ 239:
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
	var MediaTable = __webpack_require__(235);
	var FixedDataTable = __webpack_require__(1);
	var Column = FixedDataTable.Column,
	    Table = FixedDataTable.Table;

	var PdfTextCell = __webpack_require__(240);
	var react_constants = __webpack_require__(229);

	var PdfTable = function (_MediaTable) {
	    _inherits(PdfTable, _MediaTable);

	    function PdfTable(props) {
	        _classCallCheck(this, PdfTable);

	        var _this = _possibleConstructorReturn(this, (PdfTable.__proto__ || Object.getPrototypeOf(PdfTable)).call(this, props));

	        _this.site_url = props['site_url'];
	        _this.media_container_name = props.media_container_name;
	        return _this;
	    }

	    _createClass(PdfTable, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            React;
	            Column;
	            PdfIdCell;
	            PdfTextCell;
	            Table;
	        }
	    }, {
	        key: 'rowsMainCellWidth',
	        value: function rowsMainCellWidth() {
	            var id_cell_width = 0;
	            var number_rows = 5;
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
	            }, this.props), React.createElement(Column, { columnKey: 'pdf_text_column',
	                cell: React.createElement(PdfTextCell, { data: this.props.data,
	                    filter_text: this.props.filter_text,
	                    search_matches: this.props.search_matches,
	                    search_columns: this.props.search_columns,
	                    site_url: this.site_url,
	                    displayed_columns: this.displayed_columns['pdf_text_cell'],
	                    sort_column: this.props.sort_column }),
	                flexGrow: 1,
	                width: text_cell_width })));
	        }
	    }]);

	    return PdfTable;
	}(MediaTable);

	module.exports = PdfTable;

/***/ }),

/***/ 240:
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

	var MediaTextCell = __webpack_require__(232);
	var React = __webpack_require__(5);

	var PdfTextCell = function (_MediaTextCell) {
	    _inherits(PdfTextCell, _MediaTextCell);

	    function PdfTextCell(props) {
	        _classCallCheck(this, PdfTextCell);

	        var _this = _possibleConstructorReturn(this, (PdfTextCell.__proto__ || Object.getPrototypeOf(PdfTextCell)).call(this, props));

	        _this.site_url = props['site_url'];
	        return _this;
	    }

	    _createClass(PdfTextCell, [{
	        key: '_pass_lint_',
	        value: function _pass_lint_() {
	            Cell;
	            React;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            this.fixTheText();
	            var _displayed_data = this.displayed_data,
	                wikipedia_story = _displayed_data['story link on wikipedia'],
	                wikipedia_author = _displayed_data['author wikipedia entry'],
	                book_author = _displayed_data["book author"],
	                book_title = _displayed_data["book title"];

	            if (wikipedia_story) {
	                var story_link = '   <a href="' + wikipedia_story + '" target="_blank" >' + book_title + '</a> ';
	            } else {
	                var story_link = book_title;
	            }
	            if (wikipedia_author) {
	                var author_link = '   <a href="' + wikipedia_author + '" target="_blank" >' + book_author + '</a> ';
	            } else {
	                var author_link = book_author;
	            }
	            var my_description = ' ' + story_link + ' by ' + author_link + ' <br>';
	            my_description = my_description + this.pdfLinks();
	            return React.createElement(Cell, { className: 'PDF-STORY' }, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_description } }));
	        }
	    }, {
	        key: 'pdfLinks',
	        value: function pdfLinks() {
	            var site_url = this.site_url;
	            var pdf_descriptions = '';
	            for (var i = 1; i <= 4; i++) {
	                if (this.displayed_data["pdf link " + i]) {
	                    var pdf_link = this.displayed_data["pdf link " + i];
	                    var pdf_pages = this.displayed_data["pdf page count " + i];

	                    var page_word = 'pages';
	                    if (typeof pdf_pages === 'number') {
	                        if (pdf_pages === 1) {
	                            var page_word = 'page';
	                        }
	                    } else {
	                        if (pdf_pages.indexOf('>1<') > -1) {
	                            var page_word = 'page';
	                        }
	                    }
	                    var pdf_info = this.displayed_data["pdf info " + i];
	                    var pdf_country = this.displayed_data["pdf country " + i];
	                    var lower_country = pdf_country.toLowerCase();
	                    var flag_img = '';
	                    if (lower_country.indexOf('canada') > -1) {
	                        flag_img = ' <img src="' + site_url + 'ca.svg"  class="country-flag" >'; //  http://flag-icon-css.lip.is/?continent=North+America  
	                    }

	                    pdf_descriptions = pdf_descriptions + ('<div style="margin-left:22px"><a href="' + pdf_link + '" target="_blank">\n                                       <i class="my-pdf fa fa-file-pdf-o"></i> ' + flag_img + pdf_pages + ' ' + page_word + ' ' + pdf_info + ' </a> </div>  ');
	                }
	            }
	            return pdf_descriptions;
	        }
	    }]);

	    return PdfTextCell;
	}(MediaTextCell);

	module.exports = PdfTextCell;

/***/ }),

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

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

	var MediaList = __webpack_require__(233);

	var PdfList = function (_MediaList) {
	    _inherits(PdfList, _MediaList);

	    function PdfList(props, search_columns) {
	        _classCallCheck(this, PdfList);

	        return _possibleConstructorReturn(this, (PdfList.__proto__ || Object.getPrototypeOf(PdfList)).call(this, props, search_columns));
	    }

	    return PdfList;
	}(MediaList);

	module.exports = PdfList;

/***/ }),

/***/ 242:
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

	var react_constants = __webpack_require__(229);
	var React = __webpack_require__(5);

	var PdfTitles = function (_React$Component) {
	    _inherits(PdfTitles, _React$Component);

	    function PdfTitles(props) {
	        _classCallCheck(this, PdfTitles);

	        var _this = _possibleConstructorReturn(this, (PdfTitles.__proto__ || Object.getPrototypeOf(PdfTitles)).call(this, props));

	        _this.arrow_types = { '-1': react_constants.UP_ARROW_CHAR, '1': react_constants.DOWN_ARROW_CHAR };
	        _this.title_texts = {
	            "episode_number": 'Uploaded',
	            "book author_": 'Author',
	            "book title_": 'Title',
	            "pdf page count 1": 'Pages'
	        };
	        _this.sort_directions = { "episode_number": 1, "book author_": 1, "book title_": 1, "pdf page count 1": 1 };

	        _this.current_titles = [];
	        _this.current_titles["episode_number"] = 'Uploaded' + _this.arrow_types[1];
	        _this.resetAllSorts("episode_number");
	        _this.clickEpisodeNumber = _this.clickEpisodeNumber.bind(_this);
	        _this.clickBookAuthor = _this.clickBookAuthor.bind(_this);
	        _this.clickBookTitle = _this.clickBookTitle.bind(_this);
	        _this.clickPageCount = _this.clickPageCount.bind(_this);
	        _this.state = { 'current_titles': _this.current_titles };
	        return _this;
	    }

	    _createClass(PdfTitles, [{
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
	        key: 'clickPageCount',
	        value: function clickPageCount() {
	            this.handleTitleClick('pdf page count 1');
	        }
	    }, {
	        key: 'handleTitleClick',
	        value: function handleTitleClick(column_name) {
	            var sort_dir = this.sort_directions[column_name] * -1;
	            this.sort_directions[column_name] = sort_dir;
	            this.current_titles[column_name] = this.title_texts[column_name] + this.arrow_types[sort_dir];

	            this.props.cb_PdfComponent_titleSort(column_name, sort_dir);
	            this.resetAllSorts(column_name);
	            this.setState({ 'current_titles': this.current_titles });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var pdf_sort_css = { cursor: 'pointer', padding: 0, margin: 3 };
	            var dark_blue = react_constants.SFF_DARK_BLUE;
	            var light_blue = react_constants.SFF_LIGHT_BLUE;
	            var sort_hover_css = ' .pdf-sort { color: #' + light_blue + '; font-size:1em }\n                     .pdf-sort:hover { color: #' + dark_blue + ' }          ';
	            var _current_titles = this.current_titles,
	                title_episode_number = _current_titles['episode_number'],
	                title_book_author = _current_titles['book author_'],
	                title_book_title = _current_titles['book title_'],
	                title_page_count = _current_titles['pdf page count 1'];

	            return React.createElement('div', null, React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: sort_hover_css } }), React.createElement('button', { className: 'EPISODE-SORT pdf-sort', onClick: this.clickEpisodeNumber,
	                style: pdf_sort_css }, title_episode_number), React.createElement('button', { className: 'TITLE-SORT pdf-sort', onClick: this.clickBookTitle,
	                style: pdf_sort_css }, title_book_title), React.createElement('button', { className: 'AUTHOR-SORT pdf-sort', onClick: this.clickBookAuthor,
	                style: pdf_sort_css }, title_book_author), React.createElement('button', { className: 'PAGE-SORT pdf-sort', onClick: this.clickPageCount,
	                style: pdf_sort_css }, title_page_count));
	            // UPPERCASE className is for testing!!   EPISODE-SORT
	        }
	    }]);

	    return PdfTitles;
	}(React.Component);

	module.exports = PdfTitles;

/***/ }),

/***/ 243:
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

	var MediaDescription = __webpack_require__(230);

	var PdfDescription = function (_MediaDescription) {
	    _inherits(PdfDescription, _MediaDescription);

	    function PdfDescription(props) {
	        _classCallCheck(this, PdfDescription);

	        var _this = _possibleConstructorReturn(this, (PdfDescription.__proto__ || Object.getPrototypeOf(PdfDescription)).call(this, props));

	        _this.the_description = props['pdf_description'];
	        return _this;
	    }

	    return PdfDescription;
	}(MediaDescription);

	module.exports = PdfDescription;

/***/ })

});