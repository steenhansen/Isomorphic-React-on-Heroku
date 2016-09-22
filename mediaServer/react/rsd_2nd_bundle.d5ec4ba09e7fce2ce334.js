webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

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
	var shared_constants = __webpack_require__(224)
	var ReactDOM = __webpack_require__(54)
	var browser_MediaComponent = __webpack_require__(225)
	var browser_media_factory = React.createFactory(browser_MediaComponent)
	var rsd_props = window.MEDIA_PROPS_SCRIPT
	var browser_rsd_component = browser_media_factory(rsd_props)
	var rsd_div_name = shared_constants.RSD_REACT_CONTAINTER
	var react_element_container = document.getElementById(rsd_div_name)

	ReactDOM.render(browser_rsd_component, react_element_container)



/***/ },

/***/ 224:
/***/ function(module, exports) {

	'use strict';


	var shared_constants = {

	    RSD_REACT_CONTAINTER: 'react-container'
	}

	module.exports = shared_constants;

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

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

	var react_constants = __webpack_require__(223);
	var RsdTable = __webpack_require__(226);
	var RsdList = __webpack_require__(229);
	var React = __webpack_require__(5);
	var GenreSelect = __webpack_require__(231);
	var RsdTitles = __webpack_require__(233);
	var RsdDescription = __webpack_require__(234);

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
	            return React.createElement('div', { id: 'media-container' }, React.createElement(RsdDescription, { rsd_description: this.media_description }), React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: clear_hover_css } }), React.createElement('button', { onClick: this.clearAllFilters, style: rsd_clear_css, className: 'rsd-clear CLEAR-TEXT' }, 'Clear'), React.createElement('input', { onChange: this._onFilterChange,
	                id: 'filter-text',
	                className: 'TEXT-FILTER',
	                value: this.filter_text,
	                autoComplete: 'off',
	                placeholder: 'Filter ...' }), React.createElement(GenreSelect, { cb_RsdComponent_filterByGenre: this.filterByGenre,
	                className: 'RSD-SELECT',
	                category_choice: this.genre_choice_filter }), React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: column_sort_css } }), React.createElement(RsdTitles, { cb_RsdComponent_titleSort: this._onSortChange }), React.createElement(RsdTable, { data: this.rsd_list,
	                filter_text: this.filter_text,
	                search_matches: my_searches,
	                ref: 'the_rsd_table',
	                device_type: this.device_type,
	                search_columns: this.search_columns,
	                displayed_columns: this.displayed_columns,
	                sort_column: this.sort_column }), React.createElement('div', { className: 'TEST-EPISODE-ORDER' }, this.TEST_EPISODE_ORDER));
	        }
	    }]);

	    return RsdComponent;
	}(React.Component);

	module.exports = RsdComponent;

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

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
	var MediaTable = __webpack_require__(222);
	var FixedDataTable = __webpack_require__(1);
	var Column = FixedDataTable.Column;
	var Table = FixedDataTable.Table;

	var RsdIdCell = __webpack_require__(227);
	var RsdTextCell = __webpack_require__(228);

	var RsdTable = function (_MediaTable) {
	    _inherits(RsdTable, _MediaTable);

	    function RsdTable(props) {
	        _classCallCheck(this, RsdTable);

	        var _this = _possibleConstructorReturn(this, (RsdTable.__proto__ || Object.getPrototypeOf(RsdTable)).call(this, props));

	        _this.ICONS_CELL_MIN_WIDTH = 60;
	        _this.ICONS_CELL_MAX_WIDTH = 130;

	        _this.WIDTH_ADJUST_FACTOR_1 = 4.83;
	        _this.WIDTH_ADJUST_FACTOR_2 = 12.5;

	        _this.EXTRA_WIDTH_STOP_SCROLL = 5;

	        _this.HEIGHT_ADJUST_FACTOR_1 = 1.29;
	        _this.HEIGHT_ADJUST_FACTOR_2 = 12;

	        _this.HEIGHT_ROW_DIVISOR = 166;

	        _this.TALLEST_SKINNY_ROW = 90; // height of rows for mobile with very tall thin columns of stacked content

	        _this.MOBILE_SMALLEST_TABLE_WIDTH = 320;
	        //   this.LARGEST_TABLE_WIDTH_SFFAUDIO = 570

	        //  this.TEST_first_WIDTH_width_fudge_factor()
	        //   this.TEST_second_WIDTH_componentWidthResize()
	        //this.TEST_third_HEIGHT_height_row_divisor()
	        //    this.TEST_fourth_HEIGHT_height_fudge_factor()     // redo third and fourth tests until no more changing...
	        //       this.TEST_fifth_HEIGHT_componentHeightResize()

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
	        key: 'render',
	        value: function render() {
	            var _state = this.state;
	            var init_discarded_row_height = _state.init_discarded_row_height;
	            var row_count = _state.row_count;
	            var table_width = _state.table_width;
	            var table_height = _state.table_height;
	            var id_cell_width = _state.id_cell_width;
	            var text_cell_width = _state.text_cell_width;

	            var row_count = this.props.data.getSize();

	            if (this.device_type === 'desktop_device') {
	                var show_scroll_bar = true;
	            } else {
	                var show_scroll_bar = false;
	            }

	            return React.createElement('div', null, React.createElement(Table, _extends({ rowHeight: init_discarded_row_height,
	                rowsCount: row_count,
	                headerHeight: 0,

	                showScrollbarY: show_scroll_bar,

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

	        /*
	        
	            TEST_third_HEIGHT_height_row_divisor() {
	                console.log('TEST_third_HEIGHT_height_row_divisor - idea is to find best HEIGHT_ROW_DIVISOR with smallest skinny/fat differences')
	                console.log('Look for min/max difference closest to 0, and then use the corresponding height_row_divisor for HEIGHT_ROW_DIVISOR')
	                var HEIGHT_ADJUST_FACTOR_1 = this.HEIGHT_ADJUST_FACTOR_1
	                var HEIGHT_ADJUST_FACTOR_2 = this.HEIGHT_ADJUST_FACTOR_2
	        
	                var min_component_width = this.MOBILE_SMALLEST_TABLE_WIDTH+1
	                var max_component_width = this.LARGEST_TABLE_WIDTH_SFFAUDIO-1
	        
	                for (var height_row_divisor = 150; height_row_divisor < 255; height_row_divisor += 1) {  // currently 300
	                    var skinny_row_height = this.deriveRowHeight(min_component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
	                    var skinny_difference = this.TALLEST_SKINNY_ROW - skinny_row_height
	                    console.log('TEST_third_HEIGHT_height_row_divisor - MIN', 'height_row_divisor=', height_row_divisor, 'skinny_difference=', skinny_difference)
	        
	                    var fat_row_height = this.deriveRowHeight(max_component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
	                    var fat_difference = this.SINGLE_LINE_HEIGHT - fat_row_height
	                    console.log('TEST_third_HEIGHT_height_row_divisor - MAX', 'height_row_divisor=', height_row_divisor, 'fat_difference=', fat_difference)
	                }
	            }
	        
	            TEST_fourth_HEIGHT_height_fudge_factor() {
	                console.log('TEST_fourth_HEIGHT_height_fudge_factor - idea is to find best HEIGHT_ADJUST_FACTOR_1 with smallest skinny/fat differences')
	                console.log('Look for min/max difference closest to 0, and then use the corresponding HEIGHT_ADJUST_FACTOR_1 for HEIGHT_ADJUST_FACTOR_1')
	                console.log('')
	                console.log('REDO TEST_third_HEIGHT_height_row_divisor until there is no more changing, before moving onto fifth test')
	                console.log('')
	        
	                var min_component_width =  this.MOBILE_SMALLEST_TABLE_WIDTH+1
	                var max_component_width = this.LARGEST_TABLE_WIDTH_SFFAUDIO-1
	                var height_row_divisor = this.HEIGHT_ROW_DIVISOR
	                var HEIGHT_ADJUST_FACTOR_2 = this.HEIGHT_ADJUST_FACTOR_2
	                for (var HEIGHT_ADJUST_FACTOR_1 = 1; HEIGHT_ADJUST_FACTOR_1 < 5; HEIGHT_ADJUST_FACTOR_1 += 0.01) {                    // initial is 1.4
	                    var skinny_row_height = this.deriveRowHeight(min_component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
	                    var skinny_difference = this.TALLEST_SKINNY_ROW - skinny_row_height
	                    console.log('TEST_fourth_HEIGHT_height_fudge_factor - MIN', 'HEIGHT_ADJUST_FACTOR_1=', HEIGHT_ADJUST_FACTOR_1, 'skinny_difference=', skinny_difference)
	        
	                    var fat_row_height = this.deriveRowHeight(max_component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
	                    var fat_difference = this.SINGLE_LINE_HEIGHT - fat_row_height
	                    console.log('TEST_fourth_HEIGHT_height_fudge_factor - MAX', 'HEIGHT_ADJUST_FACTOR_1=', HEIGHT_ADJUST_FACTOR_1, 'fat_difference=', fat_difference)
	                }
	            }
	        
	            TEST_fifth_HEIGHT_componentHeightResize() {
	                console.log('TEST_fifth_HEIGHT_componentHeightResize - idea is to make sure row heights range from from 36 to 90')
	                console.log('As the overall table width ranges from 320(mobile)-570(sff audio desktop)')
	                console.log('Expect 90,90,90 ... 36,36,36')
	                var height_row_divisor = this.HEIGHT_ROW_DIVISOR
	                var HEIGHT_ADJUST_FACTOR_1 = this.HEIGHT_ADJUST_FACTOR_1
	                var HEIGHT_ADJUST_FACTOR_2 = this.HEIGHT_ADJUST_FACTOR_2
	                for (var component_width = 300; component_width < 700; component_width++) {
	                    var row_height = this.deriveRowHeight(component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
	                    console.log('TEST_fifth_HEIGHT_componentHeightResize', 'component_width=', component_width, 'row_height=', row_height)
	                }
	            }
	        
	            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	        
	            TEST_first_WIDTH_width_fudge_factor() {
	                console.log('TEST_first_WIDTH_width_fudge_factor - idea is to find best WIDTH_FUDGE_FACTOR with smallest min/max differences')
	                console.log('Look for min/max difference closest to 0, and then use the corresponding width_fudge_factor for WIDTH_FUDGE_FACTOR')
	                var min_component_width = this.MOBILE_SMALLEST_TABLE_WIDTH+1
	                var max_component_width = this.LARGEST_TABLE_WIDTH_SFFAUDIO-1
	                var WIDTH_ADJUST_FACTOR_2 = this.WIDTH_ADJUST_FACTOR_2
	                for (var WIDTH_ADJUST_FACTOR_1 = 3.9; WIDTH_ADJUST_FACTOR_1 < 7.5; WIDTH_ADJUST_FACTOR_1 += 0.01) {                    // initial is 4
	                    console.log('')
	                    var min_id_col_width = this.deriveIconCellWidth(min_component_width, WIDTH_ADJUST_FACTOR_1,WIDTH_ADJUST_FACTOR_2)
	        
	                    var min_difference = this.ICONS_CELL_MIN_WIDTH - min_id_col_width
	                    console.log('TEST_first_WIDTH_width_fudge_factor - MIN', 'width_fudge_factor=', WIDTH_ADJUST_FACTOR_1, 'min_difference=', min_difference)
	        
	                    var max_id_col_width = this.deriveIconCellWidth(max_component_width, WIDTH_ADJUST_FACTOR_1,WIDTH_ADJUST_FACTOR_2)
	                    var max_difference = this.ICONS_CELL_MAX_WIDTH - max_id_col_width
	                    console.log('TEST_first_WIDTH_width_fudge_factor - MAX', 'width_fudge_factor=', WIDTH_ADJUST_FACTOR_1, 'max_difference=', max_difference)
	                }
	            }
	        
	            TEST_second_WIDTH_componentWidthResize() {
	                console.log('TEST_second_WIDTH_componentWidthResize - idea is to make sure first column widths range from from 60 to 130')
	                console.log('As the overall table width ranges from 320(smallest mobile)-570(sff audio desktop)')
	                console.log('Expect 60,60,60 ... 130,130,130')
	                var WIDTH_ADJUST_FACTOR_1 = this.WIDTH_ADJUST_FACTOR_1
	                var WIDTH_ADJUST_FACTOR_2 = this.WIDTH_ADJUST_FACTOR_2
	                for (var component_width = 300; component_width < 700; component_width++) {
	                    var icon_cell_width = this.deriveIconCellWidth(component_width, WIDTH_ADJUST_FACTOR_1, WIDTH_ADJUST_FACTOR_2)
	                    console.log('TEST_componentWidthResize', 'component_width=', component_width, 'icon_cell_width=', icon_cell_width)
	                }
	            }
	        */

	    }]);

	    return RsdTable;
	}(MediaTable);

	module.exports = RsdTable;

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

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

	var React = __webpack_require__(5);
	var FixedDataTable = __webpack_require__(1);
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

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

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

	var React = __webpack_require__(5);
	var FixedDataTable = __webpack_require__(1);
	var Cell = FixedDataTable.Cell;

	var RsdTextCell = function (_React$Component) {
	    _inherits(RsdTextCell, _React$Component);

	    function RsdTextCell(props) {
	        _classCallCheck(this, RsdTextCell);

	        var _this = _possibleConstructorReturn(this, (RsdTextCell.__proto__ || Object.getPrototypeOf(RsdTextCell)).call(this, props));

	        _this.displayed_data = {};
	        return _this;
	    }

	    _createClass(RsdTextCell, [{
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
	                this.displayed_data['book title'] = '<span class="start-book-title">' + start_title + '</span> <span class="end-book-title">' + end_title + '</span>';
	            } else if (sort_column === 'hh:mm:ss') {
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
	                        var plain_text = this.displayed_data[search_column];
	                        var end_replace = start_replace + filter_text.length;
	                        var before_highlight = plain_text.substring(0, start_replace);
	                        var highlight_text = plain_text.substring(start_replace, end_replace);
	                        var after_highlight = plain_text.substring(end_replace);
	                        this.displayed_data[search_column] = before_highlight + '<span class="search-highlight">' + highlight_text + '</span>' + after_highlight; // this should be some css
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
	            var _props = this.props;
	            var rowIndex = _props.rowIndex;
	            var data = _props.data;
	            var displayed_columns = _props.displayed_columns;
	            var sort_column = _props.sort_column;
	            var filter_text = _props.filter_text;
	            var search_columns = _props.search_columns;
	            var search_matches = _props.search_matches;

	            var rest_props = _objectWithoutProperties(_props, ['rowIndex', 'data', 'displayed_columns', 'sort_column', 'filter_text', 'search_columns', 'search_matches']);

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
	            var pdf_link = this.storyLink();
	            var _displayed_data = this.displayed_data;
	            var book_author = _displayed_data["book author"];
	            var book_title = _displayed_data["book title"];
	            var genre_type = _displayed_data["genre type"];
	            var post_url = _displayed_data['post link'];

	            if (genre_type === 'Story') {

	                var genre_clip = ', a  story,';
	            } else if (genre_type === 'Poem') {
	                var genre_clip = ', a  poem,';
	            } else {
	                var genre_clip = '';
	            }

	            var my_description = '' + book_title + genre_clip + ' by ' + book_author + '.';
	            var my_visible_text = '   <a href="' + post_url + '" target="_blank" >' + my_description + '</a> ' + pdf_link + ' ';
	            return React.createElement(Cell, rest_props, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } }));
	        }
	    }]);

	    return RsdTextCell;
	}(React.Component);

	module.exports = RsdTextCell;

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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

	var DataList = __webpack_require__(221);
	var shared_methods = __webpack_require__(230);

	var RsdList = function (_DataList) {
	    _inherits(RsdList, _DataList);

	    function RsdList(props, search_columns) {
	        _classCallCheck(this, RsdList);

	        return _possibleConstructorReturn(this, (RsdList.__proto__ || Object.getPrototypeOf(RsdList)).call(this, props, search_columns));
	    }

	    _createClass(RsdList, [{
	        key: 'bookTitleSort',
	        value: function bookTitleSort(media_record, start_articles_reg_ex) {
	            var book_articles = media_record['book title'].split(start_articles_reg_ex);
	            if (book_articles.length > 1) {
	                media_record['start_title'] = book_articles[1];
	                media_record['end_title'] = book_articles[2];
	            } else {
	                media_record['start_title'] = '';
	                media_record['end_title'] = book_articles[0];
	            }
	            media_record['book title_'] = media_record['end_title'].toLowerCase();
	        }
	    }, {
	        key: 'prepareIndexSet',
	        value: function prepareIndexSet(default_sort_indexes) {
	            var index_number = 0;
	            var start_articles_reg_ex = new RegExp(/^(a|an|the) /i);
	            var rsd_episode_digits = 0;
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this._indexed_access_table[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var media_record = _step.value;

	                    default_sort_indexes.push(index_number);
	                    this.bookTitleSort(media_record, start_articles_reg_ex);
	                    this.bookAuthorSort(media_record);
	                    this.timeLengthShorten(media_record);
	                    if (rsd_episode_digits === 0) {
	                        var first_id = media_record['episode number'];
	                        rsd_episode_digits = shared_methods.sizeOfLargestId(first_id);
	                    }
	                    var id_digits = shared_methods.leadingZerosDigits(rsd_episode_digits, media_record['episode number']);
	                    media_record['episode_number'] = id_digits;
	                    index_number++;
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

	            return default_sort_indexes;
	        }
	    }, {
	        key: 'bookAuthorSort',
	        value: function bookAuthorSort(media_record) {
	            var name_pieces = media_record['book author'].split(' ');
	            if (name_pieces[0].toLowerCase() === 'the') {
	                var first_name = name_pieces.shift();
	                var last_name = name_pieces.join(' ');
	            } else {
	                var last_name = name_pieces.pop();
	                var first_name = name_pieces.join(' ');
	            }
	            media_record['first_name'] = first_name;
	            media_record['last_name'] = last_name;
	            media_record['book author_'] = last_name.toLowerCase();
	        }
	    }, {
	        key: 'timeLengthShorten',
	        value: function timeLengthShorten(media_record) {
	            var hh_mm_ss = media_record['hh:mm:ss'];
	            if (hh_mm_ss.startsWith('0')) {
	                media_record['mm_ss'] = hh_mm_ss.substr(2);
	            } else {
	                media_record['mm_ss'] = hh_mm_ss;
	            }
	        }
	    }, {
	        key: 'selectDataSet',
	        value: function selectDataSet(genre_choice_filter, sortIndexes) {
	            var selected_indexes = [];
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	                for (var _iterator2 = sortIndexes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var row_number = _step2.value;

	                    var genre_type = this.getOriginalObjectAt(row_number)['genre type'];
	                    var lower_genre_type = genre_type.toLowerCase();
	                    if (lower_genre_type === genre_choice_filter) {
	                        selected_indexes.push(row_number);
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

	            return selected_indexes;
	        }
	    }]);

	    return RsdList;
	}(DataList);

	module.exports = RsdList;

/***/ },

/***/ 230:
/***/ function(module, exports) {

	'use strict'
	//var shared_constants = require('./sharedConstants')

	var shared_methods = {

	    sizeOfLargestId: function (first_id){
	       var first_number = 0 + first_id
	          if (first_number>9999){
	            var episode_digits = 5
	        }else if (first_number>999){
	            var episode_digits = 4
	        } else{
	           var episode_digits = 3
	        }
	        return episode_digits
	    },

	    leadingZerosDigits: function (episode_digits, int_id) {
	        var digits_from_end = -1 * episode_digits
	        var id_digits = String("00000" + int_id).slice(digits_from_end)
	        return id_digits
	    },



	}

	module.exports = shared_methods


/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

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

	var React = __webpack_require__(5);
	var GenreOption = __webpack_require__(232);

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
	            GenreOption;
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
	                value: this.props.category_choice }, React.createElement(GenreOption, { category: 'All Genres',
	                hidden_category: '',
	                key: 'genre_all' }), React.createElement(GenreOption, { category: 'Poem',
	                hidden_category: 'poem',
	                key: 'genre_poem' }), React.createElement(GenreOption, { category: 'Story',

	                hidden_category: 'story',
	                key: 'genre_story' }), React.createElement(GenreOption, { category: 'Other',

	                hidden_category: 'other',
	                key: 'genre_other' }));
	        }
	    }]);

	    return GenreSelect;
	}(React.Component);

	module.exports = GenreSelect;

