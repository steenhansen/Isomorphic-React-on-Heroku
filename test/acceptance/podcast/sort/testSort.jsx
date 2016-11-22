'use strict'

rootAppRequire('test/initDomBeforeReact')

var PodcastComponent = rootAppRequire('mediaServer/react/js/podcast/PodcastComponent')
var testHelpers = rootAppRequire('test/testHelpers')
var reactTestHelpers = rootAppRequire('test/reactTestHelpers')


var React = require('react')
import ReactDOM from 'react-dom'
var ReactTestUtils = require('react-addons-test-utils')
var expect = require('expect')


var podcast_sort_test_data = require('./testSortData')

describe('test/acceptance/podcast/sort/testSort.jsx', function () {
    it('[sunny night] should sort asc/desc', function () {
        var show_all_rows_in_set_height = reactTestHelpers.SHOW_ALL_ROWS_IN_SET_HEIGHT

        var podcast_component = <PodcastComponent
            data_list={podcast_sort_test_data}
            media_description="media_description"
            table_height_px={show_all_rows_in_set_height}
            record_cell_order_testing={true}/>

        var document_render = ReactTestUtils.renderIntoDocument(podcast_component)


        var episode_sort = reactTestHelpers.oneReactByClass(document_render, 'EPISODE-SORT')
        var time_sort = reactTestHelpers.oneReactByClass(document_render, 'TIME-SORT')
        var title_sort = reactTestHelpers.oneReactByClass(document_render, 'TITLE-SORT')
        var author_sort = reactTestHelpers.oneReactByClass(document_render, 'AUTHOR-SORT')

        
        ReactTestUtils.Simulate.click(episode_sort)
        var expected_asc_episode = ',6,5,4,3,2,1,0'
        var actual_asc_episode = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER')
        expect(expected_asc_episode).toEqual(actual_asc_episode, 'bad order')

        ReactTestUtils.Simulate.click(episode_sort)
        var expected_desc_episode = ',0,1,2,3,4,5,6'
        var actual_desc_episode = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER')
        expect(expected_desc_episode).toEqual(actual_desc_episode, 'bad order')


        ReactTestUtils.Simulate.click(time_sort)
        var expected_asc_time = ',6,4,2,1,5,0,3'
        var actual_asc_time = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER')
        expect(expected_asc_time).toEqual(actual_asc_time, 'bad order')
        
        ReactTestUtils.Simulate.click(time_sort)
        var expected_desc_time = ',3,0,5,1,2,4,6'
        var actual_desc_time = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER')
        expect(expected_desc_time).toEqual(actual_desc_time, 'bad order')
        
        
        ReactTestUtils.Simulate.click(author_sort)
        var expected_asc_authors = ',4,5,3,1,2,0'
        var actual_asc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER')
        expect(expected_asc_authors).toEqual(actual_asc_authors, 'bad order')
        
        ReactTestUtils.Simulate.click(author_sort)
        var expected_desc_authors = ',0,1,2,3,4,5'
        var actual_desc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER')
        expect(expected_desc_authors).toEqual(actual_desc_authors, 'bad order')
        
        
        ReactTestUtils.Simulate.click(title_sort)
        var expected_asc_titles = ',4,5,0,3,1,2'
        var actual_asc_titles = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER')
        expect(expected_asc_titles).toEqual(actual_asc_titles, 'bad order')
        
        ReactTestUtils.Simulate.click(title_sort)
        var expected_desc_titles = ',1,2,3,0,5,4'
        var actual_desc_titles = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER')
        expect(expected_desc_titles).toEqual(actual_desc_titles, 'bad order')


    })
})
