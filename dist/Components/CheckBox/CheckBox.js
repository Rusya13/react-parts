"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CheckBox = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CheckBox extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "input", void 0);
    _defineProperty(this, "props", void 0);
  }
  onClickHandler(e) {
    let o = {};
    o[this.props.name] = this.input.checked;
    this.props.onClickHandler(o);
  }
  render() {
    const {
      checked,
      type,
      disabled,
      label,
      size
    } = this.props;
    let className = 'rp-checkbox reactParts__checkbox-wrap';
    if (type === 'button') className += ' button';
    if (checked) className += ' checked';
    if (disabled) className += ' disabled';
    if (size) className += " rp-checkbox--".concat(size);
    return /*#__PURE__*/_react.default.createElement("label", {
      className: className
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__checkbox-input-new"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      checked: this.props.checked,
      ref: input => {
        this.input = input;
      },
      disabled: this.props.disabled,
      className: "reactParts__checkbox-input",
      onChange: this.onClickHandler.bind(this)
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__checkbox-label"
    }, label));
  }
}
exports.CheckBox = CheckBox;
CheckBox.propTypes = {
  name: _propTypes.default.oneOfType([_react.default.PropTypes.string, _react.default.PropTypes.number]),
  label: _propTypes.default.string,
  size: _propTypes.default.string,
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onClickHandler: _propTypes.default.func,
  type: _propTypes.default.oneOf(["normal", "button"])
};