"use strict";

var react_constants = require('../reactConstants');

var RsdTable = require('./RsdTable');

var RsdList = require('./RsdList');

var MediaComponent = require('../MediaComponent');

var GenreSelect = require('./GenreSelect');

var RsdTitles = require('./RsdTitles');

var RsdDescription = require('./RsdDescription');

var React = require('react');

class RsdComponent extends MediaComponent {
  _pass_lint_() {
    React;
    RsdTable;
    GenreSelect;
    RsdTitles;
    RsdDescription;
  }

  constructor(props) {
    super(props);
    this.search_columns = ['episode_number', 'book author', 'book title'];
    var props_array = props['data_list'];
    this.rsd_list = new RsdList(props_array, this.search_columns);
    this.genre_choice_filter = '';
    this.displayed_columns = {
      'rsd_id_cell': ['episode_number', 'hh_mm', 'mp3_url'],
      'rsd_text_cell': ['episode_number', 'book author', 'first_name', 'last_name', 'book title', 'start_title', 'end_title', 'hh:mm:ss', 'hh_mm', 'post link', 'file name', 'genre type', 'pdf link', 'video link']
    };
    this.rsd_list.initialOrder();
    this.state = {
      associated_rsd_list: this.rsd_list
    };
    this.filterByGenre = this.filterByGenre.bind(this); // <GenreSelect cb_RsdComponent_filterByGenre={this.filterByGenre}
  }

  changeGrid(changed_data) {
    this.saveRestrictions(changed_data);
    var sortIndexes = this.rsd_list.initialOrder();

    if (this.genre_choice_filter !== '') {
      sortIndexes = this.rsd_list.selectDataSet(this.genre_choice_filter, sortIndexes);
    }

    if (this.filter_text === '') {
      this.search_matches = {};
    } else {
      var {
        filteredIndexes,
        search_matches
      } = this.rsd_list.filterDataSet(this.filter_text, sortIndexes);
      sortIndexes = filteredIndexes;
      this.search_matches = search_matches;
    }

    if (this.sort_column !== '') {
      sortIndexes = this.rsd_list.sortIndexesByColumn(this.sort_column, this.sort_dir, sortIndexes);
    }

    var indexes_as_str = '';

    if (this.record_cell_order_testing) {
      for (var an_index of sortIndexes) {
        indexes_as_str += ',' + an_index;
      }
    }

    this.TEST_EPISODE_ORDER = indexes_as_str;
    this.rsd_list.currentMap(sortIndexes);
    this.setState({
      associated_rsd_list: this.rsd_list,
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

  clearAllFilters() {
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

  _cssGeneration() {
    var dark_blue = react_constants.SFF_DARK_BLUE;
    var column_sort_css = `
      .sort-by-episode_number { color: #${dark_blue}; font-weight: bold; }
      .sort-by-hh-mm-ss       { color: #${dark_blue}; font-weight: bold; }
      .search-highlight       { color: #${dark_blue}; font-weight: bold; }

      .first-book-author      { color: #${dark_blue}; font-weight: bold; }
      .last-book-author       { color: #${dark_blue}; font-weight: bold; font-size: 120%; }

      .start-book-title       { color: #${dark_blue}; font-weight: bold; }
      .end-book-title         { color: #${dark_blue}; font-weight: bold; font-size: 120%; }

       `;
    return column_sort_css;
  }

  filterByGenre(genre_choice_filter) {
    var changed_data = {
      genre_choice_filter: genre_choice_filter
    };
    this.number_matches = this.changeGrid(changed_data);
  }

  render() {
    var {
      rsd_clear_css,
      clear_hover_css,
      column_sort_css
    } = this.generateCss();
    var my_searches = this.search_matches;
    let match_message = this.numberMatchesShort();
    return /*#__PURE__*/React.createElement("div", {
      id: "rsd-media-container"
    }, /*#__PURE__*/React.createElement(RsdDescription, {
      rsd_description: this.media_description
    }), /*#__PURE__*/React.createElement("style", {
      scoped: true,
      dangerouslySetInnerHTML: {
        __html: clear_hover_css
      }
    }), /*#__PURE__*/React.createElement("button", {
      onClick: this.clearAllFilters,
      style: rsd_clear_css,
      className: "rsd-clear CLEAR-TEXT"
    }, "Reset"), /*#__PURE__*/React.createElement("input", {
      onChange: this._onFilterChange,
      className: "TEXT-FILTER filter-text",
      value: this.filter_text,
      autoComplete: "off",
      placeholder: "Search ..."
    }), "     ", match_message, /*#__PURE__*/React.createElement(GenreSelect, {
      cb_RsdComponent_filterByGenre: this.filterByGenre,
      className: "RSD-SELECT",
      category_choice: this.genre_choice_filter
    }), /*#__PURE__*/React.createElement("style", {
      scoped: true,
      dangerouslySetInnerHTML: {
        __html: column_sort_css
      }
    }), /*#__PURE__*/React.createElement(RsdTitles, {
      cb_RsdComponent_titleSort: this._onSortChange
    }), /*#__PURE__*/React.createElement(RsdTable, {
      data: this.rsd_list,
      filter_text: this.filter_text,
      search_matches: my_searches,
      ref: "the_rsd_table",
      media_container_name: "rsd-media-container",
      search_columns: this.search_columns,
      displayed_columns: this.displayed_columns,
      sort_column: this.sort_column
    }), /*#__PURE__*/React.createElement("div", {
      className: "TEST-EPISODE-ORDER"
    }, this.TEST_EPISODE_ORDER));
  }

}

module.exports = RsdComponent;