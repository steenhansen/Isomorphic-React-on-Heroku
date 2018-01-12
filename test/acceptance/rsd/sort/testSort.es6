'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

rootAppRequire('test/initDomBeforeReact');

var RsdComponent = rootAppRequire('mediaServer/react/js/rsd/RsdComponent');
var testHelpers = rootAppRequire('test/testHelpers');
var reactTestHelpers = rootAppRequire('test/reactTestHelpers');

var React = require('react');

var ReactTestUtils = require('react-addons-test-utils');
var expect = require('expect');

var rsd_sort_test_data = require('./testSortData');

describe('test/acceptance/rsd/sort/testSort.jsx', function () {
        it('[low budget] should sort asc/desc', function () {
                var show_all_rows_in_set_height = reactTestHelpers.SHOW_ALL_ROWS_IN_SET_HEIGHT;

                var rsd_component = React.createElement(RsdComponent, {
                        data_list: rsd_sort_test_data,
                        media_description: 'media_description',
                        table_height_px: show_all_rows_in_set_height,
                        record_cell_order_testing: true });

                var document_render = ReactTestUtils.renderIntoDocument(rsd_component);

                var episode_sort = reactTestHelpers.oneReactByClass(document_render, 'EPISODE-SORT');
                var time_sort = reactTestHelpers.oneReactByClass(document_render, 'TIME-SORT');
                var title_sort = reactTestHelpers.oneReactByClass(document_render, 'TITLE-SORT');
                var author_sort = reactTestHelpers.oneReactByClass(document_render, 'AUTHOR-SORT');

                ReactTestUtils.Simulate.click(episode_sort);
                var expected_asc_episode = ',16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0';
                var actual_asc_episode = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
                expect(expected_asc_episode).toEqual(actual_asc_episode, 'bad order');

                ReactTestUtils.Simulate.click(episode_sort);
                var expected_desc_episode = ',0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16';
                var actual_desc_episode = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
                expect(expected_desc_episode).toEqual(actual_desc_episode, 'bad order');

                ReactTestUtils.Simulate.click(time_sort);
                var expected_asc_time = ',14,1,15,7,0,4,5,12,10,9,16,2,13,8,6,11,3';
                var actual_asc_time = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
                expect(expected_asc_time).toEqual(actual_asc_time, 'bad order');

                ReactTestUtils.Simulate.click(time_sort);
                var expected_desc_time = ',3,11,6,8,13,2,16,9,10,12,5,4,0,7,15,1,14';
                var actual_desc_time = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
                expect(expected_desc_time).toEqual(actual_desc_time, 'bad order');

                ReactTestUtils.Simulate.click(author_sort);
                var expected_asc_authors = ',6,3,16,15,1,8,10,2,7,13,12,0,5,9,11,4,14';
                var actual_asc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
                expect(expected_asc_authors).toEqual(actual_asc_authors, 'bad order');

                ReactTestUtils.Simulate.click(author_sort);
                var expected_desc_authors = ',14,4,11,9,5,0,12,13,7,2,10,8,1,15,16,3,6';
                var actual_desc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
                expect(expected_desc_authors).toEqual(actual_desc_authors, 'bad order');

                ReactTestUtils.Simulate.click(title_sort);
                var expected_asc_titles = ',5,12,10,4,9,14,11,1,7,3,2,8,15,6,0,13,16';
                var actual_asc_titles = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
                expect(expected_asc_titles).toEqual(actual_asc_titles, 'bad order');

                ReactTestUtils.Simulate.click(title_sort);
                var expected_desc_titles = ',16,13,0,6,15,8,2,3,7,1,11,14,9,4,10,12,5';
                var actual_desc_titles = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
                expect(expected_desc_titles).toEqual(actual_desc_titles, 'bad order');
        });
});