"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FixedDataTable = require('fixed-data-table-2');
var Cell = FixedDataTable.Cell;

var MediaTextCell = require('../MediaTextCell');
var React = require('react');

var PodcastTextCell = function (_MediaTextCell) {
    _inherits(PodcastTextCell, _MediaTextCell);

    function PodcastTextCell(props) {
        _classCallCheck(this, PodcastTextCell);

        return _possibleConstructorReturn(this, (PodcastTextCell.__proto__ || Object.getPrototypeOf(PodcastTextCell)).call(this, props));
    }

    _createClass(PodcastTextCell, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            Cell;
            React;
        }
    }, {
        key: 'description_kind',
        value: function description_kind() {
            var _displayed_data = this.displayed_data,
                about = _displayed_data.about,
                narrator = _displayed_data.narrator,
                participants = _displayed_data.participants,
                kind = _displayed_data.kind,
                book_author = _displayed_data["book author"],
                book_title = _displayed_data["book title"];


            switch (kind) {
                case "AUDIOBOOK":
                    var kind_description = book_title + ' by ' + book_author + ', an audiobook, narrated by ' + narrator;
                    break;
                case "AUDIOBOOK/READALONG":
                    var kind_description = book_title + ' by ' + book_author + ', an audiobook/readalong, narrated by ' + narrator + ', with ' + participants;
                    break;
                case "NEW RELEASES/RECENT ARRIVALS":
                    var kind_description = 'New releases/recent arrivals with ' + participants;
                    break;
                case "READALONG":
                    var kind_description = book_title + ' by ' + book_author + ', a readalong, with ' + participants;
                    break;
                case "TALK TO":
                    var kind_description = about;
                    break;
                case "TOPIC":
                    var kind_description = about + ' with ' + participants;
                    break;
                default:
                    var kind_description = '';
            }

            kind_description = kind_description + '.';
            return kind_description;
        }
    }, {
        key: 'render',
        value: function render() {
            this.fixTheText();
            var kind_description = this.description_kind();
            var post_url = this.displayed_data['post_link'];
            var my_visible_text = '<a href="' + post_url + '" target="_blank" >' + kind_description + '</a>';
            return React.createElement(
                Cell,
                null,
                React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } })
            );
        }
    }]);

    return PodcastTextCell;
}(MediaTextCell);

module.exports = PodcastTextCell;