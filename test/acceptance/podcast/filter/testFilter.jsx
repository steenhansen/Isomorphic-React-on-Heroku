'use strict'


rootAppRequire('test/initDomBeforeReact')

var podcast_sort_test_data = require('./testFilterData')

var PodcastComponent = rootAppRequire('mediaServer/react/js/podcast/PodcastComponent')
var testHelpers = rootAppRequire('test/testHelpers')
var reactTestHelpers = rootAppRequire('test/reactTestHelpers')

var React = require('react')
var ReactTestUtils = require('react-addons-test-utils')
var expect = require('expect')

describe('test/acceptance/podcast/filter/testFilter.jsx', function () {
    it('[klingon klaxon] should filter number of records', function () {
        var show_all_rows_in_set_height = reactTestHelpers.SHOW_ALL_ROWS_IN_SET_HEIGHT
        var podcast_component = <PodcastComponent
            data_list={podcast_sort_test_data}
            media_description="media_description"
            table_height_px={show_all_rows_in_set_height}
            record_cell_order_testing={true}/>
        var document_render = ReactTestUtils.renderIntoDocument(podcast_component)

        var filter_input = reactTestHelpers.oneReactByClass(document_render, 'TEXT-FILTER')

        // nb, as the podcast component is small it can only show a max of 8 rows

        var filter_matches = {
            'z': 0
            , 'v': 4
            , 'm': 6
            , 'x': 1
            , 'w': 4
            , 'p': 4
            , 'y': 3
            , 'thu': 0
            , 'Journey': 1
            , 'zxcvxcvxzcv': 0
            , 'all': 1
        }

        for (var match_str in filter_matches) {
            var expected_matches = filter_matches[match_str]
            ReactTestUtils.Simulate.change(filter_input, {target: {value: match_str}})
            var actual_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE')
            expect(actual_matches).toEqual(expected_matches, ` for ${match_str} matches`)

        }

    })
})

