"use strict"

var React = require('react')
var FixedDataTable = require('fixed-data-table-2')
const {Cell} = FixedDataTable


class RsdTextCell extends React.Component {

    constructor(props) {
        super(props)
        this.displayed_data = {}
    }


    _pass_lint_() {
        Cell
    }

    colorSortedText(displayed_columns, sort_column) {
        if (sort_column === 'book author_') {
            var first_name = this.displayed_data['first_name']
            var last_name = this.displayed_data['last_name']
            this.displayed_data['book author'] = `<span class="first-book-author">${first_name}</span> <span class="last-book-author">${last_name}</span>`
        } else if (sort_column === 'book title_') {
            var start_title = this.displayed_data['start_title']
            var end_title = this.displayed_data['end_title']
            this.displayed_data['book title'] = `<span class="start-book-title">${start_title}</span> <span class="end-book-title">${end_title}</span>`
        } else if (sort_column === 'hh:mm:ss') {
            var mm_ss = this.displayed_data['mm_ss']
            this.displayed_data['mm_ss'] = `<span class="sort-by-hh-mm-ss">${mm_ss}</span>`
        } else {
            for (let displayed_column of displayed_columns) {
                if (displayed_column === sort_column) {
                    var sort_hightlight = 'sort-by-' + sort_column
                    var plain_bold_text = this.displayed_data[displayed_column]
                    this.displayed_data[displayed_column] = `<span class="${sort_hightlight}">${plain_bold_text}</span>`
                }
            }
        }
    }

    boldSearchText(id, search_columns, search_matches, filter_text) {
        for (let search_column of search_columns) {
            var start_replace = search_matches[id][search_column]
            if (start_replace !== -1) {
                var plain_text = this.displayed_data[search_column]
                var end_replace = start_replace + filter_text.length
                var before_highlight = plain_text.substring(0, start_replace)
                var highlight_text = plain_text.substring(start_replace, end_replace)
                var after_highlight = plain_text.substring(end_replace)
                this.displayed_data[search_column] = `${before_highlight}<span class="search-highlight">${highlight_text}</span>${after_highlight}` // this should be some css
            }
        }
    }

    storyLink() {
        if (this.displayed_data['pdf link']) {
            var pdf_link = this.displayed_data['pdf link']
            var story_icon_link = ` <a href="${pdf_link}" target="_blank" >
                                       <i class="my-pdf fa fa-file-pdf-o"></i>
                                 </a>`
        } else if (this.displayed_data['video link']) {
            var youtube_link = this.displayed_data['video link']
            var story_icon_link = ` <a href="${youtube_link}" target="_blank" >
                                     <i class="my-you fa fa-youtube-play"></i>
                                 </a>`
        } else {
            story_icon_link = ''
        }
        return story_icon_link
    }

    render() {
        var {rowIndex, data,displayed_columns, sort_column,filter_text,search_columns, search_matches, ...rest_props} = this.props
        for (let displayed_column of displayed_columns) {
            this.displayed_data[displayed_column] = data.getObjectAt(rowIndex)[displayed_column]
        }
        if (filter_text !== '') {
            var id = data.getObjectAt(rowIndex)['_id']
            this.boldSearchText(id, search_columns, search_matches, filter_text)
        }
        if (sort_column !== '') {
            this.colorSortedText(displayed_columns, sort_column)
        }
        var pdf_link = this.storyLink()
        var {
            "book author": book_author,
            "book title": book_title,
            "genre type": genre_type,
            'post link':post_url
            } =  this.displayed_data
        if (genre_type === 'Story') {

            var genre_clip = `, a  story,`
        } else if (genre_type === 'Poem') {
            var genre_clip = `, a  poem,`
        } else {
            var genre_clip = ``
        }

        var my_description = `${book_title}${genre_clip} by ${book_author}.`
        var my_visible_text = `   <a href="${post_url}" target="_blank" >${my_description}</a> ${pdf_link} `
        return (
            <Cell {...rest_props}>
                <div dangerouslySetInnerHTML={{__html: my_visible_text}}/>
            </Cell>
        )
    }
}

module.exports = RsdTextCell