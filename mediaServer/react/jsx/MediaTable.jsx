"use strict"

var React = require('react')
var react_constants = require('./reactConstants')


class MediaTable extends React.Component {
    constructor(props) {
        super(props)
        this.SINGLE_LINE_HEIGHT = 36    // height of rows for desktop, horizontal columns of wide content
        this.data = props.data
        this.filter_text = props.filter_text

        this.device_type = props.device_type


        this.search_matches = props.search_matches
        this.search_columns = props.search_columns
        this.displayed_columns = props.displayed_columns
        this.calced_row_height = this.SINGLE_LINE_HEIGHT
        this.sort_column = props.sort_column
        this.state = {
            init_discarded_row_height: this.SINGLE_LINE_HEIGHT,
            row_count: this.data.getSize(),
            table_width: 1,
            table_height: 1,
            id_cell_width: 1,
            text_cell_width: 1
        }
        this._onResizeWindow = this._onResizeWindow.bind(this)
        this._updateTableSize = this._updateTableSize.bind(this)
        this.getRowHeight = this.getRowHeight.bind(this)
        this.deriveIconCellWidth = this.deriveIconCellWidth.bind(this)
    }

    componentDidMount() {
        this._updateTableSize()
        if (window.addEventListener) {
            window.addEventListener('resize', this._onResizeWindow, false)
        } else if (window.attachEvent) {
            window.attachEvent('onresize', this._onResizeWindow)
        } else {
            window.onresize = this._onResizeWindow
        }
    }

    _onResizeWindow() {
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(this._updateTableSize, 16)
    }

    deriveRowHeight(table_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2) {
        if (table_width >= react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH) {
            row_height_int = this.SINGLE_LINE_HEIGHT
        } else if (table_width <= this.MOBILE_SMALLEST_TABLE_WIDTH) {
            row_height_int = this.TALLEST_SKINNY_ROW
        } else {
            var num_rows = ((react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH - table_width) / height_row_divisor) + HEIGHT_ADJUST_FACTOR_1
            var row_height_float = this.SINGLE_LINE_HEIGHT * num_rows
            var row_height_int = Math.floor(row_height_float) + HEIGHT_ADJUST_FACTOR_2
        }
        return row_height_int
    }

    _updateTableSize() {
        if (document.getElementById('media-container') === null) {
            var table_width = react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH - this.EXTRA_WIDTH_STOP_SCROLL
        } else {
            var table_width = document.getElementById('media-container').parentElement.clientWidth - this.EXTRA_WIDTH_STOP_SCROLL
        }
        var WIDTH_ADJUST_FACTOR_1 = this.WIDTH_ADJUST_FACTOR_1
        var WIDTH_ADJUST_FACTOR_2 = this.WIDTH_ADJUST_FACTOR_2
        var id_cell_width = this.deriveIconCellWidth(table_width, WIDTH_ADJUST_FACTOR_1, WIDTH_ADJUST_FACTOR_2)
        var text_cell_width = table_width - id_cell_width
        var height_row_divisor = this.HEIGHT_ROW_DIVISOR
        var HEIGHT_ADJUST_FACTOR_1 = this.HEIGHT_ADJUST_FACTOR_1
        var HEIGHT_ADJUST_FACTOR_2 = this.HEIGHT_ADJUST_FACTOR_2
        this.calced_row_height = this.deriveRowHeight(table_width, height_row_divisor, HEIGHT_ADJUST_FACTOR_1, HEIGHT_ADJUST_FACTOR_2)

        if (this.device_type === 'desktop_device') {
            var table_height = window.innerHeight - 100
        } else {
            var table_height = this.calced_row_height * this.data.getSize()
        }
        this.setState({
            init_discarded_row_height: this.SINGLE_LINE_HEIGHT,
            row_count: this.data.getSize(),
            table_width: table_width,
            table_height: table_height,
            id_cell_width: id_cell_width,
            text_cell_width: text_cell_width
        })
    }

    getRowHeight() {
        return this.calced_row_height
    }


    //   320------------100--------------------570 table_width
    //   60              80                    130 first cell width
    deriveIconCellWidth(table_width, WIDTH_ADJUST_FACTOR_1, WIDTH_ADJUST_FACTOR_2) {
        if (table_width >= react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH) {
            first_cell_width = this.ICONS_CELL_MAX_WIDTH
        } else if (table_width <= this.MOBILE_SMALLEST_TABLE_WIDTH) {
            first_cell_width = this.ICONS_CELL_MIN_WIDTH
        } else {
            var cell_divisor = ((react_constants.RSD_SFFAUDIO_CONTAINER_WIDTH - table_width) / this.ICONS_CELL_MAX_WIDTH) + WIDTH_ADJUST_FACTOR_1
            var first_cell_width = table_width / cell_divisor + WIDTH_ADJUST_FACTOR_2
        }
        return first_cell_width
    }

}

module.exports = MediaTable

