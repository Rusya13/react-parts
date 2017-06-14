"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MultiSelectAsync = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MultiSelectProps = function MultiSelectProps() {
    _classCallCheck(this, MultiSelectProps);
};

var MultiSelectAsync = exports.MultiSelectAsync = function (_React$Component) {
    _inherits(MultiSelectAsync, _React$Component);

    function MultiSelectAsync(props) {
        _classCallCheck(this, MultiSelectAsync);

        var _this = _possibleConstructorReturn(this, (MultiSelectAsync.__proto__ || Object.getPrototypeOf(MultiSelectAsync)).call(this, props));

        _this.closeList = _this.closeList.bind(_this);
        _this.clearedList = _this.clearedList.bind(_this);
        _this.state = {
            stateList: false,
            list: [],
            pointSelect: -1
        };
        return _this;
    }

    _createClass(MultiSelectAsync, [{
        key: "_createReturnObject",
        value: function _createReturnObject(name, value) {
            var object = {};
            object[name] = value;
            return object;
        }
    }, {
        key: "renderControls",
        value: function renderControls() {
            var _this2 = this;

            return this.props.addControls().map(function (item) {
                return _react2.default.createElement(
                    "div",
                    { className: "reactParts__multi-select-addControls-item",
                        onClick: item.onClickHandler && item.onClickHandler.bind(_this2, item.name),
                        key: Math.random() },
                    item.title
                );
            });
        }
    }, {
        key: "selectItem",
        value: function selectItem(item) {
            console.log("MultiSelectAsync selectItem", this.props.selected);
            var selected = this.props.selected;
            if (!Array.isArray(selected)) {
                selected = [];
            }
            var newSelected = selected.slice();
            newSelected.push(item);
            var c = this._createReturnObject(this.props.name, newSelected);
            console.log("MultiSelect selectItem", c);
            this.searchInput.value = "";
            this.onChangeInputSearch();
            this.props.onChange && this.props.onChange(c);
        }
    }, {
        key: "removeItem",
        value: function removeItem(item) {
            var _this3 = this;

            console.log("Select removeItem", item);
            if (Array.isArray(this.props.selected)) {
                var newSelected = this.props.selected.filter(function (selItem) {
                    return selItem[_this3.props.uniqueKey] !== item[_this3.props.uniqueKey];
                });
                var c = this._createReturnObject(this.props.name, newSelected);
                this.props.onChange && this.props.onChange(c);
            }
        }
    }, {
        key: "onGlobalClick",
        value: function onGlobalClick(e) {
            console.log("Select onGlobalClick", e);
            if (this.state.stateList) {
                this.closeList();
            }
        }
    }, {
        key: "openList",
        value: function openList(event) {
            var _this4 = this;

            console.log("Select openList");
            if (event && event.target && (event.target.classList.contains("break") || event.target.parentNode.classList.contains("break"))) return;
            if (this.props.disabled) return;

            this.props.list().then(function (res) {
                //console.log("SelectAsync res", res);
                _this4.setState({ list: res });
            });
            //document.addEventListener( "click", this.closeList, false );
            this.setState({ stateList: !this.state.stateList });
        }
    }, {
        key: "closeList",
        value: function closeList(event) {
            console.log("MultiSelect closeList", event && event.target);
            if (event && event.target && event.target.classList && (event.target.classList.contains("break") || event.target.parentNode && event.target.parentNode.classList && event.target.parentNode.classList.contains("break"))) return;
            console.log("Select closeList");
            this.searchInput.blur();
            this.setState({ stateList: false });
            //document.removeEventListener( "click", this.closeList, false );
        }
    }, {
        key: "cancelSelected",
        value: function cancelSelected() {
            var newSelected = [];
            var c = this._createReturnObject(this.props.name, newSelected);
            this.props.onChange && this.props.onChange(c);
        }
    }, {
        key: "renderList",
        value: function renderList() {
            var _this5 = this;

            var clearedList = this.clearedList();

            var newList = clearedList.map(function (listItem, index) {
                return _react2.default.createElement(
                    "li",
                    { key: listItem[_this5.props.uniqueKey],
                        className: "reactParts__multi-select-list-item break" + (index === _this5.state.pointSelect ? " pointed" : ""),
                        onMouseDown: _this5.selectItem.bind(_this5, listItem) },
                    _this5.props.listItemRender ? _this5.props.listItemRender(listItem, index, clearedList) : listItem[_this5.props.labelKey]
                );
            });

            return newList.length !== 0 ? newList : _react2.default.createElement(
                "li",
                { className: "reactParts__multi-select-list-item empty", key: "empty" },
                " Empty list"
            );
        }
    }, {
        key: "renderItems",
        value: function renderItems() {
            var _this6 = this;

            if (Array.isArray(this.props.selected)) {
                //console.log("Select renderItems this.props.multiSelect", this.props.multiSelect);

                if (this.props.selected.length === 0) {
                    return null;
                }
                return this.props.selected.map(function (selItem, i) {
                    if (_this6.props.inputItemRender) {
                        return _this6.props.inputItemRender(selItem, i, _this6.removeItem.bind(_this6));
                    }
                    return _react2.default.createElement(
                        "div",
                        { className: "reactParts__multi-select-box-item", key: i },
                        _react2.default.createElement(
                            "span",
                            { className: "reactParts__multi-select-box-item-value" },
                            selItem[_this6.props.labelKey]
                        ),
                        _react2.default.createElement(
                            "svg",
                            { onClick: _this6.removeItem.bind(_this6, selItem), width: "16", height: "16", viewBox: "0 0 24 24",
                                className: "reactParts__multi-select-box-item-remove break" },
                            _react2.default.createElement("path", {
                                d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z" })
                        )
                    );
                });
            }
        }
    }, {
        key: "onChangeInputSearch",
        value: function onChangeInputSearch() {
            var _this7 = this;

            this.setState({ pointSelect: -1 });
            this.props.list(this.searchInput.value).then(function (res) {

                _this7.setState({ list: res });
            });
        }
    }, {
        key: "setNewPosition",
        value: function setNewPosition(key) {
            var currentPosition = this.state.pointSelect;
            var newPosition = -1;

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
            var ul = this.ul;
            //console.log("MultiSelect setNewPosition", ul);
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
            if (this.props.onKeyDown) this.props.onKeyDown(e, this.searchInput.value);
            switch (e.key) {
                case 'ArrowDown':
                case 'ArrowUp':
                    this.setNewPosition(e.key);
                    break;
                case 'Enter':
                    if (this.state.pointSelect !== -1) {
                        console.log("MultiSelectAsync onKeyDown", this.state.pointSelect);
                        var item = this.clearedList()[this.state.pointSelect];
                        console.log("MultiSelectAsync onKeyDown", item);
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
    }, {
        key: "removeLastSelected",
        value: function removeLastSelected() {
            if (Array.isArray(this.props.selected)) {
                var newSelected = this.props.selected.slice();
                newSelected.pop();
                var c = this._createReturnObject(this.props.name, newSelected);
                this.props.onChange && this.props.onChange(c);
            }
        }
    }, {
        key: "onClickHandler",
        value: function onClickHandler() {
            this.searchInput.focus();
        }
    }, {
        key: "onInputBlur",
        value: function onInputBlur() {
            this.closeList();
        }
    }, {
        key: "onInputFocus",
        value: function onInputFocus() {
            if (this.state.stateList) return;
            this.openList();
        }
    }, {
        key: "clearedList",
        value: function clearedList() {
            var _this8 = this;

            var list = this.state.list;
            return list.filter(function (item) {
                if (Array.isArray(_this8.props.selected)) {
                    return _this8.props.selected.every(function (i) {
                        return i[_this8.props.uniqueKey] !== item[_this8.props.uniqueKey];
                    });
                } else {
                    return true;
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this9 = this;

            var selectClassName = 'reactParts__multi-select';

            if (this.state.stateList) {
                selectClassName += ' focus';
            }
            if (this.props.readOnly) {
                selectClassName += " disabled";
            }
            var list = void 0,
                cancel = void 0,
                addControls = void 0;

            if (this.props.addControls && this.props.addControls().length > 0) {
                addControls = _react2.default.createElement(
                    "div",
                    { key: "addControls", className: "reactParts__multi-select-addControls" },
                    this.renderControls()
                );
            }

            var input = _react2.default.createElement("input", { ref: function ref(input) {
                    _this9.searchInput = input;
                },
                autoFocus: this.props.autoFocus,
                tabIndex: this.props.tabIndex,
                placeholder: this.props.placeholder,
                onKeyDown: this.onKeyDown.bind(this),
                onBlur: this.onInputBlur.bind(this),
                onFocus: this.onInputFocus.bind(this),
                className: "reactParts__multi-select-input",
                onChange: this.onChangeInputSearch.bind(this) });

            if (this.props.selected) {
                cancel = this.props.cancel && _react2.default.createElement(
                    "svg",
                    { onClick: this.cancelSelected.bind(this), width: "18", height: "18", viewBox: "0 0 24 24",
                        className: "reactParts__multi-select__cancel" },
                    _react2.default.createElement("path", {
                        d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })
                );
            }
            if (this.state.stateList) {
                list = _react2.default.createElement(
                    "ul",
                    { ref: function ref(ul) {
                            _this9.ul = ul;
                        }, className: "reactParts__multi-select-list" },
                    this.renderList()
                );
            }

            return _react2.default.createElement(
                "div",
                { className: "reactParts__multi-select-wrap" },
                addControls,
                this.props.label && _react2.default.createElement(
                    "label",
                    { className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : ""), htmlFor: this.props.name },
                    this.props.label
                ),
                this.props.readOnly ? _react2.default.createElement(
                    "div",
                    { className: selectClassName },
                    this.renderItems()
                ) : _react2.default.createElement(
                    "div",
                    { className: selectClassName, onClick: this.onClickHandler.bind(this) },
                    this.renderItems(),
                    input,
                    cancel,
                    _react2.default.createElement(
                        "svg",
                        { width: "24", height: "24", viewBox: "0 0 24 24",
                            className: "icon reactParts__multi-select__arrow" },
                        _react2.default.createElement("path", { d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" })
                    )
                ),
                list
            );
        }
    }]);

    return MultiSelectAsync;
}(_react2.default.Component);

MultiSelectAsync.propTypes = {
    readOnly: _propTypes2.default.bool,
    cancel: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    disabled: _propTypes2.default.bool,
    placeholder: _propTypes2.default.string,
    name: _propTypes2.default.string,
    list: _propTypes2.default.func,
    selected: _propTypes2.default.array,
    label: _propTypes2.default.string,
    tabIndex: _propTypes2.default.number,
    onKeyDown: _propTypes2.default.func,
    uniqueKey: _propTypes2.default.string,
    labelKey: _propTypes2.default.string,
    addControls: _propTypes2.default.func,
    listItemRender: _propTypes2.default.func,
    inputItemRender: _propTypes2.default.func,
    autoFocus: _propTypes2.default.bool,
    required: _propTypes2.default.bool
};

MultiSelectAsync.defaultProps = {
    uniqueKey: "id",
    labelKey: "value",
    selected: [],
    autoFocus: false
};