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

        _this.sourceRender = function (checkedAll, disabledAll) {
            var _this$props = _this.props,
                source = _this$props.source,
                target = _this$props.target,
                tableView = _this$props.tableView,
                columns = _this$props.columns,
                footer = _this$props.footer;


            if (tableView && columns) {
                var sourceFilter = source.filter(function (s) {
                    return !target.some(function (t) {
                        return s.id === t;
                    });
                });

                return _react2.default.createElement(
                    "div",
                    { className: "rp-transfer__table" },
                    _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__table-header" },
                        _react2.default.createElement(
                            "table",
                            null,
                            _react2.default.createElement(
                                "thead",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    [_react2.default.createElement(
                                        "th",
                                        { key: Math.random(), style: { width: "10%" }, className: "rp-transfer__table-cell" },
                                        _react2.default.createElement(_CheckBox.CheckBox, { checked: checkedAll, disabled: disabledAll, onClickHandler: _this.selectAllSourses })
                                    ), columns.map(function (item) {
                                        return _this.tableHeaderRowRender(item);
                                    })]
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__table-body" },
                        _react2.default.createElement(
                            "table",
                            null,
                            _react2.default.createElement(
                                "tbody",
                                null,
                                _this.tableSourceRowRender(source, target)
                            )
                        )
                    ),
                    footer && _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__table-footer" },
                        _react2.default.createElement(
                            "table",
                            null,
                            _react2.default.createElement(
                                "tfoot",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    [_react2.default.createElement(
                                        "th",
                                        { key: Math.random(), style: { width: "10%", textAlign: 'left' } },
                                        _this.state.sSource.length
                                    ), columns.map(function (item) {
                                        return _this.tableFooterCellRender(item, sourceFilter);
                                    })]
                                )
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                "div",
                { className: "rp-transfer__list" },
                source.filter(function (s) {
                    return target.every(function (t) {
                        return s.id !== t;
                    });
                }).map(function (item, i) {
                    var checked = _this.state.sSource.some(function (s) {
                        return s === item.id;
                    });
                    return _this.singleCheckboxRender(_this.selectSourceHandler.bind(_this, item.id), checked, item, i);
                })
            );
        };

        _this.targetRender = function (checkedAll, disabledAll) {
            var _this$props2 = _this.props,
                source = _this$props2.source,
                target = _this$props2.target,
                tableView = _this$props2.tableView,
                columns = _this$props2.columns,
                footer = _this$props2.footer;


            if (tableView && columns) {
                var sourceFilter = source.filter(function (s) {
                    return target.some(function (t) {
                        return s.id === t;
                    });
                });

                return _react2.default.createElement(
                    "div",
                    { className: "rp-transfer__table" },
                    _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__table-header" },
                        _react2.default.createElement(
                            "table",
                            null,
                            _react2.default.createElement(
                                "thead",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    [_react2.default.createElement(
                                        "th",
                                        { key: Math.random(), style: { width: "10%" } },
                                        _react2.default.createElement(_CheckBox.CheckBox, { checked: checkedAll, disabled: disabledAll, onClickHandler: _this.selectAllTargets })
                                    ), columns.map(function (item) {
                                        return _this.tableHeaderRowRender(item);
                                    })]
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__table-body" },
                        _react2.default.createElement(
                            "table",
                            null,
                            _react2.default.createElement(
                                "tbody",
                                null,
                                _this.tableTargetRowRender(source, target)
                            )
                        )
                    ),
                    footer && _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__table-footer" },
                        _react2.default.createElement(
                            "table",
                            null,
                            _react2.default.createElement(
                                "tfoot",
                                null,
                                _react2.default.createElement(
                                    "tr",
                                    null,
                                    [_react2.default.createElement(
                                        "th",
                                        { key: Math.random(), style: { width: "10%", textAlign: 'left' } },
                                        _this.state.sTarget.length
                                    ), columns.map(function (item) {
                                        return _this.tableFooterCellRender(item, sourceFilter);
                                    })]
                                )
                            )
                        )
                    )
                );
            }

            return _react2.default.createElement(
                "div",
                { className: "rp-transfer__list" },
                source.filter(function (s) {
                    return target.some(function (t) {
                        return s.id === t;
                    });
                }).map(function (item, i) {
                    var checked = _this.state.sTarget.some(function (t) {
                        return t === item.id;
                    });
                    return _this.singleCheckboxRender(_this.selectTargetHandler.bind(_this, item.id), checked, item, i);
                })
            );
        };

        _this.tableHeaderRowRender = function (item) {
            return _react2.default.createElement(
                "th",
                { className: "rp-transfer__table-cell", key: Math.random(), style: { width: item.width + "%", textAlign: item.align || "center" } },
                item.label
            );
        };

        _this.tableFooterCellRender = function (item, items) {
            var content = void 0;

            if (item.footerType === 'sum') {
                content = items.reduce(function (value, it) {
                    if (typeof it[item.key] === 'string') return;
                    return value + it[item.key];
                }, 0);
            }

            if (item.footerType === 'avg') {
                content = items.reduce(function (value, it) {
                    if (typeof it[item.key] === 'string') return;
                    return value + it[item.key];
                }, 0);

                if (content) {
                    content = (content / items.length).toFixed(2);
                }
            }

            if (item.footerType === 'min') {
                var ids = items.map(function (it) {
                    return it[item.key];
                }).filter(function (it) {
                    return typeof it === 'number';
                });

                content = ids && ids.length ? Math.min.apply(Math, ids) : null;
            }

            if (item.footerType === 'max') {
                var _ids = items.map(function (it) {
                    return it[item.key];
                }).filter(function (it) {
                    return typeof it === 'number';
                });

                content = _ids && _ids.length ? Math.max.apply(Math, _ids) : null;
            }

            if (item.footerType === 'count') {
                content = items && items.length;
            }

            return _react2.default.createElement(
                "th",
                { key: Math.random(), style: { width: item.width + "%", textAlign: item.align || "center", padding: "0 10px" } },
                content
            );
        };

        _this.tableSourceRowRender = function (source, target) {
            return source.filter(function (s) {
                return target.every(function (t) {
                    return s.id !== t;
                });
            }).map(function (item, i) {
                var checked = _this.state.sSource.some(function (s) {
                    return s === item.id;
                });

                return _react2.default.createElement(
                    "tr",
                    { key: i },
                    [_react2.default.createElement(
                        "td",
                        { className: "rp-transfer__table-cell", style: { width: "10%" }, key: Math.random() },
                        _react2.default.createElement(_CheckBox.CheckBox, { checked: checked, onClickHandler: _this.selectSourceHandler.bind(_this, item.id) })
                    ), _this.props.columns.map(function (col) {
                        return _react2.default.createElement(
                            "td",
                            { className: "rp-transfer__table-cell", key: Math.random(), style: { width: col.width + "%", textAlign: col.align || "center" } },
                            item[col.key]
                        );
                    })]
                );
            });
        };

        _this.tableTargetRowRender = function (source, target) {
            return source.filter(function (s) {
                return target.some(function (t) {
                    return s.id === t;
                });
            }).map(function (item, i) {
                var checked = _this.state.sTarget.some(function (t) {
                    return t === item.id;
                });

                return _react2.default.createElement(
                    "tr",
                    { key: i },
                    [_react2.default.createElement(
                        "td",
                        { style: { margin: "5px 0", width: "10%" }, key: Math.random() },
                        _react2.default.createElement(_CheckBox.CheckBox, { checked: checked, onClickHandler: _this.selectTargetHandler.bind(_this, item.id) })
                    ), _this.props.columns.map(function (col) {
                        return _react2.default.createElement(
                            "td",
                            { key: Math.random(), style: { width: col.width + "%", textAlign: col.align || "center", padding: "0 10px" } },
                            item[col.key]
                        );
                    })]
                );
            });
        };

        _this.singleCheckboxRender = function (onChangeHandler, checked, item, i) {
            var customRecordRenderer = _this.props.customRecordRenderer;

            if (typeof customRecordRenderer === "function") {
                return customRecordRenderer(onChangeHandler, checked, item, i);
            } else {
                return _react2.default.createElement(
                    "div",
                    { style: { margin: "5px 5px" }, key: i },
                    _react2.default.createElement(_CheckBox.CheckBox, { checked: checked, onClickHandler: onChangeHandler, label: item.value })
                );
            }
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
                target = _props.target,
                direction = _props.direction,
                tableView = _props.tableView,
                sourceName = _props.sourceName,
                size = _props.size;

            var sourceWithoutTarget = source.filter(function (s) {
                return target.every(function (t) {
                    return s.id !== t;
                });
            });
            var targetWithoutSource = source.filter(function (s) {
                return !target.every(function (t) {
                    return s.id == t;
                });
            });

            var targetCheckbox = this.props.target && this.props.target.length > 0 && this.props.target.every(function (t) {
                return _this2.state.sTarget.some(function (st) {
                    return st === t;
                });
            });
            var sourceCheckbox = sourceWithoutTarget && sourceWithoutTarget.length > 0 && sourceWithoutTarget.every(function (s) {
                return _this2.state.sSource.some(function (ss) {
                    return ss === s.id;
                });
            });

            var transferClassName = 'rp-transfer';
            if (size) transferClassName += " rp-transfer--" + size;

            return _react2.default.createElement(
                "div",
                { className: transferClassName },
                tableView && _react2.default.createElement(
                    "div",
                    { className: "rp-transfer__header" },
                    sourceName
                ),
                _react2.default.createElement(
                    "div",
                    { className: "rp-transfer__wrap rp-transfer__wrap--" + direction },
                    _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__box rp-transfer__box--" + direction },
                        !tableView && _react2.default.createElement(
                            "div",
                            { className: "rp-transfer__box-header" },
                            _react2.default.createElement(_CheckBox.CheckBox, {
                                disabled: sourceWithoutTarget.length === 0,
                                onClickHandler: this.selectAllSourses,
                                label: this.props.sourceName,
                                checked: sourceCheckbox }),
                            _react2.default.createElement(_Badge.Badge, {
                                count: this.state.sSource.length,
                                ofCount: sourceWithoutTarget.length,
                                showZero: true })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "rp-transfer__box-content" },
                            this.sourceRender(sourceCheckbox, sourceWithoutTarget.length === 0)
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__controls rp-transfer__controls--" + direction },
                        _react2.default.createElement(
                            "div",
                            {
                                className: "rp-transfer__control " + (!this.isSourceNotEmpty() ? ' rp-transfer__control--disabled' : ''),
                                onClick: this.transferToTargetHandler },
                            direction === "vertical" ? _react2.default.createElement(
                                "svg",
                                { fill: "#d9d9d9", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                _react2.default.createElement("path", { d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" }),
                                _react2.default.createElement("path", { d: "M0-.75h24v24H0z", fill: "none" })
                            ) : _react2.default.createElement(
                                "svg",
                                { fill: "#d9d9d9", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                _react2.default.createElement("path", { d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" }),
                                _react2.default.createElement("path", { d: "M0-.25h24v24H0z", fill: "none" })
                            )
                        ),
                        _react2.default.createElement(
                            "div",
                            {
                                className: "rp-transfer__control " + (!this.isTargetNotEmpty() ? ' rp-transfer__control--disabled' : ''),
                                onClick: this.transferToSourceHandler },
                            direction === "vertical" ? _react2.default.createElement(
                                "svg",
                                { fill: "#d9d9d9", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                _react2.default.createElement("path", { d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" }),
                                _react2.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                            ) : _react2.default.createElement(
                                "svg",
                                { fill: "#d9d9d9", xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24" },
                                _react2.default.createElement("path", { d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z" }),
                                _react2.default.createElement("path", { d: "M0-.5h24v24H0z", fill: "none" })
                            )
                        )
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "rp-transfer__box rp-transfer__box--" + direction },
                        !tableView && _react2.default.createElement(
                            "div",
                            { className: "rp-transfer__box-header" },
                            _react2.default.createElement(_CheckBox.CheckBox, {
                                onClickHandler: this.selectAllTargets,
                                disabled: target.length === 0,
                                label: this.props.targetName,
                                checked: targetCheckbox }),
                            _react2.default.createElement(_Badge.Badge, {
                                count: this.state.sTarget.length,
                                ofCount: target.length,
                                showZero: true })
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "rp-transfer__box-content" },
                            this.targetRender(targetCheckbox, targetWithoutSource.length === 0)
                        )
                    )
                )
            );
        }
    }]);

    return Transfer;
}(_react2.default.Component);

Transfer.propTypes = {
    customRecordRenderer: _propTypes2.default.func,
    targetName: _propTypes2.default.string,
    size: _propTypes2.default.string,
    sourceName: _propTypes2.default.string,
    direction: _propTypes2.default.oneOf(["vertical", "horizontal"]),
    onChange: _propTypes2.default.func,
    target: _propTypes2.default.array,
    source: _propTypes2.default.array,
    name: _propTypes2.default.string,
    tableView: _propTypes2.default.bool,
    columns: _propTypes2.default.array,
    footer: _propTypes2.default.bool
};

Transfer.defaultProps = {
    source: [],
    target: [],
    direction: "horizontal",
    tableView: false,
    columns: null,
    footer: false
};