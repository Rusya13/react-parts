"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Upload = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require("../Button/Button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Upload = exports.Upload = function (_React$Component) {
    _inherits(Upload, _React$Component);

    function Upload(props) {
        _classCallCheck(this, Upload);

        var _this = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this, props));

        _this._onChangeHandler = function () {
            if (_this.props.onChange) {
                _this.props.onChange(_this.props.multiple ? _this.fileInput.files : _this.fileInput.files[0]);
            }
            _this.uploadButton.blur();
            _this.forceUpdate();
        };

        _this._onClick = function () {
            _this.fileInput.click();
        };

        _this._renderFilesList = function () {

            if (_this.fileInput && _this.fileInput.files.length > 0) {
                var list = [];
                for (var i = 0; i < _this.fileInput.files.length; i++) {
                    list.push(_react2.default.createElement(
                        "div",
                        { className: "reactParts__upload--file", key: i },
                        _react2.default.createElement(
                            "svg",
                            { className: "reactParts__upload--file-icon", xmlns: "http://www.w3.org/2000/svg", fill: "#000000",
                                height: "15", viewBox: "0 0 24 24", width: "15" },
                            _react2.default.createElement("path", {
                                d: "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" }),
                            _react2.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                        ),
                        _react2.default.createElement(
                            "span",
                            { className: "reactParts__upload--file-name" },
                            _this.fileInput.files[i].name
                        )
                    ));
                }
                return list;
            }
        };

        return _this;
    }

    _createClass(Upload, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(_Button.Button, { ref: function ref(button) {
                        return _this2.uploadButton = button;
                    }, caption: this.props.caption,
                    brand: this.props.brand, onClick: this._onClick }),
                _react2.default.createElement("input", {
                    style: { display: "none" },
                    ref: function ref(input) {
                        return _this2.fileInput = input;
                    },
                    type: "file",
                    name: this.props.name,
                    onChange: this._onChangeHandler,
                    accept: this.props.accept,
                    multiple: this.props.multiple
                }),
                _react2.default.createElement(
                    "div",
                    { className: "reactParts__upload--fileList" },
                    this._renderFilesList()
                )
            );
        }
    }]);

    return Upload;
}(_react2.default.Component);

Upload.defaultProps = {
    caption: "Upload file",
    multiple: false,
    brand: "primary"
};

Upload.propTypes = {
    accept: _propTypes2.default.string,
    onChange: _propTypes2.default.func,
    name: _propTypes2.default.string,
    caption: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    brand: _propTypes2.default.string
};