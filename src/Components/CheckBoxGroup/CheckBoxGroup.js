/* @flow */
import { CheckBox } from "../CheckBox/CheckBox";
import React from "react";

export class CheckBoxGroup extends React.Component {

    props: {
        direction: ?("vertical" | "horizontal"),
        readOnly?:boolean,
        options: Array<any>,
        onChange: () => void,
        checked: ?Array<any>,
        label: ?string
    };

    onChange( o:Object ) {

        this.props.onChange( o )
    }

    isChecked(value:number | string){
        return this.props.checked && this.props.checked.some(item=>item===value)
    }

    renderOptions() {
        return this.props.options.map( ( option, index ) => {
            return <CheckBox
                checked={option.checked}
                onClickHandler={this.onChange.bind( this )}
                key={index}
                label={option.label}
                name={option.name}
                disabled={option.disabled}
            />
        } )

    }

    getChecked(){
        return this.props.options.filter(item=>item.value === this.props.checked).pop().label
    }

    render() {
        //console.log( "RadioGroup render" );
        let className="reactParts__checkbox-group";
        if (this.props.direction === "vertical"){
            className += " vertical"
        }

        return (
            <div className="reactParts__radio-group-wrap">
                {this.props.label &&
                <label className="reactParts__label" >{this.props.label}</label>}
                <div className={className}>
                    {(this.props.readOnly)
                        ?this.getChecked()
                        :this.renderOptions()
                    }
                </div>

            </div>
        )
    }
}

CheckBoxGroup.propTypes = {
    direction: React.PropTypes.oneOf(["vertical", "horizontal"]),
    readOnly: React.PropTypes.bool,
    label:    React.PropTypes.string,
    options:  React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    checked:  React.PropTypes.array
};