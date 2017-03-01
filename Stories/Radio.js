import React from "react";
import { Radio } from '../dist/Components/Radio/Radio';
import { RadioGroup } from '../dist/Components/RadioGroup/RadioGroup';
import {Model} from './Model';

export class RadioController extends React.Component {

    constructor( props ) {
        super( props );
        this.model = new Model({test: 2},{reactive:true});
        this.model.observe(['test'], ()=>this.forceUpdate())
    }

    onChange(e){
        console.log("Radio onChange", e);
        this.model.set(e)

    }

    render() {
        console.log("Radio render", this.model);
        return (
            <div>
                <RadioGroup
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