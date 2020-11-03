"use strict";

var react_constants = require('../reactConstants');

var React = require('react');

class RsdTitles extends React.Component {
  constructor(props) {
    super(props);
    this.arrow_types = {
      '-1': react_constants.UP_ARROW_CHAR,
      '1': react_constants.DOWN_ARROW_CHAR
    };
    this.title_texts = {
      "episode_number": 'Episode',
      "book author_": 'Author',
      "book title_": 'Title',
      "hh:mm:ss": "Length"
    };
    this.sort_directions = {
      "episode_number": 1,
      "book author_": 1,
      "book title_": 1,
      "hh:mm:ss": 1
    };
    this.current_titles = [];
    this.current_titles["episode_number"] = 'Episode ' + this.arrow_types[1];
    this.resetAllSorts("episode_number");
    this.clickEpisodeNumber = this.clickEpisodeNumber.bind(this);
    this.clickBookAuthor = this.clickBookAuthor.bind(this);
    this.clickBookTitle = this.clickBookTitle.bind(this);
    this.clickHhMmSs = this.clickHhMmSs.bind(this);
    this.state = {
      'current_titles': this.current_titles
    };
  }

  resetAllSorts(active_column) {
    for (var key in this.sort_directions) {
      if (key !== active_column) {
        this.current_titles[key] = this.title_texts[key] + ' ' + this.arrow_types[-1] + this.arrow_types[1];
      }
    }
  }

  clickEpisodeNumber() {
    this.handleTitleClick('episode_number');
  }

  clickBookAuthor() {
    this.handleTitleClick('book author_');
  }

  clickBookTitle() {
    this.handleTitleClick('book title_');
  }

  clickHhMmSs() {
    this.handleTitleClick('hh:mm:ss');
  }

  handleTitleClick(column_name) {
    var sort_dir = this.sort_directions[column_name] * -1;
    this.sort_directions[column_name] = sort_dir;
    this.current_titles[column_name] = this.title_texts[column_name] + this.arrow_types[sort_dir];
    this.props.cb_RsdComponent_titleSort(column_name, sort_dir);
    this.resetAllSorts(column_name);
    this.setState({
      'current_titles': this.current_titles
    });
  }

  render() {
    var rsd_sort_css = {
      cursor: 'pointer',
      padding: 0,
      margin: 3
    };
    var dark_blue = react_constants.SFF_DARK_BLUE;
    var light_blue = react_constants.SFF_LIGHT_BLUE;
    var sort_hover_css = ` .rsd-sort { color: #${light_blue}; font-size:1em }
                     .rsd-sort:hover { color: #${dark_blue} }          `;
    var {
      'episode_number': title_episode_number,
      'book author_': title_book_author,
      'book title_': title_book_title,
      'hh:mm:ss': title_hh_mm_ss
    } = this.current_titles;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("style", {
      scoped: true,
      dangerouslySetInnerHTML: {
        __html: sort_hover_css
      }
    }), /*#__PURE__*/React.createElement("button", {
      className: "EPISODE-SORT rsd-sort",
      onClick: this.clickEpisodeNumber,
      style: rsd_sort_css
    }, title_episode_number), /*#__PURE__*/React.createElement("button", {
      className: "TIME-SORT rsd-sort",
      onClick: this.clickHhMmSs,
      style: rsd_sort_css
    }, title_hh_mm_ss), /*#__PURE__*/React.createElement("button", {
      className: "TITLE-SORT rsd-sort",
      onClick: this.clickBookTitle,
      style: rsd_sort_css
    }, title_book_title), /*#__PURE__*/React.createElement("button", {
      className: "AUTHOR-SORT rsd-sort",
      onClick: this.clickBookAuthor,
      style: rsd_sort_css
    }, title_book_author)); // UPPERCASE className is for testing!!   EPISODE-SORT
  }

}

module.exports = RsdTitles;