import React from "react";
import ReactDom from "react-dom";

import { CheckBox } from "../CheckBox/CheckBox";


export default class Node extends React.Component {

    constructor(props){
        super(props)

        this.isContextMenuOpen = false;
    }

    componentDidMount() {
        window.addEventListener( "mousedown", this.nextClickHandler );
    }

    componentWillUnmount() {
        window.removeEventListener( "mousedown", this.nextClickHandler )
    }


    _expandTriggerHandler( node ) {
        let isExpanded = node.expanded;
        let t_id       = node.t_id;

        if ( this.props.onExpandAsync && !isExpanded ) {
            node.loading = true;
            this.forceUpdate();
            this.props.onExpandAsync( node ).then( item => {
                node.loading = false;
                this.addChildren( item );
            } )
        }
        this._triggerNode( this.props.data, t_id, "expanded" );
        if ( isExpanded ) {
            this.props.onUnExpand && this.props.onUnExpand( t_id, this.props.data )
        } else {
            this.props.onExpand && this.props.onExpand( t_id, this.props.data )
        }
        this.forceUpdate();
    };

    _triggerNode( data, t_id, field ) {
        //console.log( "Node _triggerNode", data );
        data.forEach( node => {
            if ( node.t_id === t_id ) {
                node[ field ] = !(node[ field ])
            } else {
                if ( node.children ) {
                    this._triggerNode( node.children, t_id, field )
                }
            }
        } )
    }


    addChildren = ( node ) => {
        // готовим детей
        node.children = this.props.setAttributes( node.children );
        this.replaceNode( node, this.props.data );
        this.forceUpdate()
    };


    replaceNode( node, data ) {
        data.forEach( item => {
            if ( item.t_id === node.t_id ) {
                item = node
            }
        } )
    }

    _checkHandler = ( t_id, isChecked ) => {
        if ( isChecked ) {
            this._triggerNode( this.props.data, t_id, "checked" );
            this.props.onUnCheck && this.props.onUnCheck( t_id, this.props.data )
        } else {
            this.props.checkAll( this.props.data, t_id );
            this.props.onCheck && this.props.onCheck( t_id, this.props.data )
        }
        this.props.reloadTree()
    }

    selectNode( node ) {
        let t_id       = node.t_id;
        let isSelected = node.selected;
        if ( !node.selectable ) return;

        if ( this.props.selectedNode && this.props.selectedNode !== t_id ) {
            // деселект предыдущей ноды
            this._triggerNode( this.props.data, this.props.selectedNode, "selected" );
        }
        this._triggerNode( this.props.data, t_id, "selected" );
        if ( isSelected ) {
            this.props.selectNode( null );
            this.props.onUnSelect && this.props.onUnSelect( node )
        } else {
            this.props.selectNode( t_id );
            this.props.onSelect && this.props.onSelect( node )
        }
        this.props.reloadTree()
    }


    contextMenuHandler = ( node, e ) => {

        if ( this.props.onRightClick ) {
            this.props.onRightClick( node, e )
        } else {
            if (this.props.contextMenuItems){
                this._contextClick( node, e )
            }
        }
    };


    _contextClick( node, e ) {
        //console.log( "Tree _contextClick", node, e );
        e.preventDefault();
        if (!node.selected){
            this.selectNode(node);
        }

        let contextMenuWidth = this.props.contextMenuWidth;
        let contextMenu = this.domNode.getElementsByClassName('reactParts__tree--node--context-wrapper')[0];
        let menuList         = this.props.contextMenuItems( node, e );
        if ( !menuList || menuList.length < 1 ) return;
        let renderList = this._renderContextMenuItems( menuList );
        ReactDom.render( <div>{renderList}</div>, contextMenu );
        contextMenu.style.display = "block";
        let contextMenuHeight     = menuList.length * 30 + 10;
        let windowHeight          = window.innerHeight;
        let windowWidth           = window.innerWidth;
        let top                   = e.clientY;
        let left                  = e.clientX;
        let rightDist             = windowWidth - left;
        let bottomDist            = windowHeight - top;
        if ( (rightDist - 15) < contextMenuWidth ) {
            left = left - contextMenuWidth - 25 + rightDist;
        }
        if ( (bottomDist - 25) < contextMenuHeight ) {
            top = top - contextMenuHeight - 25 + bottomDist;
        }
        contextMenu.style.top  = top + "px";
        contextMenu.style.left = left + "px";
        // block scroll
        document.onmousewheel  = document.onwheel = function () {
            return false;
        };
        if ( this.isContextMenuOpen ) {
            return
        }
        this.isContextMenuOpen = true;
    }

    nextClickHandler=()=> {
        let contextMenu = this.domNode.getElementsByClassName('reactParts__tree--node--context-wrapper')[0];
        if ( contextMenu.style.display === "block" ) {
            contextMenu.style.display = "none";
            this.isContextMenuOpen    = false;
            // unblock scroll
            document.onmousewheel     = document.onwheel = function () {
                return true;
            };
        }
    };


    _renderContextMenuItems( items ) {
        if ( !items || items && items.length < 1 ) return null
        return items.map( ( item, index ) => {
            if ( item.type === "divider" ) {
                return <div className="reactParts__tree--node--context-menu-item-divider" key={index}></div>
            }

            return <div onMouseDown={item.onClickHandler}
                        className="reactParts__tree--node--context-menu-item" key={index}>
                {item.title}
            </div>
        } )
    }


    _renderChildren( children ) {
        return <div className="reactParts__tree--children">
            {this.props.renderTree( children )}
        </div>
    }


    render() {

        let node             = this.props.node;
        let checkable        = this.props.checkable;
        let customNodeRender = this.props.customNodeRender;

        return (
            <div
                className={"reactParts__tree--node"
                + ((!node.children) ? " tree-no-children" : "")
                + ((checkable) ? " checkable" : "")
                }
                ref={(domNode)=>this.domNode = domNode}
            >
                <div className="reactParts__tree--title-wrap">
                    {(node.children) &&
                    <svg xmlns="http://www.w3.org/2000/svg"
                         onClick={this._expandTriggerHandler.bind( this, node )}
                         className={"reactParts__tree--arrow" + ((node.expanded) ? " expanded" : "")}
                         fill="#000000"
                         height="24" viewBox="0 0 24 24" width="24">
                        <path d="M7 10l5 5 5-5z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    }
                    {checkable &&
                    <CheckBox name={node.t_id} checked={node.checked}
                              onClickHandler={this._checkHandler.bind( this, node.t_id, node.checked, node )}/>
                    }
                    {
                        (customNodeRender) ? customNodeRender( node ) :
                            <span className={
                                "reactParts__tree--title"
                                + ((node.selected) ? " selected" : "")
                                + ((!node.selectable) ? " unselectable" : "")
                            }
                                  onClick={this.selectNode.bind( this, node )}
                                  onContextMenu={this.contextMenuHandler.bind( this, node )}
                            >{node.title}
                              </span>
                    }
                </div>
                {node.loading && <span className="reactParts__tree--loading">loading..</span>}
                {(!node.loading && node.children && node.expanded) ?
                    this._renderChildren( node.children )
                    : null}
                <div className={"reactParts__tree--node--context-wrapper"}>

                </div>
            </div>
        )
    }

}