"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Input = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = exports.Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this._OnGlobalClickHandler = _this._OnGlobalClickHandler.bind(_this);
        _this.state = {
            suggest: [],
            isSuggestOpen: false,
            pointSelect: -1
        };
        return _this;
    }

    _createClass(Input, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.props.suggest) {
                document.addEventListener("click", this._OnGlobalClickHandler);
            }
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            if (this.props.suggest) {
                document.removeEventListener("click", this._OnGlobalClickHandler);
            }
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(e) {
            if (this.props.onKeyUp) this.props.onKeyUp(e);
        }
    }, {
        key: "setNewPosition",
        value: function setNewPosition(key) {
            var currentPosition = this.state.pointSelect;
            var newPosition = -1;
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

            var ul = this.ul;
            var pointed = void 0;
            if (ul.children && ul.children.length > 0) {
                pointed = ul.children[newPosition];
                if (pointed.offsetTop >= ul.offsetHeight + ul.scrollTop) {
                    ul.scrollTop = pointed.offsetTop - ul.offsetHeight + pointed.offsetHeight;
                }
                if (pointed.offsetTop <= ul.scrollTop) {
                    ul.scrollTop = pointed.offsetTop;
                }
            }

            this.setState({ pointSelect: newPosition });
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
            var suggest = this.state.suggest;
            if (e.key === 'ArrowDown' && !this.state.isSuggestOpen && suggest && suggest.length > 0) {
                this.setState({ isSuggestOpen: true });
            }
            if (this.state.isSuggestOpen) {
                switch (e.key) {
                    case 'ArrowDown':
                    case 'ArrowUp':
                        //this.input.selectionStart = startPos;
                        this.setNewPosition(e.key);
                        break;
                    case 'Enter':
                        var item = this.state.suggest[this.state.pointSelect];
                        this.state.pointSelect = -1;
                        this.selectFromSuggestions(item);
                        break;
                    case 'Escape':
                        this.setState({ isSuggestOpen: false });
                        break;
                    case 'Tab':
                        this.setState({ isSuggestOpen: false });
                    default:

                }
            }

            this.props.onKeyDown && this.props.onKeyDown(e);
        }
    }, {
        key: "_createReturnObject",
        value: function _createReturnObject(name, value) {
            var object = {};
            object[name] = value;
            return object;
        }
    }, {
        key: "onChangeHandler",
        value: function onChangeHandler() {

            var value = this.input.value;
            if (this.props.limit && typeof value === "string" && value.length && this.props.limit > this.props.limit) {
                value = typeof value === "string" ? value.slice(0, this.props.limit) : value;
            }
            var obj = void 0;
            if (this.props.type === "number") {
                value = Number(value);
            }
            var name = this.props.name;
            if (name) {
                obj = this._createReturnObject(name, value);
            } else {
                obj = value;
            }
            if (this.props.onChange) this.props.onChange(obj);
            if (this.state.selected !== value && this.props.suggest) {
                this.setState({ isSuggestOpen: true });
            }
            if (this.props.suggest) this.updateSuggest(value);
        }
    }, {
        key: "updateSuggest",
        value: function updateSuggest(value) {
            var _this2 = this;

            this.props.suggest(value).then(function (res) {
                if (res) {
                    _this2.setState({ suggest: res });
                }
            });
        }
    }, {
        key: "focusOn",
        value: function focusOn(e) {
            if (this.props.suggest && this.props.suggest(this.input && this.input.value || "")) {
                if (this.input) {
                    this.setState({ isSuggestOpen: true });
                }
            }
            if (this.props.onFocus) this.props.onFocus();
        }
    }, {
        key: "focusOff",
        value: function focusOff(e) {
            //if (this.state.isSuggestOpen){
            //    this.setState({isSuggestOpen:false})
            //}
            if (this.props.onBlur) this.props.onBlur();
        }
    }, {
        key: "_OnGlobalClickHandler",
        value: function _OnGlobalClickHandler(e) {
            var target = e.target;
            if (this.state.isSuggestOpen) {
                if (this.input !== target) this.setState({ isSuggestOpen: false });
            }
        }
    }, {
        key: "selectFromSuggestions",
        value: function selectFromSuggestions(item) {

            if (item) {
                var _obj = void 0;
                var _name = this.props.name;

                if (_name) {
                    _obj = this._createReturnObject(_name, item.value);
                } else {
                    _obj = item.value;
                }
                if (this.props.onChange) this.props.onChange(_obj, item);
                if (this.props.onSelectFromSuggest) this.props.onSelectFromSuggest(_obj, item);
                this.updateSuggest(item.value);
            }
            this.setState({ isSuggestOpen: false });
        }
    }, {
        key: "renderSuggestionsList",
        value: function renderSuggestionsList() {
            var _this3 = this;

            var suggest = this.state.suggest;
            var className = "reactParts__input-suggest-list-item";

            if (suggest instanceof Array !== true) return null;
            var list = suggest.map(function (item, i) {
                return _react2.default.createElement(
                    "li",
                    {
                        key: i,
                        onClick: _this3.selectFromSuggestions.bind(_this3, item),
                        className: className + (i === _this3.state.pointSelect ? " selected" : "")
                    },
                    _this3.props.listItemRender ? _this3.props.listItemRender(item, i, suggest) : item.value
                );
            });

            return list;
        }
    }, {
        key: "renderControls",
        value: function renderControls() {
            var _this4 = this;

            return this.props.addControls().map(function (item) {
                return _react2.default.createElement(
                    "div",
                    { className: "reactParts__input-addControls-item",
                        onClick: item.onClickHandler && item.onClickHandler.bind(_this4, item.name),
                        key: Math.random() },
                    item.title
                );
            });
        }
    }, {
        key: "cancelSelected",
        value: function cancelSelected() {
            var newSelected = "";
            this.state.suggest = [];
            var c = this._createReturnObject(this.props.name, newSelected);
            this.props.onChange && this.props.onChange(c);
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var InputSimpleClassName = "rp-input reactParts__input";
            if (this.props.cancel) InputSimpleClassName += " cancel";
            var valid = this.props.valid;
            if (valid !== undefined && valid !== null) {
                if (valid) {
                    InputSimpleClassName += " valid";
                } else {
                    InputSimpleClassName += " invalid";
                }
            }
            var cancel = this.props.cancel && _react2.default.createElement(
                "svg",
                { onClick: this.cancelSelected.bind(this), width: "18", height: "18", viewBox: "0 0 24 24",
                    className: "icon reactParts__input__cancel", key: "cancel" },
                _react2.default.createElement("path", {
                    d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })
            );

            if (this.props.className) InputSimpleClassName += " " + this.props.className;
            if (this.props.prefix) InputSimpleClassName += " prefix";
            if (this.props.size) InputSimpleClassName += " rp-input--" + this.props.size;

            return _react2.default.createElement(
                "div",
                { className: "reactParts__input-wrap" + (this.props.readOnly ? " readOnly" : "") + (this.props.prefix ? " prefix" : "") },
                this.props.label && _react2.default.createElement(
                    "label",
                    { className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : ""), htmlFor: this.props.name },
                    this.props.label
                ),
                this.props.readOnly ? this.props.value : [this.props.prefix ? _react2.default.createElement(
                    "div",
                    { key: "prefix", className: "reactParts__input-prefix" },
                    this.props.prefix
                ) : null, _react2.default.createElement("input", { className: InputSimpleClassName,
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
                    ref: function ref(input) {
                        _this5.input = input;
                    },
                    tabIndex: this.props.tabIndex
                }), cancel, this.props.addControls && this.props.addControls().length > 0 && _react2.default.createElement(
                    "div",
                    { key: "addControls", className: "reactParts__input-addControls" },
                    this.renderControls()
                ), this.state.isSuggestOpen && this.state.suggest.length > 0 && _react2.default.createElement(
                    "ul",
                    { ref: function ref(ul) {
                            _this5.ul = ul;
                        }, key: "suggest", className: "reactParts__input-suggest-list" },
                    this.renderSuggestionsList()
                )]
            );
        }
    }]);

    return Input;
}(_react2.default.Component);

Input.defaultProps = {
    type: "string"

};

Input.propTypes = {
    addControls: _propTypes2.default.func,
    suggest: _propTypes2.default.func,
    onChange: _propTypes2.default.func,
    onKeyUp: _propTypes2.default.func,
    onKeyDown: _propTypes2.default.func,
    onFocus: _propTypes2.default.func,
    onBlur: _propTypes2.default.func,
    keypress: _propTypes2.default.func,
    name: _propTypes2.default.string,
    placeholder: _propTypes2.default.string,
    autoFocus: _propTypes2.default.bool,
    readOnly: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    type: _propTypes2.default.string,
    valid: _propTypes2.default.bool,
    size: _propTypes2.default.string,
    limit: _propTypes2.default.number,
    className: _propTypes2.default.string,
    value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number]),
    label: _propTypes2.default.string,
    autocomplete: _propTypes2.default.bool,
    tabIndex: _propTypes2.default.number,
    cancel: _propTypes2.default.bool,
    prefix: _propTypes2.default.string,
    listItemRender: _propTypes2.default.func,
    onSelectFromSuggest: _propTypes2.default.func,
    required: _propTypes2.default.bool
};