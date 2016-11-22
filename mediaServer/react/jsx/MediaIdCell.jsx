"use strict"

var React = require('react')
var FixedDataTable = require('fixed-data-table-2')
const {Cell} = FixedDataTable

class MediaIdCell extends React.Component {

    constructor(props) {
        super(props)
        this.displayed_data = {}
    }

    _pass_lint_() {
        Cell
    }

    colorSortedText(displayed_columns, sort_column) {
        if (sort_column === 'hh:mm:ss') {
            var hh_mm = this.displayed_data['hh_mm']
            this.displayed_data['hh_mm'] = `<span class="sort-by-hh-mm-ss">${hh_mm}</span>`
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

    mp3Link(mp3_url) {
        var mp3_link = `<a href="${mp3_url}" target="_blank"><i class="my-mp3 fa fa-volume-up"></i></a>`
        return mp3_link
    }

    deriveEpisodeM3MmSS(){
          var {rowIndex, data,displayed_columns, sort_column} = this.props
        for (let displayed_column of displayed_columns) {
            this.displayed_data[displayed_column] = data.getObjectAt(rowIndex)[displayed_column]
        }
        if (sort_column !== '') {
            this.colorSortedText(displayed_columns, sort_column)
        }

        var {episode_number, hh_mm, mp3_url} =  this.displayed_data
        var mp3_link = this.mp3Link(mp3_url)
        var my_visible_text = ` #${episode_number} ${mp3_link} ${hh_mm} `
        return my_visible_text
    }

}

module.exports = MediaIdCell
