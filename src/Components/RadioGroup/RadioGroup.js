/* @flow */
import { Radio } from "../Radio/Radio";
import React from "react";

export class RadioGroup extends React.Component {

    props: {
        direction: ?"vertical" | ?"horizontal",
        readOnly?:boolean,
        name: ?string,
        options: Array<any>,
        onChange: () => void,
        checked: ?(number | string),
        label: ?string
    };

    onChange( value: string | number ) {
        //console.log( "RadioGroup onChange", value );
        let o: Object        = {};
        o[ this.props.name ] = value;
        this.props.onChange( o )
    }

    renderOptions() {
        return this.props.options.map( ( option, index ) => {
            return <Radio
                checked={option.value === this.props.checked}
                onClickHandler={this.onChange.bind( this )}
                key={index}
                value={option.value}
                label={option.label}
            />
        } )

    }

    getChecked(){
        return this.props.options.filter(item=>item.value === this.props.checked).pop().label
    }

    render() {
        //console.log( "RadioGroup render" );
        let className="reactParts__radio-group";
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

RadioGroup.propTypes = {
    direction: React.PropTypes.oneOf(["vertical", "horizontal"]),
    readOnly: React.PropTypes.bool,
    label:    React.PropTypes.string,
    name:     React.PropTypes.string.isRequired,
    options:  React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    checked:  React.PropTypes.oneOfType( [ React.PropTypes.number, React.PropTypes.string ] )
};