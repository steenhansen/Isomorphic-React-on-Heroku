"use strict";

var React = require('react');

var Option = require('../Option');

class GenreSelect extends React.Component {
  constructor(props) {
    super(props);
    this.className = this.props.className;
    this.selectByGenre = this.selectByGenre.bind(this); // <select onChange={this.selectByGenre}
  }

  _pass_lint_() {
    Option;
  }

  selectByGenre(event) {
    var select_text = event.target.value;
    this.props.cb_RsdComponent_filterByGenre(select_text);
  }

  render() {
    var select_class_name = this.className;
    return /*#__PURE__*/React.createElement("select", {
      onChange: this.selectByGenre,
      className: select_class_name,
      value: this.props.category_choice
    }, /*#__PURE__*/React.createElement(Option, {
      category: "All Genres",
      hidden_category: "",
      key: "genre_all"
    }), /*#__PURE__*/React.createElement(Option, {
      category: "Poem",
      hidden_category: "poem",
      key: "genre_poem"
    }), /*#__PURE__*/React.createElement(Option, {
      category: "Story",
      hidden_category: "story",
      key: "genre_story"
    }), /*#__PURE__*/React.createElement(Option, {
      category: "Other",
      hidden_category: "other",
      key: "genre_other"
    }));
  }

}

module.exports = GenreSelect;