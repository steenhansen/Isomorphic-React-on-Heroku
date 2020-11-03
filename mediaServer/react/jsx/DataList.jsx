'use strict';

// jsx to ensure es6 to js compile, even though no ui

class DataList {
    constructor(props, search_columns) {

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
    getObjectAt(/*number*/ index) /*?object*/ {
        if (index < 0 || index > this.size) {
            return undefined;
        }
        var index2 = this.current_map[index];
        return this._indexed_access_table[index2];
    }

// inside access
    getOriginalObjectAt(/*number*/ index) /*?object*/ {
        if (index < 0 || index > this.size) {
            return undefined;
        }
        return this._indexed_access_table[index];
    }

    getSize() {
        return this.size;
    }

    initialOrder() {
        var default_sort_order = this.defaultSortIndexes_.slice();    // NB, must always be a different array !!!!
        this.currentMap(default_sort_order);
        return default_sort_order;
    }

    currentMap(indexList) {
        this.current_map = indexList;
        this.size = this.current_map.length;
    }

    sortIndexesByColumn(columnKey, sortDir, indexes_to_sort) {
        indexes_to_sort.sort((indexA, indexB) => {
            var valueA = this.getOriginalObjectAt(indexA)[columnKey];
            var valueB = this.getOriginalObjectAt(indexB)[columnKey];
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

    filterDataSet(filter_text, sortIndexes) {
        var search_for = filter_text.toLowerCase();
        var filteredIndexes = [];
        var search_matches = {};
        for (var row_number of sortIndexes) {
            var media_object = this.getOriginalObjectAt(row_number);
            var row_search_index_accum = 0;
            var column_matches = {};
            for (let search_column of this.search_columns) {
                if (media_object[search_column]) {
                    var column_value = media_object[search_column];
                    if (typeof column_value === 'number') {
                        var column_value = column_value.toString();
                    }
                    const column_lowercase = column_value.toLowerCase();
                    var search_index = column_lowercase.indexOf(search_for);
                    column_matches[search_column] = search_index;
                    row_search_index_accum += search_index;
                } else {
                    row_search_index_accum += -1; // not found
                }
            }
            if (row_search_index_accum !== this.search_not_found_accum) {
                filteredIndexes.push(row_number);
                search_matches[media_object._id] = column_matches;
            }
        }
        return {'filteredIndexes': filteredIndexes, 'search_matches': search_matches};
    }

}

module.exports = DataList;
