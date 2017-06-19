/* @flow */
import { Radio } from "../Radio/Radio";
import React from "react";
import PropTypes from "prop-types";

export class RadioGroup extends React.Component {

    props: {
        direction: ?"vertical" | ?"horizontal",
        readOnly: ?boolean,
        name: ?string,
        options: Array<any>,
        onChange: () => void,
        checked: ?(number | string),
        label: ?string,
        required: ?boolean
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

    getChecked() {
        return this.props.options.filter( item => item.value === this.props.checked ).pop().label
    }

    render() {
        //console.log( "RadioGroup render" );
        let className = "reactParts__radio-group";
        if ( this.props.direction === "vertical" ) {
            className += " vertical"
        }

        return (
            <div className="reactParts__radio-group-wrap">
                {this.props.label &&
                <label className={"reactParts__label"+((this.props.required && !this.props.readOnly)?" required":"")} >{this.props.label}</label>}
                <div className={className}>
                    {(this.props.readOnly)
                        ? this.getChecked()
                        : this.renderOptions()
                    }
                </div>

            </div>
        )
    }
}

RadioGroup.propTypes = {
    direction: PropTypes.oneOf( [ "vertical", "horizontal" ] ),
    readOnly:  PropTypes.bool,
    label:     PropTypes.string,
    name:      PropTypes.string,
    options:   PropTypes.array.isRequired,
    onChange:  PropTypes.func.isRequired,
    checked:   PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
    required:  PropTypes.bool
};