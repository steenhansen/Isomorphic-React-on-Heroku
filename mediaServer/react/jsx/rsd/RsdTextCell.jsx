"use strict"

var FixedDataTable = require('fixed-data-table-2')
const {Cell} = FixedDataTable
var MediaTextCell = require('../MediaTextCell')
var React = require('react')
class RsdTextCell extends MediaTextCell {

    constructor(props) {
        super(props)
    }

    _pass_lint_() {
        Cell
        React
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
          this.fixTheText()
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
            <Cell >
                <div dangerouslySetInnerHTML={{__html: my_visible_text}}/>
            </Cell>
        )
    }
}

module.exports = RsdTextCell
