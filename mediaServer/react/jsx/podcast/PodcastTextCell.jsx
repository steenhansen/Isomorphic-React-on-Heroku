"use strict";

var FixedDataTable = require('fixed-data-table-2');
const {Cell} = FixedDataTable;
var MediaTextCell = require('../MediaTextCell');
var React = require('react');

class PodcastTextCell extends MediaTextCell {

    constructor(props) {
        super(props);
    }

    _pass_lint_() {
        Cell;
        React;
    }

    description_kind() {

        let {
            about,
            narrator,
            participants,
            kind,
            "book author": book_author,
            "book title": book_title
            } =  this.displayed_data;

        switch (kind) {
            case "AUDIOBOOK":
                var kind_description = `${book_title} by ${book_author}, an audiobook, narrated by ${narrator}`;
                break;
            case "AUDIOBOOK/READALONG":
                var kind_description = `${book_title} by ${book_author}, an audiobook/readalong, narrated by ${narrator}, with ${participants}`;
                break;
            case "NEW RELEASES/RECENT ARRIVALS":
                var kind_description = `New releases/recent arrivals with ${participants}`;
                break;
            case "READALONG":
                var kind_description = `${book_title} by ${book_author}, a readalong, with ${participants}`;
                break;
            case "TALK TO":
                var kind_description = about;
                break;
            case "TOPIC":
                var kind_description = `${about} with ${participants}`;
                break;
            default:
                var kind_description = '';
        }

        kind_description = kind_description + '.';
        return kind_description;
    }
  

    render() {
        this.fixTheText();
        let kind_description = this.description_kind();
        let post_url = this.displayed_data['post_link'];
        var my_visible_text = `<a href="${post_url}" target="_blank" >${kind_description}</a>`;
        return (
            <Cell onMouseEnter={this.props.tableGetsFocus}> 
                <div dangerouslySetInnerHTML={{__html: my_visible_text}}/>
            </Cell>
        );
    }
}

module.exports = PodcastTextCell;
