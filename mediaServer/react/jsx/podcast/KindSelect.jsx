"use strict";

var React = require('react');
var Option = require('../Option');


class KindSelect extends React.Component {
    constructor(props) {
        super(props);
        this.className = this.props.className;
        this.selectByKind = this.selectByKind.bind(this);   // <select onChange={this.selectByKind}
    }

    _pass_lint_() {
        Option;
    }

    selectByKind(event) {
        var select_text = event.target.value;
        this.props.cb_PodcastComponent_filterByKind(select_text);
    }

    render() {
        var select_class_name = this.className;
        return (
            <select onChange={this.selectByKind}
                    className={select_class_name}
                    value={this.props.category_choice}>
                <Option category="All Kinds"
                             hidden_category=""
                             key="kind_all"/>
                <Option category="Audiobook"
                             hidden_category="audiobook"
                             key="kind_audiobook"/>
                <Option category="Audiobook/Readalong"
                             hidden_category="audiobook/readalong"
                             key="kind_audiobook_readalong"/>
                <Option category="New Releases/Recent Arrivals"
                             hidden_category="new releases/recent arrivals"
                             key="kind_new_releases_recent_arrivals"/>
                <Option category="Readalong"
                             hidden_category="readalong"
                             key="kind_readalong"/>
                <Option category="Talk To"
                             hidden_category="talk to"
                             key="kind_talk_to"/>
                <Option category="Topic"
                             hidden_category="topic"
                             key="kind_topic"/>
            </select>
        );
    }
}


module.exports = KindSelect;
