"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBoxGroup = void 0;
var _CheckBox = require("../CheckBox/CheckBox");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CheckBoxGroup extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "props", void 0);
  }
  onChange(o) {
    this.props.onChange(o);
  }
  isChecked(value) {
    return this.props.checked && this.props.checked.some(item => item === value);
  }
  renderOptions() {
    return this.props.options.map((option, index) => {
      return /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
        checked: option.checked,
        onClickHandler: this.onChange.bind(this),
        key: index,
        label: option.label,
        name: option.name,
        disabled: option.disabled,
        type: this.props.type
      });
    });
  }
  getChecked() {
    let arr = [];
    this.props.options.filter(item => item.checked).forEach(option => {
      if (arr.length > 0) arr.push(", ");
      arr.push(option.label);
    });
    return arr;
  }
  render() {
    let className = "reactParts__checkbox-group";
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__checkbox-group-wrap " + (this.props.type === "button" ? " button" : "") + (this.props.direction === "vertical" && this.props.type !== "button" ? " vertical " : "")
    }, this.props.label && /*#__PURE__*/_react.default.createElement("label", {
      className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : "")
    }, this.props.label), /*#__PURE__*/_react.default.createElement("div", {
      className: className
    }, this.props.readOnly ? this.getChecked() : this.renderOptions()));
  }
}
exports.CheckBoxGroup = CheckBoxGroup;
CheckBoxGroup.propTypes = {
  direction: _propTypes.default.oneOf(["vertical", "horizontal"]),
  readOnly: _propTypes.default.bool,
  required: _propTypes.default.bool,
  label: _propTypes.default.string,
  options: _propTypes.default.array.isRequired,
  onChange: _propTypes.default.func,
  checked: _propTypes.default.array,
  type: _propTypes.default.oneOf(["normal", "button"])
};