"use strict";

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

var React = require('react');
var Option = require('../Option');

var KindSelect = function (_React$Component) {
    _inherits(KindSelect, _React$Component);

    function KindSelect(props) {
        _classCallCheck(this, KindSelect);

        var _this = _possibleConstructorReturn(this, (KindSelect.__proto__ || Object.getPrototypeOf(KindSelect)).call(this, props));

        _this.className = _this.props.className;
        _this.selectByKind = _this.selectByKind.bind(_this); // <select onChange={this.selectByKind}
        return _this;
    }

    _createClass(KindSelect, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            Option;
        }
    }, {
        key: 'selectByKind',
        value: function selectByKind(event) {
            var select_text = event.target.value;
            this.props.cb_PodcastComponent_filterByKind(select_text);
        }
    }, {
        key: 'render',
        value: function render() {
            var select_class_name = this.className;
            return React.createElement('select', { onChange: this.selectByKind,
                className: select_class_name,
                value: this.props.category_choice }, React.createElement(Option, { category: 'All Kinds',
                hidden_category: '',
                key: 'kind_all' }), React.createElement(Option, { category: 'Audiobook',
                hidden_category: 'audiobook',
                key: 'kind_audiobook' }), React.createElement(Option, { category: 'Audiobook/Readalong',
                hidden_category: 'audiobook/readalong',
                key: 'kind_audiobook_readalong' }), React.createElement(Option, { category: 'New Releases/Recent Arrivals',
                hidden_category: 'new releases/recent arrivals',
                key: 'kind_new_releases_recent_arrivals' }), React.createElement(Option, { category: 'Readalong',
                hidden_category: 'readalong',
                key: 'kind_readalong' }), React.createElement(Option, { category: 'Talk To',
                hidden_category: 'talk to',
                key: 'kind_talk_to' }), React.createElement(Option, { category: 'Topic',
                hidden_category: 'topic',
                key: 'kind_topic' }));
        }
    }]);

    return KindSelect;
}(React.Component);

module.exports = KindSelect;