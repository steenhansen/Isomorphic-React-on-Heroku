'use strict';

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods');
var jsonfile = require('jsonfile');
var shared_constants = require('../sharedConstants');
var red_speaker_symbol = shared_constants.FONT_AWESOME_CDN;   

var shared_constants = require('../sharedConstants');
var css_chunk_path = shared_constants.CSS_CHUNK_PATH; 
var js_chunk_path = shared_constants.JS_CHUNK_PATH; 

var send_table = {
    chunkhashUrl: function (js_file_parts, bundle_name, host_url) {
        var chunkhash_url = '//' + host_url + '/' + js_file_parts[bundle_name];
        return chunkhash_url;
    },

    encaseTable: function (type_bundle, table_html, host_url, device_type, page_title) {
        var rev_css_chunks = fromAppRoot(css_chunk_path);
  
  
        var css_file_parts = jsonfile.readFileSync(rev_css_chunks);
        var chunkhash_css_url = '//' + host_url + '/' + css_file_parts['styles.min.css'];
        
        
        
        var head_html = `<link  rel="stylesheet" href="${red_speaker_symbol}"  >
                         <link  rel="stylesheet" href="${chunkhash_css_url}"  >`;

        var webpack_js_chunks = fromAppRoot(js_chunk_path);

        var js_file_parts = jsonfile.readFileSync(webpack_js_chunks);

             
        var vendors_js = this.chunkhashUrl(js_file_parts, 'vendors.js', host_url);
        var hashed_type_bundle = this.chunkhashUrl(js_file_parts, type_bundle, host_url);
        var body_html = `${table_html}
                             <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script>
                                      <script src="https://unpkg.com/react@17.0.0/umd/react.production.min.js"></script>  
                                   <script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.production.min.js"></script>
                                   
       

                                   <script src="${hashed_type_bundle}"></script>  

  
       

<script   src="${vendors_js}"></script> 

                                           `;
        if (device_type === 'desktop_device') {
            var page_html = `${head_html}
                             ${body_html}`;
        } else {
            var page_html = `<!doctype html>
                             <html lang="en-US">
                                <head>
                                     <link rel="Shortcut Icon" href="/favicon.ico"/>
                                     <meta charset="utf-8">
                                     <title>${page_title}</title>
                                     <meta name=viewport content="width=device-width, initial-scale=1">
                                     ${head_html}
                                </head>
                                <body>
                                     ${body_html}
                                </body>
                             </html>`;
        }
        return page_html;
    },

    encaseAll: function (rsd_html, podcast_html, pdf_html, host_url) {
        var rev_css_chunks = fromAppRoot(css_chunk_path);



        var css_file_parts = jsonfile.readFileSync(rev_css_chunks);
        var chunkhash_css_url = '//' + host_url + '/' + css_file_parts['styles.min.css'];
        var head_html = `<link rel="stylesheet" href="${red_speaker_symbol}">
                         <link rel="stylesheet" href="${chunkhash_css_url}">`;
        var webpack_js_chunks = fromAppRoot(js_chunk_path);
        var js_file_parts = jsonfile.readFileSync(webpack_js_chunks);

        var runtime_js = this.chunkhashUrl(js_file_parts, 'runtime', host_url);                    
        var vendors_js = this.chunkhashUrl(js_file_parts, 'vendors', host_url);

        var rsd_2nd_bundle = this.chunkhashUrl(js_file_parts, 'rsd_2nd_bundle', host_url);
        var podcast_3rd_bundle = this.chunkhashUrl(js_file_parts, 'podcast_3rd_bundle', host_url);
        var pdf_4th_bundle = this.chunkhashUrl(js_file_parts, 'pdf_4th_bundle', host_url);

        var body_html = ` ${rsd_html} ${podcast_html} ${pdf_html}
                         <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script>
                         <script src="https://unpkg.com/react@17.0.0/umd/react.production.min.js"></script>
                         <script src="https://unpkg.com/react-dom@17.0.0/umd/react-dom.production.min.js"></script> 
                         <script src="${runtime_js}"></script>
                         <script src="${vendors_js}"></script>
                         <script src="${rsd_2nd_bundle}"></script>
                         <script src="${podcast_3rd_bundle}"></script>
                         <script src="${pdf_4th_bundle}"></script>`;
        var page_html = `${head_html} ${body_html}`;
        return page_html;
    },

    marshallServerHtml: function (media_type, props_array, desk_mobile_template, host_url, media_information, media_options = {}) {
        var create_server_media_table = rootAppRequire('mediaServer/react/js/media_server');
        var server_media_component = create_server_media_table.createServerMediaComponent(media_type);
        var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(media_information);
        var expected_file = media_file_loc.htmlFiles(desk_mobile_template);
        var site_url = '//' + host_url + '/';
        var media_description = miscMethods.getFillSwig(expected_file, {site_url: site_url});
        var props = {
            data_list: props_array,            /// different name, real_items
            media_description: media_description,
            record_cell_order_testing: false,
            media_options: media_options,
            site_url: site_url
        };
        var the_component = server_media_component(props);
        var the_media_1 = ReactDOMServer.renderToString(the_component);
        var div_name = create_server_media_table.getMediaContainerId(media_type);

        var content_div = React.createElement('div', {id: div_name, dangerouslySetInnerHTML: {__html: the_media_1}});
        if (media_type === 'rsd') {
            var media_props_script = React.createElement('script', {dangerouslySetInnerHTML: {__html: 'var RSD_MEDIA_PROPS_SCRIPT = ' + miscMethods.safeStringify(props)}});
        } else if(media_type === 'pdf') {
            var media_props_script = React.createElement('script', {dangerouslySetInnerHTML: {__html: 'var PDF_MEDIA_PROPS_SCRIPT = ' + miscMethods.safeStringify(props)}});
        } else if(media_type === 'podcast') {
            var media_props_script = React.createElement('script', {dangerouslySetInnerHTML: {__html: 'var PODCAST_MEDIA_PROPS_SCRIPT = ' + miscMethods.safeStringify(props)}});
        } else{
            console.log('ERROR - no media type in marshallServerHtml');
        }      
        var html_a = ReactDOMServer.renderToStaticMarkup( content_div);
        var html_b = ReactDOMServer.renderToStaticMarkup( media_props_script);
        var html = html_a + html_b;
        return html;
    }

};

module.exports = send_table;

