import React from "react";
import { Button, Tree } from "../dist";


export class TreeEx extends React.Component {

    constructor( props ) {
        super( props );

        this.data = [
            {
                title: "test",

                children: [
                    {
                        title: "deep1",

                        children: [
                            {
                                title: "deep2-1",

                            },
                            {
                                title:    "deep2-2",
                                children: [
                                    {
                                        title: "deep3-1",

                                    } ]
                            }
                        ]
                    }
                ]
            }
        ];
    }


    onExpand = ( t_id, tree ) => {
        //console.log("TreeEx expand",t_id, tree)
    };

    onUnExpand = ( t_id, tree ) => {
        //console.log("TreeEx unexpand",t_id, tree )
    };

    onCheck = ( t_id, tree ) => {
        //console.log("TreeEx onCheck", t_id, tree);
    };

    onUnCheck = ( t_id, tree ) => {
        //console.log("TreeEx onUnCheck", t_id, tree);
    };


    checkTree = () => {

        //console.log( "TreeEx checkTree original", this.tree.data );
        //console.log( "TreeEx selected", this.tree.selectedNode );
        //console.log("TreeEx getCheckedNodes", this.tree.getCheckedNodes());
        //this.tree.checkAllNodes()

    };

    renderNode = ( node ) => {
        return (
            <div
                //suppressContentEditableWarning={true}
                className={
                    "reactParts__tree--title"
                    + ((node.selected) ? " selected" : "")
                    + ((!node.selectable) ? " unselectable" : "")
                }
                onClick={this.selectNode.bind( this, node )} autoFocus={true}>
                {node.title}
            </div>
        )
    };

    selectNode( node ) {
        this.tree.selectNode( node )
    }

    render() {


        return (
            <div>
                <Tree
                    data={this.data}
                    //customNodeRender={this.renderNode}
                    checkable={true}
                    expanded={true}
                    onExpand={this.onExpand}
                    onUnExpand={this.onUnExpand}
                    onCheck={this.onCheck}
                    onUnCheck={this.onUnCheck}
                    getTree={( tree ) => {
                        this.tree = tree;
                        console.log( "TreeEx new tree", this.tree )
                    }}
                />

                <Button onClick={this.checkTree} caption="Check"/>
            </div>
        )
    }
}