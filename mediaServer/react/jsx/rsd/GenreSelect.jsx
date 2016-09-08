"use strict"

var React = require('react')
var GenreOption = require('./GenreOption')


class GenreSelect extends React.Component {
    constructor(props) {
        super(props)
        this.className = this.props.className
        this.selectByGenre = this.selectByGenre.bind(this)   // <select onChange={this.selectByGenre}
    }

    _pass_lint_() {
        GenreOption
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
                <GenreOption category="All Genres"
                             hidden_category=""
                             key="genre_all"/>
                <GenreOption category="Poem"
                             hidden_category="poem"
                             key="genre_poem"/>
                <GenreOption category="Story"

                             hidden_category="story"
                             key="genre_story"/>
                <GenreOption category="Other"

                             hidden_category="other"
                             key="genre_other"/>
            </select>
        )
    }
}


module.exports = GenreSelect
