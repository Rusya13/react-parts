"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Radio extends _react.default.Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "input", void 0);
  }
  onClickHandler(e) {
    //console.log("Radio onClickHandler", this.input);
    this.props.onClickHandler(this.props.value);
  }
  render() {
    //console.log("Radio render", this.props);
    return /*#__PURE__*/_react.default.createElement("label", {
      className: "reactParts__radio-wrap"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__radio-input-wrapper " + (this.props.checked ? "checked" : "")
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "radio",
      checked: this.props.checked,
      ref: input => {
        this.input = input;
      },
      disabled: this.props.disabled,
      className: "reactParts__radio-input",
      value: this.props.value,
      onChange: this.onClickHandler.bind(this)
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "reactParts__radio-outer-circle"
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "reactParts__radio-inner-circle"
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__radio-input-label"
    }, this.props.label));
  }
}
exports.Radio = Radio;
Radio.propTypes = {
  value: _propTypes.default.oneOfType([_react.default.PropTypes.number, _react.default.PropTypes.string, _react.default.PropTypes.bool]),
  label: _propTypes.default.string,
  checked: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  onClickHandler: _propTypes.default.func
};