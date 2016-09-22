"use strict"
var react_constants = require('../reactConstants')
var RsdTable = require('./RsdTable')
var RsdList = require('./RsdList')
var React = require('react')
var GenreSelect = require('./GenreSelect')
var RsdTitles = require('./RsdTitles')
var RsdDescription = require('./RsdDescription')

class RsdComponent extends React.Component {

    _pass_lint_() {
        RsdTable
        GenreSelect
        RsdTitles
        RsdDescription
    }

    constructor(props) {
        super(props)
        this.search_columns = ['episode_number', 'book author', 'book title']
        var props_array = props['data_list']
        this.media_description = props['media_description']
        this.device_type = props['device_type']
        this.record_cell_order_testing = props['record_cell_order_testing']
        this.rsd_list = new RsdList(props_array, this.search_columns)
        this.filter_text = ''
        this.genre_choice_filter = ''
        this.sort_column = ''
        this.sort_dir = ''
        this.search_matches = []
        this.displayed_columns = {
            'rsd_id_cell': ['episode_number', 'file name', 'mm_ss'],
            'rsd_text_cell': ['episode_number',
                'book author', 'first_name', 'last_name',
                'book title', 'start_title', 'end_title',
                'hh:mm:ss', 'mm_ss', 'post link', 'file name', 'genre type', 'pdf link', 'video link'
            ]
        }
        this.rsd_list.initialOrder()
        this.state = {
            associated_rsd_list: this.rsd_list,
        }
        this.clearAllFilters = this.clearAllFilters.bind(this)   //<button onClick={this.clearAllFilters} >
        this._onFilterChange = this._onFilterChange.bind(this)  // <input onChange={this._onFilterChange}
        this.filterByGenre = this.filterByGenre.bind(this)    // <GenreSelect cb_RsdComponent_filterByGenre={this.filterByGenre}
        this._onSortChange = this._onSortChange.bind(this)    // <RsdTitles cb_RsdComponent_titleSort={this._onSortChange}
    }

    changeGrid(changed_data) {
        this.saveRestrictions(changed_data)
        var sortIndexes = this.rsd_list.initialOrder()
        if (this.genre_choice_filter !== '') {
            sortIndexes = this.rsd_list.selectDataSet(this.genre_choice_filter, sortIndexes)
        }
        if (this.filter_text === '') {
            this.search_matches = {}
        } else {
            var {filteredIndexes, search_matches} = this.rsd_list.filterDataSet(this.filter_text, sortIndexes)
            sortIndexes = filteredIndexes
            this.search_matches = search_matches
        }
        if (this.sort_column !== '') {
            sortIndexes = this.rsd_list.sortIndexesByColumn(this.sort_column, this.sort_dir, sortIndexes)
        }
        var indexes_as_str = ''
        if (this.record_cell_order_testing) {
            for (var an_index of sortIndexes) {
                indexes_as_str += ',' + an_index
            }
        }
        this.TEST_EPISODE_ORDER = indexes_as_str
        this.rsd_list.currentMap(sortIndexes)
        this.setState({
            associated_rsd_list: this.rsd_list,
            table_width: this.table_width,
            table_height: this.table_height
        })
    }

    saveRestrictions(changed_data) {
        if (undefined !== changed_data.table_width) {
            this.table_width = changed_data.table_width
        }
        if (undefined !== changed_data.table_height) {
            this.table_height = changed_data.table_height
        }
        if (undefined !== changed_data.filter_text) {
            this.filter_text = changed_data.filter_text
        }
        if (undefined !== changed_data.genre_choice_filter) {
            this.genre_choice_filter = changed_data.genre_choice_filter
        }
        if (undefined !== changed_data.sort_column) {
            this.sort_column = changed_data.sort_column
        }
        if (undefined !== changed_data.sort_dir) {
            this.sort_dir = changed_data.sort_dir
        }
    }

    clearAllFilters() {
        var changed_data = {
            filter_text: '',
            genre_choice_filter: '',
            sort_column: '',
            sort_dir: ''
        }
        this.changeGrid(changed_data)
        var fn_updateTableSize = this.refs.the_rsd_table._updateTableSize
        clearTimeout(this._updateTimer)
        this._updateTimer = setTimeout(fn_updateTableSize(), 16)
    }

    _onFilterChange(e) {
        if (!e.target.value) {
            var filter_text = ''
        } else {
            filter_text = e.target.value
        }
        var changed_data = {
            filter_text: filter_text
        }
        this.changeGrid(changed_data)
    }

    _cssGeneration() {
        var dark_blue = react_constants.SFF_DARK_BLUE
        var column_sort_css = `
      .sort-by-episode_number { color: #${dark_blue}; font-weight: bold; }
      .sort-by-hh-mm-ss       { color: #${dark_blue}; font-weight: bold; }
      .search-highlight       { color: #${dark_blue}; font-weight: bold; }

      .first-book-author      { color: #${dark_blue}; font-weight: bold; }
      .last-book-author       { color: #${dark_blue}; font-weight: bold; font-size: 120%; }

      .start-book-title       { color: #${dark_blue}; font-weight: bold; }
      .end-book-title         { color: #${dark_blue}; font-weight: bold; font-size: 120%; }

       `
        return column_sort_css
    }

    filterByGenre(genre_choice_filter) {
        var changed_data = {
            genre_choice_filter: genre_choice_filter
        }
        this.changeGrid(changed_data)
    }

    _onSortChange(columnKey, sortDir) {
        var changed_data = {
            sort_column: columnKey,
            sort_dir: sortDir
        }
        this.changeGrid(changed_data)
    }

    render() {
        var rsd_clear_css = {cursor: 'pointer', padding: 0, margin: 3}
        var dark_blue = react_constants.SFF_DARK_BLUE
        var light_blue = react_constants.SFF_LIGHT_BLUE
        var clear_hover_css = ` .rsd-clear      { color: #${light_blue}; font-size:1em }
                               .rsd-clear:hover { color: #${dark_blue} } `
        var column_sort_css = this._cssGeneration()
        var my_searches = this.search_matches
        return (
            <div id="media-container">
                <RsdDescription rsd_description={this.media_description}/>
                <style scoped dangerouslySetInnerHTML={{__html: clear_hover_css}}/>
                <button onClick={this.clearAllFilters} style={rsd_clear_css} className="rsd-clear CLEAR-TEXT">Clear
                </button>
                <input onChange={this._onFilterChange}
                       id="filter-text"
                       className="TEXT-FILTER"
                       value={this.filter_text}
                       autoComplete="off"
                       placeholder="Filter ..."/>
                <GenreSelect cb_RsdComponent_filterByGenre={this.filterByGenre}
                             className="RSD-SELECT"
                             category_choice={this.genre_choice_filter}/>
                <style scoped dangerouslySetInnerHTML={{__html: column_sort_css}}/>
                <RsdTitles cb_RsdComponent_titleSort={this._onSortChange}/>
                <RsdTable data={this.rsd_list}
                          filter_text={this.filter_text}
                          search_matches={my_searches}
                          ref="the_rsd_table"
                          device_type={this.device_type}
                          search_columns={this.search_columns}
                          displayed_columns={this.displayed_columns}
                          sort_column={this.sort_column}/>
                <div className="TEST-EPISODE-ORDER">{this.TEST_EPISODE_ORDER}</div>
            </div>
        )
    }

}


module.exports = RsdComponent

