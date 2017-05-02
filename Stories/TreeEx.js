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
            },
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
        console.log("TreeEx checkTree",this.tree.getNodeParents(this.tree.selectedNode).map(item=>item.title));
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

    getChildren = async (node)=>{

        return new Promise((resolve, reject)=>{
            setTimeout(()=>{
                node.children = [{
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
                }];
                resolve(node)
            }, 2000)
        });




    };




    contextMenuItems=(node, e)=>{
        //console.log("TreeEx contextMenuItems", node, e);
        return [{title: "test", onClickHandler:this.test}, {type:"divider"}]
    };

    test=(e)=>{
        console.log("TreeEx test", e);
    };

    render() {


        return (
            <div>
                <Tree
                    data={this.data}
                    //customNodeRender={this.renderNode}
                    //checkable={true}
                    //onExpandAsync={this.getChildren}
                    onExpand={this.onExpand}
                    onUnExpand={this.onUnExpand}
                    onCheck={this.onCheck}
                    onUnCheck={this.onUnCheck}
                    ref={( tree ) => {
                        this.tree = tree;
                        console.log( "TreeEx new tree", this.tree )
                    }}
                    contextMenuItems={this.contextMenuItems}
                />

                <Button onClick={this.checkTree} caption="Check"/>
            </div>
        )
    }
}