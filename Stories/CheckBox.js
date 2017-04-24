import React from "react";
import { CheckBox, CheckBoxGroup }  from '../dist/index';
import {Model} from './Model/Model';

export class CheckBoxController extends React.Component {

    constructor( props ) {
        super( props );
        this.model = new Model({gender_male: false, gender_female:true, smoke:true},{reactive:true});
        this.model.observe(['test', 'smoke', 'gender_male', 'gender_female'], ()=>this.forceUpdate())
    }

    onChange(e){
        console.log("CheckBoxController onChange", e);
        this.model.set(e)

    }

    render() {
        return (
            <div>
                <CheckBoxGroup
                    label="Gender"
                    required
                    direction="horizontal"
                    options={
                        [
                            {label:"Male", name:"gender_male", checked:this.model.get("gender_male"), disabled:true},
                            {label:"Female", name:"gender_female", checked:this.model.get("gender_female")},
                            {label:"Female", name:"gender_female", checked:true, disabled:true}
                        ]
                    }

                    onChange={this.onChange.bind(this)}
                />
                <CheckBox disabled={false} onClickHandler={this.onChange.bind(this)} name="smoke" label="Non-smoking" checked={this.model.get("smoke")} type="button"/>
            </div>

        )
    }
}