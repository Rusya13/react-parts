"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Badge = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class Badge extends _react.default.Component {
  render() {
    let count = this.props.count;
    let maxCount = this.props.maxCount;
    let showZero = this.props.showZero;
    let style = this.props.style;
    let className = this.props.className;
    let ofCount = this.props.ofCount;
    let isDot = this.props.isDot;
    let isFixed = this.props.isFixed;
    if (!showZero && count === 0 && !isDot) return null;
    if (isDot) className += ' rp-badge--is-dot';
    if (isFixed) className += ' rp-badge--is-fixed';
    return /*#__PURE__*/_react.default.createElement("span", {
      className: className,
      style: style
    }, ofCount ? count + "/" + ofCount : maxCount && count > maxCount ? maxCount + "+" : count);
  }
}
exports.Badge = Badge;
Badge.defaultProps = {
  className: "rp-badge",
  isFixed: false,
  isDot: false
};
Badge.propTypes = {
  count: _propTypes.default.number,
  status: _propTypes.default.bool,
  showZero: _propTypes.default.bool,
  isDot: _propTypes.default.bool,
  isFixed: _propTypes.default.bool,
  maxCount: _propTypes.default.number,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  ofCount: _propTypes.default.number
};