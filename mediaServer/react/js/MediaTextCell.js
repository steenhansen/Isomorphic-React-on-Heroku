"use strict";

var React = require('react');

var FixedDataTable = require('fixed-data-table-2');

const {
  Cell
} = FixedDataTable;

class MediaTextCell extends React.Component {
  constructor(props) {
    super(props);
    this.displayed_data = {};
    this.site_url = props['site_url'];
  }

  _pass_lint_() {
    Cell;
  }

  colorSortedText(displayed_columns, sort_column) {
    if (sort_column === 'book author_') {
      var first_name = this.displayed_data['first_name'];
      var last_name = this.displayed_data['last_name'];
      this.displayed_data['book author'] = `<span class="first-book-author">${first_name}</span> <span class="last-book-author">${last_name}</span>`;
    } else if (sort_column === 'book title_') {
      var start_title = this.displayed_data['start_title'];
      var end_title = this.displayed_data['end_title'];
      this.displayed_data['book title'] = `<span class="start-book-title">${start_title}</span><span class="end-book-title">${end_title}</span>`; // NB, no spaces betwixt spans
    } else if (sort_column === 'hh:mm:ss') {
      var hh_mm = this.displayed_data['hh_mm'];
      this.displayed_data['hh_mm'] = `<span class="sort-by-hh-mm-ss">${hh_mm}</span>`;
    } else if (sort_column === 'pdf page count 1') {
      var pdf_page_count_1 = this.displayed_data['pdf page count 1'];
      this.displayed_data['pdf page count 1'] = `<span class="sort-pdf-page-count-1">${pdf_page_count_1}</span>`;
    } else {
      for (let displayed_column of displayed_columns) {
        if (displayed_column === sort_column) {
          var sort_hightlight = 'sort-by-' + sort_column;
          var plain_bold_text = this.displayed_data[displayed_column];
          this.displayed_data[displayed_column] = `<span class="${sort_hightlight}">${plain_bold_text}</span>`;
        }
      }
    }
  }

  boldSearchText(id, search_columns, search_matches, filter_text) {
    for (let search_column of search_columns) {
      var start_replace = search_matches[id][search_column];

      if (start_replace !== -1) {
        if (this.displayed_data[search_column]) {
          var plain_text = this.displayed_data[search_column];

          if (typeof plain_text === 'number') {
            var plain_text = plain_text.toString();
          }

          var end_replace = start_replace + filter_text.length;
          var before_highlight = plain_text.substring(0, start_replace);
          var highlight_text = plain_text.substring(start_replace, end_replace);
          var after_highlight = plain_text.substring(end_replace);
          this.displayed_data[search_column] = `${before_highlight}<span class="search-highlight">${highlight_text}</span>${after_highlight}`; // this should be some css
        }
      }
    }
  }

  fixTheText() {
    var {
      rowIndex,
      data,
      displayed_columns,
      sort_column,
      filter_text,
      search_columns,
      search_matches
    } = this.props;

    for (let displayed_column of displayed_columns) {
      this.displayed_data[displayed_column] = data.getObjectAt(rowIndex)[displayed_column];
    }

    if (filter_text !== '') {
      var id = data.getObjectAt(rowIndex)['_id'];
      this.boldSearchText(id, search_columns, search_matches, filter_text);
    }

    if (sort_column !== '') {
      this.colorSortedText(displayed_columns, sort_column);
    }
  }

}

module.exports = MediaTextCell;