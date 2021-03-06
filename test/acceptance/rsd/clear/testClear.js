'use strict';

rootAppRequire('test/initDomBeforeReact'); // this makes the document

var expect = require('expect');

var React = require('react'); ////import ReactDOM from 'react-dom';


var ReactDom = require('react-dom'); //var ReactTestUtils = require('react-addons-test-utils');


var ReactTestUtils = require('react-dom/test-utils');

var reactTestHelpers = rootAppRequire('test/reactTestHelpers');
var RsdComponent = rootAppRequire('mediaServer/react/js/rsd/RsdComponent');

var rsd_genre_test_data = require('./testClearData'); // nb, as the rsd component is small it can only show a max of 8 rows


describe('test/acceptance/rsd/clear/testClear.jsx', function () {
  it('[defending defenestration] should filter', function () {
    var rsd_component = /*#__PURE__*/React.createElement(RsdComponent, {
      data_list: rsd_genre_test_data,
      media_description: "media_description"
    });
    var document_render = ReactTestUtils.renderIntoDocument(rsd_component);
    var no_filter_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE');
    expect(no_filter_matches).toEqual(6, 'No filter should lead to 6 matches');
    var select = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'RSD-SELECT');
    ReactTestUtils.Simulate.change(select, {
      target: {
        value: 'story'
      }
    });
    var story_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE');
    expect(story_matches).toEqual(3, 'There are 3 stories');
    var clear = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'CLEAR-TEXT');
    ReactTestUtils.Simulate.click(clear);
    var clear_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE');
    expect(clear_matches).toEqual(6, 'Clear should lead to 6 matches');
    var filter_input = reactTestHelpers.oneReactByClass(document_render, 'TEXT-FILTER');
    ReactTestUtils.Simulate.change(filter_input, {
      target: {
        value: 'zxcvxcvxzcv'
      }
    });
    var actual_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE');
    expect(actual_matches).toEqual(0, ` for 'zxcvxcvxzcv' matches`);
    ReactTestUtils.Simulate.click(clear);
    var clear_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE');
    expect(clear_matches).toEqual(6, 'Clear should lead to 6 matches');
  });
});