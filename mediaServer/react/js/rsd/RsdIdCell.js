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

var FixedDataTable = require('fixed-data-table-2');
var MediaIdCell = require('../MediaIdCell');
var Cell = FixedDataTable.Cell;

var React = require('react');

var RsdIdCell = function (_MediaIdCell) {
    _inherits(RsdIdCell, _MediaIdCell);

    function RsdIdCell(props) {
        _classCallCheck(this, RsdIdCell);

        return _possibleConstructorReturn(this, (RsdIdCell.__proto__ || Object.getPrototypeOf(RsdIdCell)).call(this, props));
    }

    _createClass(RsdIdCell, [{
        key: '_pass_lint_',
        value: function _pass_lint_() {
            Cell;
            React;
        }
    }, {
        key: 'render',
        value: function render() {
            var my_visible_text = this.deriveEpisodeM3MmSS();
            return React.createElement(Cell, { className: 'RSD-EPISODE' }, React.createElement('div', { dangerouslySetInnerHTML: { __html: my_visible_text } }));
        }
    }]);

    return RsdIdCell;
}(MediaIdCell);

module.exports = RsdIdCell;