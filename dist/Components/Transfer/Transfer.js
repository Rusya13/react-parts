"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Transfer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CheckBox = require("../CheckBox/CheckBox");

var _Badge = require("../Badge/Badge");

var _Button = require("../Button/Button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Transfer = exports.Transfer = function (_React$Component) {
    _inherits(Transfer, _React$Component);

    function Transfer(props) {
        _classCallCheck(this, Transfer);

        var _this = _possibleConstructorReturn(this, (Transfer.__proto__ || Object.getPrototypeOf(Transfer)).call(this, props));

        _this.onChangeHandler = function (value) {
            if (typeof _this.props.onChange === "function") _this.props.onChange(value);
        };

        _this.selectAllSourses = function () {
            var sourses = _this.props.source.filter(function (s) {
                return _this.props.target.every(function (t) {
                    return t !== s;
                });
            }).map(function (s) {
                return s.id;
            });
            _this.setState({ sSource: sourses.every(function (s) {
                    return _this.state.sSource.some(function (ss) {
                        return ss === s;
                    });
                }) ? [] : sourses });
        };

        _this.selectAllTargets = function () {
            var target = _this.props.target;
            _this.setState({ sTarget: target.every(function (t) {
                    return _this.state.sTarget.some(function (st) {
                        return st === t;
                    });
                }) ? [] : target });
        };

        _this.selectSourceHandler = function (id) {
            var source = _this.state.sSource;
            _this.setState({ sSource: source.some(function (s) {
                    return s === id;
                }) ? source.filter(function (s) {
                    return s !== id;
                }) : source.concat([id]) });
        };

        _this.selectTargetHandler = function (id) {
            var target = _this.state.sTarget;
            _this.setState({ sTarget: target.some(function (t) {
                    return t === id;
                }) ? target.filter(function (t) {
                    return t !== id;
                }) : target.concat([id]) });
        };

        _this.transferToTargetHandler = function () {
            var value = (_this.props.target || []).concat(_this.state.sSource);
            _this.onChangeHandler(_this.props.name ? _defineProperty({}, _this.props.name, value) : value);
            _this.state.sSource = [];
        };

        _this.transferToSourceHandler = function () {
            var value = (_this.props.target || []).filter(function (t) {
                return _this.state.sTarget.every(function (s) {
                    return s !== t;
                });
            });
            _this.onChangeHandler(_this.props.name ? _defineProperty({}, _this.props.name, value) : value);
            _this.state.sTarget = [];
        };

        _this.sourceRender = function () {
            var _this$props = _this.props,
                source = _this$props.source,
                target = _this$props.target;

            return source.filter(function (s) {
                return target.every(function (t) {
                    return s.id !== t;
                });
            }).map(function (item, i) {
                var checked = _this.state.sSource.some(function (s) {
                    return s === item.id;
                });
                return _this.singleCheckboxRender(_this.selectSourceHandler.bind(_this, item.id), checked, item, i);
            });
        };

        _this.targetRender = function () {
            var _this$props2 = _this.props,
                source = _this$props2.source,
                target = _this$props2.target;

            return source.filter(function (s) {
                return target.some(function (t) {
                    return s.id === t;
                });
            }).map(function (item, i) {
                var checked = _this.state.sTarget.some(function (t) {
                    return t === item.id;
                });
                return _this.singleCheckboxRender(_this.selectTargetHandler.bind(_this, item.id), checked, item, i);
            });
        };

        _this.singleCheckboxRender = function (onChangeHandler, checked, item, i) {
            return _react2.default.createElement(_CheckBox.CheckBox, { checked: checked, onClickHandler: onChangeHandler, label: item.value, key: i });
        };

        _this.isSourceNotEmpty = function () {
            return _this.state.sSource.length;
        };

        _this.isTargetNotEmpty = function () {
            return _this.state.sTarget.length;
        };

        _this.state = {
            sSource: [],
            sTarget: []
        };
        return _this;
    }

    _createClass(Transfer, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                source = _props.source,
                target = _props.target;

            var sourceWithoutTarget = source.filter(function (s) {
                return target.every(function (t) {
                    return s.id !== t;
                });
            });

            return _react2.default.createElement(
                "div",
                { className: "reactParts__transfer--wrap" },
                _react2.default.createElement(
                    "div",
                    { className: "reactParts__transfer--box" },
                    _react2.default.createElement(
                        "div",
                        { className: "reactParts__transfer--header" },
                        _react2.default.createElement(_CheckBox.CheckBox, {
                            disabled: sourceWithoutTarget.length === 0,
                            onClickHandler: this.selectAllSourses,
                            checked: Boolean(sourceWithoutTarget.length && sourceWithoutTarget.every(function (s) {
                                return _this2.state.sSource.some(function (ss) {
                                    return ss === s.id;
                                });
                            })),
                            label: this.props.sourceName
                        }),
                        _react2.default.createElement(_Badge.Badge, {
                            count: this.state.sSource.length,
                            ofCount: sourceWithoutTarget.length,
                            showZero: true
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "reactParts__transfer--list" },
                        this.sourceRender()
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "reactParts__transfer--middle-box" },
                    _react2.default.createElement(
                        "div",
                        { className: "reactParts__transfer--middle-box-button" },
                        _react2.default.createElement(_Button.Button, { onClick: this.transferToTargetHandler, brand: "primary", caption: ">", disabled: !this.isSourceNotEmpty() })
                    ),
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(_Button.Button, { onClick: this.transferToTargetHandler, brand: "primary", caption: "<", disabled: !this.isTargetNotEmpty() })
                    )
                ),
                _react2.default.createElement(
                    "div",
                    { className: "reactParts__transfer--box" },
                    _react2.default.createElement(
                        "div",
                        { className: "reactParts__transfer--header" },
                        _react2.default.createElement(_CheckBox.CheckBox, {
                            disabled: this.props.target.length === 0,
                            onClickHandler: this.selectAllTargets,
                            checked: Boolean(this.props.target.length && this.props.target.every(function (t) {
                                return _this2.state.sTarget.some(function (st) {
                                    return st === t;
                                });
                            })),
                            label: this.props.targetName
                        }),
                        _react2.default.createElement(_Badge.Badge, {
                            count: this.state.sTarget.length,
                            ofCount: this.props.target.length,
                            showZero: true
                        })
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "reactParts__transfer--list" },
                        this.targetRender()
                    )
                )
            );
        }
    }]);

    return Transfer;
}(_react2.default.Component);

Transfer.propTypes = {
    onChange: _propTypes2.default.func,
    targetName: _propTypes2.default.string,
    target: _propTypes2.default.array,
    source: _propTypes2.default.array,
    name: _propTypes2.default.string
};

Transfer.defaultProps = {
    source: [],
    target: []
};