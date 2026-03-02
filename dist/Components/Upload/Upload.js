"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Button = require("../Button/Button");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Upload extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "_onChangeHandler", () => {
      if (this.props.onChange) {
        this.props.onChange(this.props.multiple ? this.fileInput.files : this.fileInput.files[0]);
      }
      this.uploadButton.blur();
      this.forceUpdate();
    });
    _defineProperty(this, "_onClick", () => {
      this.fileInput.click();
    });
    _defineProperty(this, "_renderFilesList", () => {
      if (this.fileInput && this.fileInput.files.length > 0) {
        let list = [];
        for (let i = 0; i < this.fileInput.files.length; i++) {
          list.push(/*#__PURE__*/_react.default.createElement("div", {
            className: "reactParts__upload--file",
            key: i
          }, /*#__PURE__*/_react.default.createElement("svg", {
            className: "reactParts__upload--file-icon",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "#000000",
            height: "15",
            viewBox: "0 0 24 24",
            width: "15"
          }, /*#__PURE__*/_react.default.createElement("path", {
            d: "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"
          }), /*#__PURE__*/_react.default.createElement("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          })), /*#__PURE__*/_react.default.createElement("span", {
            className: "reactParts__upload--file-name"
          }, this.fileInput.files[i].name)));
        }
        return list;
      }
    });
  }
  render() {
    return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Button.Button, {
      ref: button => this.uploadButton = button,
      caption: this.props.caption,
      brand: this.props.brand,
      onClick: this._onClick
    }), /*#__PURE__*/_react.default.createElement("input", {
      style: {
        display: "none"
      },
      ref: input => this.fileInput = input,
      type: "file",
      name: this.props.name,
      onChange: this._onChangeHandler,
      accept: this.props.accept,
      multiple: this.props.multiple
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__upload--fileList"
    }, this._renderFilesList()));
  }
}
exports.Upload = Upload;
Upload.defaultProps = {
  caption: "Upload file",
  multiple: false,
  brand: "primary"
};
Upload.propTypes = {
  accept: _propTypes.default.string,
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  caption: _propTypes.default.string,
  multiple: _propTypes.default.bool,
  brand: _propTypes.default.string
};