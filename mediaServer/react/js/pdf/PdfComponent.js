"use strict";

var react_constants = require('../reactConstants');

var PdfTable = require('./PdfTable');

var PdfList = require('./PdfList');

var React = require('react');

var MediaComponent = require('../MediaComponent');

var PdfTitles = require('./PdfTitles');

var PdfDescription = require('./PdfDescription');

class PdfComponent extends MediaComponent {
  _pass_lint_() {
    PdfTable;
    PdfTitles;
    PdfDescription;
    React;
  }

  constructor(props) {
    super(props);
    this.site_url = props['site_url'];
    this.story_count = props['data_list'].length;
    this.pdfs_count = props.media_options.pdfs_count;
    this.search_columns = ['book author', 'book title', 'pdf info 1', 'pdf country 1', 'pdf info 2', 'pdf country 2', 'pdf info 3', 'pdf country 3', 'pdf info 4', 'pdf country 4', 'pdf page count 1'];
    var props_array = props['data_list'];
    this.pdf_list = new PdfList(props_array, this.search_columns);
    this.displayed_columns = {
      'pdf_text_cell': ['episode_number', 'book author', 'first_name', 'last_name', 'book title', 'start_title', 'end_title', 'story link on wikipedia', 'author wikipedia entry', 'pdf link 1', 'pdf page count 1', 'pdf country 1', 'pdf info 1', 'pdf link 2', 'pdf page count 2', 'pdf country 2', 'pdf info 2', 'pdf link 3', 'pdf page count 3', 'pdf country 3', 'pdf info 3', 'pdf link 4', 'pdf page count 4', 'pdf country 4', 'pdf info 4']
    };
    this.pdf_list.initialOrder();
    this.state = {
      associated_pdf_list: this.pdf_list
    };
  }

  changeGrid(changed_data) {
    this.saveRestrictions(changed_data);
    var sortIndexes = this.pdf_list.initialOrder();

    if (this.filter_text === '') {
      this.search_matches = {};
    } else {
      var {
        filteredIndexes,
        search_matches
      } = this.pdf_list.filterDataSet(this.filter_text, sortIndexes);
      sortIndexes = filteredIndexes;
      this.search_matches = search_matches;
    }

    if (this.sort_column !== '') {
      sortIndexes = this.pdf_list.sortIndexesByColumn(this.sort_column, this.sort_dir, sortIndexes);
    }

    var indexes_as_str = '';

    if (this.record_cell_order_testing) {
      for (var an_index of sortIndexes) {
        indexes_as_str += ',' + an_index;
      }
    }

    this.TEST_EPISODE_ORDER = indexes_as_str;
    this.pdf_list.currentMap(sortIndexes);
    this.setState({
      associated_pdf_list: this.pdf_list,
      table_width: this.table_width,
      table_height: this.table_height
    });
    let number_matches = sortIndexes.length;
    return number_matches;
  }

  saveRestrictions(changed_data) {
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

  clearAllFilters() {
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

  _cssGeneration() {
    var dark_blue = react_constants.SFF_DARK_BLUE;
    var column_sort_css = `
      .sort-pdf-page-count-1 { color: #${dark_blue}; font-weight: bold; }
      .search-highlight       { color: #${dark_blue}; font-weight: bold; }

      .first-book-author      { color: #${dark_blue}; font-weight: bold; }
      .last-book-author       { color: #${dark_blue}; font-weight: bold; font-size: 120%; }

      .start-book-title       { color: #${dark_blue}; font-weight: bold; }
      .end-book-title         { color: #${dark_blue}; font-weight: bold; font-size: 120%; }

       `;
    return column_sort_css;
  }

  render() {
    var {
      pdf_clear_css,
      clear_hover_css,
      column_sort_css
    } = this.generateCss();
    var my_searches = this.search_matches;
    let match_message = this.numberMatchesLong();

    if (this.pdfs_count) {
      var the_counts = ` There are ${this.story_count} stories with ${this.pdfs_count} unique PDFs`;
    } else {
      var the_counts = ` There are ${this.story_count} stories`;
    }

    return /*#__PURE__*/React.createElement("div", {
      id: "pdf-media-container"
    }, /*#__PURE__*/React.createElement(PdfDescription, {
      pdf_description: this.media_description
    }), the_counts, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("style", {
      scoped: true,
      dangerouslySetInnerHTML: {
        __html: clear_hover_css
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: this.clearAllFilters,
      style: pdf_clear_css,
      className: "pdf-clear CLEAR-TEXT"
    }, "Reset"), /*#__PURE__*/React.createElement("input", {
      onChange: this._onFilterChange,
      className: "TEXT-FILTER filter-text",
      value: this.filter_text,
      autoComplete: "off",
      placeholder: "Search ..."
    }), " ", match_message, /*#__PURE__*/React.createElement("style", {
      scoped: true,
      dangerouslySetInnerHTML: {
        __html: column_sort_css
      }
    }), /*#__PURE__*/React.createElement(PdfTitles, {
      cb_PdfComponent_titleSort: this._onSortChange
    }), /*#__PURE__*/React.createElement(PdfTable, {
      data: this.pdf_list,
      filter_text: this.filter_text,
      search_matches: my_searches,
      ref: "the_pdf_table",
      media_container_name: "pdf-media-container",
      site_url: this.site_url,
      search_columns: this.search_columns,
      displayed_columns: this.displayed_columns,
      sort_column: this.sort_column
    }), /*#__PURE__*/React.createElement("div", {
      className: "TEST-EPISODE-ORDER"
    }, this.TEST_EPISODE_ORDER));
  }

}

module.exports = PdfComponent;