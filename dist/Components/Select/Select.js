"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class SelectProps {
  constructor() {
    _defineProperty(this, "readOnly", void 0);
    _defineProperty(this, "cancel", void 0);
    _defineProperty(this, "onChange", void 0);
    _defineProperty(this, "disabled", void 0);
    _defineProperty(this, "placeholder", void 0);
    _defineProperty(this, "name", void 0);
    _defineProperty(this, "list", void 0);
    _defineProperty(this, "selected", void 0);
    _defineProperty(this, "label", void 0);
    _defineProperty(this, "uniqueKey", void 0);
    _defineProperty(this, "labelKey", void 0);
    _defineProperty(this, "listItemRender", void 0);
    _defineProperty(this, "inputRender", void 0);
    _defineProperty(this, "noResultsText", void 0);
    _defineProperty(this, "onKeyDown", void 0);
    _defineProperty(this, "tabIndex", void 0);
    _defineProperty(this, "addControls", void 0);
    _defineProperty(this, "autoFocus", void 0);
    _defineProperty(this, "showFullValue", void 0);
    _defineProperty(this, "required", void 0);
  }
}
class Select extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "props", void 0);
    _defineProperty(this, "input", void 0);
    _defineProperty(this, "state", void 0);
    _defineProperty(this, "closeList", void 0);
    this.closeList = this.closeList.bind(this);
    this.state = {
      stateList: false,
      //showInput:   false,
      list: Array.isArray(props.list) ? props.list : [],
      pointSelect: -1
    };
  }
  _createReturnObject(name, value) {
    let object = {};
    object[name] = value;
    return object;
  }
  selectItem(item) {
    this.setState({
      stateList: false
    });
    let c = this._createReturnObject(this.props.name, item[this.props.uniqueKey]);
    this.props.onChange && this.props.onChange(c, item);
  }
  onClickHandler() {
    this.searchInput.focus();
  }
  renderControls() {
    return this.props.addControls().map(item => {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "reactParts__select-addControls-item",
        onClick: item.onClickHandler && item.onClickHandler.bind(this, item.name),
        key: Math.random()
      }, item.title);
    });
  }
  openList() {
    if (this.state.stateList) return;
    if (this.props.disabled) return;
    this.setState({
      stateList: true
    });
  }
  closeList() {
    if (this.searchInput) this.searchInput.value = "";
    this.searchInput.blur();
    this.setState({
      stateList: false
    });
  }
  cancelSelected() {
    let newSelected = null;
    let c = this._createReturnObject(this.props.name, newSelected);
    this.props.onChange && this.props.onChange(c);
  }
  renderList() {
    let list = this.state.list;
    let matchesFilter = new RegExp(this.searchInput.value, "i");
    if (Array.isArray(this.state.list) && this.searchInput) {
      list = list.filter(item => {
        return !this.searchInput.value || matchesFilter.test(item[this.props.labelKey]);
      });
    }
    let newList = list.map((selItem, i, list) => {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: selItem[this.props.uniqueKey],
        className: "reactParts__select-list-item" + (selItem[this.props.uniqueKey] === (this.props.selected && this.props.selected[this.props.uniqueKey]) ? " selected" : "") + (i === this.state.pointSelect ? " pointed" : ""),
        onMouseDown: this.selectItem.bind(this, selItem)
      }, this.props.listItemRender ? this.props.listItemRender(selItem, i, list) : selItem[this.props.labelKey]);
    });
    return newList.length !== 0 ? newList : /*#__PURE__*/_react.default.createElement("li", {
      className: "reactParts__select-list-item empty",
      key: "empty"
    }, this.props.noResultsText);
  }
  clearedList() {
    let matchesFilter = new RegExp(this.searchInput.value, "i");
    let list = this.state.list;
    return list.filter(item => {
      return !this.searchInput.value || matchesFilter.test(item[this.props.labelKey]);
    });
  }
  setNewPosition(key) {
    let currentPosition = this.state.pointSelect;
    let newPosition = -1;
    if (key === 'ArrowDown') {
      if (currentPosition === this.clearedList().length - 1) {
        newPosition = 0;
      } else {
        newPosition = currentPosition + 1;
      }
    }
    if (key === 'ArrowUp') {
      if (currentPosition === 0 || currentPosition === -1) {
        newPosition = this.clearedList().length - 1;
      } else {
        newPosition = currentPosition - 1;
      }
    }
    let ul = this.ul;
    let pointed;
    if (ul.children && ul.children.length > 0) {
      pointed = ul.children[newPosition];
      if (pointed.offsetTop >= ul.offsetHeight + ul.scrollTop) {
        ul.scrollTop = pointed.offsetTop - ul.offsetHeight + pointed.offsetHeight;
      }
      if (pointed.offsetTop <= ul.scrollTop) {
        ul.scrollTop = pointed.offsetTop;
      }
    }
    this.setState({
      pointSelect: newPosition
    });
  }
  onKeyDown(e) {
    if (this.props.onKeyDown) this.props.onKeyDown(e, this.searchInput.value);
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.setNewPosition(e.key);
        break;
      case 'Enter':
        if (this.state.pointSelect !== -1) {
          let item = this.clearedList()[this.state.pointSelect];
          this.state.pointSelect = -1;
          this.selectItem(item);
        }
        this.closeList();
        break;
      case 'Escape':
        this.closeList();
        break;
      default:
    }
  }
  onInputBlur() {
    this.closeList();
  }
  onInputFocus(e) {
    if (this.state.stateList) return;
    this.openList();
  }
  renderInput() {
    let selItem = this.props.selected;
    let input = /*#__PURE__*/_react.default.createElement("input", {
      ref: input => {
        this.searchInput = input;
      },
      autoFocus: this.props.autoFocus,
      tabIndex: this.props.tabIndex,
      onKeyDown: this.onKeyDown.bind(this),
      onBlur: this.onInputBlur.bind(this),
      onFocus: this.onInputFocus.bind(this),
      className: "reactParts__select-input",
      onChange: this.onChangeInputSearch.bind(this)
    });
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__select-selected"
    }, this.searchInput && this.searchInput.value ? null : this.props.inputRender ? this.props.inputRender(selItem) : selItem !== null && selItem !== undefined && /*#__PURE__*/_react.default.createElement("div", {
      className: this.props.showFullValue ? "" : "reactParts__select-selected-span"
    }, this.getSelected()), input);
  }
  onChangeInputSearch() {
    this.setState({
      pointSelect: -1
    });
  }
  getSelected() {
    let item = undefined;
    let filteredItems = this.props.list.filter(item => item[this.props.uniqueKey] === this.props.selected);
    if (filteredItems.length > 0) {
      item = filteredItems[0];
      return item[this.props.labelKey];
    } else {
      return item;
    }
  }
  render() {
    let selectClassName = 'rp-select reactParts__select';
    if (this.state.stateList) {
      selectClassName += ' focus';
    }
    let placeholder, list, cancel, addControls;
    if (this.props.addControls && this.props.addControls().length > 0) {
      addControls = /*#__PURE__*/_react.default.createElement("div", {
        key: "addControls",
        className: "reactParts__select-addControls"
      }, this.renderControls());
    }
    if (this.props.size) {
      selectClassName += " rp-select--".concat(this.props.size);
    }
    if (this.getSelected() === undefined && (!this.searchInput || this.searchInput && this.searchInput.value.length === 0)) {
      placeholder = /*#__PURE__*/_react.default.createElement("div", {
        className: "reactParts__select-placeholder"
      }, this.props.placeholder);
    }
    if (this.getSelected() !== undefined) {
      cancel = this.props.cancel && /*#__PURE__*/_react.default.createElement("svg", {
        onClick: this.cancelSelected.bind(this),
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        className: "icon reactParts__select__cancel"
      }, /*#__PURE__*/_react.default.createElement("path", {
        d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
      }));
    }
    if (this.state.stateList) {
      list = /*#__PURE__*/_react.default.createElement("ul", {
        ref: ul => {
          this.ul = ul;
        },
        className: "reactParts__select-list",
        style: this.props.showUp ? {
          bottom: this.props.size === "mini" ? 26 : 40
        } : {}
      }, this.renderList());
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      ref: input => {
        this.input = input;
      },
      className: "reactParts__select-wrap"
    }, addControls, this.props.label && /*#__PURE__*/_react.default.createElement("label", {
      className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : ""),
      htmlFor: this.props.name
    }, this.props.label), this.props.readOnly ? /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__select-selected"
    }, this.getSelected()) : /*#__PURE__*/_react.default.createElement("div", {
      className: selectClassName,
      onClick: this.onClickHandler.bind(this)
    }, placeholder, this.renderInput(), cancel, /*#__PURE__*/_react.default.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      className: "icon reactParts__select__arrow"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
    }))), list);
  }
}
exports.Select = Select;
Select.propTypes = {
  readOnly: _propTypes.default.bool,
  cancel: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  name: _propTypes.default.string,
  list: _propTypes.default.array.isRequired,
  selected: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string, _propTypes.default.bool]),
  label: _propTypes.default.string,
  uniqueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  listItemRender: _propTypes.default.func,
  inputRender: _propTypes.default.func,
  noResultsText: _propTypes.default.string,
  onKeyDown: _propTypes.default.func,
  tabIndex: _propTypes.default.number,
  addControls: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,
  showFullValue: _propTypes.default.bool,
  required: _propTypes.default.bool,
  showUp: _propTypes.default.bool
};
Select.defaultProps = {
  readOnly: false,
  cancel: true,
  onChange: null,
  disabled: false,
  placeholder: "",
  name: null,
  list: null,
  selected: null,
  label: null,
  uniqueKey: "id",
  labelKey: "value",
  listItemRender: null,
  inputRender: null,
  noResultsText: "Nothing to show",
  onKeyDown: null,
  addControls: null,
  autoFocus: false,
  showFullValue: false,
  showUp: false
};