"use strict";

var FixedDataTable = require('fixed-data-table-2');
const {Cell} = FixedDataTable;
var MediaTextCell = require('../MediaTextCell');
var React = require('react');


class PdfTextCell extends MediaTextCell {

    constructor(props) {
        super(props);
        this.site_url = props['site_url'];
    }

    _pass_lint_() {
        Cell;
        React;
    }


    render() {
        this.fixTheText();
        var {
            'story link on wikipedia': wikipedia_story,
            'author wikipedia entry': wikipedia_author,
            "book author": book_author,
            "book title": book_title
            } =  this.displayed_data;
        if (wikipedia_story) {
            var story_link = `   <a href="${wikipedia_story}" target="_blank" >${book_title}</a> `;
        } else {
            var story_link = book_title;
        }
        if (wikipedia_author) {
            var author_link = `   <a href="${wikipedia_author}" target="_blank" >${book_author}</a> `;
        } else {
            var author_link = book_author;
        }
        var my_description = ` ${story_link} by ${author_link} <br>`;
        my_description = my_description + this.pdfLinks();
        return (
            <Cell className="PDF-STORY" onMouseEnter={this.props.tableGetsFocus}>
                <div dangerouslySetInnerHTML={{__html: my_description}}/>
            </Cell>
        );
    }

    pdfLinks() {
        let site_url = this.site_url;
        let pdf_descriptions = '';
        for (var i = 1; i <= 4; i++) {
            if (this.displayed_data["pdf link " + i]) {
                let pdf_link = this.displayed_data["pdf link " + i];
                let pdf_pages = this.displayed_data["pdf page count " + i];

                var page_word = 'pages';
                if (typeof pdf_pages === 'number') {
                    if (pdf_pages === 1) {
                        page_word = 'page';
                    }
                } else {
                    if (pdf_pages.indexOf('>1<') > -1) {
                        page_word = 'page';
                    }
                }
                let pdf_info = this.displayed_data["pdf info " + i];
                let pdf_country = this.displayed_data["pdf country " + i];
                let lower_country = pdf_country.toLowerCase();
                let flag_img = '';
                if (lower_country.indexOf('canada') > -1) {
                    flag_img = ` <img src="${site_url}ca.svg"  class="country-flag" >`;            //  http://flag-icon-css.lip.is/?continent=North+America  
                }

                pdf_descriptions = pdf_descriptions + `<div style="margin-left:22px"><a href="${pdf_link}" target="_blank">
                                       <i class="my-pdf fa fa-file-pdf-o"></i> ${flag_img}${pdf_pages} ${page_word} ${pdf_info} </a> </div>  `;
            }
        }
        return pdf_descriptions;
    }


}

module.exports = PdfTextCell;
