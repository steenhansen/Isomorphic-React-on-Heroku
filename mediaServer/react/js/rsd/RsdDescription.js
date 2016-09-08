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

var RsdDescription = function (_React$Component) {
    _inherits(RsdDescription, _React$Component);

    function RsdDescription(props) {
        _classCallCheck(this, RsdDescription);

        var _this = _possibleConstructorReturn(this, (RsdDescription.__proto__ || Object.getPrototypeOf(RsdDescription)).call(this, props));

        _this.rsd_description = props['rsd_description'];
        return _this;
    }

    _createClass(RsdDescription, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._updateTableSize();
            if (window.addEventListener) {
                window.addEventListener('resize', this._onResizeWindow, false);
            } else if (window.attachEvent) {
                window.attachEvent('onresize', this._onResizeWindow);
            } else {
                window.onresize = this._onResizeWindow;
            }
        }
    }, {
        key: '_onResizeWindow',
        value: function _onResizeWindow() {
            clearTimeout(this._updateTimer);
            this._updateTimer = setTimeout(this._updateTableSize, 16);
        }
    }, {
        key: '_updateTableSize',
        value: function _updateTableSize() {}
    }, {
        key: 'render',
        value: function render() {
            var rsd_description = this.rsd_description;
            return React.createElement('div', { dangerouslySetInnerHTML: { __html: rsd_description } });
        }
    }]);

    return RsdDescription;
}(React.Component);

module.exports = RsdDescription;