"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RadioGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Radio = require("../Radio/Radio");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = exports.RadioGroup = function (_React$Component) {
    _inherits(RadioGroup, _React$Component);

    function RadioGroup() {
        _classCallCheck(this, RadioGroup);

        return _possibleConstructorReturn(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
    }

    _createClass(RadioGroup, [{
        key: "onChange",
        value: function onChange(value) {
            //console.log( "RadioGroup onChange", value );
            var o = {};
            o[this.props.name] = value;
            this.props.onChange(o);
        }
    }, {
        key: "renderOptions",
        value: function renderOptions() {
            var _this2 = this;

            return this.props.options.map(function (option, index) {
                return _react2.default.createElement(_Radio.Radio, {
                    checked: option.value === _this2.props.checked,
                    onClickHandler: _this2.onChange.bind(_this2),
                    key: index,
                    value: option.value,
                    label: option.label
                });
            });
        }
    }, {
        key: "getChecked",
        value: function getChecked() {
            var _this3 = this;

            return this.props.options.filter(function (item) {
                return item.value === _this3.props.checked;
            }).pop().label;
        }
    }, {
        key: "render",
        value: function render() {
            //console.log( "RadioGroup render" );
            var className = "reactParts__radio-group";
            if (this.props.direction === "vertical") {
                className += " vertical";
            }

            return _react2.default.createElement(
                "div",
                { className: "reactParts__radio-group-wrap" },
                this.props.label && _react2.default.createElement(
                    "label",
                    { className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : "") },
                    this.props.label
                ),
                _react2.default.createElement(
                    "div",
                    { className: className },
                    this.props.readOnly ? this.getChecked() : this.renderOptions()
                )
            );
        }
    }]);

    return RadioGroup;
}(_react2.default.Component);

RadioGroup.propTypes = {
    direction: _propTypes2.default.oneOf(["vertical", "horizontal"]),
    readOnly: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    name: _propTypes2.default.string.isRequired,
    options: _propTypes2.default.array.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    checked: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
    required: _propTypes2.default.bool
};