'use strict'

var React = require('react')
var ReactDOMServer = require('react-dom/server')
var miscMethods = rootAppRequire('mediaServer/modules/base/miscMethods')
var jsonfile = require('jsonfile')
var react_constants = require('./reactConstants')

var send_table = {
    chunkhashUrl: function (js_file_parts, bundle_name, host_url) {
        var chunkhash_url = '//' + host_url + '/' + bundle_name + '.' + js_file_parts[bundle_name] + '.js'
        return chunkhash_url
    },
    encaseTable: function (table_html, host_url, device_type) {
        var rev_css_chunks = fromAppRoot('rev-manifest_css.json')
        var css_file_parts = jsonfile.readFileSync(rev_css_chunks)
        var chunkhash_css_url = '//' + host_url + '/' + css_file_parts['styles.min.css']
        var head_html = `<link rel="stylesheet" href="https://opensource.keycdn.com/fontawesome/4.6.3/font-awesome.min.css">
                         <link rel="stylesheet" href="${chunkhash_css_url}">`
        var webpack_js_chunks = fromAppRoot('webpack_js_chunks.json')
        var js_file_parts = jsonfile.readFileSync(webpack_js_chunks)
        var media_1st_bundle = this.chunkhashUrl(js_file_parts, 'media_1st_bundle', host_url)
        var rsd_2nd_bundle = this.chunkhashUrl(js_file_parts, 'rsd_2nd_bundle', host_url)
        var body_html = `${table_html}
                         <script src="//cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"></script>
                         <script src="https://npmcdn.com/react@15.3.1/dist/react.min.js"></script>
                         <script src="https://npmcdn.com/react-dom@15.3.1/dist/react-dom.min.js"></script>
                         <script src="${media_1st_bundle}"></script>
                         <script src="${rsd_2nd_bundle}"></script>`
        if (device_type==='desktop_device'){
            var page_html = `${head_html}
                             ${body_html}`
        }else{
            var favicon_url = '//' + host_url + '/favicon.ico'
            var page_html = `<!doctype html>
                             <html lang="en-US">
                                <head>
                                     <link rel="Shortcut Icon" href="${favicon_url}"/>
                                     <meta charset="utf-8">
                                     <title>Reading, Short and Deep : SFFaudio</title>
                                     <meta name=viewport content="width=device-width, initial-scale=1">
                                     ${head_html}
                                </head>
                                <body>
                                     ${body_html}
                                </body>
                             </html>`
        }
        return page_html
    },



    marshallServerHtml: function (media_type, props_array, desk_mobile_template, device_type) {
        var DOM = React.DOM
        var div = DOM.div
        var script = DOM.script

        var create_server_media_table = rootAppRequire('mediaServer/react/js/rsd_server')
        var server_media_component = create_server_media_table.createServerMediaComponent(media_type)
        var rsd_information = rootAppRequire('mediaServer/modules/rsdInformation')
        var media_file_loc = rootAppRequire('mediaServer/modules/base/mediaFileLoc')(rsd_information)
        var expected_file = media_file_loc.htmlFiles(desk_mobile_template)
//        var data_imgs = fromAppRoot('img_data_uris.json')
//        var data_img_parts = jsonfile.readFileSync(data_imgs)
    //    var rsd_logo_url = data_img_parts['ReadingShortAndDeepLogo200x200.jpg'] // dataUri
        var rsd_logo_url = '/' + react_constants.IMG_LOGO
        var media_description = miscMethods.getFillSwig(expected_file, {rsd_logo_url: rsd_logo_url})
        var props = {
            data_list: props_array,
            media_description: media_description,
            device_type: device_type,
            record_cell_order_testing: false
        }
        var rsd_component = server_media_component(props)
        var the_media_1 = ReactDOMServer.renderToString(rsd_component)
        var div_name = create_server_media_table.div_name
        var content_div = div({id: div_name, dangerouslySetInnerHTML: {__html: the_media_1}})
        var media_props_script = script({dangerouslySetInnerHTML: {__html: 'var MEDIA_PROPS_SCRIPT = ' + miscMethods.safeStringify(props)}})
        var html = ReactDOMServer.renderToStaticMarkup(div(null, content_div, media_props_script))
        return html
    }

}

module.exports = send_table

