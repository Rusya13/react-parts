"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Button extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "props", void 0);
    _defineProperty(this, "blur", () => {
      this.button.blur();
    });
    _defineProperty(this, "focus", () => {
      this.button.focus();
    });
  }
  onClick(e) {
    if (this.props.onClick) this.props.onClick(this.props.id);
  }
  render() {
    let props = this.props;
    if (props.hidden) return null;
    let className = 'rp-btn';
    if (props.brand) className += " rp-btn--".concat(props.brand);
    if (props.className) className += " ".concat(props.className);
    if (props.size) className += " rp-btn--".concat(props.size);
    let caption = this.props.children || this.props.caption;
    return /*#__PURE__*/_react.default.createElement("button", {
      ref: button => this.button = button,
      type: this.props.type,
      onClick: this.onClick.bind(this),
      disabled: props.disabled,
      className: className,
      id: props.id
    }, caption);
  }
}
exports.Button = Button;
Button.propTypes = {
  brand: _propTypes.default.string,
  type: _propTypes.default.string,
  caption: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.element]),
  onClick: _propTypes.default.func.isRequired,
  disabled: _propTypes.default.bool,
  hidden: _propTypes.default.bool,
  id: _propTypes.default.string,
  size: _propTypes.default.string,
  className: _propTypes.default.string
};