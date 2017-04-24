import React from "react";
import { RadioGroup } from '../dist/Components/RadioGroup/RadioGroup';


export class RadioController extends React.Component {

    constructor( props ) {
        super( props );

    }

    onChange(e){
        console.log("Radio onChange", e);

    }

    render() {
        return (
            <div>
                <RadioGroup
                    label="Test label"
                    name="test"
                    required
                    options={[{label:"Male", value:1}, {label:"Female", value:2}]}
                    onChange={this.onChange.bind(this)}
                    checked={1}
                />
            </div>

        )
    }
}