import React from "react";
import { MultiSelect, Select, SelectAsync, MultiSelectAsync } from "../dist";



//TODO make active
//TODO valid

export class SelectController extends React.Component {

    constructor( props ) {
        super( props );
        this.listProvider = this.listProvider.bind(this);
        this.state = {
            testMultiSelect: [ 4, 5 ],
            testSelect:      "",
            testSelectAsync: null,
            testBool: null,
            testSearch:      null,
            testMultiSelectAsync:      [{ firstName: "Gala", id: 3, value: "3  super long selection" },
                { firstName: "Anna", id: 4, value: "4  First selection" }],
        }
    }

    shouldComponentUpdate( nextProps, nextState ) {
        return nextState !== this.state
    }

    onChange( ob ) {
        this.setState( ob );
    }


    list( searchValue ) {
        console.log("Select list");
        let matchesFilter = new RegExp( searchValue, "i" );
        let list =[
            { firstName: "Den фывавыфп фапф ыпф фвап фвап ", id: 1, value: "1 " + searchValue + " First selection" },
            { firstName: "Mark", id: 2, value: "2 " + searchValue + " Second selection" },
            { firstName: "Gala", id: 3, value: "3 " + searchValue + " super long selection" },
            { firstName: "Anna", id: 4, value: "4 " + searchValue + " First selection" },
            { firstName: "Daria", id: 5, value: "5 " + searchValue + " Second selection" },
            { firstName: "Elena", id: 6, value: "6 " + searchValue + " super long selection" },
            { firstName: "Irina", id: 7, value: "7 " + searchValue + " First selection" },
            { firstName: "Mary", id: 8, value: "8 " + searchValue + " Second selection" },
            { firstName: "Scooter", id: 9, value: "9 " + searchValue + " super long selection" },
            { firstName: "Boris", id: 10, value: "10 " + searchValue + " First selection" },
            { firstName: "John", id: 11, value: "11 " + searchValue + " Second selection" },
            { firstName: "Lexy", id: 12, value: "12 " + searchValue + " super long selection" }
        ];

        list = list.filter( item => {
            return !searchValue || matchesFilter.test( item.firstName )
        } );
        console.log("Select list", list);
        return list
    }

    async listProvider( searchValue ) {
        console.log( "Select listProvider", searchValue );
        return await this.list( searchValue )


    }

    listItemRender( item, i, list ) {
        return <div>
            {item.key} {item.firstName} {item.value} {i}
        </div>
    }

    inputRender( item ) {
        //console.log("Select inputRender", item);
        return <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
                {item && "Name:" + item.firstName}
            </div>
            <div>
                {item && "Name:" + item.firstName}
            </div>
        </div>
    }

    customItemMultiSelect( item, index, removeItem ) {
        return (
            <div className="reactParts__multi-select-box-custom-item" key={index}>
                <div className="reactParts__multi-select-box-custom-item-value">
                    {item}
                </div>
                <div className="reactParts__multi-select-box-custom-item-icon">
                    <svg onClick={() => {
                        removeItem( item )
                    }} width="16" height="16" viewBox="0 0 24 24"
                         className="reactParts__multi-select-box-custom-item-remove break">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z">
                        </path>
                    </svg>
                </div>
            </div>
        )
    }


    keyDownHandler( e: KeyboardEvent, value: string ) {
        if ( e.key === "Enter" ) {
            console.log( "Select keyDownHandler", value );

        }
    }

    onAddControlsClickHandler() {
        console.log( "Select onAddControlsClickHandler" );
    }

    render() {
        console.log("Select render", this.state.testBool);
        let list = [
            { firstName: "Den", key: 1, value: "1 First selection" },
            { firstName: "Mark", key: 2, value: "2 Second selection" },
            { firstName: "Galadsad asdsadfasdf ", key: 3, value: "3 super long selection" },
            { firstName: "Anna", key: 4, value: "4 First selection" },
            { firstName: "Daria", key: 5, value: "5 Second selection" },
            { firstName: "Elena", key: 6, value: "6 super long selection" },
            { firstName: "Irina", key: 7, value: "7 First selection" },
            { firstName: "Mary", key: 8, value: "8 Second selection" },
            { firstName: "Scooter", key: 9, value: "9 super long selection" },
            { firstName: "Boris", key: 10, value: "10 First selection" },
            { firstName: "John", key: 11, value: "11 Second selection" },
            { firstName: "Lexy", key: 12, value: "12 super long selection" }
        ];

        let boolList= [
            {id:true, value:"Yes"},
            {id:false, value:"No"},
        ]

        return (
            <div className="reactParts__form">
                {/*<div className="row">*/}
                    {/*<div className="col-xs-1">*/}
                        {/*<Select*/}
                            {/*autoFocus={true}*/}
                            {/*label="Select boolean"*/}
                            {/*list={boolList}*/}
                            {/*placeholder="select"*/}
                            {/*name="testBool"*/}
                            {/*cancel={true}*/}
                            {/*selected={this.state.testBool}*/}
                            {/*onChange={this.onChange.bind( this )}*/}
                            {/*tabIndex={1}*/}
                        {/*/>*/}
                    {/*</div>*/}

                {/*</div>*/}
                <div className="row">
                    <div className="col-xs-1">
                        <Select
                            required
                            label="Select"
                            list={list}
                            placeholder="select"
                            name="testSelect"
                            cancel={true}
                            uniqueKey="key"
                            selected={this.state.testSelect}
                            onChange={this.onChange.bind( this )}
                            labelKey="firstName"
                            tabIndex={2}
                            showFullValue={true}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-xs-1">
                        <SelectAsync
                            label="SelectAsync"
                            list={this.listProvider}
                            placeholder="select"
                            name="testSelectAsync"
                            cancel={true}
                            required
                            selected={this.state.testSelectAsync}
                            onChange={this.onChange.bind( this )}
                            labelKey="firstName"
                            tabIndex={3}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-xs-4">
                        <MultiSelect
                            required
                            label="Multiselect"
                            list={list}
                            placeholder="multiselect"
                            name="testMultiSelect"
                            cancel={true}
                            multiSelect={true}
                            onChange={this.onChange.bind( this )}
                            selected={this.state.testMultiSelect}
                            labelKey="firstName"
                            uniqueKey="key"
                            listItemRender={this.listItemRender.bind( this )}
                            tabIndex={4}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-2">
                        <MultiSelectAsync
                            label="MultiselectAsync"
                            list={this.listProvider}
                            placeholder="multiselect"
                            name="testMultiSelectAsync"
                            cancel={true}
                            required
                            onChange={this.onChange.bind( this )}
                            selected={this.state.testMultiSelectAsync}
                            labelKey="firstName"
                            listItemRender={this.listItemRender.bind( this )}
                            tabIndex={5}
                        />
                    </div>
                </div>
            </div>
        )
    }
}