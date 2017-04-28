/* @flow */
import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "../CheckBox/CheckBox";

export class Tree extends React.Component {

    constructor( props ) {
        super( props );
        this._checkHandler = this._checkHandler.bind( this );
        this.data          = this._setAttributes( props.data );
        this.selectedNode  = null;
        this.props.getTree && this.props.getTree( this )
    }

    _uuid() {
        function s4() {
            return Math.floor( (1 + Math.random()) * 0x10000 )
            .toString( 16 )
            .substring( 1 );
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    componentWillReceiveProps( props ) {
        this.data         = this._setAttributes( props.data );
        this.selectedNode = null;
    }

    // Public method  get all selected id from the tree
    getCheckedNodes( data ) {
        return (data || this.data).reduce( ( sum, node ) => {
            if ( node.checked ) {
                sum.push( node.t_id );
            }
            if ( node.children ) {
                sum = sum.concat( this.getCheckedNodes( node.children ) )
            }
            return sum
        }, [] )
    }

    // Public method check all nodes in the tree
    checkAllNodes() {
        this._checkAll( this.data );
        this.forceUpdate();
    }


    replaceNode( node, data ) {
        data.forEach( item => {
            if ( item.t_id === node.t_id ) {
                item = node
            }
        } )
    }


    addChildren = ( node ) => {
        // готовим детей
        node.children = this._setAttributes( node.children )
        this.replaceNode( node, this.data )
        this.forceUpdate()
    };

    _removeFromTree( data, isSelected, isExpanded, isChecked, showTreeId ) {
        let d = [];
        data.forEach( item => {
            if ( isSelected === undefined || !isSelected ) {
                delete item.selected
            }
            if ( isExpanded === undefined || !isExpanded ) {
                delete item.expanded
            }
            if ( isChecked === undefined || !isChecked ) {
                delete item.checked
            }
            if ( showTreeId === undefined || !showTreeId ) {
                delete item.t_id;
            }

            if ( item.children ) {
                item.children = this._removeFromTree( item.children, isSelected, isExpanded, isChecked, showTreeId )
            }
            d.push( item )
        } );
        return d
    }

    _setAttributes( data ) {
        let d = [];
        data.forEach( item => {
            if ( item.children && item.expanded === undefined ) {
                item.expanded = this.props.expanded;
            }
            if ( item.selected === undefined ) {
                item.selected = false;
            }
            if ( item.selectable === undefined ) {
                item.selectable = true;
            }
            if ( item.checked === undefined ) {
                item.checked = false;
            }
            if ( item.children ) {
                item.children = this._setAttributes( item.children )
            }
            if ( this.props.idKey ) {
                item.t_id = item.id || this._uuid()
            } else {
                item.t_id = this._uuid();
            }
            d.push( item )
        } );
        return d
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
        this._triggerNode( this.data, t_id, "expanded" );
        if ( isExpanded ) {
            this.props.onUnExpand && this.props.onUnExpand( t_id, this.data )
        } else {
            this.props.onExpand && this.props.onExpand( t_id, this.data )
        }

        this.forceUpdate();

    };

    selectNode( node ) {
        let t_id       = node.t_id;
        let isSelected = node.selected;
        if ( !node.selectable ) return;

        if ( this.selectedNode && this.selectedNode !== t_id ) {
            // деселект предыдущей ноды
            this._triggerNode( this.data, this.selectedNode, "selected" );
        }
        this._triggerNode( this.data, t_id, "selected" );
        if ( isSelected ) {
            this.selectedNode = null;
            this.props.onUnSelect && this.props.onUnSelect( this.data )
        } else {
            this.selectedNode = t_id;
            this.props.onSelect && this.props.onSelect( this.data )
        }
        this.forceUpdate();
    }

    _checkHandler( t_id, isChecked ) {
        if ( isChecked ) {
            this._triggerNode( this.data, t_id, "checked" );
            this.props.onUnCheck && this.props.onUnCheck( t_id, this.data )
        } else {
            this._checkAll( this.data, t_id );
            this.props.onCheck && this.props.onCheck( t_id, this.data )
        }
        this.forceUpdate();
    }

    _checkAll( data, t_id = null ) {
        data.forEach( node => {
            if ( t_id === node.t_id || t_id === null ) {
                node.checked = true
            }
            if ( node.children ) {
                this._checkAll( node.children, (t_id === node.t_id ) ? null : t_id )
            }
        } )
    }

    _triggerNode( data, t_id, field ) {
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

    _renderChildren( children ) {
        return <div className="reactParts__tree--children">
            {this.renderTree( children )}
        </div>
    }

    renderTree( data ) {
        console.log( "Tree renderTree", data );
        if ( !data ) return null;
        let nodes = [];
        data.forEach( ( node, i ) => {
            if ( node.children && node.expanded === undefined ) {
                node.expanded = this.props.expanded
            }
            nodes.push(
                <div className={"reactParts__tree--node"
                + ((!node.children) ? " tree-no-children" : "")
                + ((this.props.checkable) ? " checkable" : "")

                } key={i}>
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
                        {this.props.checkable &&
                        <CheckBox name={node.t_id} checked={node.checked}
                                  onClickHandler={this._checkHandler.bind( this, node.t_id, node.checked, node )}/>
                        }
                        {
                            (this.props.customNodeRender) ?
                                this.props.customNodeRender( node ) :
                                <span className={
                                    "reactParts__tree--title"
                                    + ((node.selected) ? " selected" : "")
                                    + ((!node.selectable) ? " unselectable" : "")
                                }
                                      onClick={this.selectNode.bind( this, node )}>{node.title}
                              </span>
                        }
                    </div>
                    {node.loading && <span className="reactParts__tree--loading">loading..</span>}
                    {(node.children && node.expanded) ?
                        this._renderChildren( node.children )
                        : null}
                </div> )
        } );
        return nodes
    }

    render() {
        return (
            <div>
                {this.renderTree( this.data )}
            </div>
        )
    }
}

Tree.propTypes = {
    data:             PropTypes.array.isRequired,
    expanded:         PropTypes.bool,
    checkable:        PropTypes.bool,
    onExpand:         PropTypes.func,
    onUnExpand:       PropTypes.func,
    onSelect:         PropTypes.func,
    onUnSelect:       PropTypes.func,
    onCheck:          PropTypes.func,
    onUnCheck:        PropTypes.func,
    idKey:            PropTypes.string,
    getTree:          PropTypes.func,
    customNodeRender: PropTypes.func,
    onExpandAsync:    PropTypes.func

};

Tree.defaultProps = {
    data:     [],
    expanded: false
};