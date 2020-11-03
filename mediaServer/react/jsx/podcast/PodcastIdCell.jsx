"use strict";

var FixedDataTable = require('fixed-data-table-2');
var MediaIdCell = require('../MediaIdCell');


const {Cell} = FixedDataTable;
var React = require('react');

class PodcastIdCell extends MediaIdCell {

    constructor(props) {
        super(props);
    }

    _pass_lint_() {
        Cell;
        React;
    }

    render() {
       let  my_visible_text= this.deriveEpisodeM3MmSS();

        return (
            <Cell className="PODCAST-EPISODE" onMouseEnter={this.props.tableGetsFocus}>              
                <div dangerouslySetInnerHTML={{__html: my_visible_text}}/>
            </Cell>
        );
    }
}

module.exports = PodcastIdCell;