/***/ },

/***/ 232:
/***/ function(module, exports, __webpack_require__) {

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

	var React = __webpack_require__(5);

	var GenreOption = function (_React$Component) {
	    _inherits(GenreOption, _React$Component);

	    function GenreOption(props) {
	        _classCallCheck(this, GenreOption);

	        return _possibleConstructorReturn(this, (GenreOption.__proto__ || Object.getPrototypeOf(GenreOption)).call(this, props));
	    }

	    _createClass(GenreOption, [{
	        key: "render",
	        value: function render() {
	            var visible_text = this.props.category;
	            var hidden_value = this.props.hidden_category;
	            return React.createElement("option", { value: hidden_value }, visible_text);
	        }
	    }]);

	    return GenreOption;
	}(React.Component);

	module.exports = GenreOption;

/***/ },

/***/ 233:
/***/ function(module, exports, __webpack_require__) {

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

	var react_constants = __webpack_require__(223);
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

	            var _current_titles = this.current_titles;
	            var title_episode_number = _current_titles['episode_number'];
	            var title_book_author = _current_titles['book author_'];
	            var title_book_title = _current_titles['book title_'];
	            var title_hh_mm_ss = _current_titles['hh:mm:ss'];

	            return React.createElement('div', null, React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: sort_hover_css } }), React.createElement('button', { className: 'EPISODE-SORT rsd-sort', id: 'episode-number', onClick: this.clickEpisodeNumber,
	                style: rsd_sort_css }, title_episode_number), React.createElement('button', { className: 'TIME-SORT rsd-sort', id: 'hh-mm-ss', onClick: this.clickHhMmSs,
	                style: rsd_sort_css }, title_hh_mm_ss), React.createElement('button', { className: 'TITLE-SORT rsd-sort', id: 'book-title', onClick: this.clickBookTitle,
	                style: rsd_sort_css }, title_book_title), React.createElement('button', { className: 'AUTHOR-SORT rsd-sort', id: 'book-author', onClick: this.clickBookAuthor,
	                style: rsd_sort_css }, title_book_author));
	            // UPPERCASE className is for testing!!   EPISODE-SORT
	        }
	    }]);

	    return RsdTitles;
	}(React.Component);

	module.exports = RsdTitles;

