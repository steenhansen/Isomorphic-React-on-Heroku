"use strict";

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

var React = require('react');
var Option = require('../Option');

var GenreSelect = function (_React$Component) {
    _inherits(GenreSelect, _React$Component);

    function GenreSelect(props) {
        _classCallCheck(this, GenreSelect);

        var _this = _possibleConstructorReturn(this, (GenreSelect.__proto__ || Object.getPrototypeOf(GenreSelect)).call(this, props));

        _this.className = _this.props.className;
        _this.selectByGenre = _this.selectByGenre.bind(_this); // <select onChange={this.selectByGenre}
        return _this;
    }

    _createClass(GenreSelect, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            Option;
        }
    }, {
        key: 'selectByGenre',
        value: function selectByGenre(event) {
            var select_text = event.target.value;
            this.props.cb_RsdComponent_filterByGenre(select_text);
        }
    }, {
        key: 'render',
        value: function render() {
            var select_class_name = this.className;
            return React.createElement('select', { onChange: this.selectByGenre,
                className: select_class_name,
                value: this.props.category_choice }, React.createElement(Option, { category: 'All Genres',
                hidden_category: '',
                key: 'genre_all' }), React.createElement(Option, { category: 'Poem',
                hidden_category: 'poem',
                key: 'genre_poem' }), React.createElement(Option, { category: 'Story',

                hidden_category: 'story',
                key: 'genre_story' }), React.createElement(Option, { category: 'Other',

                hidden_category: 'other',
                key: 'genre_other' }));
        }
    }]);

    return GenreSelect;
}(React.Component);

module.exports = GenreSelect;