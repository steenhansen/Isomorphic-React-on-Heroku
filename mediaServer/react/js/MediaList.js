'use strict';

// jsx to ensure es6 to js compile, even though no ui


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var DataList = require('./DataList');
var shared_methods = require('../sharedMethods');

var MediaList = function (_DataList) {
    _inherits(MediaList, _DataList);

    function MediaList(props, search_columns) {
        _classCallCheck(this, MediaList);

        return _possibleConstructorReturn(this, (MediaList.__proto__ || Object.getPrototypeOf(MediaList)).call(this, props, search_columns));
    }

    _createClass(MediaList, [{
        key: 'bookTitleSort',
        value: function bookTitleSort(media_record, start_articles_reg_ex) {
            var book_title = media_record['book title'].replace(/(“|”)/g, '"');
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
    }, {
        key: 'prepareIndexSet',
        value: function prepareIndexSet(default_sort_indexes) {
            var index_number = 0;
            var start_articles_reg_ex = new RegExp(/^(a "|an "|the "|"|a |an |the )/i); //NB ignore these startings of titles
            var episode_digits = 0;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._indexed_access_table[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var media_record = _step.value;

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
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return default_sort_indexes;
        }
    }, {
        key: 'bookAuthorSort',
        value: function bookAuthorSort(media_record) {
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
    }, {
        key: 'timeLengthShorten',
        value: function timeLengthShorten(media_record) {
            if (media_record['hh:mm:ss']) {
                if (!media_record['hh_mm']) {
                    var hh_mm_ss = media_record['hh:mm:ss'];
                    if (hh_mm_ss.startsWith('0')) {
                        media_record['hh_mm'] = '0:' + hh_mm_ss.substr(2, 2); // 0:51:52 => 0:51
                    } else {
                        var time_array = hh_mm_ss.split(':'); // 12:34:56 => 12:34 
                        media_record['hh_mm'] = time_array[0] + ':' + time_array[1];
                    }
                    if (media_record['hh:mm:ss'].length === 7) {
                        media_record['hh:mm:ss'] = '0' + hh_mm_ss;
                    }
                }
            }
        }
    }, {
        key: 'selectDataSet',
        value: function selectDataSet(choice_filter, sortIndexes, filter_type) {
            var selected_indexes = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = sortIndexes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var row_number = _step2.value;

                    var filter_value = this.getOriginalObjectAt(row_number)[filter_type];
                    var lower_type = filter_value.toLowerCase();
                    if (lower_type === choice_filter) {
                        selected_indexes.push(row_number);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return selected_indexes;
        }
    }]);

    return MediaList;
}(DataList);

module.exports = MediaList;