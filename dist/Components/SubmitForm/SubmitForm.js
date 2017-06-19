"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SubmitForm = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Button = require("../Button/Button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubmitForm = exports.SubmitForm = function (_React$Component) {
    _inherits(SubmitForm, _React$Component);

    function SubmitForm(props) {
        _classCallCheck(this, SubmitForm);

        var _this = _possibleConstructorReturn(this, (SubmitForm.__proto__ || Object.getPrototypeOf(SubmitForm)).call(this, props));

        _this.state = {
            error: null
        };

        return _this;
    }

    _createClass(SubmitForm, [{
        key: "onSubmit",
        value: async function onSubmit() {
            try {
                this.props.onSubmit && (await this.props.onSubmit());
            } catch (e) {
                this.setState({ error: e.message });
            }
        }
    }, {
        key: "onCancelHandler",
        value: function onCancelHandler(e) {
            this.props.onCancel && this.props.onCancel();
        }
    }, {
        key: "render",
        value: function render() {

            return _react2.default.createElement(
                "div",
                { className: "modal-container__body" },
                this.state.error && _react2.default.createElement(
                    "div",
                    { className: "modal-container__error" },
                    this.state.error
                ),
                _react2.default.createElement(
                    "div",
                    null,
                    this.props.children
                ),
                _react2.default.createElement(
                    "div",
                    { className: "modal-container__footer" },
                    _react2.default.createElement(_Button.Button, { brand: "default", onClick: this.onCancelHandler.bind(this), caption: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C" }),
                    _react2.default.createElement(_Button.Button, { brand: this.props.submitBrand, onClick: this.onSubmit.bind(this),
                        caption: this.props.submitLabel })
                )
            );
        }
    }]);

    return SubmitForm;
}(_react2.default.Component);