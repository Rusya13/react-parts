"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckBox = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBox = exports.CheckBox = function (_React$Component) {
    _inherits(CheckBox, _React$Component);

    function CheckBox() {
        _classCallCheck(this, CheckBox);

        return _possibleConstructorReturn(this, (CheckBox.__proto__ || Object.getPrototypeOf(CheckBox)).apply(this, arguments));
    }

    _createClass(CheckBox, [{
        key: "onClickHandler",
        value: function onClickHandler(e) {
            var o = {};
            o[this.props.name] = this.input.checked;
            this.props.onClickHandler(o);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                checked = _props.checked,
                type = _props.type,
                disabled = _props.disabled,
                label = _props.label,
                size = _props.size;


            var className = 'rp-checkbox reactParts__checkbox-wrap';

            if (type === 'button') className += ' button';
            if (checked) className += ' checked';
            if (disabled) className += ' disabled';
            if (size) className += " rp-checkbox--" + size;

            return _react2.default.createElement(
                "label",
                { className: className },
                _react2.default.createElement(
                    "div",
                    { className: "reactParts__checkbox-input-new" },
                    _react2.default.createElement("input", {
                        type: "checkbox",
                        checked: this.props.checked,
                        ref: function ref(input) {
                            _this2.input = input;
                        },
                        disabled: this.props.disabled,
                        className: "reactParts__checkbox-input",
                        onChange: this.onClickHandler.bind(this)
                    })
                ),
                _react2.default.createElement(
                    "div",
                    { className: "reactParts__checkbox-label" },
                    label
                )
            );
        }
    }]);

    return CheckBox;
}(_react2.default.Component);

CheckBox.propTypes = {
    name: _propTypes2.default.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    label: _propTypes2.default.string,
    size: _propTypes2.default.string,
    checked: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    onClickHandler: _propTypes2.default.func.isRequired,
    type: _propTypes2.default.oneOf(["normal", "button"])
};