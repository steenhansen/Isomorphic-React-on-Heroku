"use strict"
var React = require('react')
var MediaTable = require('../MediaTable')
var FixedDataTable = require('fixed-data-table-2')
const {Column, Table} = FixedDataTable
var RsdIdCell = require('./RsdIdCell')
var RsdTextCell = require('./RsdTextCell')

class RsdTable extends MediaTable {
    constructor(props) {
        super(props)


        this.ICONS_CELL_MIN_WIDTH = 60
        this.ICONS_CELL_MAX_WIDTH = 130

        this.WIDTH_ADJUST_FACTOR_1 = 4.83
        this.WIDTH_ADJUST_FACTOR_2 = 12.5

        this.EXTRA_WIDTH_STOP_SCROLL = 5


        this.HEIGHT_ADJUST_FACTOR_1 = 1.29
        this.HEIGHT_ADJUST_FACTOR_2 = 12

        this.HEIGHT_ROW_DIVISOR = 166

        this.TALLEST_SKINNY_ROW = 90        // height of rows for mobile with very tall thin columns of stacked content

       this.MOBILE_SMALLEST_TABLE_WIDTH = 320
    //   this.LARGEST_TABLE_WIDTH_SFFAUDIO = 570

    //  this.TEST_first_WIDTH_width_fudge_factor()
   //   this.TEST_second_WIDTH_componentWidthResize()
       //this.TEST_third_HEIGHT_height_row_divisor()
    //    this.TEST_fourth_HEIGHT_height_fudge_factor()     // redo third and fourth tests until no more changing...
 //       this.TEST_fifth_HEIGHT_componentHeightResize()

    }

    _pass_lint_() {
        React
        Column
        RsdIdCell
        RsdTextCell
        Table
    }

