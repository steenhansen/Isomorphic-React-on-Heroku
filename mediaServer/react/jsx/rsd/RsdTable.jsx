"use strict";
var React = require('react');
var MediaTable = require('../MediaTable');
var FixedDataTable = require('fixed-data-table-2');
const {Column, Table} = FixedDataTable;
var RsdIdCell = require('./RsdIdCell');
var RsdTextCell = require('./RsdTextCell');
var react_constants = require('../reactConstants');

class RsdTable extends MediaTable {
    constructor(props) {
        super(props);
        this.media_container_name = props.media_container_name;
    }

    _pass_lint_() {
        React;
        Column;
        RsdIdCell;
        RsdTextCell;
        Table;
    }

    rowsMainCellWidth(table_width) {
        if (table_width > 580) {
            var number_rows = 1;
            var id_cell_width = 116;  // 122;;   //110;  // q*bert
        } else if (table_width > 340) {                          // podcast check #4
            var number_rows = 2.5;
            var id_cell_width = 66;   
        } else {
            var number_rows = 3;
            var id_cell_width = 45; 
        }
          this.number_rows = number_rows;
        return {number_rows, id_cell_width};
    }

    render() {
       // var {row_count, table_width, table_height, id_cell_width, text_cell_width } = this.state          // q*bert
        var {table_width, table_height, id_cell_width, text_cell_width } = this.state;

        this.rowsMainCellWidth(table_width);
        
        var row_count = this.props.data.getSize();
                var row_height = react_constants.TABLE_UI_LINE_HEIGHT*this.number_rows;
        return (
            <div>
                <Table   ref={"media_table_focus"}
                                rowHeight={row_height}
                       rowsCount={row_count}
                       headerHeight={0}
                       stopReactWheelPropagation={true} 
                       keyboardScrollEnabled={true}   
                       keyboardPageEnabled={true} 
                       touchScrollEnabled={true}  
                       width={table_width}
                       height={table_height}
                       rowHeightGetter={this.getRowHeight}
                    {...this.props}>
                    <Column columnKey="rsd_id_column"
                            cell={<RsdIdCell data={this.props.data}
                                             displayed_columns={this.displayed_columns['rsd_id_cell']}
                                             tableGetsFocus={this.tableGetsFocus}
                                             sort_column={this.props.sort_column} />}
                            flexGrow={1}
                            width={id_cell_width}/>
                    <Column columnKey="rsd_text_column"
                            cell={<RsdTextCell data={this.props.data}
                                               filter_text={this.props.filter_text}
                                               search_matches={this.props.search_matches}
                                               search_columns={this.props.search_columns}
                                               displayed_columns={this.displayed_columns['rsd_text_cell']}
                                               tableGetsFocus={this.tableGetsFocus}
                                               sort_column={this.props.sort_column} />}
                            flexGrow={1}
                            width={text_cell_width}/>
                </Table>
            </div>
        );
    }


}

module.exports = RsdTable;

