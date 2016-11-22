"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var PdfTextCell = function (_MediaTextCell) {
    _inherits(PdfTextCell, _MediaTextCell);

    function PdfTextCell(props) {
        _classCallCheck(this, PdfTextCell);

        var _this = _possibleConstructorReturn(this, (PdfTextCell.__proto__ || Object.getPrototypeOf(PdfTextCell)).call(this, props));

        _this.site_url = props['site_url'];
        return _this;
    }

    _createClass(PdfTextCell, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            Cell;
            React;
        }
    }, {
        key: 'render',
        value: function render() {
            this.fixTheText();
            var _displayed_data = this.displayed_data;
            var wikipedia_story = _displayed_data['story link on wikipedia'];
            var wikipedia_author = _displayed_data['author wikipedia entry'];
            var book_author = _displayed_data["book author"];
            var book_title = _displayed_data["book title"];

            if (wikipedia_story) {
                var story_link = '   <a href="' + wikipedia_story + '" target="_blank" >' + book_title + '</a> ';
            } else {
                var story_link = book_title;
            }
            if (wikipedia_author) {
                var author_link = '   <a href="' + wikipedia_author + '" target="_blank" >' + book_author + '</a> ';
            } else {
                var author_link = book_author;
            }
            var my_description = ' ' + story_link + ' by ' + author_link + ' <br>';
            my_description = my_description + this.pdfLinks();
            return React.createElement(Cell, { className: 'PDF-STORY' }, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_description } }));
        }
    }, {
        key: 'pdfLinks',
        value: function pdfLinks() {
            var site_url = this.site_url;
            var pdf_descriptions = '';
            for (var i = 1; i <= 4; i++) {
                if (this.displayed_data["pdf link " + i]) {
                    var pdf_link = this.displayed_data["pdf link " + i];
                    var pdf_pages = this.displayed_data["pdf page count " + i];

                    var page_word = 'pages';
                    if (typeof pdf_pages === 'number') {
                        if (pdf_pages === 1) {
                            var page_word = 'page';
                        }
                    } else {
                        if (pdf_pages.indexOf('>1<') > -1) {
                            var page_word = 'page';
                        }
                    }
                    var pdf_info = this.displayed_data["pdf info " + i];
                    var pdf_country = this.displayed_data["pdf country " + i];
                    var lower_country = pdf_country.toLowerCase();
                    var flag_img = '';
                    if (lower_country.indexOf('canada') > -1) {
                        flag_img = ' <img src="' + site_url + 'ca.svg"  class="country-flag" >'; //  http://flag-icon-css.lip.is/?continent=North+America  
                    }

                    pdf_descriptions = pdf_descriptions + ('<div style="margin-left:22px"><a href="' + pdf_link + '" target="_blank">\n                                       <i class="my-pdf fa fa-file-pdf-o"></i> ' + flag_img + pdf_pages + ' ' + page_word + ' ' + pdf_info + ' </a> </div>  ');
                }
            }
            return pdf_descriptions;
        }
    }]);

    return PdfTextCell;
}(MediaTextCell);

module.exports = PdfTextCell;