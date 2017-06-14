"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tree = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Node = require("./Node");

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tree = exports.Tree = function (_React$Component) {
    _inherits(Tree, _React$Component);

    function Tree(props) {
        _classCallCheck(this, Tree);

        var _this = _possibleConstructorReturn(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).call(this, props));

        _this._setAttributes = function (data, parent) {
            var d = [];
            data.forEach(function (item) {
                item.parent_id = parent && parent.t_id;
                item.parent = parent;

                if (item.children && item.expanded === undefined) {
                    item.expanded = _this.props.expanded;
                }
                if (item.selectable === undefined) {
                    item.selectable = true;
                }
                if (item.checked === undefined) {
                    item.checked = false;
                }
                if (item.children) {
                    item.children = _this._setAttributes(item.children, item);
                }
                if (_this.props.idKey) {
                    item.t_id = item.id || _this._uuid();
                } else {
                    item.t_id = _this._uuid();
                }
                d.push(item);
            });
            return d;
        };

        _this.renderTree = function (data) {
            //console.log( "Tree renderTree", data );
            if (!data) return null;
            var nodes = [];
            data.forEach(function (node, i) {
                if (node.children && node.expanded === undefined) {
                    node.expanded = _this.props.expanded;
                }
                nodes.push(_react2.default.createElement(_Node2.default, {
                    key: i,
                    node: node,
                    checkable: _this.props.checkable,
                    customNodeRender: _this.props.customNodeRender,
                    onExpandAsync: _this.props.onExpandAsync,
                    data: _this.data,
                    onExpand: _this.props.onExpand,
                    onUnExpand: _this.props.onUnExpand,
                    onUnCheck: _this.props.onUnCheck,
                    onCheck: _this.props.onCheck,
                    checkAll: _this._checkAll,
                    selectedNode: _this.selectedNode,
                    selectNode: _this.selectNode,
                    onSelect: _this.props.onSelect,
                    onUnSelect: _this.props.onUnSelect,
                    reloadTree: _this.reloadTree,
                    onRightClick: _this.props.onRightClick,
                    renderTree: _this.renderTree,
                    setAttributes: _this._setAttributes,
                    contextMenuItems: _this.props.contextMenuItems
                }));
            });
            return nodes;
        };

        _this.selectNode = function (node) {
            _this.selectedNode = node;
        };

        _this.reloadTree = function () {
            _this.forceUpdate();
        };

        _this.getNodeParents = function (node) {
            var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];


            if (node && node.parent) {
                array.unshift(node.parent);
                if (node.parent.parent) {
                    _this.getNodeParents(node.parent, array);
                }
            }
            return array;
        };

        _this.data = _this._setAttributes(props.data, null);
        _this.selectedNode = null;
        _this.props.getTree && _this.props.getTree(_this);
        return _this;
    }

    _createClass(Tree, [{
        key: "_uuid",
        value: function _uuid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }

            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(props) {
            this.data = this._setAttributes(props.data, null);
            this.selectedNode = null;
        }

        // Public method  get all selected id from the tree

    }, {
        key: "getCheckedNodes",
        value: function getCheckedNodes(data) {
            var _this2 = this;

            return (data || this.data).reduce(function (sum, node) {
                if (node.checked) {
                    sum.push(node.t_id);
                }
                if (node.children) {
                    sum = sum.concat(_this2.getCheckedNodes(node.children));
                }
                return sum;
            }, []);
        }

        // Public method check all nodes in the tree

    }, {
        key: "checkAllNodes",
        value: function checkAllNodes() {
            this._checkAll(this.data);
            this.reloadTree();
        }
    }, {
        key: "_checkAll",
        value: function _checkAll(data) {
            var _this3 = this;

            var t_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            data.forEach(function (node) {
                if (t_id === node.t_id || t_id === null) {
                    node.checked = true;
                }
                if (node.children) {
                    _this3._checkAll(node.children, t_id === node.t_id ? null : t_id);
                }
            });
        }
    }, {
        key: "render",
        value: function render() {
            //console.log("Tree render", this);
            return _react2.default.createElement(
                "div",
                null,
                this.renderTree(this.data)
            );
        }
    }]);

    return Tree;
}(_react2.default.Component);

Tree.propTypes = {
    data: _propTypes2.default.array.isRequired,
    expanded: _propTypes2.default.bool,
    checkable: _propTypes2.default.bool,
    onExpand: _propTypes2.default.func,
    onUnExpand: _propTypes2.default.func,
    onSelect: _propTypes2.default.func,
    onUnSelect: _propTypes2.default.func,
    onCheck: _propTypes2.default.func,
    onUnCheck: _propTypes2.default.func,
    idKey: _propTypes2.default.string,
    getTree: _propTypes2.default.func,
    customNodeRender: _propTypes2.default.func,
    onExpandAsync: _propTypes2.default.func,
    onRightClick: _propTypes2.default.func,
    contextMenuWidth: _propTypes2.default.number,
    contextMenuItems: _propTypes2.default.func

};

Tree.defaultProps = {
    data: [],
    expanded: false,
    contextMenuWidth: 150,
    contextMenuItems: null
};