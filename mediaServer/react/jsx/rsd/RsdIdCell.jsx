"use strict"

var React = require('react')
var FixedDataTable = require('fixed-data-table-2')
const {Cell} = FixedDataTable

class RsdIdCell extends React.Component {

    constructor(props) {
        super(props)
        this.displayed_data = {}
    }

    _pass_lint_() {
        Cell
    }

    colorSortedText(displayed_columns, sort_column) {
        if (sort_column === 'hh:mm:ss') {
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

    mp3Link() {
        var mp3_file = 'http://www.coquitlamwebsolutions.ca/rsd/' + this.displayed_data['file name']
        var mp3_link = ` <a href="${mp3_file}" target="_blank" >
                                   <i class="my-mp3 fa fa-volume-up"></i>
                         </a>`
        return mp3_link
    }

    render() {
        var {rowIndex, data,displayed_columns, sort_column, ...rest_props} = this.props
        for (let displayed_column of displayed_columns) {
            this.displayed_data[displayed_column] = data.getObjectAt(rowIndex)[displayed_column]
        }
        if (sort_column !== '') {
            this.colorSortedText(displayed_columns, sort_column)
        }
        var mp3_link = this.mp3Link()
        var { "episode_number": episode_number,
            'mm_ss':mm_ss   } =  this.displayed_data

        var my_visible_text = ` #${episode_number}  ${mp3_link}   ${mm_ss} `
        return (
            <Cell {...rest_props} className="RSD-EPISODE">
                <div dangerouslySetInnerHTML={{__html: my_visible_text}}/>
            </Cell>
        )
    }
}

module.exports = RsdIdCell