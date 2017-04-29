/* @flow */
import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "../CheckBox/CheckBox";
import Node from './Node';

export class Tree extends React.Component {

    constructor( props ) {
        super( props );
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
        this.reloadTree();
    }

    _setAttributes=( data )=> {
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
    };


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

    renderTree=( data )=> {
        //console.log( "Tree renderTree", data );
        if ( !data ) return null;
        let nodes = [];
        data.forEach( ( node, i ) => {
            if ( node.children && node.expanded === undefined ) {
                node.expanded = this.props.expanded
            }
            nodes.push(
                <Node
                    key={i}
                    node={node}
                    checkable={this.props.checkable}
                    customNodeRender={this.props.customNodeRender}
                    onExpandAsync={this.props.onExpandAsync}
                    data={this.data}
                    onExpand={this.props.onExpand}
                    onUnExpand={this.props.onUnExpand}
                    onUnCheck={this.props.onUnCheck}
                    onCheck={this.props.onCheck}
                    checkAll={this._checkAll}
                    selectedNode={this.selectedNode}
                    selectNode={this.selectNode}
                    onSelect={this.props.onSelect}
                    onUnSelect={this.props.onUnSelect}
                    reloadTree={this.reloadTree}
                    onRightClick={this.props.onRightClick}
                    renderTree={this.renderTree}
                    setAttributes={this._setAttributes}
                    contextMenuItems={this.props.contextMenuItems}
                />
               )
        } );
        return nodes
    };

    selectNode=(t_id)=>{
        this.selectedNode = t_id
    };

    reloadTree=()=>{
        this.forceUpdate()
    };

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
    onExpandAsync:    PropTypes.func,
    onRightClick:     PropTypes.func,
    contextMenuWidth: PropTypes.number,
    contextMenuItems: PropTypes.func

};

Tree.defaultProps = {
    data:             [],
    expanded:         false,
    contextMenuWidth: 150,
    contextMenuItems: null
};