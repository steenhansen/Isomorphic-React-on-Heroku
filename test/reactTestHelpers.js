'use strict';

require('../server-funcs/rootAppRequire');
rootAppRequire('mediaServer/modules/base/miscMethods');
var mongoose = require('mongoose');
var fs = require('fs');
var ReactDOM = require('react-dom');



//var ReactTestUtils = require('react-addons-test-utils');

var ReactTestUtils = require('react-dom/test-utils');




var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
global.Method_logger = rootAppRequire('mediaServer/modules/base/MethodLogger')(
  'logs',
  'test'
);

var reactTestHelpers = {
  SHOW_ALL_ROWS_IN_SET_HEIGHT: 99999,

  removeHtmlComments: function (html_string) {
    var no_comment = html_string.replace(/<!--(.*?)-->/g, '');
    return no_comment;
  },

  oneReactByClass: function (document_render, class_name) {
    var rendered_component = ReactTestUtils.findRenderedDOMComponentWithClass(
      document_render,
      class_name
    );
    var component_node = ReactDOM.findDOMNode(rendered_component);
    return component_node;
  },

  oneReactByClassInner: function (document_render, class_name) {
    var rendered_component = ReactTestUtils.findRenderedDOMComponentWithClass(
      document_render,
      class_name
    );
    var component_node = ReactDOM.findDOMNode(rendered_component);
    var inner_html = component_node.innerHTML;
    var no_comment_html = reactTestHelpers.removeHtmlComments(inner_html);
    return no_comment_html;
  },

  reactClassCount: function (document_render, class_name) {
    var rendered_component = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      document_render,
      class_name
    );
    var component_keys = Object.keys(rendered_component).length;
    return component_keys;
  }
};

module.exports = reactTestHelpers;
