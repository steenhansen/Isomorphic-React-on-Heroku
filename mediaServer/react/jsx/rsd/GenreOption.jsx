"use strict"

var React = require('react')

class GenreOption extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        var visible_text = this.props.category
        var hidden_value = this.props.hidden_category
        return (
            <option value={hidden_value}>{visible_text}</option>
        )
    }
}


module.exports = GenreOption