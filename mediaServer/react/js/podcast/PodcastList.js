'use strict';

var MediaList = require('../MediaList');

class PodcastList extends MediaList {
  constructor(props, search_columns) {
    super(props, search_columns);
  }

  bookAndAuthorsOnly(sortIndexes) {
    var selected_indexes = [];

    for (var row_number of sortIndexes) {
      var kind_type = this.getOriginalObjectAt(row_number)['kind'];
      var lower_kind_type = kind_type.toLowerCase();

      if (lower_kind_type === 'audiobook' || lower_kind_type === 'readalong' || lower_kind_type === 'audiobook/readalong') {
        selected_indexes.push(row_number);
      }
    }

    return selected_indexes;
  }

  selectDataSet(kind_choice_filter, sortIndexes) {
    return super.selectDataSet(kind_choice_filter, sortIndexes, 'kind');
  }

}

module.exports = PodcastList;