    render() {
        var {init_discarded_row_height, row_count, table_width, table_height, id_cell_width, text_cell_width } = this.state
        var row_count = this.props.data.getSize()

            if (this.device_type==='desktop_device'){
                var show_scroll_bar = true
            }else{
                var show_scroll_bar = false
            }

        return (
            <div>
                <Table rowHeight={init_discarded_row_height}
                       rowsCount={row_count}
                       headerHeight={0}

                       showScrollbarY={show_scroll_bar}

                       width={table_width}
                       height={table_height}
                       rowHeightGetter={this.getRowHeight}
                    {...this.props}>
                    <Column columnKey="rsd_id_column"
                            cell={<RsdIdCell data={this.props.data}
                                             displayed_columns={this.displayed_columns['rsd_id_cell']}
                                             sort_column={this.props.sort_column} />}
                            flexGrow={1}
                            width={id_cell_width}/>
                    <Column columnKey="rsd_text_column"
                            cell={<RsdTextCell data={this.props.data}
                                               filter_text={this.props.filter_text}
                                               search_matches={this.props.search_matches}
                                               search_columns={this.props.search_columns}
                                               displayed_columns={this.displayed_columns['rsd_text_cell']}
                                               sort_column={this.props.sort_column} />}
                            flexGrow={1}
                            width={text_cell_width}/>
                </Table>
            </div>
        )
    }



/*

    TEST_third_HEIGHT_height_row_divisor() {
        console.log('TEST_third_HEIGHT_height_row_divisor - idea is to find best HEIGHT_ROW_DIVISOR with smallest skinny/fat differences')
        console.log('Look for min/max difference closest to 0, and then use the corresponding height_row_divisor for HEIGHT_ROW_DIVISOR')
        var HEIGHT_ADJUST_FACTOR_1 = this.HEIGHT_ADJUST_FACTOR_1
        var HEIGHT_ADJUST_FACTOR_2 = this.HEIGHT_ADJUST_FACTOR_2

        var min_component_width = this.MOBILE_SMALLEST_TABLE_WIDTH+1
        var max_component_width = this.LARGEST_TABLE_WIDTH_SFFAUDIO-1

        for (var height_row_divisor = 150; height_row_divisor < 255; height_row_divisor += 1) {  // currently 300
            var skinny_row_height = this.deriveRowHeight(min_component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
            var skinny_difference = this.TALLEST_SKINNY_ROW - skinny_row_height
            console.log('TEST_third_HEIGHT_height_row_divisor - MIN', 'height_row_divisor=', height_row_divisor, 'skinny_difference=', skinny_difference)

            var fat_row_height = this.deriveRowHeight(max_component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
            var fat_difference = this.SINGLE_LINE_HEIGHT - fat_row_height
            console.log('TEST_third_HEIGHT_height_row_divisor - MAX', 'height_row_divisor=', height_row_divisor, 'fat_difference=', fat_difference)
        }
    }

    TEST_fourth_HEIGHT_height_fudge_factor() {
        console.log('TEST_fourth_HEIGHT_height_fudge_factor - idea is to find best HEIGHT_ADJUST_FACTOR_1 with smallest skinny/fat differences')
        console.log('Look for min/max difference closest to 0, and then use the corresponding HEIGHT_ADJUST_FACTOR_1 for HEIGHT_ADJUST_FACTOR_1')
        console.log('')
        console.log('REDO TEST_third_HEIGHT_height_row_divisor until there is no more changing, before moving onto fifth test')
        console.log('')

        var min_component_width =  this.MOBILE_SMALLEST_TABLE_WIDTH+1
        var max_component_width = this.LARGEST_TABLE_WIDTH_SFFAUDIO-1
        var height_row_divisor = this.HEIGHT_ROW_DIVISOR
        var HEIGHT_ADJUST_FACTOR_2 = this.HEIGHT_ADJUST_FACTOR_2
        for (var HEIGHT_ADJUST_FACTOR_1 = 1; HEIGHT_ADJUST_FACTOR_1 < 5; HEIGHT_ADJUST_FACTOR_1 += 0.01) {                    // initial is 1.4
            var skinny_row_height = this.deriveRowHeight(min_component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
            var skinny_difference = this.TALLEST_SKINNY_ROW - skinny_row_height
            console.log('TEST_fourth_HEIGHT_height_fudge_factor - MIN', 'HEIGHT_ADJUST_FACTOR_1=', HEIGHT_ADJUST_FACTOR_1, 'skinny_difference=', skinny_difference)

            var fat_row_height = this.deriveRowHeight(max_component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
            var fat_difference = this.SINGLE_LINE_HEIGHT - fat_row_height
            console.log('TEST_fourth_HEIGHT_height_fudge_factor - MAX', 'HEIGHT_ADJUST_FACTOR_1=', HEIGHT_ADJUST_FACTOR_1, 'fat_difference=', fat_difference)
        }
    }

    TEST_fifth_HEIGHT_componentHeightResize() {
        console.log('TEST_fifth_HEIGHT_componentHeightResize - idea is to make sure row heights range from from 36 to 90')
        console.log('As the overall table width ranges from 320(mobile)-570(sff audio desktop)')
        console.log('Expect 90,90,90 ... 36,36,36')
        var height_row_divisor = this.HEIGHT_ROW_DIVISOR
        var HEIGHT_ADJUST_FACTOR_1 = this.HEIGHT_ADJUST_FACTOR_1
        var HEIGHT_ADJUST_FACTOR_2 = this.HEIGHT_ADJUST_FACTOR_2
        for (var component_width = 300; component_width < 700; component_width++) {
            var row_height = this.deriveRowHeight(component_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)
            console.log('TEST_fifth_HEIGHT_componentHeightResize', 'component_width=', component_width, 'row_height=', row_height)
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    TEST_first_WIDTH_width_fudge_factor() {
        console.log('TEST_first_WIDTH_width_fudge_factor - idea is to find best WIDTH_FUDGE_FACTOR with smallest min/max differences')
        console.log('Look for min/max difference closest to 0, and then use the corresponding width_fudge_factor for WIDTH_FUDGE_FACTOR')
        var min_component_width = this.MOBILE_SMALLEST_TABLE_WIDTH+1
        var max_component_width = this.LARGEST_TABLE_WIDTH_SFFAUDIO-1
        var WIDTH_ADJUST_FACTOR_2 = this.WIDTH_ADJUST_FACTOR_2
        for (var WIDTH_ADJUST_FACTOR_1 = 3.9; WIDTH_ADJUST_FACTOR_1 < 7.5; WIDTH_ADJUST_FACTOR_1 += 0.01) {                    // initial is 4
            console.log('')
            var min_id_col_width = this.deriveIconCellWidth(min_component_width, WIDTH_ADJUST_FACTOR_1,WIDTH_ADJUST_FACTOR_2)

            var min_difference = this.ICONS_CELL_MIN_WIDTH - min_id_col_width
            console.log('TEST_first_WIDTH_width_fudge_factor - MIN', 'width_fudge_factor=', WIDTH_ADJUST_FACTOR_1, 'min_difference=', min_difference)

            var max_id_col_width = this.deriveIconCellWidth(max_component_width, WIDTH_ADJUST_FACTOR_1,WIDTH_ADJUST_FACTOR_2)
            var max_difference = this.ICONS_CELL_MAX_WIDTH - max_id_col_width
            console.log('TEST_first_WIDTH_width_fudge_factor - MAX', 'width_fudge_factor=', WIDTH_ADJUST_FACTOR_1, 'max_difference=', max_difference)
        }
    }

    TEST_second_WIDTH_componentWidthResize() {
        console.log('TEST_second_WIDTH_componentWidthResize - idea is to make sure first column widths range from from 60 to 130')
        console.log('As the overall table width ranges from 320(smallest mobile)-570(sff audio desktop)')
        console.log('Expect 60,60,60 ... 130,130,130')
        var WIDTH_ADJUST_FACTOR_1 = this.WIDTH_ADJUST_FACTOR_1
        var WIDTH_ADJUST_FACTOR_2 = this.WIDTH_ADJUST_FACTOR_2
        for (var component_width = 300; component_width < 700; component_width++) {
            var icon_cell_width = this.deriveIconCellWidth(component_width, WIDTH_ADJUST_FACTOR_1, WIDTH_ADJUST_FACTOR_2)
            console.log('TEST_componentWidthResize', 'component_width=', component_width, 'icon_cell_width=', icon_cell_width)
        }
    }
*/

}

module.exports = RsdTable

