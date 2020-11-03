'use strict';

var MediaList = require('../MediaList');

class RsdList extends MediaList {
    constructor(props, search_columns) {
        super(props, search_columns);
    }

      selectDataSet(genre_choice_filter, sortIndexes) {
       return super.selectDataSet(genre_choice_filter, sortIndexes,'genre type');
    }

}

module.exports = RsdList;
