'use strict';

rootAppRequire('test/initDomBeforeReact'); // this makes the document
//console.log('doc', document);

var expect = require('expect');

var React = require('react'); //import ReactDOM from 'react-dom';
//var ReactDom= require('react-dom');
//var ReactDOM = require('react-dom/server');
//var ReactTestUtils = require('react-addons-test-utils');


var ReactTestUtils = require('react-dom/test-utils');

var reactTestHelpers = rootAppRequire('test/reactTestHelpers');
var PodcastComponent = rootAppRequire('mediaServer/react/js/podcast/PodcastComponent');

var podcast_genre_test_data = require('./testClearData'); // nb, as the podcast component is small it can only show a max of 8 rows


describe('q*bert test/acceptance/podcast/clear/testClear.jsx', function () {
  it('[tipping tsar] should filter', function () {
    var podcast_component = /*#__PURE__*/React.createElement(PodcastComponent, {
      data_list: podcast_genre_test_data,
      media_description: "media_description"
    });
    var document_render = ReactTestUtils.renderIntoDocument(podcast_component);
    var no_filter_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
    expect(no_filter_matches).toEqual(7, 'No filter should lead to 7 matches');
    var select = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'PODCAST-SELECT');
    ReactTestUtils.Simulate.change(select, {
      target: {
        value: 'audiobook'
      }
    });
    var story_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
    expect(story_matches).toEqual(2, 'There are 2 audiobooks');
    var clear = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'CLEAR-TEXT');
    ReactTestUtils.Simulate.click(clear);
    var clear_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
    expect(clear_matches).toEqual(7, 'Clear should lead to 7 matches');
    var filter_input = reactTestHelpers.oneReactByClass(document_render, 'TEXT-FILTER');
    ReactTestUtils.Simulate.change(filter_input, {
      target: {
        value: 'zxcvxcvxzcv'
      }
    });
    var actual_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
    expect(actual_matches).toEqual(0, ` for 'zxcvxcvxzcv' matches`);
    ReactTestUtils.Simulate.click(clear);
    var clear_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
    expect(clear_matches).toEqual(7, 'Clear should lead to 7 matches');
  });
});