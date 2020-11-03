'use strict';

rootAppRequire('test/initDomBeforeReact');
var PdfComponent = rootAppRequire('mediaServer/react/js/pdf/PdfComponent');
var testHelpers = rootAppRequire('test/testHelpers');
var reactTestHelpers = rootAppRequire('test/reactTestHelpers');

var React = require('react'); //import ReactDOM from 'react-dom';


var ReactDom = require('react-dom'); //var ReactTestUtils = require('react-addons-test-utils');


var ReactTestUtils = require('react-dom/test-utils');

var expect = require('expect');

var pdf_sort_test_data = require('./testSortData');

describe('test/acceptance/pdf/sort/testSort.jsx', function () {
  it('[jingoistic jallopy] should sort asc/desc', function () {
    var pdfs_count_obj = {
      pdfs_count: 987654
    };
    var pdf_component = /*#__PURE__*/React.createElement(PdfComponent, {
      data_list: pdf_sort_test_data,
      media_description: "media_description",
      media_options: pdfs_count_obj,
      record_cell_order_testing: true
    });
    var document_render = ReactTestUtils.renderIntoDocument(pdf_component);
    var episode_sort = reactTestHelpers.oneReactByClass(document_render, 'EPISODE-SORT');
    var title_sort = reactTestHelpers.oneReactByClass(document_render, 'TITLE-SORT');
    var author_sort = reactTestHelpers.oneReactByClass(document_render, 'AUTHOR-SORT');
    var page_sort = reactTestHelpers.oneReactByClass(document_render, 'PAGE-SORT');
    ReactTestUtils.Simulate.click(episode_sort);
    var expected_asc_episode = ',6,5,4,3,2,1,0';
    var actual_asc_episode = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
    expect(expected_asc_episode).toEqual(actual_asc_episode, 'bad episode order 1st');
    ReactTestUtils.Simulate.click(episode_sort);
    var expected_desc_episode = ',0,1,2,3,4,5,6';
    var actual_desc_episode = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
    expect(expected_desc_episode).toEqual(actual_desc_episode, 'bad episode order 2nd');
    ReactTestUtils.Simulate.click(title_sort);
    var expected_asc_authors = ',5,3,1,2,0,4,6';
    var actual_asc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
    expect(expected_asc_authors).toEqual(actual_asc_authors, 'bad title order 1st');
    ReactTestUtils.Simulate.click(title_sort);
    var expected_asc_authors = ',6,4,0,2,1,3,5';
    var actual_asc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
    expect(expected_asc_authors).toEqual(actual_asc_authors, 'bad title order 2nd');
    ReactTestUtils.Simulate.click(author_sort);
    var expected_asc_authors = ',4,1,6,3,0,5,2';
    var actual_asc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
    expect(expected_asc_authors).toEqual(actual_asc_authors, 'bad author order 1st');
    ReactTestUtils.Simulate.click(author_sort);
    var expected_asc_authors = ',2,0,5,3,6,1,4';
    var actual_asc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
    expect(expected_asc_authors).toEqual(actual_asc_authors, 'bad author order 2nd');
    ReactTestUtils.Simulate.click(page_sort);
    var expected_asc_authors = ',0,6,3,1,4,2,5';
    var actual_asc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
    expect(expected_asc_authors).toEqual(actual_asc_authors, 'bad page order 1st');
    ReactTestUtils.Simulate.click(page_sort);
    var expected_asc_authors = ',5,2,4,1,3,6,0';
    var actual_asc_authors = reactTestHelpers.oneReactByClassInner(document_render, 'TEST-EPISODE-ORDER');
    expect(expected_asc_authors).toEqual(actual_asc_authors, 'bad page order 2nd');
  });
});