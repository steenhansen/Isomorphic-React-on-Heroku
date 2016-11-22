webpackJsonp([1],{0:function(t,e,o){"use strict";window.onerror=function(t,e,o,n,r){["Message: "+t,"URL: "+e,"Line: "+o,"Column: "+n,"Error object: "+JSON.stringify(r)].join(" - ");return!0};var n=o(5),r=o(231),i=o(54),s=o(232),l=n.createFactory(s),a=window.PDF_MEDIA_PROPS_SCRIPT,c=l(a),u=r.PDF_REACT_CONTAINTER,f=document.getElementById(u);i.render(c,f)},232:function(t,e,o){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==("undefined"==typeof e?"undefined":s(e))&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof e?"undefined":s(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},l=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),a=o(223),c=o(233),u=o(235),f=o(5),p=o(222),d=o(236),_=o(237),h=function(t){function e(t){n(this,e);var o=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));o.site_url=t.site_url,o.story_count=t.data_list.length,o.pdfs_count=t.media_options.pdfs_count,o.search_columns=["book author","book title","pdf info 1","pdf country 1","pdf info 2","pdf country 2","pdf info 3","pdf country 3","pdf info 4","pdf country 4","pdf page count 1"];var i=t.data_list;return o.pdf_list=new u(i,o.search_columns),o.displayed_columns={pdf_text_cell:["episode_number","book author","first_name","last_name","book title","start_title","end_title","story link on wikipedia","author wikipedia entry","pdf link 1","pdf page count 1","pdf country 1","pdf info 1","pdf link 2","pdf page count 2","pdf country 2","pdf info 2","pdf link 3","pdf page count 3","pdf country 3","pdf info 3","pdf link 4","pdf page count 4","pdf country 4","pdf info 4"]},o.pdf_list.initialOrder(),o.state={associated_pdf_list:o.pdf_list},o}return i(e,t),l(e,[{key:"_pass_lint_",value:function(){}}]),l(e,[{key:"changeGrid",value:function(t){this.saveRestrictions(t);var e=this.pdf_list.initialOrder();if(""===this.filter_text)this.search_matches={};else{var o=this.pdf_list.filterDataSet(this.filter_text,e),n=o.filteredIndexes,r=o.search_matches;e=n,this.search_matches=r}""!==this.sort_column&&(e=this.pdf_list.sortIndexesByColumn(this.sort_column,this.sort_dir,e));var i="";if(this.record_cell_order_testing){var s=!0,l=!1,a=void 0;try{for(var c,u=e[Symbol.iterator]();!(s=(c=u.next()).done);s=!0){var f=c.value;i+=","+f}}catch(t){l=!0,a=t}finally{try{!s&&u.return&&u.return()}finally{if(l)throw a}}}this.TEST_EPISODE_ORDER=i,this.pdf_list.currentMap(e),this.setState({associated_pdf_list:this.pdf_list,table_width:this.table_width,table_height:this.table_height});var p=e.length;return p}},{key:"saveRestrictions",value:function(t){void 0!==t.table_width&&(this.table_width=t.table_width),void 0!==t.table_height&&(this.table_height=t.table_height),void 0!==t.filter_text&&(this.filter_text=t.filter_text),void 0!==t.sort_column&&(this.sort_column=t.sort_column),void 0!==t.sort_dir&&(this.sort_dir=t.sort_dir)}},{key:"clearAllFilters",value:function(){var t={filter_text:"",sort_column:"",sort_dir:""};this.number_matches=this.changeGrid(t);var e=this.refs.the_pdf_table._updateTableSize;clearTimeout(this._updateTimer),this._updateTimer=setTimeout(e,a.REACT_UPDATE_DELAY)}},{key:"_cssGeneration",value:function(){var t=a.SFF_DARK_BLUE,e="\n      .sort-pdf-page-count-1 { color: #"+t+"; font-weight: bold; }\n      .search-highlight       { color: #"+t+"; font-weight: bold; }\n\n      .first-book-author      { color: #"+t+"; font-weight: bold; }\n      .last-book-author       { color: #"+t+"; font-weight: bold; font-size: 120%; }\n\n      .start-book-title       { color: #"+t+"; font-weight: bold; }\n      .end-book-title         { color: #"+t+"; font-weight: bold; font-size: 120%; }\n\n       ";return e}},{key:"render",value:function(){var t=this.generateCss(),e=t.pdf_clear_css,o=t.clear_hover_css,n=t.column_sort_css,r=this.search_matches,i=this.numberMatchesLong();if(this.pdfs_count)var s=" There are "+this.story_count+" stories with "+this.pdfs_count+" unique PDFs";else var s=" There are "+this.story_count+" stories";return f.createElement("div",{id:"pdf-media-container"},f.createElement(_,{pdf_description:this.media_description}),s,f.createElement("br",null),f.createElement("style",{scoped:!0,dangerouslySetInnerHTML:{__html:o}}),f.createElement("button",{onClick:this.clearAllFilters,style:e,className:"pdf-clear CLEAR-TEXT"},"Reset"),f.createElement("input",{onChange:this._onFilterChange,className:"TEXT-FILTER filter-text",value:this.filter_text,autoComplete:"off",placeholder:"Search ..."})," ",i,f.createElement("style",{scoped:!0,dangerouslySetInnerHTML:{__html:n}}),f.createElement(d,{cb_PdfComponent_titleSort:this._onSortChange}),f.createElement(c,{data:this.pdf_list,filter_text:this.filter_text,search_matches:r,ref:"the_pdf_table",media_container_name:"pdf-media-container",site_url:this.site_url,search_columns:this.search_columns,displayed_columns:this.displayed_columns,sort_column:this.sort_column}),f.createElement("div",{className:"TEST-EPISODE-ORDER"},this.TEST_EPISODE_ORDER))}}]),e}(p);t.exports=h},233:function(t,e,o){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==("undefined"==typeof e?"undefined":s(e))&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof e?"undefined":s(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},a=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),c=o(5),u=o(229),f=o(1),p=f.Column,d=f.Table,_=o(234),h=function(t){function e(t){n(this,e);var o=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.site_url=t.site_url,o.media_container_name=t.media_container_name,o}return i(e,t),a(e,[{key:"_pass_lint_",value:function(){PdfIdCell}},{key:"rowsMainCellWidth",value:function(){var t=0,e=5;return{number_rows:e,id_cell_width:t}}},{key:"render",value:function(){var t=this.state,e=t.init_discarded_row_height,o=t.row_count,n=t.table_width,r=t.table_height,i=t.text_cell_width,o=this.props.data.getSize();return c.createElement("div",null,c.createElement(d,l({rowHeight:e,rowsCount:o,headerHeight:0,touchScrollEnabled:!0,width:n,height:r,rowHeightGetter:this.getRowHeight},this.props),c.createElement(p,{columnKey:"pdf_text_column",cell:c.createElement(_,{data:this.props.data,filter_text:this.props.filter_text,search_matches:this.props.search_matches,search_columns:this.props.search_columns,site_url:this.site_url,displayed_columns:this.displayed_columns.pdf_text_cell,sort_column:this.props.sort_column}),flexGrow:1,width:i})))}}]),e}(u);t.exports=h},234:function(t,e,o){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==("undefined"==typeof e?"undefined":s(e))&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof e?"undefined":s(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},l=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),a=o(1),c=a.Cell,u=o(226),f=o(5),p=function(t){function e(t){n(this,e);var o=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.site_url=t.site_url,o}return i(e,t),l(e,[{key:"_pass_lint_",value:function(){}},{key:"render",value:function(){this.fixTheText();var t=this.displayed_data,e=t["story link on wikipedia"],o=t["author wikipedia entry"],n=t["book author"],r=t["book title"];if(e)var i='   <a href="'+e+'" target="_blank" >'+r+"</a> ";else var i=r;if(o)var s='   <a href="'+o+'" target="_blank" >'+n+"</a> ";else var s=n;var l=" "+i+" by "+s+" <br>";return l+=this.pdfLinks(),f.createElement(c,{className:"PDF-STORY"},f.createElement("div",{dangerouslySetInnerHTML:{__html:l}}))}},{key:"pdfLinks",value:function(){for(var t=this.site_url,e="",o=1;o<=4;o++)if(this.displayed_data["pdf link "+o]){var n=this.displayed_data["pdf link "+o],r=this.displayed_data["pdf page count "+o],i="pages";if("number"==typeof r){if(1===r)var i="page"}else if(r.indexOf(">1<")>-1)var i="page";var s=this.displayed_data["pdf info "+o],l=this.displayed_data["pdf country "+o],a=l.toLowerCase(),c="";a.indexOf("canada")>-1&&(c=' <img src="'+t+'ca.svg"  class="country-flag" >'),e+='<div style="margin-left:22px"><a href="'+n+'" target="_blank">\n                                       <i class="my-pdf fa fa-file-pdf-o"></i> '+c+r+" "+i+" "+s+" </a> </div>  "}return e}}]),e}(u);t.exports=p},235:function(t,e,o){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==("undefined"==typeof e?"undefined":s(e))&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof e?"undefined":s(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},l=o(227),a=function(t){function e(t,o){return n(this,e),r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,o))}return i(e,t),e}(l);t.exports=a},236:function(t,e,o){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==("undefined"==typeof e?"undefined":s(e))&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof e?"undefined":s(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},l=function(){function t(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,o,n){return o&&t(e.prototype,o),n&&t(e,n),e}}(),a=o(223),c=o(5),u=function(t){function e(t){n(this,e);var o=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.arrow_types={"-1":a.UP_ARROW_CHAR,1:a.DOWN_ARROW_CHAR},o.title_texts={episode_number:"Uploaded","book author_":"Author","book title_":"Title","pdf page count 1":"Pages"},o.sort_directions={episode_number:1,"book author_":1,"book title_":1,"pdf page count 1":1},o.current_titles=[],o.current_titles.episode_number="Uploaded"+o.arrow_types[1],o.resetAllSorts("episode_number"),o.clickEpisodeNumber=o.clickEpisodeNumber.bind(o),o.clickBookAuthor=o.clickBookAuthor.bind(o),o.clickBookTitle=o.clickBookTitle.bind(o),o.clickPageCount=o.clickPageCount.bind(o),o.state={current_titles:o.current_titles},o}return i(e,t),l(e,[{key:"resetAllSorts",value:function(t){for(var e in this.sort_directions)e!==t&&(this.current_titles[e]=this.title_texts[e]+" "+this.arrow_types[-1]+this.arrow_types[1])}},{key:"clickEpisodeNumber",value:function(){this.handleTitleClick("episode_number")}},{key:"clickBookAuthor",value:function(){this.handleTitleClick("book author_")}},{key:"clickBookTitle",value:function(){this.handleTitleClick("book title_")}},{key:"clickPageCount",value:function(){this.handleTitleClick("pdf page count 1")}},{key:"handleTitleClick",value:function(t){var e=this.sort_directions[t]*-1;this.sort_directions[t]=e,this.current_titles[t]=this.title_texts[t]+this.arrow_types[e],this.props.cb_PdfComponent_titleSort(t,e),this.resetAllSorts(t),this.setState({current_titles:this.current_titles})}},{key:"render",value:function(){var t={cursor:"pointer",padding:0,margin:3},e=a.SFF_DARK_BLUE,o=a.SFF_LIGHT_BLUE,n=" .pdf-sort { color: #"+o+"; font-size:1em }\n                     .pdf-sort:hover { color: #"+e+" }          ",r=this.current_titles,i=r.episode_number,s=r["book author_"],l=r["book title_"],u=r["pdf page count 1"];return c.createElement("div",null,c.createElement("style",{scoped:!0,dangerouslySetInnerHTML:{__html:n}}),c.createElement("button",{className:"EPISODE-SORT pdf-sort",onClick:this.clickEpisodeNumber,style:t},i),c.createElement("button",{className:"TITLE-SORT pdf-sort",onClick:this.clickBookTitle,style:t},l),c.createElement("button",{className:"AUTHOR-SORT pdf-sort",onClick:this.clickBookAuthor,style:t},s),c.createElement("button",{className:"PAGE-SORT pdf-sort",onClick:this.clickPageCount,style:t},u))}}]),e}(c.Component);t.exports=u},237:function(t,e,o){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==("undefined"==typeof e?"undefined":s(e))&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof e?"undefined":s(e)));t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},l=o(224),a=function(t){function e(t){n(this,e);var o=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return o.the_description=t.pdf_description,o}return i(e,t),e}(l);t.exports=a}});