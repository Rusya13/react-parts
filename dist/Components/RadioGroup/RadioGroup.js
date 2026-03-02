"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RadioGroup = void 0;
var _Radio = require("../Radio/Radio");
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class RadioGroup extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "props", void 0);
  }
  onChange(value) {
    //console.log( "RadioGroup onChange", value );
    let o = {};
    o[this.props.name] = value;
    this.props.onChange(o);
  }
  renderOptions() {
    return this.props.options.map((option, index) => {
      return /*#__PURE__*/_react.default.createElement(_Radio.Radio, {
        checked: option.value === this.props.checked,
        onClickHandler: this.onChange.bind(this),
        key: index,
        value: option.value,
        label: option.label
      });
    });
  }
  getChecked() {
    return this.props.options.filter(item => item.value === this.props.checked).pop().label;
  }
  render() {
    //console.log( "RadioGroup render" );
    let className = "reactParts__radio-group";
    if (this.props.direction === "vertical") {
      className += " vertical";
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__radio-group-wrap"
    }, this.props.label && /*#__PURE__*/_react.default.createElement("label", {
      className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : "")
    }, this.props.label), /*#__PURE__*/_react.default.createElement("div", {
      className: className
    }, this.props.readOnly ? this.getChecked() : this.renderOptions()));
  }
}
exports.RadioGroup = RadioGroup;
RadioGroup.propTypes = {
  direction: _propTypes.default.oneOf(["vertical", "horizontal"]),
  readOnly: _propTypes.default.bool,
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  options: _propTypes.default.array.isRequired,
  onChange: _propTypes.default.func,
  checked: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  required: _propTypes.default.bool
};