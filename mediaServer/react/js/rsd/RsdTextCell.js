"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var FixedDataTable = require('fixed-data-table-2');
var Cell = FixedDataTable.Cell;

var MediaTextCell = require('../MediaTextCell');
var React = require('react');

var RsdTextCell = function (_MediaTextCell) {
    _inherits(RsdTextCell, _MediaTextCell);

    function RsdTextCell(props) {
        _classCallCheck(this, RsdTextCell);

        return _possibleConstructorReturn(this, (RsdTextCell.__proto__ || Object.getPrototypeOf(RsdTextCell)).call(this, props));
    }

    _createClass(RsdTextCell, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            Cell;
            React;
        }
    }, {
        key: 'storyLink',
        value: function storyLink() {
            if (this.displayed_data['pdf link']) {
                var pdf_link = this.displayed_data['pdf link'];
                var story_icon_link = ' <a href="' + pdf_link + '" target="_blank" >\n                                       <i class="my-pdf fa fa-file-pdf-o"></i>\n                                 </a>';
            } else if (this.displayed_data['video link']) {
                var youtube_link = this.displayed_data['video link'];
                var story_icon_link = ' <a href="' + youtube_link + '" target="_blank" >\n                                     <i class="my-you fa fa-youtube-play"></i>\n                                 </a>';
            } else {
                story_icon_link = '';
            }
            return story_icon_link;
        }
    }, {
        key: 'render',
        value: function render() {
            this.fixTheText();
            var pdf_link = this.storyLink();
            var _displayed_data = this.displayed_data,
                book_author = _displayed_data["book author"],
                book_title = _displayed_data["book title"],
                genre_type = _displayed_data["genre type"],
                post_url = _displayed_data['post link'];

            if (genre_type === 'Story') {
                var genre_clip = ', a  story,';
            } else if (genre_type === 'Poem') {
                var genre_clip = ', a  poem,';
            } else {
                var genre_clip = '';
            }

            var my_description = '' + book_title + genre_clip + ' by ' + book_author + '.';
            var my_visible_text = '   <a href="' + post_url + '" target="_blank" >' + my_description + '</a> ' + pdf_link + ' ';
            return React.createElement(Cell, null, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } }));
        }
    }]);

    return RsdTextCell;
}(MediaTextCell);

module.exports = RsdTextCell;