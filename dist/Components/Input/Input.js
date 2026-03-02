"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Input extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "input", void 0);
    _defineProperty(this, "props", void 0);
    _defineProperty(this, "_OnGlobalClickHandler", void 0);
    _defineProperty(this, "state", void 0);
    this._OnGlobalClickHandler = this._OnGlobalClickHandler.bind(this);
    this.state = {
      suggest: [],
      isSuggestOpen: false,
      pointSelect: -1
    };
  }
  componentDidMount() {
    if (this.props.suggest) {
      document.addEventListener("click", this._OnGlobalClickHandler);
    }
  }
  componentWillUnmount() {
    if (this.props.suggest) {
      document.removeEventListener("click", this._OnGlobalClickHandler);
    }
  }
  onKeyUp(e) {
    if (this.props.onKeyUp) this.props.onKeyUp(e);
  }
  setNewPosition(key) {
    let currentPosition = this.state.pointSelect;
    let newPosition = -1;
    if (key === 'ArrowDown') {
      if (currentPosition === this.state.suggest.length - 1) {
        newPosition = 0;
      } else {
        newPosition = currentPosition + 1;
      }
    }
    if (key === 'ArrowUp') {
      if (currentPosition === 0 || currentPosition === -1) {
        newPosition = this.state.suggest.length - 1;
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
    let suggest = this.state.suggest;
    if (e.key === 'ArrowDown' && !this.state.isSuggestOpen && suggest && suggest.length > 0) {
      this.setState({
        isSuggestOpen: true
      });
    }
    if (this.state.isSuggestOpen) {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          //this.input.selectionStart = startPos;
          this.setNewPosition(e.key);
          break;
        case 'Enter':
          let item = this.state.suggest[this.state.pointSelect];
          this.state.pointSelect = -1;
          this.selectFromSuggestions(item);
          break;
        case 'Escape':
          this.setState({
            isSuggestOpen: false
          });
          break;
        case 'Tab':
          this.setState({
            isSuggestOpen: false
          });
        default:
      }
    }
    this.props.onKeyDown && this.props.onKeyDown(e);
  }
  _createReturnObject(name, value) {
    let object = {};
    object[name] = value;
    return object;
  }
  onChangeHandler() {
    let value = this.input.value;
    if (this.props.limit && typeof value === "string" && value.length && this.props.limit > this.props.limit) {
      value = typeof value === "string" ? value.slice(0, this.props.limit) : value;
    }
    let obj;
    if (this.props.type === "number") {
      value = Number(value);
    }
    let name = this.props.name;
    if (name) {
      obj = this._createReturnObject(name, value);
    } else {
      obj = value;
    }
    if (this.props.onChange) this.props.onChange(obj);
    if (this.state.selected !== value && this.props.suggest) {
      this.setState({
        isSuggestOpen: true
      });
    }
    if (this.props.suggest) this.updateSuggest(value);
  }
  updateSuggest(value) {
    this.props.suggest(value).then(res => {
      if (res) {
        this.setState({
          suggest: res
        });
      }
    });
  }
  focusOn(e) {
    if (this.props.suggest && this.props.suggest(this.input && this.input.value || "")) {
      if (this.input) {
        this.setState({
          isSuggestOpen: true
        });
      }
    }
    if (this.props.onFocus) this.props.onFocus();
  }
  focusOff(e) {
    //if (this.state.isSuggestOpen){
    //    this.setState({isSuggestOpen:false})
    //}
    if (this.props.onBlur) this.props.onBlur();
  }
  _OnGlobalClickHandler(e) {
    let target = e.target;
    if (this.state.isSuggestOpen) {
      if (this.input !== target) this.setState({
        isSuggestOpen: false
      });
    }
  }
  selectFromSuggestions(item) {
    if (item) {
      let obj;
      let name = this.props.name;
      if (name) {
        obj = this._createReturnObject(name, item.value);
      } else {
        obj = item.value;
      }
      if (this.props.onChange) this.props.onChange(obj, item);
      if (this.props.onSelectFromSuggest) this.props.onSelectFromSuggest(obj, item);
      this.updateSuggest(item.value);
    }
    this.setState({
      isSuggestOpen: false
    });
  }
  renderSuggestionsList() {
    let suggest = this.state.suggest;
    let className = "reactParts__input-suggest-list-item";
    if (suggest instanceof Array !== true) return null;
    let list = suggest.map((item, i) => {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: i,
        onClick: this.selectFromSuggestions.bind(this, item),
        className: className + (i === this.state.pointSelect ? " selected" : "")
      }, this.props.listItemRender ? this.props.listItemRender(item, i, suggest) : item.value);
    });
    return list;
  }
  renderControls() {
    return this.props.addControls().map(item => {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "reactParts__input-addControls-item",
        onClick: item.onClickHandler && item.onClickHandler.bind(this, item.name),
        key: Math.random()
      }, item.title);
    });
  }
  cancelSelected() {
    let newSelected = "";
    this.state.suggest = [];
    let c = this._createReturnObject(this.props.name, newSelected);
    this.props.onChange && this.props.onChange(c);
  }
  render() {
    let InputSimpleClassName = "rp-input reactParts__input";
    if (this.props.cancel) InputSimpleClassName += " cancel";
    let valid = this.props.valid;
    if (valid !== undefined && valid !== null) {
      if (valid) {
        InputSimpleClassName += " valid";
      } else {
        InputSimpleClassName += " invalid";
      }
    }
    let cancel = this.props.cancel && /*#__PURE__*/_react.default.createElement("svg", {
      onClick: this.cancelSelected.bind(this),
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      className: "icon reactParts__input__cancel",
      key: "cancel"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
    }));
    if (this.props.className) InputSimpleClassName += " ".concat(this.props.className);
    if (this.props.prefix) InputSimpleClassName += " prefix";
    if (this.props.size) InputSimpleClassName += " rp-input--".concat(this.props.size);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__input-wrap" + (this.props.readOnly ? " readOnly" : "") + (this.props.size && this.props.readOnly ? " readOnly--".concat(this.props.size) : "") + (this.props.prefix ? " prefix" : "")
    }, this.props.label && /*#__PURE__*/_react.default.createElement("label", {
      className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : ""),
      htmlFor: this.props.name
    }, this.props.label), this.props.readOnly ? this.props.value : [this.props.prefix ? /*#__PURE__*/_react.default.createElement("div", {
      key: "prefix",
      className: "reactParts__input-prefix"
    }, this.props.prefix) : null, /*#__PURE__*/_react.default.createElement("input", {
      className: InputSimpleClassName,
      key: "input",
      autoComplete: this.props.suggest ? "off" : this.props.autocomplete ? "on" : "off",
      id: this.props.name,
      type: this.props.type,
      autoFocus: this.props.autoFocus,
      disabled: this.props.disabled,
      placeholder: this.props.placeholder,
      onChange: this.onChangeHandler.bind(this),
      onKeyUp: this.onKeyUp.bind(this),
      onKeyDown: this.onKeyDown.bind(this),
      value: this.props.value === null || this.props.value === undefined ? "" : this.props.value,
      onFocus: this.focusOn.bind(this),
      onBlur: this.focusOff.bind(this),
      ref: input => {
        this.input = input;
      },
      tabIndex: this.props.tabIndex
    }), cancel, this.props.addControls && this.props.addControls().length > 0 && /*#__PURE__*/_react.default.createElement("div", {
      key: "addControls",
      className: "reactParts__input-addControls"
    }, this.renderControls()), this.state.isSuggestOpen && this.state.suggest.length > 0 && /*#__PURE__*/_react.default.createElement("ul", {
      ref: ul => {
        this.ul = ul;
      },
      key: "suggest",
      className: "reactParts__input-suggest-list"
    }, this.renderSuggestionsList())]);
  }
}
exports.Input = Input;
Input.defaultProps = {
  type: "string"
};
Input.propTypes = {
  addControls: _propTypes.default.func,
  suggest: _propTypes.default.func,
  onChange: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  keypress: _propTypes.default.func,
  name: _propTypes.default.string,
  placeholder: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  type: _propTypes.default.string,
  valid: _propTypes.default.bool,
  size: _propTypes.default.string,
  limit: _propTypes.default.number,
  className: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  label: _propTypes.default.string,
  autocomplete: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  cancel: _propTypes.default.bool,
  prefix: _propTypes.default.string,
  listItemRender: _propTypes.default.func,
  onSelectFromSuggest: _propTypes.default.func,
  required: _propTypes.default.bool
};