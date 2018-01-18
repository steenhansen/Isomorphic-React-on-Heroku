"use strict"
var React = require('react')
var MediaTable = require('../MediaTable')
var FixedDataTable = require('fixed-data-table-2')
const {Column, Table} = FixedDataTable
var PodcastIdCell = require('./PodcastIdCell')
var PodcastTextCell = require('./PodcastTextCell')

class PodcastTable extends MediaTable {
    constructor(props) {
        super(props)
        this.media_container_name = props.media_container_name
    }

    _pass_lint_() {
        React
        Column
        PodcastIdCell
        PodcastTextCell
        Table
    }

    rowsMainCellWidth(table_width) {
      //  console.log('table_width=', table_width)
        if (table_width > 1370) {  
            var number_rows = 1
            var id_cell_width = 115      
        } else if (table_width > 750) {                      // podcast #274 has the most text
            var number_rows = 2
            var id_cell_width = 66   
        } else if (table_width > 410) {           // podcast #381 has the widest time 16:50:36              
            var number_rows = 3
            var id_cell_width =45   
        } else if (table_width > 332) {                       
            var number_rows = 4
            var id_cell_width = 45
        } else {
            var number_rows = 5
            var id_cell_width = 45
        }
        return {number_rows, id_cell_width}
    }

    render() {
        var {init_discarded_row_height, row_count, table_width, table_height, id_cell_width, text_cell_width } = this.state
        var row_count = this.props.data.getSize()

        return (
            <div>
                <Table rowHeight={init_discarded_row_height}
                       rowsCount={row_count}
                       headerHeight={0}
                       touchScrollEnabled={true}      
                       width={table_width}
                       height={table_height}
                       rowHeightGetter={this.getRowHeight}
                    {...this.props}>
                    <Column columnKey="podcast_id_column"
                            cell={<PodcastIdCell data={this.props.data}
                                             displayed_columns={this.displayed_columns['podcast_id_cell']}
                                             sort_column={this.props.sort_column} />}
                            flexGrow={1}
                            width={id_cell_width}/>
                    <Column columnKey="podcast_text_column"
                            cell={<PodcastTextCell data={this.props.data}
                                               filter_text={this.props.filter_text}
                                               search_matches={this.props.search_matches}
                                               search_columns={this.props.search_columns}
                                               displayed_columns={this.displayed_columns['podcast_text_cell']}
                                               sort_column={this.props.sort_column} />}
                            flexGrow={1}
                            width={text_cell_width}/>
                </Table>
            </div>
        )
    }


}

module.exports = PodcastTable

