"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Button = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_React$Component) {
    _inherits(Button, _React$Component);

    function Button(props) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));

        _this.blur = function () {
            _this.button.blur();
        };

        _this.focus = function () {
            _this.button.focus();
        };

        return _this;
    }

    _createClass(Button, [{
        key: "onClick",
        value: function onClick(e) {
            if (this.props.onClick) this.props.onClick(this.props.id);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var props = this.props;
            if (props.hidden) return null;

            var className = 'rp-btn';
            if (props.brand) className += " rp-btn--" + props.brand;
            if (props.className) className += " " + props.className;
            if (props.size) className += " rp-btn--" + props.size;
            var caption = this.props.children || this.props.caption;
            return _react2.default.createElement(
                "button",
                {
                    ref: function ref(button) {
                        return _this2.button = button;
                    }, type: this.props.type,
                    onClick: this.onClick.bind(this),
                    disabled: props.disabled,
                    className: className,
                    id: props.id },
                caption
            );
        }
    }]);

    return Button;
}(_react2.default.Component);

Button.propTypes = {
    brand: _propTypes2.default.string,
    type: _propTypes2.default.string,
    caption: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.element]),
    onClick: _propTypes2.default.func.isRequired,
    disabled: _propTypes2.default.bool,
    hidden: _propTypes2.default.bool,
    id: _propTypes2.default.string,
    size: _propTypes2.default.string,
    className: _propTypes2.default.string
};