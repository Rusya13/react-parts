"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckBoxGroup = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CheckBox = require("../CheckBox/CheckBox");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckBoxGroup = exports.CheckBoxGroup = function (_React$Component) {
    _inherits(CheckBoxGroup, _React$Component);

    function CheckBoxGroup() {
        _classCallCheck(this, CheckBoxGroup);

        return _possibleConstructorReturn(this, (CheckBoxGroup.__proto__ || Object.getPrototypeOf(CheckBoxGroup)).apply(this, arguments));
    }

    _createClass(CheckBoxGroup, [{
        key: "onChange",
        value: function onChange(o) {

            this.props.onChange(o);
        }
    }, {
        key: "isChecked",
        value: function isChecked(value) {
            return this.props.checked && this.props.checked.some(function (item) {
                return item === value;
            });
        }
    }, {
        key: "renderOptions",
        value: function renderOptions() {
            var _this2 = this;

            return this.props.options.map(function (option, index) {
                return _react2.default.createElement(_CheckBox.CheckBox, {
                    checked: option.checked,
                    onClickHandler: _this2.onChange.bind(_this2),
                    key: index,
                    label: option.label,
                    name: option.name,
                    disabled: option.disabled,
                    type: _this2.props.type
                });
            });
        }
    }, {
        key: "getChecked",
        value: function getChecked() {
            var arr = [];
            this.props.options.filter(function (item) {
                return item.checked;
            }).forEach(function (option) {
                if (arr.length > 0) arr.push(", ");
                arr.push(option.label);
            });
            return arr;
        }
    }, {
        key: "render",
        value: function render() {
            var className = "reactParts__checkbox-group";
            return _react2.default.createElement(
                "div",
                { className: "reactParts__checkbox-group-wrap " + (this.props.type === "button" ? " button" : "") + (this.props.direction === "vertical" && this.props.type !== "button" ? " vertical " : "") },
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

    return CheckBoxGroup;
}(_react2.default.Component);

CheckBoxGroup.propTypes = {
    direction: _propTypes2.default.oneOf(["vertical", "horizontal"]),
    readOnly: _propTypes2.default.bool,
    required: _propTypes2.default.bool,
    label: _propTypes2.default.string,
    options: _propTypes2.default.array.isRequired,
    onChange: _propTypes2.default.func,
    checked: _propTypes2.default.array,
    type: _propTypes2.default.oneOf(["normal", "button"])
};