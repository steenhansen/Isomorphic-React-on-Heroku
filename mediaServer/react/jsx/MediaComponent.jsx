"use strict";
var React = require('react');
var react_constants = require('./reactConstants');

class MediaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.media_description = props['media_description'];
        this.site_url = props['site_url'];

        this.record_cell_order_testing = props['record_cell_order_testing'];
        this.filter_text = '';
        this.sort_column = '';
        this.sort_dir = '';
        this.search_matches = [];

        this.clearAllFilters = this.clearAllFilters.bind(this);   //<button onClick={this.clearAllFilters} >
        this._onFilterChange = this._onFilterChange.bind(this);  // <input onChange={this._onFilterChange}
        this._onSortChange = this._onSortChange.bind(this);    // <RsdTitles cb_RsdComponent_titleSort={this._onSortChange}
    }

    _onFilterChange(e) {
        if (!e.target.value) {
            var filter_text = '';
        } else {
            filter_text = e.target.value;
        }
        var changed_data = {
            filter_text: filter_text
        };
        this.number_matches = this.changeGrid(changed_data);
    }

    _onSortChange(columnKey, sortDir) {
        var changed_data = {
            sort_column: columnKey,
            sort_dir: sortDir
        };
        this.number_matches = this.changeGrid(changed_data);
    }

    generateCss() {
        var clear_css = {cursor: 'pointer', padding: 0, margin: 3};
        var dark_blue = react_constants.SFF_DARK_BLUE;
        var light_blue = react_constants.SFF_LIGHT_BLUE;
        var clear_hover_css = ` .rsd-clear      { color: #${light_blue}; font-size:1em }
                               .rsd-clear:hover { color: #${dark_blue} } `;
        var column_sort_css = this._cssGeneration();
        return {clear_css, clear_hover_css, column_sort_css};
    }


    numberMatchesLong() {
        if (this.filter_text === '') {
            var match_message = '';
        } else {
            let number_matches = this.number_matches;
            if (number_matches === 1) {
                var match_message = ` 1 match`;
            } else {
                var match_message = ` ${number_matches} matches`;
            }
        }
        return match_message;
    }


    numberMatchesShort() {
        if (this.filter_text === '') {
            return ' ';
        } else {
            return ' ' + this.number_matches + ' ';
        }
    }

}


module.exports = MediaComponent;

