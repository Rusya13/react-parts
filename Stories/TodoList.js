/* @flow */
import React from "react";
import { CheckBoxGroup, Input } from "../dist";
import { Model } from "./Model/Model";
import { Button } from "../src/Components/Button/Button";


class Item extends Model {
    makeDone() {
        this.set( { done: true } )
    }

    makeUnDone() {
        this.set( { done: false } )
    }
}



function observable(target, key, descriptor  ) {
    //const origFn = descriptor.value.bind(target);
    console.log("TodoList observable", target);
    console.log("TodoList observable", key);
    console.log("TodoList observable", descriptor);


}




class Todo extends Model {

    attributes = {
        todo:[] = [],
        newTodo: "",
        filter:  ""
    };

    computed: Object = {
        filteredTodo: () => {
            let matchesFilter = new RegExp( this.get( "filter" ), "i" );
            return this.get( "todo" ).filter( item => {
                return !this.get( "filter" ) || matchesFilter.test( item.get("label") )
            } );
        },
        doneTodo:     () => {
            return this.get( "todo" ).filter( item => item.get("done") ) || [];
        },
        unDoneTodo:   () => {
            return this.get( "todo" ).filter( item => !item.get("done") ) || [];
        }
    };

    makeDone( obj: Object ) {
        let itemId = Object.keys( obj )[ 0 ];
        let value  = obj[ itemId ];
        this.get( "todo" ).forEach( item => {
            if ( Number( itemId ) === item.get("id") ) {
                if(value){
                    item.makeDone()
                } else {
                    item.makeUnDone()
                }
            }
        } );
        this.set( { todo: this.get( "todo" ) } );
        //console.log("TodoList makeDone", this);
    }


    clearDone() {
        let unDone = this.get( "unDoneTodo" );
        this.set( { todo: unDone } );
    }

    addNewTodo() {
        let arr     = this.get( "todo" );
        let newTodo = this.get( "newTodo" );
        arr.push( new Item( { label: newTodo, done: false, id: Date.now() }, true ) );

        this.set( { todo: arr } );
        this.set( { newTodo: "" } );
    }

}






export class TodoList extends React.Component {

    constructor( props ) {
        super( props );
        this.todo = new Todo();
        //this.todo.observeAttributes();
        this.todo.observe(
            [
                "todo",
                "unDoneTodo",
                "filteredTodo",
                "newTodo",
                "filter",
                "doneTodo"
            ], () => this.forceUpdate() );
        //this.todo.observe("todo", null)
        this.todo.observe("filter", ()=>this.log())
    }
    log(){
        console.log("TodoList log");
    }

    onChangeHandler( obj ) {
        this.todo.makeDone( obj )

    }

    onInputChange( obj ) {
        this.todo.set( obj )
    }

    onEnterNewTodo( e ) {
        if ( e.key === "Enter" ) {
            this.todo.addNewTodo()
        }
    }

    onInputFilterChange( obj ) {
        this.todo.set( obj )
    }

    onClickDone() {
        this.todo.clearDone()
    }

    render() {
        //console.log("TodoList render", this.todo);
        return (
            <div className="row center-xs middle-xs">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="reactParts__form">
                        <Input
                            label="New task:"
                            name="newTodo"
                            value={this.todo.get( "newTodo" )}
                            onChange={this.onInputChange.bind( this )}
                            onKeyDown={this.onEnterNewTodo.bind( this )}

                        />
                        <Input
                            label="Filter"
                            name="filter"
                            value={this.todo.get( "filter" )}
                            onChange={this.onInputFilterChange.bind( this )}

                        />
                        <CheckBoxGroup
                            label="Tasks:"
                            direction="vertical"
                            options={this.todo.get( "filteredTodo" ).map( item => {
                                return { label: item.get("label"), name: item.get("id"), checked: item.get("done") }
                            } )}
                            onChange={this.onChangeHandler.bind( this )}/>
                        <Button caption="Clear done" brand="success" disabled={this.todo.get( "doneTodo" ).length === 0}
                                onClick={this.onClickDone.bind( this )}/>

                    </div>
                </div>

            </div>
        )
    }
}