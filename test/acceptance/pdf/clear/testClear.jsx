'use strict'
var expect = require('expect')

var React = require('react')
import ReactDOM from 'react-dom'
var ReactTestUtils = require('react-addons-test-utils')
var reactTestHelpers = rootAppRequire('test/reactTestHelpers')

var PdfComponent = rootAppRequire('mediaServer/react/js/pdf/PdfComponent')

var pdf_genre_test_data = require('./testClearData')

// nb, as the pdf component is small it can only show a max of 8 rows

describe('test/acceptance/pdf/clear/testClear.jsx', function () {
    it('[bubble bath] should filter', function () {


        var pdfs_count_obj ={pdfs_count:987654}
        var pdf_component = <PdfComponent
            data_list={pdf_genre_test_data}
              media_options={pdfs_count_obj}
            media_description="media_description"/>
      var document_render = ReactTestUtils.renderIntoDocument(pdf_component)
        var no_filter_matches = reactTestHelpers.reactClassCount(document_render, 'PDF-STORY')
        expect(no_filter_matches).toEqual(7, 'No filter should lead to 7 matches')
        
  
        var filter_input = reactTestHelpers.oneReactByClass(document_render, 'TEXT-FILTER')
        
        ReactTestUtils.Simulate.change(filter_input, {target: {value: 'zxcvxcvxzcv'}})
        var actual_matches = reactTestHelpers.reactClassCount(document_render, 'PDF-STORY')
        expect(actual_matches).toEqual(0, ` for 'zxcvxcvxzcv' matches`)
        

        var clear = ReactTestUtils.findRenderedDOMComponentWithClass(document_render, 'CLEAR-TEXT')
        var clear_node = ReactDOM.findDOMNode(clear)
        ReactTestUtils.Simulate.click(clear_node)
        var clear_matches = reactTestHelpers.reactClassCount(document_render, 'PDF-STORY')
        expect(clear_matches).toEqual(7, 'Clear should lead to 7 matches')
           
           
           
        var filter_input = reactTestHelpers.oneReactByClass(document_render, 'TEXT-FILTER')
        ReactTestUtils.Simulate.change(filter_input, {target: {value: 'of'}})
        var actual_matches = reactTestHelpers.reactClassCount(document_render, 'PDF-STORY')
        expect(actual_matches).toEqual(4, ` for 'of' matches`)
        
        ReactTestUtils.Simulate.click(clear_node)
        var clear_matches = reactTestHelpers.reactClassCount(document_render, 'PDF-STORY')
        expect(clear_matches).toEqual(7, 'Clear should lead to 7 matches')

    })
})
