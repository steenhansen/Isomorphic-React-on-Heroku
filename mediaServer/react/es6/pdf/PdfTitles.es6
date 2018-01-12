"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var react_constants = require('../reactConstants');
var React = require('react');

var PdfTitles = function (_React$Component) {
    _inherits(PdfTitles, _React$Component);

    function PdfTitles(props) {
        _classCallCheck(this, PdfTitles);

        var _this = _possibleConstructorReturn(this, (PdfTitles.__proto__ || Object.getPrototypeOf(PdfTitles)).call(this, props));

        _this.arrow_types = { '-1': react_constants.UP_ARROW_CHAR, '1': react_constants.DOWN_ARROW_CHAR };
        _this.title_texts = {
            "episode_number": 'Uploaded',
            "book author_": 'Author',
            "book title_": 'Title',
            "pdf page count 1": 'Pages'
        };
        _this.sort_directions = { "episode_number": 1, "book author_": 1, "book title_": 1, "pdf page count 1": 1 };

        _this.current_titles = [];
        _this.current_titles["episode_number"] = 'Uploaded' + _this.arrow_types[1];
        _this.resetAllSorts("episode_number");
        _this.clickEpisodeNumber = _this.clickEpisodeNumber.bind(_this);
        _this.clickBookAuthor = _this.clickBookAuthor.bind(_this);
        _this.clickBookTitle = _this.clickBookTitle.bind(_this);
        _this.clickPageCount = _this.clickPageCount.bind(_this);
        _this.state = { 'current_titles': _this.current_titles };
        return _this;
    }

    _createClass(PdfTitles, [{
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
        key: 'clickPageCount',
        value: function clickPageCount() {
            this.handleTitleClick('pdf page count 1');
        }
    }, {
        key: 'handleTitleClick',
        value: function handleTitleClick(column_name) {
            var sort_dir = this.sort_directions[column_name] * -1;
            this.sort_directions[column_name] = sort_dir;
            this.current_titles[column_name] = this.title_texts[column_name] + this.arrow_types[sort_dir];

            this.props.cb_PdfComponent_titleSort(column_name, sort_dir);
            this.resetAllSorts(column_name);
            this.setState({ 'current_titles': this.current_titles });
        }
    }, {
        key: 'render',
        value: function render() {
            var pdf_sort_css = { cursor: 'pointer', padding: 0, margin: 3 };
            var dark_blue = react_constants.SFF_DARK_BLUE;
            var light_blue = react_constants.SFF_LIGHT_BLUE;
            var sort_hover_css = ' .pdf-sort { color: #' + light_blue + '; font-size:1em }\n                     .pdf-sort:hover { color: #' + dark_blue + ' }          ';
            var _current_titles = this.current_titles,
                title_episode_number = _current_titles['episode_number'],
                title_book_author = _current_titles['book author_'],
                title_book_title = _current_titles['book title_'],
                title_page_count = _current_titles['pdf page count 1'];

            return React.createElement(
                'div',
                null,
                React.createElement('style', { scoped: true, dangerouslySetInnerHTML: { __html: sort_hover_css } }),
                React.createElement(
                    'button',
                    { className: 'EPISODE-SORT pdf-sort', onClick: this.clickEpisodeNumber,
                        style: pdf_sort_css },
                    title_episode_number
                ),
                React.createElement(
                    'button',
                    { className: 'TITLE-SORT pdf-sort', onClick: this.clickBookTitle,
                        style: pdf_sort_css },
                    title_book_title
                ),
                React.createElement(
                    'button',
                    { className: 'AUTHOR-SORT pdf-sort', onClick: this.clickBookAuthor,
                        style: pdf_sort_css },
                    title_book_author
                ),
                React.createElement(
                    'button',
                    { className: 'PAGE-SORT pdf-sort', onClick: this.clickPageCount,
                        style: pdf_sort_css },
                    title_page_count
                )
            );
            // UPPERCASE className is for testing!!   EPISODE-SORT
        }
    }]);

    return PdfTitles;
}(React.Component);

module.exports = PdfTitles;