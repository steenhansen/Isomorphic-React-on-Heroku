"use strict"

var React = require('react')

class RsdDescription extends React.Component {
    constructor(props) {
        super(props)
        this.rsd_description = props['rsd_description']
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

    _updateTableSize() {
    }

    render() {
        var rsd_description = this.rsd_description
        return (
            <div dangerouslySetInnerHTML={{__html: rsd_description}}/>
        )
    }
}

module.exports = RsdDescription
