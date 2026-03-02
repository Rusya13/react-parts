"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transfer = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _CheckBox = require("../CheckBox/CheckBox");
var _Badge = require("../Badge/Badge");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Transfer extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "onChangeHandler", value => {
      if (typeof this.props.onChange === "function") this.props.onChange(value);
    });
    _defineProperty(this, "selectAllSourses", () => {
      const sourses = this.props.source.filter(s => this.props.target.every(t => t !== s.id)).map(s => s.id);
      this.setState({
        sSource: sourses.every(s => this.state.sSource.some(ss => ss === s)) ? [] : sourses
      });
    });
    _defineProperty(this, "selectAllTargets", () => {
      const target = this.props.target;
      this.setState({
        sTarget: target.every(t => this.state.sTarget.some(st => st === t)) ? [] : target
      });
    });
    _defineProperty(this, "selectSourceHandler", id => {
      const source = this.state.sSource;
      this.setState({
        sSource: source.some(s => s === id) ? source.filter(s => s !== id) : source.concat([id])
      });
    });
    _defineProperty(this, "selectTargetHandler", id => {
      const target = this.state.sTarget;
      this.setState({
        sTarget: target.some(t => t === id) ? target.filter(t => t !== id) : target.concat([id])
      });
    });
    _defineProperty(this, "transferToTargetHandler", () => {
      const value = (this.props.target || []).concat(this.state.sSource);
      this.onChangeHandler(this.props.name ? {
        [this.props.name]: value
      } : value);
      this.state.sSource = [];
    });
    _defineProperty(this, "transferToSourceHandler", () => {
      const value = (this.props.target || []).filter(t => this.state.sTarget.every(s => s !== t));
      this.onChangeHandler(this.props.name ? {
        [this.props.name]: value
      } : value);
      this.state.sTarget = [];
    });
    _defineProperty(this, "sourceRender", (checkedAll, disabledAll) => {
      const {
        source,
        target,
        tableView,
        columns,
        footer
      } = this.props;
      if (tableView && columns) {
        const sourceFilter = source.filter(s => !target.some(t => s.id === t));
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "rp-transfer__table"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "rp-transfer__table-header"
        }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, [/*#__PURE__*/_react.default.createElement("th", {
          key: Math.random(),
          style: {
            width: "10%"
          },
          className: "rp-transfer__table-cell"
        }, /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
          checked: checkedAll,
          disabled: disabledAll,
          onClickHandler: this.selectAllSourses
        })), columns.map(item => {
          return this.tableHeaderRowRender(item);
        })])))), /*#__PURE__*/_react.default.createElement("div", {
          className: "rp-transfer__table-body"
        }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tbody", null, this.tableSourceRowRender(source, target)))), footer && /*#__PURE__*/_react.default.createElement("div", {
          className: "rp-transfer__table-footer"
        }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tfoot", null, /*#__PURE__*/_react.default.createElement("tr", null, [/*#__PURE__*/_react.default.createElement("th", {
          key: Math.random(),
          style: {
            width: "10%",
            textAlign: 'left'
          }
        }, this.state.sSource.length), columns.map(item => {
          return this.tableFooterCellRender(item, sourceFilter);
        })])))));
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "rp-transfer__list"
      }, source.filter(s => target.every(t => s.id !== t)).map((item, i) => {
        const checked = this.state.sSource.some(s => s === item.id);
        return this.singleCheckboxRender(this.selectSourceHandler.bind(this, item.id), checked, item, i);
      }));
    });
    _defineProperty(this, "targetRender", (checkedAll, disabledAll) => {
      const {
        source,
        target,
        tableView,
        columns,
        footer
      } = this.props;
      const sourceFilter = target.map(t => source.filter(s => s.id === t).pop());
      if (tableView && columns) {
        //const sourceFilter = source.filter((s) => target.some(t => s.id === t));

        return /*#__PURE__*/_react.default.createElement("div", {
          className: "rp-transfer__table"
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "rp-transfer__table-header"
        }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, [/*#__PURE__*/_react.default.createElement("th", {
          key: Math.random(),
          style: {
            width: "10%"
          }
        }, /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
          checked: checkedAll,
          disabled: disabledAll,
          onClickHandler: this.selectAllTargets
        })), columns.map(item => {
          return this.tableHeaderRowRender(item);
        })])))), /*#__PURE__*/_react.default.createElement("div", {
          className: "rp-transfer__table-body"
        }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tbody", null, this.tableTargetRowRender(source, target)))), footer && /*#__PURE__*/_react.default.createElement("div", {
          className: "rp-transfer__table-footer"
        }, /*#__PURE__*/_react.default.createElement("table", null, /*#__PURE__*/_react.default.createElement("tfoot", null, /*#__PURE__*/_react.default.createElement("tr", null, [/*#__PURE__*/_react.default.createElement("th", {
          key: Math.random(),
          style: {
            width: "10%",
            textAlign: 'left'
          }
        }, this.state.sTarget.length), columns.map(item => {
          return this.tableFooterCellRender(item, sourceFilter);
        })])))));
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "rp-transfer__list"
      }, sourceFilter.map((item, i) => {
        const checked = this.state.sTarget.some(t => t === item.id);
        return this.singleCheckboxRender(this.selectTargetHandler.bind(this, item.id), checked, item, i);
      }));
    });
    _defineProperty(this, "tableHeaderRowRender", item => {
      return /*#__PURE__*/_react.default.createElement("th", {
        className: "rp-transfer__table-cell",
        key: Math.random(),
        style: {
          width: item.width + "%",
          textAlign: item.align || "center"
        }
      }, item.label);
    });
    _defineProperty(this, "tableFooterCellRender", (item, items) => {
      let content;
      if (item.footerType === 'sum') {
        content = items.reduce((value, it) => {
          if (typeof it[item.key] === 'string') return;
          return value + it[item.key];
        }, 0);
      }
      if (item.footerType === 'avg') {
        content = items.reduce((value, it) => {
          if (typeof it[item.key] === 'string') return;
          return value + it[item.key];
        }, 0);
        if (content) {
          content = (content / items.length).toFixed(2);
        }
      }
      if (item.footerType === 'min') {
        const ids = items.map(it => it[item.key]).filter(it => typeof it === 'number');
        content = ids && ids.length ? Math.min.apply(Math, ids) : null;
      }
      if (item.footerType === 'max') {
        const ids = items.map(it => it[item.key]).filter(it => typeof it === 'number');
        content = ids && ids.length ? Math.max.apply(Math, ids) : null;
      }
      if (item.footerType === 'count') {
        content = items && items.length;
      }
      return /*#__PURE__*/_react.default.createElement("th", {
        key: Math.random(),
        style: {
          width: item.width + "%",
          textAlign: item.align || "center",
          padding: "0 10px"
        }
      }, content);
    });
    _defineProperty(this, "tableSourceRowRender", (source, target) => {
      return source.filter(s => target.every(t => s.id !== t)).map((item, i) => {
        const checked = this.state.sSource.some(s => s === item.id);
        return /*#__PURE__*/_react.default.createElement("tr", {
          key: i
        }, [/*#__PURE__*/_react.default.createElement("td", {
          className: "rp-transfer__table-cell",
          style: {
            width: "10%"
          },
          key: Math.random()
        }, /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
          checked: checked,
          onClickHandler: this.selectSourceHandler.bind(this, item.id)
        })), this.props.columns.map(col => {
          return /*#__PURE__*/_react.default.createElement("td", {
            className: "rp-transfer__table-cell",
            key: Math.random(),
            style: {
              width: col.width + "%",
              textAlign: col.align || "center"
            }
          }, item[col.key]);
        })]);
      });
    });
    _defineProperty(this, "tableTargetRowRender", (source, target) => {
      return source.filter(s => target.some(t => s.id === t)).map((item, i) => {
        const checked = this.state.sTarget.some(t => t === item.id);
        return /*#__PURE__*/_react.default.createElement("tr", {
          key: i
        }, [/*#__PURE__*/_react.default.createElement("td", {
          style: {
            margin: "5px 0",
            width: "10%"
          },
          key: Math.random()
        }, /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
          checked: checked,
          onClickHandler: this.selectTargetHandler.bind(this, item.id)
        })), this.props.columns.map(col => {
          return /*#__PURE__*/_react.default.createElement("td", {
            key: Math.random(),
            style: {
              width: col.width + "%",
              textAlign: col.align || "center",
              padding: "0 10px"
            }
          }, item[col.key]);
        })]);
      });
    });
    _defineProperty(this, "singleCheckboxRender", (onChangeHandler, checked, item, i) => {
      const {
        customRecordRenderer
      } = this.props;
      if (typeof customRecordRenderer === "function") {
        return customRecordRenderer(onChangeHandler, checked, item, i);
      } else {
        return /*#__PURE__*/_react.default.createElement("div", {
          style: {
            margin: "5px 5px"
          },
          key: i
        }, /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
          checked: checked,
          onClickHandler: onChangeHandler,
          label: item.value
        }));
      }
    });
    _defineProperty(this, "isSourceNotEmpty", () => {
      return this.state.sSource.length;
    });
    _defineProperty(this, "isTargetNotEmpty", () => {
      return this.state.sTarget.length;
    });
    this.state = {
      sSource: [],
      sTarget: []
    };
  }
  render() {
    const {
      source,
      target,
      direction,
      tableView,
      sourceName,
      size
    } = this.props;
    const sourceWithoutTarget = source.filter(s => target.every(t => s.id !== t));
    const targetWithoutSource = source.filter(s => !target.every(t => s.id == t));
    const targetCheckbox = this.props.target && this.props.target.length > 0 && this.props.target.every(t => this.state.sTarget.some(st => st === t));
    const sourceCheckbox = sourceWithoutTarget && sourceWithoutTarget.length > 0 && sourceWithoutTarget.every(s => this.state.sSource.some(ss => ss === s.id));
    let transferClassName = 'rp-transfer';
    if (size) transferClassName += " rp-transfer--".concat(size);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: transferClassName
    }, tableView && /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__header"
    }, sourceName), /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__wrap rp-transfer__wrap--".concat(direction)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__box rp-transfer__box--".concat(direction)
    }, !tableView && /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__box-header"
    }, /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
      disabled: sourceWithoutTarget.length === 0,
      onClickHandler: this.selectAllSourses,
      label: this.props.sourceName,
      checked: sourceCheckbox
    }), /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
      count: this.state.sSource.length,
      ofCount: sourceWithoutTarget.length,
      showZero: true
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__box-content"
    }, this.sourceRender(sourceCheckbox, sourceWithoutTarget.length === 0))), /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__controls rp-transfer__controls--".concat(direction)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__control ".concat(!this.isSourceNotEmpty() ? ' rp-transfer__control--disabled' : ''),
      onClick: this.transferToTargetHandler
    }, direction === "vertical" ? /*#__PURE__*/_react.default.createElement("svg", {
      fill: "#d9d9d9",
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
    }), /*#__PURE__*/_react.default.createElement("path", {
      d: "M0-.75h24v24H0z",
      fill: "none"
    })) : /*#__PURE__*/_react.default.createElement("svg", {
      fill: "#d9d9d9",
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
    }), /*#__PURE__*/_react.default.createElement("path", {
      d: "M0-.25h24v24H0z",
      fill: "none"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__control ".concat(!this.isTargetNotEmpty() ? ' rp-transfer__control--disabled' : ''),
      onClick: this.transferToSourceHandler
    }, direction === "vertical" ? /*#__PURE__*/_react.default.createElement("svg", {
      fill: "#d9d9d9",
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"
    }), /*#__PURE__*/_react.default.createElement("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    })) : /*#__PURE__*/_react.default.createElement("svg", {
      fill: "#d9d9d9",
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
    }), /*#__PURE__*/_react.default.createElement("path", {
      d: "M0-.5h24v24H0z",
      fill: "none"
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__box rp-transfer__box--".concat(direction)
    }, !tableView && /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__box-header"
    }, /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
      onClickHandler: this.selectAllTargets,
      disabled: target.length === 0,
      label: this.props.targetName,
      checked: targetCheckbox
    }), /*#__PURE__*/_react.default.createElement(_Badge.Badge, {
      count: this.state.sTarget.length,
      ofCount: target.length,
      showZero: true
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "rp-transfer__box-content"
    }, this.targetRender(targetCheckbox, targetWithoutSource.length === 0)))));
  }
}
exports.Transfer = Transfer;
Transfer.propTypes = {
  customRecordRenderer: _propTypes.default.func,
  targetName: _propTypes.default.string,
  size: _propTypes.default.string,
  sourceName: _propTypes.default.string,
  direction: _propTypes.default.oneOf(["vertical", "horizontal"]),
  onChange: _propTypes.default.func,
  target: _propTypes.default.array,
  source: _propTypes.default.array,
  name: _propTypes.default.string,
  tableView: _propTypes.default.bool,
  columns: _propTypes.default.array,
  footer: _propTypes.default.bool
};
Transfer.defaultProps = {
  source: [],
  target: [],
  direction: "horizontal",
  tableView: false,
  columns: null,
  footer: false
};