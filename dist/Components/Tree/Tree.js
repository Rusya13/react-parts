"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Node = _interopRequireDefault(require("./Node"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Tree extends _react.default.Component {
  constructor(props) {
    var _this;
    super(props);
    _this = this;
    _defineProperty(this, "_setAttributes", (data, parent) => {
      let d = [];
      data.forEach(item => {
        item.parent_id = parent && parent.t_id;
        item.parent = parent;
        if (item.children && item.expanded === undefined) {
          item.expanded = this.props.expanded;
        }
        if (item.selectable === undefined) {
          item.selectable = true;
        }
        if (item.checked === undefined) {
          item.checked = false;
        }
        if (item.children) {
          item.children = this._setAttributes(item.children, item);
        }
        if (this.props.idKey) {
          item.t_id = item.id || this._uuid();
        } else {
          item.t_id = this._uuid();
        }
        d.push(item);
      });
      return d;
    });
    _defineProperty(this, "renderTree", data => {
      //console.log( "Tree renderTree", data );
      if (!data) return null;
      let nodes = [];
      data.forEach((node, i) => {
        if (node.children && node.expanded === undefined) {
          node.expanded = this.props.expanded;
        }
        nodes.push(/*#__PURE__*/_react.default.createElement(_Node.default, {
          key: i,
          node: node,
          checkable: this.props.checkable,
          customNodeRender: this.props.customNodeRender,
          onExpandAsync: this.props.onExpandAsync,
          data: this.data,
          onExpand: this.props.onExpand,
          onUnExpand: this.props.onUnExpand,
          onUnCheck: this.props.onUnCheck,
          onCheck: this.props.onCheck,
          checkAll: this._checkAll,
          selectedNode: this.selectedNode,
          selectNode: this.selectNode,
          onSelect: this.props.onSelect,
          onUnSelect: this.props.onUnSelect,
          reloadTree: this.reloadTree,
          onRightClick: this.props.onRightClick,
          renderTree: this.renderTree,
          setAttributes: this._setAttributes,
          contextMenuItems: this.props.contextMenuItems
        }));
      });
      return nodes;
    });
    _defineProperty(this, "selectNode", node => {
      this.selectedNode = node;
    });
    _defineProperty(this, "reloadTree", () => {
      this.forceUpdate();
    });
    _defineProperty(this, "getNodeParents", function (node) {
      let array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      if (node && node.parent) {
        array.unshift(node.parent);
        if (node.parent.parent) {
          _this.getNodeParents(node.parent, array);
        }
      }
      return array;
    });
    this.data = this._setAttributes(props.data, null);
    this.selectedNode = null;
    this.props.getTree && this.props.getTree(this);
  }
  _uuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
  componentWillReceiveProps(props) {
    this.data = this._setAttributes(props.data, null);
    this.selectedNode = null;
  }

  // Public method  get all selected id from the tree
  getCheckedNodes(data) {
    return (data || this.data).reduce((sum, node) => {
      if (node.checked) {
        sum.push(node.t_id);
      }
      if (node.children) {
        sum = sum.concat(this.getCheckedNodes(node.children));
      }
      return sum;
    }, []);
  }

  // Public method check all nodes in the tree
  checkAllNodes() {
    this._checkAll(this.data);
    this.reloadTree();
  }
  _checkAll(data) {
    let t_id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    data.forEach(node => {
      if (t_id === node.t_id || t_id === null) {
        node.checked = true;
      }
      if (node.children) {
        this._checkAll(node.children, t_id === node.t_id ? null : t_id);
      }
    });
  }
  render() {
    //console.log("Tree render", this);
    return /*#__PURE__*/_react.default.createElement("div", null, this.renderTree(this.data));
  }
}
exports.Tree = Tree;
Tree.propTypes = {
  data: _propTypes.default.array.isRequired,
  expanded: _propTypes.default.bool,
  checkable: _propTypes.default.bool,
  onExpand: _propTypes.default.func,
  onUnExpand: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onUnSelect: _propTypes.default.func,
  onCheck: _propTypes.default.func,
  onUnCheck: _propTypes.default.func,
  idKey: _propTypes.default.string,
  getTree: _propTypes.default.func,
  customNodeRender: _propTypes.default.func,
  onExpandAsync: _propTypes.default.func,
  onRightClick: _propTypes.default.func,
  contextMenuWidth: _propTypes.default.number,
  contextMenuItems: _propTypes.default.func
};
Tree.defaultProps = {
  data: [],
  expanded: false,
  contextMenuWidth: 150,
  contextMenuItems: null
};