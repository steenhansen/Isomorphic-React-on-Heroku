'use strict'
var expect = require('expect')

var React = require('react')
import ReactDOM from 'react-dom'
var ReactTestUtils = require('react-addons-test-utils')
var reactTestHelpers = rootAppRequire('test/reactTestHelpers')

var RsdComponent = rootAppRequire('mediaServer/react/js/rsd/RsdComponent')

var rsd_genre_test_data = require('./testGenreData')

// nb, as the rsd component is small it can only show a max of 8 rows

describe('test/acceptance/rsd/genre/testGenre.jsx', function () {
    it('[silicon feet] should filter', function () {

        var rsd_component = <RsdComponent
            data_list={rsd_genre_test_data}
            media_description="media_description"/>
        var document_render = ReactTestUtils.renderIntoDocument(rsd_component)

        var no_filter_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE')
        expect(no_filter_matches).toEqual(6, 'No filter should lead to 6 matches')

        var select = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'RSD-SELECT')
        var selectNode = ReactDOM.findDOMNode(select)


        ReactTestUtils.Simulate.change(selectNode, {target: {value: 'story'}})
        var story_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE')
        expect(story_matches).toEqual(3, 'There are 3 stories')

        ReactTestUtils.Simulate.change(selectNode, {target: {value: 'poem'}})
        var poem_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE')
        expect(poem_matches).toEqual(2, 'There are 2 poems')

        ReactTestUtils.Simulate.change(selectNode, {target: {value: 'other'}})
        var other_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE')
        expect(other_matches).toEqual(1, 'There is 1 poem')

        var clear = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'CLEAR-TEXT')
        var clear_node = ReactDOM.findDOMNode(clear)

        ReactTestUtils.Simulate.click(clear_node)
        var clear_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE')
        expect(clear_matches).toEqual(6, 'Clear should lead to 6 matches')
    })
})
