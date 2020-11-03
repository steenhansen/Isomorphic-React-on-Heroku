"use strict";

var react_constants = require('../reactConstants');
var React = require('react');


class PdfTitles extends React.Component {
    constructor(props) {
        super(props);
        this.arrow_types = {'-1': react_constants.UP_ARROW_CHAR, '1': react_constants.DOWN_ARROW_CHAR};
        this.title_texts = {
            "episode_number": 'Uploaded',
            "book author_": 'Author',
            "book title_": 'Title',
            "pdf page count 1": 'Pages',
        };
        this.sort_directions = {"episode_number": 1, "book author_": 1, "book title_": 1, "pdf page count 1":1};

        this.current_titles = [];
        this.current_titles["episode_number"] = 'Uploaded' + this.arrow_types[1];
        this.resetAllSorts("episode_number");
        this.clickEpisodeNumber = this.clickEpisodeNumber.bind(this);
        this.clickBookAuthor = this.clickBookAuthor.bind(this);
        this.clickBookTitle = this.clickBookTitle.bind(this);
        this.clickPageCount = this.clickPageCount.bind(this);
        this.state = {'current_titles': this.current_titles};
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
    clickPageCount() {
        this.handleTitleClick('pdf page count 1');
    }


    handleTitleClick(column_name) {
        var sort_dir = this.sort_directions[column_name] * -1;
        this.sort_directions[column_name] = sort_dir;
        this.current_titles[column_name] = this.title_texts[column_name] + this.arrow_types[sort_dir];

        this.props.cb_PdfComponent_titleSort(column_name, sort_dir);
        this.resetAllSorts(column_name);
        this.setState({'current_titles': this.current_titles});
    }

    render() {
        var pdf_sort_css = {cursor: 'pointer', padding: 0, margin: 3};
        var dark_blue = react_constants.SFF_DARK_BLUE;
        var light_blue = react_constants.SFF_LIGHT_BLUE;
        var sort_hover_css = ` .pdf-sort { color: #${light_blue}; font-size:1em }
                     .pdf-sort:hover { color: #${dark_blue} }          `;
          var {'episode_number': title_episode_number,
            'book author_': title_book_author,
            'book title_': title_book_title,
            'pdf page count 1': title_page_count } = this.current_titles;
        return (
            <div >
                <style scoped dangerouslySetInnerHTML={{__html: sort_hover_css}}/>
                <button className="EPISODE-SORT pdf-sort" onClick={this.clickEpisodeNumber}
                        style={pdf_sort_css}>{title_episode_number}</button>
                 <button className="TITLE-SORT pdf-sort" onClick={this.clickBookTitle}
                        style={pdf_sort_css}>{title_book_title}</button>
                <button className="AUTHOR-SORT pdf-sort" onClick={this.clickBookAuthor}
                        style={pdf_sort_css}>{title_book_author}</button>
                <button className="PAGE-SORT pdf-sort" onClick={this.clickPageCount}
                        style={pdf_sort_css}>{title_page_count}</button>
            </div>
        );
        // UPPERCASE className is for testing!!   EPISODE-SORT
    }
}


module.exports = PdfTitles;

