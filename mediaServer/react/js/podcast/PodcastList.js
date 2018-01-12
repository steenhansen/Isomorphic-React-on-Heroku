'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);if (parent === null) {
            return undefined;
        } else {
            return get(parent, property, receiver);
        }
    } else if ("value" in desc) {
        return desc.value;
    } else {
        var getter = desc.get;if (getter === undefined) {
            return undefined;
        }return getter.call(receiver);
    }
};

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

var MediaList = require('../MediaList');

var PodcastList = function (_MediaList) {
    _inherits(PodcastList, _MediaList);

    function PodcastList(props, search_columns) {
        _classCallCheck(this, PodcastList);

        return _possibleConstructorReturn(this, (PodcastList.__proto__ || Object.getPrototypeOf(PodcastList)).call(this, props, search_columns));
    }

    _createClass(PodcastList, [{
        key: 'bookAndAuthorsOnly',
        value: function bookAndAuthorsOnly(sortIndexes) {
            var selected_indexes = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = sortIndexes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var row_number = _step.value;

                    var kind_type = this.getOriginalObjectAt(row_number)['kind'];
                    var lower_kind_type = kind_type.toLowerCase();
                    if (lower_kind_type === 'audiobook' || lower_kind_type === 'readalong' || lower_kind_type === 'audiobook/readalong') {
                        selected_indexes.push(row_number);
                    }
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

            return selected_indexes;
        }
    }, {
        key: 'selectDataSet',
        value: function selectDataSet(kind_choice_filter, sortIndexes) {
            return _get(PodcastList.prototype.__proto__ || Object.getPrototypeOf(PodcastList.prototype), 'selectDataSet', this).call(this, kind_choice_filter, sortIndexes, 'kind');
        }
    }]);

    return PodcastList;
}(MediaList);

module.exports = PodcastList;