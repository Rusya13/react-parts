import React from "react";
import { CheckBoxGroup } from '../dist/Components/CheckBoxGroup/CheckBoxGroup';
import {Model} from './Model/Model';

export class CheckBoxController extends React.Component {

    constructor( props ) {
        super( props );
        this.model = new Model({test: [2]},{reactive:true});
        this.model.observe(['test'], ()=>this.forceUpdate())
    }

    onChange(e){
        console.log("CheckBoxController onChange", e);
        this.model.set(e)

    }

    render() {
        console.log("CheckBoxController render", this.model);
        return (
            <div>
                <CheckBoxGroup
                    direction="vertical"
                    label="Test label"
                    name="test"
                    options={[{label:"Male", value:1}, {label:"Female", value:2}]}
                    onChange={this.onChange.bind(this)}
                    checked={this.model.get("test")}
                />
            </div>

        )
    }
}