/***/ },

/***/ 234:
/***/ function(module, exports, __webpack_require__) {

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

	var React = __webpack_require__(5);

	var RsdDescription = function (_React$Component) {
	    _inherits(RsdDescription, _React$Component);

	    function RsdDescription(props) {
	        _classCallCheck(this, RsdDescription);

	        var _this = _possibleConstructorReturn(this, (RsdDescription.__proto__ || Object.getPrototypeOf(RsdDescription)).call(this, props));

	        _this.rsd_description = props['rsd_description'];
	        return _this;
	    }

	    _createClass(RsdDescription, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this._updateTableSize();
	            if (window.addEventListener) {
	                window.addEventListener('resize', this._onResizeWindow, false);
	            } else if (window.attachEvent) {
	                window.attachEvent('onresize', this._onResizeWindow);
	            } else {
	                window.onresize = this._onResizeWindow;
	            }
	        }
	    }, {
	        key: '_onResizeWindow',
	        value: function _onResizeWindow() {
	            clearTimeout(this._updateTimer);
	            this._updateTimer = setTimeout(this._updateTableSize, 16);
	        }
	    }, {
	        key: '_updateTableSize',
	        value: function _updateTableSize() {}
	    }, {
	        key: 'render',
	        value: function render() {
	            var rsd_description = this.rsd_description;
	            return React.createElement('div', { dangerouslySetInnerHTML: { __html: rsd_description } });
	        }
	    }]);

	    return RsdDescription;
	}(React.Component);

	module.exports = RsdDescription;

/***/ }

});