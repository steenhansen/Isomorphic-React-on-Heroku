'use strict';


rootAppRequire('test/initDomBeforeReact');

var rsd_sort_test_data = require('./testFilterData');

var RsdComponent = rootAppRequire('mediaServer/react/js/rsd/RsdComponent');
var testHelpers = rootAppRequire('test/testHelpers');
var reactTestHelpers = rootAppRequire('test/reactTestHelpers');

var React = require('react');
//var ReactTestUtils = require('react-addons-test-utils');
var ReactTestUtils = require('react-dom/test-utils');


var expect = require('expect');

describe('test/acceptance/rsd/filter/testFilter.jsx', function () {
    it('[voting vixen] should filter number of records', function () {
        var show_all_rows_in_set_height = reactTestHelpers.SHOW_ALL_ROWS_IN_SET_HEIGHT;
        var rsd_component = <RsdComponent
            data_list={rsd_sort_test_data}
            media_description="media_description"
            table_height_px={show_all_rows_in_set_height}
            record_cell_order_testing={true}/>;
        var document_render = ReactTestUtils.renderIntoDocument(rsd_component);

        var filter_input = reactTestHelpers.oneReactByClass(document_render, 'TEXT-FILTER');

        // nb, as the rsd component is small it can only show a max of 8 rows

        var filter_matches = {
            'z': 3
            , 'v': 3
            , 'm': 7
            , 'x': 0
            , 'w': 6
            , 'p': 5
            , 'y': 6
            , 'thu': 2
            , 'library': 1
            , 'zxcvxcvxzcv': 0
            , 'all': 2
        };

        for (var match_str in filter_matches) {
            var expected_matches = filter_matches[match_str];
            ReactTestUtils.Simulate.change(filter_input, {target: {value: match_str}});
            var actual_matches = reactTestHelpers.reactClassCount(document_render, 'RSD-EPISODE');
            expect(actual_matches).toEqual(expected_matches, ` for ${match_str} matches`);

        }

    });
});

