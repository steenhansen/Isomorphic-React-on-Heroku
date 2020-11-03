'use strict';

// jsx to ensure es6 to js compile, even though no ui


var DataList = require('./DataList');
var shared_methods = require('../sharedMethods');

class MediaList extends DataList {
    constructor(props, search_columns) {
        super(props, search_columns);
    }

    bookTitleSort(media_record, start_articles_reg_ex) {
        let book_title = media_record['book title'].replace(/(“|”)/g, '"');  
        var book_articles = book_title.split(start_articles_reg_ex);
        if (book_articles.length > 1) {
            media_record['start_title'] = book_articles[1];
            media_record['end_title'] = book_articles[2];
        } else {
            media_record['start_title'] = '';
            media_record['end_title'] = book_articles[0];
        }
        media_record['book title_'] = media_record['end_title'].toLowerCase();
    }

    prepareIndexSet(default_sort_indexes) {
        var index_number = 0;
        var start_articles_reg_ex = new RegExp(/^(a "|an "|the "|"|a |an |the )/i); //NB ignore these startings of titles
        var episode_digits = 0;
        for (var media_record of this._indexed_access_table) {
            default_sort_indexes.push(index_number);
            this.bookTitleSort(media_record, start_articles_reg_ex);
            this.bookAuthorSort(media_record);
            this.timeLengthShorten(media_record);
            if (episode_digits === 0) {
                var first_id = media_record['episode number'];
                episode_digits = shared_methods.sizeOfLargestId(first_id);
            }
            var id_digits = shared_methods.leadingZerosDigits(episode_digits, media_record['episode number']);
            media_record['episode_number'] = id_digits;
            index_number++;
        }
        return default_sort_indexes;
    }

    bookAuthorSort(media_record) {
        var name_pieces = media_record['book author'].split(' ');
        if (name_pieces[0].toLowerCase() === 'the') {
            var first_name = name_pieces.shift();
            var last_name = name_pieces.join(' ');
        } else {
            var last_name = name_pieces.pop();
            var first_name = name_pieces.join(' ');
        }
        media_record['first_name'] = first_name;
        media_record['last_name'] = last_name;
        media_record['book author_'] = last_name.toLowerCase();
    }

    timeLengthShorten(media_record) {
        if (media_record['hh:mm:ss']) {
            if (!media_record['hh_mm']) {
                var hh_mm_ss = media_record['hh:mm:ss'];
                 if (hh_mm_ss.startsWith('0')) {
                    media_record['hh_mm'] = '0:' + hh_mm_ss.substr(2,2);  // 0:51:52 => 0:51
                } else {
                    let time_array = hh_mm_ss.split(':');        // 12:34:56 => 12:34 
                      media_record['hh_mm'] = time_array[0] + ':' + time_array[1];
                }
                if (media_record['hh:mm:ss'].length === 7) {
                    media_record['hh:mm:ss'] = `0${hh_mm_ss}`;
                }               
                
                
                
            }

        }
    }

    selectDataSet(choice_filter, sortIndexes, filter_type) {
        var selected_indexes = [];
        for (var row_number of sortIndexes) {
            var filter_value = this.getOriginalObjectAt(row_number)[filter_type];
            var lower_type = filter_value.toLowerCase();
            if (lower_type === choice_filter) {
                selected_indexes.push(row_number);
            }
        }
        return selected_indexes;
    }

}

module.exports = MediaList;
