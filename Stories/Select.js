import React from "react";
import { Select } from '../dist';


//TODO try dynamic list with async request

export class SelectController extends React.Component {

    constructor( props ) {
        super( props );
        this.state={
            testMultiSelect:[1],
            testSelect:[2]
        }
    }


    onChange(ob){
        this.setState(ob);
    }

    render() {

        let list = [
            {key:1, value:"First selection"},
            {key:2, value:"Second selection"},
            {key:3, value:"super long selection"}
            ];
        return (
            <div className="buttons-line">
                <Select
                    list={list}
                    placeholder="select"
                    name="testSelect"
                    cancel={true}
                    multiSelect={false}
                    selected={this.state.testSelect}
                    onChange={this.onChange.bind(this)}

                />
                <Select
                    list={list}
                    placeholder="multiselect"
                    name="testMultiSelect"
                    cancel={true}
                    multiSelect={true}
                    onChange={this.onChange.bind(this)}
                    selected={this.state.testMultiSelect}
                />
            </div>
        )
    }
}