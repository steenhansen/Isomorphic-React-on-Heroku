"use strict"

var React = require('react')
var Option = require('../Option')


class GenreSelect extends React.Component {
    constructor(props) {
        super(props)
        this.className = this.props.className
        this.selectByGenre = this.selectByGenre.bind(this)   // <select onChange={this.selectByGenre}
    }

    _pass_lint_() {
        Option
    }

    selectByGenre(event) {
        var select_text = event.target.value
        this.props.cb_RsdComponent_filterByGenre(select_text)
    }

    render() {
        var select_class_name = this.className
        return (
            <select onChange={this.selectByGenre}
                    className={select_class_name}
                    value={this.props.category_choice}>
                <Option category="All Genres"
                             hidden_category=""
                             key="genre_all"/>
                <Option category="Poem"
                             hidden_category="poem"
                             key="genre_poem"/>
                <Option category="Story"

                             hidden_category="story"
                             key="genre_story"/>
                <Option category="Other"

                             hidden_category="other"
                             key="genre_other"/>
            </select>
        )
    }
}


module.exports = GenreSelect
