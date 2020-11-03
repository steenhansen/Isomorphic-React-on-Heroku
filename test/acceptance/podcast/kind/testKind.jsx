'use strict';

rootAppRequire('test/initDomBeforeReact');   // this makes the document
var expect = require('expect');

var React = require('react');
//import ReactDOM from 'react-dom';

//var ReactDom= require('react-dom');

//var ReactTestUtils = require('react-addons-test-utils');
//var ReactTestUtils = require("react-addons-test-utils");

//var ReactTestUtils = require('react-dom/test-utils');

var ReactTestUtils = require('react-dom/test-utils');


var reactTestHelpers = rootAppRequire('test/reactTestHelpers');

var PodcastComponent = rootAppRequire('mediaServer/react/js/podcast/PodcastComponent');

var podcast_kind_test_data = require('./testKindData');

// nb, as the podcast component is small it can only show a max of 8 rows

describe('test/acceptance/podcast/kind/testKind.jsx', function () {
    it('[boney m] should filter', function () {

        var podcast_component = <PodcastComponent
            data_list={podcast_kind_test_data}
            media_description="media_description"/>;
        var document_render = ReactTestUtils.renderIntoDocument(podcast_component);

        var no_filter_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
        expect(no_filter_matches).toEqual(7, 'No filter should lead to 7 matches');
        
        var select = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'PODCAST-SELECT');
        
        
        ReactTestUtils.Simulate.change(select, {target: {value: 'audiobook'}});
        var story_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
        expect(story_matches).toEqual(2, 'There are 2 audiobooks');
        
        ReactTestUtils.Simulate.change(select, {target: {value: 'readalong'}});
        var poem_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
        expect(poem_matches).toEqual(3, 'There are 3 readalongs');
        
        ReactTestUtils.Simulate.change(select, {target: {value: 'audiobook/readalong'}});
        var other_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
        expect(other_matches).toEqual(1, 'There is 1 audiobook/readalong');
        
        var clear = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'CLEAR-TEXT');
        
        ReactTestUtils.Simulate.click(clear);
        var clear_matches = reactTestHelpers.reactClassCount(document_render, 'PODCAST-EPISODE');
        expect(clear_matches).toEqual(7, 'Clear should lead to 7 matches');
    });
});
