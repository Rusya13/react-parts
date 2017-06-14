"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CheckBox = require("../CheckBox/CheckBox");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Node = function (_React$Component) {
    _inherits(Node, _React$Component);

    function Node(props) {
        _classCallCheck(this, Node);

        var _this = _possibleConstructorReturn(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, props));

        _this.addChildren = function (node) {
            // готовим детей
            node.children = _this.props.setAttributes(node.children, node);
            _this.replaceNode(node, _this.props.data);
            _this.forceUpdate();
        };

        _this._checkHandler = function (t_id, isChecked) {
            if (isChecked) {
                _this._triggerNode(_this.props.data, t_id, "checked");
                _this.props.onUnCheck && _this.props.onUnCheck(t_id, _this.props.data);
            } else {
                _this.props.checkAll(_this.props.data, t_id);
                _this.props.onCheck && _this.props.onCheck(t_id, _this.props.data);
            }
            _this.props.reloadTree();
        };

        _this.contextMenuHandler = function (node, e) {

            if (_this.props.onRightClick) {
                _this.props.onRightClick(node, e);
            } else {
                if (_this.props.contextMenuItems) {
                    _this._contextClick(node, e);
                }
            }
        };

        _this.nextClickHandler = function () {
            var contextMenu = _this.domNode.getElementsByClassName('reactParts__tree--node--context-wrapper')[0];
            if (contextMenu.style.display === "block") {
                contextMenu.style.display = "none";
                _this.isContextMenuOpen = false;
                // unblock scroll
                document.onmousewheel = document.onwheel = function () {
                    return true;
                };
            }
        };

        _this.checkParent = function (current_node, selectedNode) {
            //console.log("Node checkParent", current_node, selectedNode);
            if (selectedNode && current_node === selectedNode.parent) {
                return true;
            } else {
                if (selectedNode && selectedNode.parent && selectedNode.parent.parent) {
                    //console.log("Node checkParent parent exist" );
                    return _this.checkParent(current_node, selectedNode.parent);
                }
            }
            return false;
        };

        _this.isContextMenuOpen = false;
        return _this;
    }

    _createClass(Node, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            window.addEventListener("mousedown", this.nextClickHandler);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            window.removeEventListener("mousedown", this.nextClickHandler);
        }
    }, {
        key: "_expandTriggerHandler",
        value: function _expandTriggerHandler(node) {
            var _this2 = this;

            var isExpanded = node.expanded;
            var t_id = node.t_id;

            if (this.props.onExpandAsync && !isExpanded) {
                node.loading = true;
                this.forceUpdate();
                this.props.onExpandAsync(node).then(function (item) {
                    node.loading = false;
                    _this2.addChildren(item);
                });
            }
            this._triggerNode(this.props.data, t_id, "expanded");
            if (isExpanded) {
                this.props.onUnExpand && this.props.onUnExpand(t_id, this.props.data);
            } else {
                this.props.onExpand && this.props.onExpand(t_id, this.props.data);
            }
            this.forceUpdate();
        }
    }, {
        key: "_triggerNode",
        value: function _triggerNode(data, t_id, field) {
            var _this3 = this;

            //console.log( "Node _triggerNode", data );
            data.forEach(function (node) {
                if (node.t_id === t_id) {
                    node[field] = !node[field];
                } else {
                    if (node.children) {
                        _this3._triggerNode(node.children, t_id, field);
                    }
                }
            });
        }
    }, {
        key: "replaceNode",
        value: function replaceNode(node, data) {
            data.forEach(function (item) {
                if (item.t_id === node.t_id) {
                    item = node;
                }
            });
        }
    }, {
        key: "selectNode",
        value: function selectNode(node) {
            var isSelected = node.selected;
            if (!node.selectable) return;
            if (isSelected) {
                this.props.selectNode(null);
                this.props.onUnSelect && this.props.onUnSelect(node);
            } else {
                this.props.selectNode(node);

                this.props.onSelect && this.props.onSelect(node);
            }
            this.props.reloadTree();
        }
    }, {
        key: "_contextClick",
        value: function _contextClick(node, e) {
            //console.log( "Tree _contextClick", node, e );
            e.preventDefault();
            if (!node.selected) {
                this.selectNode(node);
            }

            var contextMenuWidth = this.props.contextMenuWidth;
            var contextMenu = this.domNode.getElementsByClassName('reactParts__tree--node--context-wrapper')[0];
            var menuList = this.props.contextMenuItems(node, e);
            if (!menuList || menuList.length < 1) return;
            var renderList = this._renderContextMenuItems(menuList);
            _reactDom2.default.render(_react2.default.createElement(
                "div",
                null,
                renderList
            ), contextMenu);
            contextMenu.style.display = "block";
            var contextMenuHeight = menuList.length * 30 + 10;
            var windowHeight = window.innerHeight;
            var windowWidth = window.innerWidth;
            var top = e.clientY;
            var left = e.clientX;
            var rightDist = windowWidth - left;
            var bottomDist = windowHeight - top;
            if (rightDist - 15 < contextMenuWidth) {
                left = left - contextMenuWidth - 25 + rightDist;
            }
            if (bottomDist - 25 < contextMenuHeight) {
                top = top - contextMenuHeight - 25 + bottomDist;
            }
            contextMenu.style.top = top + "px";
            contextMenu.style.left = left + "px";
            // block scroll
            document.onmousewheel = document.onwheel = function () {
                return false;
            };
            if (this.isContextMenuOpen) {
                return;
            }
            this.isContextMenuOpen = true;
        }
    }, {
        key: "_renderContextMenuItems",
        value: function _renderContextMenuItems(items) {
            if (!items || items && items.length < 1) return null;
            return items.map(function (item, index) {
                if (item.type === "divider") {
                    return _react2.default.createElement("div", { className: "reactParts__tree--node--context-menu-item-divider", key: index });
                }

                return _react2.default.createElement(
                    "div",
                    { onMouseDown: item.onClickHandler,
                        className: "reactParts__tree--node--context-menu-item", key: index },
                    item.title
                );
            });
        }
    }, {
        key: "_renderChildren",
        value: function _renderChildren(children) {
            return _react2.default.createElement(
                "div",
                { className: "reactParts__tree--children" },
                this.props.renderTree(children)
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this4 = this;

            var node = this.props.node;
            var checkable = this.props.checkable;
            var customNodeRender = this.props.customNodeRender;
            var selectedNode = this.props.selectedNode;
            var containSelected = this.checkParent(node, selectedNode);
            //console.log("Node render", containSelected);
            return _react2.default.createElement(
                "div",
                {
                    className: "reactParts__tree--node" + (!node.children ? " tree-no-children" : "") + (checkable ? " checkable" : ""),
                    ref: function ref(domNode) {
                        return _this4.domNode = domNode;
                    }
                },
                _react2.default.createElement(
                    "div",
                    { className: "reactParts__tree--title-wrap" },
                    node.children && _react2.default.createElement(
                        "svg",
                        { xmlns: "http://www.w3.org/2000/svg",
                            onClick: this._expandTriggerHandler.bind(this, node),
                            className: "reactParts__tree--arrow" + (node.expanded ? " expanded" : ""),
                            fill: "#000000",
                            height: "24", viewBox: "0 0 24 24", width: "24" },
                        _react2.default.createElement("path", { d: "M7 10l5 5 5-5z" }),
                        _react2.default.createElement("path", { d: "M0 0h24v24H0z", fill: "none" })
                    ),
                    checkable && _react2.default.createElement(_CheckBox.CheckBox, { name: node.t_id, checked: node.checked,
                        onClickHandler: this._checkHandler.bind(this, node.t_id, node.checked, node) }),
                    customNodeRender ? customNodeRender(node) : _react2.default.createElement(
                        "span",
                        { className: "reactParts__tree--title" + (containSelected ? " contain-selected" : "") + (node === this.props.selectedNode ? " selected" : "") + (!node.selectable ? " unselectable" : ""),
                            onClick: this.selectNode.bind(this, node),
                            onContextMenu: this.contextMenuHandler.bind(this, node)
                        },
                        node.title
                    )
                ),
                node.loading && _react2.default.createElement(
                    "span",
                    { className: "reactParts__tree--loading" },
                    "loading.."
                ),
                !node.loading && node.children && node.expanded ? this._renderChildren(node.children) : null,
                _react2.default.createElement("div", { className: "reactParts__tree--node--context-wrapper" })
            );
        }
    }]);

    return Node;
}(_react2.default.Component);

exports.default = Node;