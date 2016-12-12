"use strict"
var React = require('react')
var MediaTable = require('../MediaTable')
var FixedDataTable = require('fixed-data-table-2')
const {Column, Table} = FixedDataTable

var PdfTextCell = require('./PdfTextCell')
var react_constants = require('../reactConstants')

class PdfTable extends MediaTable {
    constructor(props) {
        super(props)
        this.site_url = props['site_url']
        this.media_container_name = props.media_container_name
    }

    _pass_lint_() {
        React
        Column
        PdfIdCell
        PdfTextCell
        Table
    }

    rowsMainCellWidth() {
        var id_cell_width = 0
        var number_rows = 5
         this.number_rows = number_rows
        return {number_rows, id_cell_width}
    }


    render() {
        var {row_count, table_width, table_height, text_cell_width } = this.state
        var row_count = this.props.data.getSize()
         var row_height = react_constants.TABLE_UI_LINE_HEIGHT*this.number_rows
        return (
            <div>
                <Table rowHeight={row_height}
                       rowsCount={row_count}
                       headerHeight={0}
                       touchScrollEnabled={true}
                       width={table_width}
                       height={table_height}
                       rowHeightGetter={this.getRowHeight}
                    {...this.props}>
                    <Column columnKey="pdf_text_column"
                            cell={<PdfTextCell data={this.props.data}
                                               filter_text={this.props.filter_text}
                                               search_matches={this.props.search_matches}
                                               search_columns={this.props.search_columns}
                                                 site_url={this.site_url}
                                               displayed_columns={this.displayed_columns['pdf_text_cell']}
                                               sort_column={this.props.sort_column} />}
                            flexGrow={1}
                            width={text_cell_width}/>
                </Table>
            </div>
        )
    }


}

module.exports = PdfTable

