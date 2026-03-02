"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _CheckBox = require("../CheckBox/CheckBox");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class Node extends _react.default.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "addChildren", node => {
      // готовим детей
      node.children = this.props.setAttributes(node.children, node);
      this.replaceNode(node, this.props.data);
      this.forceUpdate();
    });
    _defineProperty(this, "_checkHandler", (t_id, isChecked) => {
      if (isChecked) {
        this._triggerNode(this.props.data, t_id, "checked");
        this.props.onUnCheck && this.props.onUnCheck(t_id, this.props.data);
      } else {
        this.props.checkAll(this.props.data, t_id);
        this.props.onCheck && this.props.onCheck(t_id, this.props.data);
      }
      this.props.reloadTree();
    });
    _defineProperty(this, "contextMenuHandler", (node, e) => {
      if (this.props.onRightClick) {
        this.props.onRightClick(node, e);
      } else {
        if (this.props.contextMenuItems) {
          this._contextClick(node, e);
        }
      }
    });
    _defineProperty(this, "nextClickHandler", () => {
      let contextMenu = this.domNode.getElementsByClassName('reactParts__tree--node--context-wrapper')[0];
      if (contextMenu.style.display === "block") {
        contextMenu.style.display = "none";
        this.isContextMenuOpen = false;
        // unblock scroll
        document.onmousewheel = document.onwheel = function () {
          return true;
        };
      }
    });
    _defineProperty(this, "checkParent", (current_node, selectedNode) => {
      //console.log("Node checkParent", current_node, selectedNode);
      if (selectedNode && current_node === selectedNode.parent) {
        return true;
      } else {
        if (selectedNode && selectedNode.parent && selectedNode.parent.parent) {
          //console.log("Node checkParent parent exist" );
          return this.checkParent(current_node, selectedNode.parent);
        }
      }
      return false;
    });
    this.isContextMenuOpen = false;
  }
  componentDidMount() {
    window.addEventListener("mousedown", this.nextClickHandler);
  }
  componentWillUnmount() {
    window.removeEventListener("mousedown", this.nextClickHandler);
  }
  _expandTriggerHandler(node) {
    let isExpanded = node.expanded;
    let t_id = node.t_id;
    if (this.props.onExpandAsync && !isExpanded) {
      node.loading = true;
      this.forceUpdate();
      this.props.onExpandAsync(node).then(item => {
        node.loading = false;
        this.addChildren(item);
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
  _triggerNode(data, t_id, field) {
    //console.log( "Node _triggerNode", data );
    data.forEach(node => {
      if (node.t_id === t_id) {
        node[field] = !node[field];
      } else {
        if (node.children) {
          this._triggerNode(node.children, t_id, field);
        }
      }
    });
  }
  replaceNode(node, data) {
    data.forEach(item => {
      if (item.t_id === node.t_id) {
        item = node;
      }
    });
  }
  selectNode(node) {
    let isSelected = node.selected;
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
  _contextClick(node, e) {
    //console.log( "Tree _contextClick", node, e );
    e.preventDefault();
    if (!node.selected) {
      this.selectNode(node);
    }
    let contextMenuWidth = this.props.contextMenuWidth;
    let contextMenu = this.domNode.getElementsByClassName('reactParts__tree--node--context-wrapper')[0];
    let menuList = this.props.contextMenuItems(node, e);
    if (!menuList || menuList.length < 1) return;
    let renderList = this._renderContextMenuItems(menuList);
    _reactDom.default.render(/*#__PURE__*/_react.default.createElement("div", null, renderList), contextMenu);
    contextMenu.style.display = "block";
    let contextMenuHeight = menuList.length * 30 + 10;
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let top = e.clientY;
    let left = e.clientX;
    let rightDist = windowWidth - left;
    let bottomDist = windowHeight - top;
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
  _renderContextMenuItems(items) {
    if (!items || items && items.length < 1) return null;
    return items.map((item, index) => {
      if (item.type === "divider") {
        return /*#__PURE__*/_react.default.createElement("div", {
          className: "reactParts__tree--node--context-menu-item-divider",
          key: index
        });
      }
      return /*#__PURE__*/_react.default.createElement("div", {
        onMouseDown: item.onClickHandler,
        className: "reactParts__tree--node--context-menu-item",
        key: index
      }, item.title);
    });
  }
  _renderChildren(children) {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__tree--children"
    }, this.props.renderTree(children));
  }
  render() {
    let node = this.props.node;
    let checkable = this.props.checkable;
    let customNodeRender = this.props.customNodeRender;
    let selectedNode = this.props.selectedNode;
    let containSelected = this.checkParent(node, selectedNode);
    //console.log("Node render", containSelected);
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__tree--node" + (!node.children ? " tree-no-children" : "") + (checkable ? " checkable" : ""),
      ref: domNode => this.domNode = domNode
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__tree--title-wrap"
    }, node.children && /*#__PURE__*/_react.default.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      onClick: this._expandTriggerHandler.bind(this, node),
      className: "reactParts__tree--arrow" + (node.expanded ? " expanded" : ""),
      fill: "#000000",
      height: "24",
      viewBox: "0 0 24 24",
      width: "24"
    }, /*#__PURE__*/_react.default.createElement("path", {
      d: "M7 10l5 5 5-5z"
    }), /*#__PURE__*/_react.default.createElement("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    })), checkable && /*#__PURE__*/_react.default.createElement(_CheckBox.CheckBox, {
      name: node.t_id,
      checked: node.checked,
      onClickHandler: this._checkHandler.bind(this, node.t_id, node.checked, node)
    }), customNodeRender ? customNodeRender(node) : /*#__PURE__*/_react.default.createElement("span", {
      className: "reactParts__tree--title" + (containSelected ? " contain-selected" : "") + (node === this.props.selectedNode ? " selected" : "") + (!node.selectable ? " unselectable" : ""),
      onClick: this.selectNode.bind(this, node),
      onContextMenu: this.contextMenuHandler.bind(this, node)
    }, node.title)), node.loading && /*#__PURE__*/_react.default.createElement("span", {
      className: "reactParts__tree--loading"
    }, "loading.."), !node.loading && node.children && node.expanded ? this._renderChildren(node.children) : null, /*#__PURE__*/_react.default.createElement("div", {
      className: "reactParts__tree--node--context-wrapper"
    }));
  }
}
exports.default = Node;