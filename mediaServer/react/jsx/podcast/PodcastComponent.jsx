"use strict";
var react_constants = require('../reactConstants');
var PodcastTable = require('./PodcastTable');
var PodcastList = require('./PodcastList');
var MediaComponent = require('../MediaComponent');
var KindSelect = require('./KindSelect');
var PodcastTitles = require('./PodcastTitles');
var PodcastDescription = require('./PodcastDescription');
var React = require('react');
class PodcastComponent extends MediaComponent {

    _pass_lint_() {
        PodcastTable;
        KindSelect;
        PodcastTitles;
        PodcastDescription;
        React;
    }

    constructor(props) {
        super(props);
        this.search_columns = ['episode_number', 'book author', 'book title', 'narrator', 'participants', 'about'];
        var props_array = props['data_list'];
        this.podcast_list = new PodcastList(props_array, this.search_columns);
        this.kind_choice_filter = '';
        this.displayed_columns = {
            'podcast_id_cell': ['episode_number', 'hh_mm', 'mp3_url'],
            'podcast_text_cell': ['episode_number',
                'book author', 'first_name', 'last_name',
                'book title', 'start_title', 'end_title',
                'hh:mm:ss', 'hh_mm', 'post_link', 'file name', 'kind type', 'about', 'narrator', 'participants', 'kind'
            ]
        };
        this.podcast_list.initialOrder();
        this.state = {
            associated_podcast_list: this.podcast_list,
        };
        this.filterByKind = this.filterByKind.bind(this);    // <KindSelect cb_PodcastComponent_filterByKind={this.filterByKind}
    }

    filterHasAuthorsAndTitles() {
        let kind = this.kind_choice_filter;
        if ((kind === '') || (kind === 'Audiobook') || (kind === 'Audiobook/Readalong') || (kind === 'Readalong')) {
            return true;
        }
        return false;
    }

    changeGrid(changed_data) {
        this.saveRestrictions(changed_data);
        var sortIndexes = this.podcast_list.initialOrder();
        if (this.kind_choice_filter !== '') {
            sortIndexes = this.podcast_list.selectDataSet(this.kind_choice_filter, sortIndexes);
        }
        if (this.filter_text === '') {
            this.search_matches = {};
        } else {
            var {filteredIndexes, search_matches} = this.podcast_list.filterDataSet(this.filter_text, sortIndexes);
            sortIndexes = filteredIndexes;
            this.search_matches = search_matches;
        }

        if (this.sort_column !== '') {
            if ((this.sort_column === 'book author_') || (this.sort_column === 'book title_')) {
                if (this.filterHasAuthorsAndTitles()) {
                    sortIndexes = this.podcast_list.bookAndAuthorsOnly(sortIndexes);
                }
            }
            sortIndexes = this.podcast_list.sortIndexesByColumn(this.sort_column, this.sort_dir, sortIndexes);
        }
        var indexes_as_str = '';
        if (this.record_cell_order_testing) {
            for (var an_index of sortIndexes) {
                indexes_as_str += ',' + an_index;
            }
        }
        this.TEST_EPISODE_ORDER = indexes_as_str;
        this.podcast_list.currentMap(sortIndexes);
        this.setState({
            associated_podcast_list: this.podcast_list,
            table_width: this.table_width,
            table_height: this.table_height
        });
        let number_matches = sortIndexes.length;
        return number_matches;
    }

    saveRestrictions(changed_data) {
        if (undefined !== changed_data.table_width) {
            this.table_width = changed_data.table_width;
        }
        if (undefined !== changed_data.table_height) {
            this.table_height = changed_data.table_height;
        }
        if (undefined !== changed_data.filter_text) {
            this.filter_text = changed_data.filter_text;
        }
        if (undefined !== changed_data.kind_choice_filter) {
            this.kind_choice_filter = changed_data.kind_choice_filter;
        }
        if (undefined !== changed_data.sort_column) {
            this.sort_column = changed_data.sort_column;
        }
        if (undefined !== changed_data.sort_dir) {
            this.sort_dir = changed_data.sort_dir;
        }
    }

    clearAllFilters() {
        var changed_data = {
            filter_text: '',
            kind_choice_filter: '',
            sort_column: '',
            sort_dir: ''
        };
        this.number_matches = this.changeGrid(changed_data);
        var fn_updateTableSize = this.refs.the_podcast_table._updateTableSize;
        clearTimeout(this._updateTimer);
        this._updateTimer = setTimeout(fn_updateTableSize, react_constants.REACT_UPDATE_DELAY);
    }


    _cssGeneration() {
        var dark_blue = react_constants.SFF_DARK_BLUE;
        var column_sort_css = `
      .sort-by-episode_number { color: #${dark_blue}; font-weight: bold; }
      .sort-by-hh-mm-ss       { color: #${dark_blue}; font-weight: bold; }
      .search-highlight       { color: #${dark_blue}; font-weight: bold; }

      .first-book-author      { color: #${dark_blue}; font-weight: bold; }
      .last-book-author       { color: #${dark_blue}; font-weight: bold; font-size: 120%; }

      .start-book-title       { color: #${dark_blue}; font-weight: bold; }
      .end-book-title         { color: #${dark_blue}; font-weight: bold; font-size: 120%; }

       `;
        return column_sort_css;
    }

    filterByKind(kind_choice_filter) {
        var changed_data = {
            kind_choice_filter: kind_choice_filter
        };
        this.number_matches = this.changeGrid(changed_data);
    }
 
  
    render() {
        var {podcast_clear_css, clear_hover_css, column_sort_css}=this.generateCss();
        var my_searches = this.search_matches;
        let match_message = this.numberMatchesShort();
        return (
            <div id="podcast-media-container"   >
              
                <PodcastDescription podcast_description={this.media_description}   />
                <style scoped dangerouslySetInnerHTML={{__html: clear_hover_css}}/>
                <button onClick={this.clearAllFilters} style={podcast_clear_css} className="podcast-clear CLEAR-TEXT">
                    Reset
                </button>
                <input onChange={this._onFilterChange}
                       className="TEXT-FILTER filter-text"
                       value={this.filter_text}
                       autoComplete="off"
                       placeholder="Search ..."/> {match_message}
                <KindSelect cb_PodcastComponent_filterByKind={this.filterByKind}
                            className="PODCAST-SELECT"
                            category_choice={this.kind_choice_filter}/>
                <style scoped dangerouslySetInnerHTML={{__html: column_sort_css}}/>
                <PodcastTitles cb_PodcastComponent_titleSort={this._onSortChange}     />
                <PodcastTable data={this.podcast_list}
                              filter_text={this.filter_text}
                              

                             search_matches={my_searches}
ref="the_podcast_table"
                                 media_container_name="podcast-media-container"
                              search_columns={this.search_columns}
                              displayed_columns={this.displayed_columns}
                              sort_column={this.sort_column}/>
                <div className="TEST-EPISODE-ORDER">{this.TEST_EPISODE_ORDER}</div>
            </div>
        );
    }

}


module.exports = PodcastComponent;

