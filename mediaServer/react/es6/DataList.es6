'use strict';

// jsx to ensure es6 to js compile, even though no ui

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataList = function () {
    function DataList(props, search_columns) {
        _classCallCheck(this, DataList);

        this.search_columns = search_columns;
        this.search_not_found_accum = -1 * search_columns.length;
        this._indexed_access_table = [];
        for (var media_index in props) {
            var media_record = props[media_index];
            this._indexed_access_table.push(media_record);
        }
        this.size = this._indexed_access_table.length;
        this.defaultSortIndexes_ = this.prepareIndexSet([]);
    }

    // outside access


    _createClass(DataList, [{
        key: 'getObjectAt',
        value: function getObjectAt( /*number*/index) /*?object*/{
            if (index < 0 || index > this.size) {
                return undefined;
            }
            var index2 = this.current_map[index];
            return this._indexed_access_table[index2];
        }

        // inside access

    }, {
        key: 'getOriginalObjectAt',
        value: function getOriginalObjectAt( /*number*/index) /*?object*/{
            if (index < 0 || index > this.size) {
                return undefined;
            }
            return this._indexed_access_table[index];
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            return this.size;
        }
    }, {
        key: 'initialOrder',
        value: function initialOrder() {
            var default_sort_order = this.defaultSortIndexes_.slice(); // NB, must always be a different array !!!!
            this.currentMap(default_sort_order);
            return default_sort_order;
        }
    }, {
        key: 'currentMap',
        value: function currentMap(indexList) {
            this.current_map = indexList;
            this.size = this.current_map.length;
        }
    }, {
        key: 'sortIndexesByColumn',
        value: function sortIndexesByColumn(columnKey, sortDir, indexes_to_sort) {
            var _this = this;

            indexes_to_sort.sort(function (indexA, indexB) {
                var valueA = _this.getOriginalObjectAt(indexA)[columnKey];
                var valueB = _this.getOriginalObjectAt(indexB)[columnKey];
                var sortVal = 0;
                if (valueA > valueB) {
                    sortVal = 1;
                }
                if (valueA < valueB) {
                    sortVal = -1;
                }
                if (sortVal !== 0 && sortDir === 1) {
                    sortVal = sortVal * -1;
                }
                return sortVal;
            });
            return indexes_to_sort;
        }
    }, {
        key: 'filterDataSet',
        value: function filterDataSet(filter_text, sortIndexes) {
            var search_for = filter_text.toLowerCase();
            var filteredIndexes = [];
            var search_matches = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = sortIndexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row_number = _step.value;

                    var media_object = this.getOriginalObjectAt(row_number);
                    var row_search_index_accum = 0;
                    var column_matches = {};
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.search_columns[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var search_column = _step2.value;

                            if (media_object[search_column]) {
                                var column_value = media_object[search_column];
                                if (typeof column_value === 'number') {
                                    var column_value = column_value.toString();
                                }
                                var column_lowercase = column_value.toLowerCase();
                                var search_index = column_lowercase.indexOf(search_for);
                                column_matches[search_column] = search_index;
                                row_search_index_accum += search_index;
                            } else {
                                row_search_index_accum += -1; // not found
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

                    if (row_search_index_accum !== this.search_not_found_accum) {
                        filteredIndexes.push(row_number);
                        search_matches[media_object._id] = column_matches;
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

            return { 'filteredIndexes': filteredIndexes, 'search_matches': search_matches };
        }
    }]);

    return DataList;
}();

module.exports = DataList;