"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSelectAsync = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class MultiSelectProps {
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
    _defineProperty(this, "tabIndex", void 0);
    _defineProperty(this, "onKeyDown", void 0);
    _defineProperty(this, "labelKey", void 0);
    _defineProperty(this, "uniqueKey", void 0);
    _defineProperty(this, "addControls", void 0);
    _defineProperty(this, "listItemRender", void 0);
    _defineProperty(this, "inputItemRender", void 0);
    _defineProperty(this, "autoFocus", void 0);
    _defineProperty(this, "required", void 0);
  }
}
class MultiSelectAsync extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "props", void 0);
    _defineProperty(this, "closeList", void 0);
    _defineProperty(this, "state", void 0);
    this.closeList = this.closeList.bind(this);
    this.clearedList = this.clearedList.bind(this);
    this.state = {
      stateList: false,
      list: [],
      pointSelect: -1
    };
  }
  _createReturnObject(name, value) {
    let object = {};
    object[name] = value;
    return object;
  }
  renderControls() {
    return this.props.addControls().map(item => {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "reactParts__multi-select-addControls-item",
        onClick: item.onClickHandler && item.onClickHandler.bind(this, item.name),
        key: Math.random()
      }, item.title);
    });
  }
  selectItem(item) {
    // console.log( "MultiSelectAsync selectItem", this.props.selected );
    let selected = this.props.selected;
    if (!Array.isArray(selected)) {
      selected = [];
    }
    let newSelected = selected.slice();
    newSelected.push(item);
    let c = this._createReturnObject(this.props.name, newSelected);
    // console.log( "MultiSelect selectItem", c );
    this.searchInput.value = "";
    this.onChangeInputSearch();
    this.props.onChange && this.props.onChange(c);
  }
  removeItem(item) {
    // console.log( "Select removeItem", item );
    if (Array.isArray(this.props.selected)) {
      let newSelected = this.props.selected.filter(selItem => selItem[this.props.uniqueKey] !== item[this.props.uniqueKey]);
      let c = this._createReturnObject(this.props.name, newSelected);
      this.props.onChange && this.props.onChange(c);
    }
  }
  onGlobalClick(e) {
    // console.log( "Select onGlobalClick", e );
    if (this.state.stateList) {
      this.closeList();
    }
  }
  openList(event) {
    // console.log( "Select openList" );
    if (event && event.target && (event.target.classList.contains("break") || event.target.parentNode.classList.contains("break"))) return;
    if (this.props.disabled) return;
    this.props.list().then(res => {
      //console.log("SelectAsync res", res);
      this.setState({
        list: res
      });
    });
    this.setState({
      stateList: !this.state.stateList
    });
  }
  closeList(event) {
    // console.log( "MultiSelect closeList", event && event.target );
    if (event && event.target && event.target.classList && (event.target.classList.contains("break") || event.target.parentNode && event.target.parentNode.classList && event.target.parentNode.classList.contains("break"))) return;
    // console.log( "Select closeList" );
    this.searchInput.blur();
    this.setState({
      stateList: false
    });
  }
  cancelSelected() {
    let newSelected = [];
    let c = this._createReturnObject(this.props.name, newSelected);
    this.props.onChange && this.props.onChange(c);
  }
  renderList() {
    let clearedList = this.clearedList();
    let newList = clearedList.map((listItem, index) => {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: listItem[this.props.uniqueKey],
        className: "reactParts__multi-select-list-item break" + (index === this.state.pointSelect ? " pointed" : ""),
        onMouseDown: this.selectItem.bind(this, listItem)
      }, this.props.listItemRender ? this.props.listItemRender(listItem, index, clearedList) : listItem[this.props.labelKey]);
    });
    return newList.length !== 0 ? newList : /*#__PURE__*/_react.default.createElement("li", {
      className: "reactParts__multi-select-list-item empty",
      key: "empty"
    }, " Empty list");
  }
  renderItems() {
    if (Array.isArray(this.props.selected)) {
      //console.log("Select renderItems this.props.multiSelect", this.props.multiSelect);

      if (this.props.selected.length === 0) {
        return null;
      }
      return this.props.selected.map((selItem, i) => {
        if (this.props.inputItemRender) {
          return this.props.inputItemRender(selItem, i, this.removeItem.bind(this));
        }
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "reactParts__multi-select-box-item",
          key: i
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "reactParts__multi-select-box-item-value"
        }, selItem[this.props.labelKey]), /*#__PURE__*/_react.default.createElement("svg", {
          onClick: this.removeItem.bind(this, selItem),
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          className: "reactParts__multi-select-box-item-remove break"
        }, /*#__PURE__*/_react.default.createElement("path", {
          d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"
        })));
      });
    }
  }
  onChangeInputSearch() {
    this.setState({
      pointSelect: -1
    });
    this.props.list(this.searchInput.value).then(res => {
      this.setState({
        list: res
      });
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
    //console.log("MultiSelect setNewPosition", ul);
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
          // console.log( "MultiSelectAsync onKeyDown", this.state.pointSelect );
          let item = this.clearedList()[this.state.pointSelect];
          // console.log( "MultiSelectAsync onKeyDown", item );
          this.state.pointSelect = -1;
          this.selectItem(item);
        }
        //this.closeList();
        break;
      case 'Escape':
        this.closeList();
        break;
      case 'Backspace':
        if (this.searchInput.value === "") {
          this.removeLastSelected();
        }
        break;
      default:
    }
  }
  removeLastSelected() {
    if (Array.isArray(this.props.selected)) {
      let newSelected = this.props.selected.slice();
      newSelected.pop();
      let c = this._createReturnObject(this.props.name, newSelected);
      this.props.onChange && this.props.onChange(c);
    }
  }
  onClickHandler() {
    this.searchInput.focus();
  }
  onInputBlur() {
    this.closeList();
  }
  onInputFocus() {
    if (this.state.stateList) return;
    this.openList();
  }
  clearedList() {
    let list = this.state.list;
    return list.filter(item => {
      if (Array.isArray(this.props.selected)) {
        return this.props.selected.every(i => {
          return i[this.props.uniqueKey] !== item[this.props.uniqueKey];
        });
      } else {
        return true;
      }
    });
  }
  render() {
    let selectClassName = 'rp-select-multi reactParts__multi-select';
    if (this.props.size) {
      selectClassName += " rp-select-multi--".concat(this.props.size);
    }
    if (this.state.stateList) {
      selectClassName += ' focus';
    }
    if (this.props.readOnly) {
      selectClassName += " disabled";
    }
    let list, cancel, addControls;
    if (this.props.addControls && this.props.addControls().length > 0) {
      addControls = /*#__PURE__*/_react.default.createElement("div", {
        key: "addControls",
        className: "reactParts__multi-select-addControls"
      }, this.renderControls());
    }
    let input = /*#__PURE__*/_react.default.createElement("input", {
      ref: input => {
        this.searchInput = input;
      },
      autoFocus: this.props.autoFocus,
      tabIndex: this.props.tabIndex,
      placeholder: this.props.placeholder,
      onKeyDown: this.onKeyDown.bind(this),
      onBlur: this.onInputBlur.bind(this),
      onFocus: this.onInputFocus.bind(this),
      className: "reactParts__multi-select-input",
      onChange: this.onChangeInputSearch.bind(this)
    });
    if (this.props.selected) {
      cancel = this.props.cancel && /*#__PURE__*/_react.default.createElement("svg", {
        onClick: this.cancelSelected.bind(this),
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        className: "reactParts__multi-select__cancel"
      }, /*#__PURE__*/_react.default.createElement("path", {
        d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
      }));
    }
    if (this.state.stateList) {
      list = /*#__PURE__*/_react.default.createElement("ul", {
        ref: ul => {
          this.ul = ul;
        },
        className: "reactParts__multi-select-list",
        style: this.props.showUp ? {
          bottom: this.props.size === "mini" ? 26 : 40
        } : {}
      }, this.renderList());
    }
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__multi-select-wrap"
    }, addControls, this.props.label && /*#__PURE__*/_react.default.createElement("label", {
      className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : ""),
      htmlFor: this.props.name
    }, this.props.label), this.props.readOnly ? /*#__PURE__*/_react.default.createElement("div", {
      className: selectClassName
    }, this.renderItems()) : /*#__PURE__*/_react.default.createElement("div", {
      className: selectClassName,
      onClick: this.onClickHandler.bind(this)
    }, this.renderItems(), input, cancel, /*#__PURE__*/_react.default.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      className: "icon reactParts__multi-select__arrow"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"
    }))), list);
  }
}
exports.MultiSelectAsync = MultiSelectAsync;
MultiSelectAsync.propTypes = {
  readOnly: _propTypes.default.bool,
  cancel: _propTypes.default.bool,
  onChange: _propTypes.default.func,
  disabled: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  name: _propTypes.default.string,
  size: _propTypes.default.string,
  list: _propTypes.default.func,
  selected: _propTypes.default.array,
  label: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  onKeyDown: _propTypes.default.func,
  uniqueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  addControls: _propTypes.default.func,
  listItemRender: _propTypes.default.func,
  inputItemRender: _propTypes.default.func,
  autoFocus: _propTypes.default.bool,
  required: _propTypes.default.bool,
  showUp: _propTypes.default.bool
};
MultiSelectAsync.defaultProps = {
  uniqueKey: "id",
  labelKey: "value",
  selected: [],
  autoFocus: false,
  showUp: false
};