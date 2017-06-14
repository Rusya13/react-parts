"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Badge = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Badge = exports.Badge = function (_React$Component) {
    _inherits(Badge, _React$Component);

    function Badge() {
        _classCallCheck(this, Badge);

        return _possibleConstructorReturn(this, (Badge.__proto__ || Object.getPrototypeOf(Badge)).apply(this, arguments));
    }

    _createClass(Badge, [{
        key: "render",
        value: function render() {
            var count = this.props.count;
            var maxCount = this.props.maxCount;
            var showZero = this.props.showZero;
            var style = this.props.style;
            var className = this.props.className;
            var ofCount = this.props.ofCount;
            if (!showZero && count === 0) return null;
            return _react2.default.createElement(
                "span",
                { className: className, style: style },
                ofCount ? count + "/" + ofCount : maxCount && count > maxCount ? maxCount + "+" : count
            );
        }
    }]);

    return Badge;
}(_react2.default.Component);

Badge.defaultProps = {
    className: "reactParts__badge--wrap"
};

Badge.propTypes = {
    count: _propTypes2.default.number,
    status: _propTypes2.default.bool,
    showZero: _propTypes2.default.bool,
    maxCount: _propTypes2.default.number,
    style: _propTypes2.default.object,
    className: _propTypes2.default.string,
    ofCount: _propTypes2.default.number
};