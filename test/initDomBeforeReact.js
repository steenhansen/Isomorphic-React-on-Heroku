/*

 https://github.com/facebook/react/issues/5046#issuecomment-146222515

 This file is run by mocha before babel, as in mocha.opts,

 If not used then get the below error
 Invariant Violation: dangerouslyReplaceNodeWithMarkup(...):
 Cannot render markup in a worker thread.
 Make sure `window` and `document` are available globally before requiring
 React when unit testing or use ReactDOMServer.renderToString() for server rendering.
 */

//var jsdom = require('jsdom');
//global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
//global.window = document.defaultView;
//global.navigator = window.navigator;

//global.window.innerHeight = 123456; // make sure ephemeral server test window is large



//import jsdom from 'jsdom'; 
var jsdom = require('jsdom');


const {JSDOM} = jsdom;  
const {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window;  
global.document = document;  
global.window = document.defaultView;

global.window.innerHeight = 123456; // make sure ephemeral server test window is large

global.navigator = window.navigator;


