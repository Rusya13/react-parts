import React from "react";
import { Select } from '../dist';
import { MultiSelect } from "../dist";


//TODO make active
//TODO valid

export class SelectController extends React.Component {

    constructor( props ) {
        super( props );
        this.state={
            testMultiSelect:[1],
            testSelect:2
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        return nextState !== this.state
    }

    onChange(ob){
        this.setState(ob);
    }

    render() {
        //console.log("Select render");
        let list = [
            {key:1, value:"First selection"},
            {key:2, value:"Second selection"},
            {key:3, value:"super long selection"}
            ];
        return (
            <div className="reactParts__form">
                <div className="reactParts__form-row">
                    <Select
                        list={list}
                        placeholder="select"
                        name="testSelect"
                        cancel={true}

                        selected={this.state.testSelect}
                        onChange={this.onChange.bind(this)}

                    />
                </div>
                <div className="reactParts__form-row">
                    <MultiSelect
                        list={list}
                        placeholder="multiselect"
                        name="testMultiSelect"
                        cancel={true}
                        multiSelect={true}
                        onChange={this.onChange.bind(this)}
                        selected={this.state.testMultiSelect}
                    />
                </div>


            </div>
        )
    }
}