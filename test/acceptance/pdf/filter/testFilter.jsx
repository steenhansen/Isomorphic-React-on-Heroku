'use strict';


rootAppRequire('test/initDomBeforeReact');

var pdf_sort_test_data = require('./testFilterData');

var PdfComponent = rootAppRequire('mediaServer/react/js/pdf/PdfComponent');
var testHelpers = rootAppRequire('test/testHelpers');
var reactTestHelpers = rootAppRequire('test/reactTestHelpers');

var React = require('react');
//var ReactTestUtils = require('react-addons-test-utils');
var ReactTestUtils = require('react-dom/test-utils');
var expect = require('expect');

describe('test/acceptance/pdf/filter/testFilter.jsx', function () {
    it('[tisk task] should filter number of records', function () {
        var show_all_rows_in_set_height = reactTestHelpers.SHOW_ALL_ROWS_IN_SET_HEIGHT;
        var pdfs_count_obj ={pdfs_count:987654};
        var pdf_component = <PdfComponent
            data_list={pdf_sort_test_data}
            media_description="media_description"
              media_options={pdfs_count_obj}
            record_cell_order_testing={true}/>;
        var document_render = ReactTestUtils.renderIntoDocument(pdf_component);

        var filter_input = reactTestHelpers.oneReactByClass(document_render, 'TEXT-FILTER');

        // nb, as the pdf component is small it can only show a max of 8 rows

        var filter_matches = {
            'z': 1
            , 'v': 4
            , 'm': 7
            , 'x': 1
            , 'w': 4
            , 'p': 3
            , 'y': 4
            , 'thu': 0
            , 'Scandal': 1
            , 'zxcvxcvxzcv': 0
            , 'of': 4
        };

        for (var match_str in filter_matches) {
            var expected_matches = filter_matches[match_str];
            ReactTestUtils.Simulate.change(filter_input, {target: {value: match_str}});
            var actual_matches = reactTestHelpers.reactClassCount(document_render, 'PDF-STORY');
            expect(actual_matches).toEqual(expected_matches, ` for ${match_str} matches`);
        }

    });
});

