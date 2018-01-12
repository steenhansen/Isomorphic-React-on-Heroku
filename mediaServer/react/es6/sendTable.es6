'use strict';

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
var jsonfile = require('jsonfile');

var send_table = {
    chunkhashUrl: function chunkhashUrl(js_file_parts, bundle_name, host_url) {
        var chunkhash_url = '//' + host_url + '/' + bundle_name + '.' + js_file_parts[bundle_name] + '.js';
        return chunkhash_url;
    },

    encaseTable: function encaseTable(type_bundle, table_html, host_url, device_type) {
        var rev_css_chunks = fromAppRoot('rev-manifest_css.json');
        var css_file_parts = jsonfile.readFileSync(rev_css_chunks);
        var chunkhash_css_url = '//' + host_url + '/' + css_file_parts['styles.min.css'];
        var head_html = '<link rel="stylesheet" href="https://opensource.keycdn.com/fontawesome/4.6.3/font-awesome.min.css">\n                         <link rel="stylesheet" href="' + chunkhash_css_url + '">';
        var webpack_js_chunks = fromAppRoot('webpack_js_chunks.json');
        var js_file_parts = jsonfile.readFileSync(webpack_js_chunks);
        var media_1st_bundle = this.chunkhashUrl(js_file_parts, 'media_1st_bundle', host_url);
        var hashed_type_bundle = this.chunkhashUrl(js_file_parts, type_bundle, host_url);
        var body_html = table_html + '\n                         <script src="//cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script>\n                         <script src="https://npmcdn.com/react@15.3.1/dist/react.min.js"></script>\n                         <script src="https://npmcdn.com/react-dom@15.3.1/dist/react-dom.min.js"></script>\n                         <script src="' + media_1st_bundle + '"></script>\n                         <script src="' + hashed_type_bundle + '"></script>';
        if (device_type === 'desktop_device') {
            var page_html = head_html + '\n                             ' + body_html;
        } else {
            var page_html = '<!doctype html>\n                             <html lang="en-US">\n                                <head>\n                                     <link rel="Shortcut Icon" href="/favicon.ico"/>\n                                     <meta charset="utf-8">\n                                     <title>Reading, Short and Deep : SFFaudio</title>\n                                     <meta name=viewport content="width=device-width, initial-scale=1">\n                                     ' + head_html + '\n                                </head>\n                                <body>\n                                     ' + body_html + '\n                                </body>\n                             </html>';
        }
        return page_html;
    },

    encaseAll: function encaseAll(rsd_html, podcast_html, pdf_html, host_url) {
        var rev_css_chunks = fromAppRoot('rev-manifest_css.json');
        var css_file_parts = jsonfile.readFileSync(rev_css_chunks);
        var chunkhash_css_url = '//' + host_url + '/' + css_file_parts['styles.min.css'];
        var head_html = '<link rel="stylesheet" href="https://opensource.keycdn.com/fontawesome/4.6.3/font-awesome.min.css">\n                         <link rel="stylesheet" href="' + chunkhash_css_url + '">';
        var webpack_js_chunks = fromAppRoot('webpack_js_chunks.json');
        var js_file_parts = jsonfile.readFileSync(webpack_js_chunks);

        var media_1st_bundle = this.chunkhashUrl(js_file_parts, 'media_1st_bundle', host_url);
        var rsd_2nd_bundle = this.chunkhashUrl(js_file_parts, 'rsd_2nd_bundle', host_url);
        var podcast_3rd_bundle = this.chunkhashUrl(js_file_parts, 'podcast_3rd_bundle', host_url);
        var pdf_4th_bundle = this.chunkhashUrl(js_file_parts, 'pdf_4th_bundle', host_url);

        var body_html = ' ' + rsd_html + ' ' + podcast_html + ' ' + pdf_html + '\n                         <script src="//cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script>\n                         <script src="https://npmcdn.com/react@15.3.1/dist/react.min.js"></script>\n                         <script src="https://npmcdn.com/react-dom@15.3.1/dist/react-dom.min.js"></script>\n                         <script src="' + media_1st_bundle + '"></script>\n                         <script src="' + rsd_2nd_bundle + '"></script>\n                         <script src="' + podcast_3rd_bundle + '"></script>\n                         <script src="' + pdf_4th_bundle + '"></script>';
        var page_html = head_html + '\n                             ' + body_html;
        return page_html;
    },

    marshallServerHtml: function marshallServerHtml(media_type, props_array, desk_mobile_template, host_url, media_information) {
        var media_options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

        var DOM = React.DOM;
        var div = DOM.div;
        var script = DOM.script;
        var create_server_media_table = rootAppRequire('mediaServer/react/js/media_server');
        var server_media_component = create_server_media_table.createServerMediaComponent(media_type);
        var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(media_information);
        var expected_file = media_file_loc.htmlFiles(desk_mobile_template);
        var site_url = '//' + host_url + '/';
        var media_description = miscMethods.getFillSwig(expected_file, { site_url: site_url });
        var props = {
            data_list: props_array, /// different name, real_items
            media_description: media_description,
            record_cell_order_testing: false,
            media_options: media_options,
            site_url: site_url
        };

        var the_component = server_media_component(props);
        var the_media_1 = ReactDOMServer.renderToString(the_component);
        var div_name = create_server_media_table.getMediaContainerId(media_type);
        var content_div = div({ id: div_name, dangerouslySetInnerHTML: { __html: the_media_1 } });
        if (media_type === 'rsd') {
            var media_props_script = script({ dangerouslySetInnerHTML: { __html: 'var RSD_MEDIA_PROPS_SCRIPT = ' + miscMethods.safeStringify(props) } });
        } else if (media_type === 'pdf') {
            var media_props_script = script({ dangerouslySetInnerHTML: { __html: 'var PDF_MEDIA_PROPS_SCRIPT = ' + miscMethods.safeStringify(props) } });
        } else if (media_type === 'podcast') {
            var media_props_script = script({ dangerouslySetInnerHTML: { __html: 'var PODCAST_MEDIA_PROPS_SCRIPT = ' + miscMethods.safeStringify(props) } });
        } else {
            console.log('ERROR - no media type in marshallServerHtml');
        }
        var html = ReactDOMServer.renderToStaticMarkup(div(null, content_div, media_props_script));
        return html;
    }

};

module.exports = send_table;