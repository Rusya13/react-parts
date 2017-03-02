/* @flow */
import React from "react";
import { CheckBoxGroup, Input } from "../dist";
import { Model } from "./Model/Model";
import { Button } from "../src/Components/Button/Button";

class Todo extends Model {


    attributes = {
        todo:    [] = [
            { label: "Make observable", done: true, id: 0 },
            { label: "Make computed", done: false, id: 1 }
        ],
        newTodo: "",
        filter:  ""
    };

    computed = {
        filteredTodo: () => {
            let matchesFilter = new RegExp( this.get( "filter" ), "i" );
            return this.get( "todo" ).filter( item => {
                return !this.get( "filter" ) || matchesFilter.test( item.label )
            } );

        },
        doneTodo:     () => {
            return this.get( "todo" ).filter( item => item.done ) || [];
        },
        unDoneTodo:   () => {
            return this.get( "todo" ).filter( item => !item.done ) || [];
        }
    }

    makeDone( obj: Object ) {
        let itemId = Object.keys( obj )[ 0 ];
        let value  = obj[ itemId ];
        this.get( "todo" ).forEach( item => {
            if ( Number( itemId ) === item.id ) {
                item.done = value
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
        arr.push( { label: newTodo, done: false, id: Math.random() } );
        this.set( { todo: arr } );
        this.set( { newTodo: "" } );
    }

}

let todo = new Todo();
todo.observeAttributes();


export class TodoList extends React.Component {

    constructor( props ) {
        super( props );
        todo.observe( [ "todo", "filteredTodo", "newTodo", "filter", "doneTodo" ], () => this.forceUpdate() )
        //todo.observe( [ "todo" ], null)

    }

    onChangeHandler( obj ) {
        //console.log( "TodoList onChangeHandler", obj );
        todo.makeDone( obj )

    }

    onInputChange( obj ) {
        //console.log( "TodoList onInputChange", obj );
        todo.set( obj )
    }

    onEnterNewTodo( e ) {
        if ( e.key === "Enter" ) {
            todo.addNewTodo()
        }
    }

    onInputFilterChange( obj ) {
        todo.set( obj )
    }

    onClickDone() {
        todo.clearDone()
    }

    render() {
        console.log( "TodoList render", todo );
        return (
            <div className="row center-xs middle-xs">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="reactParts__form">
                        <Input
                            label="New task:"
                            name="newTodo"
                            value={todo.get( "newTodo" )}
                            onChange={this.onInputChange.bind( this )}
                            onKeyDown={this.onEnterNewTodo.bind( this )}

                        />
                        <Input
                            label="Filter"
                            name="filter"
                            value={todo.get( "filter" )}
                            onChange={this.onInputFilterChange.bind( this )}

                        />
                        <CheckBoxGroup
                            label="Tasks:"
                            direction="vertical"
                            options={todo.get( "filteredTodo" ).map( item => {
                                return { label: item.label, name: item.id, checked: item.done }
                            } )}
                            onChange={this.onChangeHandler.bind( this )}/>
                        <Button caption="Clear done" brand="success" disabled={todo.get( "doneTodo" ).length === 0}
                                onClick={this.onClickDone.bind( this )}/>

                    </div>
                </div>

            </div>
        )
    }
}