"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Select = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectProps = function SelectProps() {
    _classCallCheck(this, SelectProps);
};

var Select = exports.Select = function (_React$Component) {
    _inherits(Select, _React$Component);

    function Select(props) {
        _classCallCheck(this, Select);

        var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

        _this.closeList = _this.closeList.bind(_this);

        _this.state = {
            stateList: false,
            //showInput:   false,
            list: Array.isArray(props.list) ? props.list : [],
            pointSelect: -1
        };
        return _this;
    }

    _createClass(Select, [{
        key: "_createReturnObject",
        value: function _createReturnObject(name, value) {
            var object = {};
            object[name] = value;
            return object;
        }
    }, {
        key: "selectItem",
        value: function selectItem(item) {
            this.setState({ stateList: false });
            var c = this._createReturnObject(this.props.name, item[this.props.uniqueKey]);
            this.props.onChange && this.props.onChange(c, item);
        }
    }, {
        key: "onClickHandler",
        value: function onClickHandler() {
            this.searchInput.focus();
        }
    }, {
        key: "renderControls",
        value: function renderControls() {
            var _this2 = this;

            return this.props.addControls().map(function (item) {
                return _react2.default.createElement(
                    "div",
                    { className: "reactParts__select-addControls-item",
                        onClick: item.onClickHandler && item.onClickHandler.bind(_this2, item.name),
                        key: Math.random() },
                    item.title
                );
            });
        }
    }, {
        key: "openList",
        value: function openList() {
            if (this.state.stateList) return;
            if (this.props.disabled) return;
            this.setState({ stateList: true });
        }
    }, {
        key: "closeList",
        value: function closeList() {
            if (this.searchInput) this.searchInput.value = "";
            this.searchInput.blur();
            this.setState({ stateList: false });
        }
    }, {
        key: "cancelSelected",
        value: function cancelSelected() {
            var newSelected = null;
            var c = this._createReturnObject(this.props.name, newSelected);
            this.props.onChange && this.props.onChange(c);
        }
    }, {
        key: "renderList",
        value: function renderList() {
            var _this3 = this;

            var list = this.state.list;
            var matchesFilter = new RegExp(this.searchInput.value, "i");

            if (Array.isArray(this.state.list) && this.searchInput) {
                list = list.filter(function (item) {
                    return !_this3.searchInput.value || matchesFilter.test(item[_this3.props.labelKey]);
                });
            }

            var newList = list.map(function (selItem, i, list) {
                return _react2.default.createElement(
                    "li",
                    { key: selItem[_this3.props.uniqueKey],
                        className: "reactParts__select-list-item" + (selItem[_this3.props.uniqueKey] === (_this3.props.selected && _this3.props.selected[_this3.props.uniqueKey]) ? " selected" : "") + (i === _this3.state.pointSelect ? " pointed" : ""),
                        onMouseDown: _this3.selectItem.bind(_this3, selItem) },
                    _this3.props.listItemRender ? _this3.props.listItemRender(selItem, i, list) : selItem[_this3.props.labelKey]
                );
            });
            return newList.length !== 0 ? newList : _react2.default.createElement(
                "li",
                { className: "reactParts__select-list-item empty", key: "empty" },
                this.props.noResultsText
            );
        }
    }, {
        key: "clearedList",
        value: function clearedList() {
            var _this4 = this;

            var matchesFilter = new RegExp(this.searchInput.value, "i");

            var list = this.state.list;

            return list.filter(function (item) {
                return !_this4.searchInput.value || matchesFilter.test(item[_this4.props.labelKey]);
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

                        var item = this.clearedList()[this.state.pointSelect];

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
    }, {
        key: "onInputBlur",
        value: function onInputBlur() {

            this.closeList();
        }
    }, {
        key: "onInputFocus",
        value: function onInputFocus(e) {
            if (this.state.stateList) return;
            this.openList();
        }
    }, {
        key: "renderInput",
        value: function renderInput() {
            var _this5 = this;

            var selItem = this.props.selected;

            var input = _react2.default.createElement("input", { ref: function ref(input) {
                    _this5.searchInput = input;
                },
                autoFocus: this.props.autoFocus,
                tabIndex: this.props.tabIndex,
                onKeyDown: this.onKeyDown.bind(this),
                onBlur: this.onInputBlur.bind(this),
                onFocus: this.onInputFocus.bind(this),
                className: "reactParts__select-input", onChange: this.onChangeInputSearch.bind(this) });

            return _react2.default.createElement(
                "div",
                {
                    className: "reactParts__select-selected" },
                this.searchInput && this.searchInput.value ? null : this.props.inputRender ? this.props.inputRender(selItem) : selItem !== null && selItem !== undefined && _react2.default.createElement(
                    "div",
                    {
                        className: this.props.showFullValue ? "" : "reactParts__select-selected-span" },
                    this.getSelected()
                ),
                input
            );
        }
    }, {
        key: "onChangeInputSearch",
        value: function onChangeInputSearch() {
            this.setState({ pointSelect: -1 });
        }
    }, {
        key: "getSelected",
        value: function getSelected() {
            var _this6 = this;

            var item = undefined;
            var filteredItems = this.props.list.filter(function (item) {
                return item[_this6.props.uniqueKey] === _this6.props.selected;
            });
            if (filteredItems.length > 0) {
                item = filteredItems[0];
                return item[this.props.labelKey];
            } else {
                return item;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            var selectClassName = 'rp-select reactParts__select';

            if (this.state.stateList) {
                selectClassName += ' focus';
            }
            var placeholder = void 0,
                list = void 0,
                cancel = void 0,
                addControls = void 0;

            if (this.props.addControls && this.props.addControls().length > 0) {
                addControls = _react2.default.createElement(
                    "div",
                    { key: "addControls", className: "reactParts__select-addControls" },
                    this.renderControls()
                );
            }

            if (this.props.size) {
                selectClassName += " rp-select--" + this.props.size;
            }

            if (this.getSelected() === undefined && (!this.searchInput || this.searchInput && this.searchInput.value.length === 0)) {
                placeholder = _react2.default.createElement(
                    "div",
                    { className: "reactParts__select-placeholder" },
                    this.props.placeholder
                );
            }

            if (this.getSelected() !== undefined) {
                cancel = this.props.cancel && _react2.default.createElement(
                    "svg",
                    { onClick: this.cancelSelected.bind(this), width: "18", height: "18", viewBox: "0 0 24 24",
                        className: "icon reactParts__select__cancel" },
                    _react2.default.createElement("path", {
                        d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" })
                );
            }
            if (this.state.stateList) {
                list = _react2.default.createElement(
                    "ul",
                    { ref: function ref(ul) {
                            _this7.ul = ul;
                        }, className: "reactParts__select-list" },
                    this.renderList()
                );
            }

            return _react2.default.createElement(
                "div",
                { ref: function ref(input) {
                        _this7.input = input;
                    }, className: "reactParts__select-wrap" },
                addControls,
                this.props.label && _react2.default.createElement(
                    "label",
                    { className: "reactParts__label" + (this.props.required && !this.props.readOnly ? " required" : ""), htmlFor: this.props.name },
                    this.props.label
                ),
                this.props.readOnly ? _react2.default.createElement(
                    "div",
                    { className: "reactParts__select-selected" },
                    this.getSelected()
                ) : _react2.default.createElement(
                    "div",
                    { className: selectClassName, onClick: this.onClickHandler.bind(this) },
                    placeholder,
                    this.renderInput(),
                    cancel,
                    _react2.default.createElement(
                        "svg",
                        { width: "24", height: "24", viewBox: "0 0 24 24", className: "icon reactParts__select__arrow" },
                        _react2.default.createElement("path", { d: "M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" })
                    )
                ),
                list
            );
        }
    }]);

    return Select;
}(_react2.default.Component);

Select.propTypes = {
    readOnly: _propTypes2.default.bool,
    cancel: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    disabled: _propTypes2.default.bool,
    placeholder: _propTypes2.default.string,
    name: _propTypes2.default.string,
    list: _propTypes2.default.array.isRequired,
    selected: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.bool]),
    label: _propTypes2.default.string,
    uniqueKey: _propTypes2.default.string,
    labelKey: _propTypes2.default.string,
    listItemRender: _propTypes2.default.func,
    inputRender: _propTypes2.default.func,
    noResultsText: _propTypes2.default.string,
    onKeyDown: _propTypes2.default.func,
    tabIndex: _propTypes2.default.number,
    addControls: _propTypes2.default.func,
    autoFocus: _propTypes2.default.bool,
    showFullValue: _propTypes2.default.bool,
    required: _propTypes2.default.bool
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
    showFullValue: false
};