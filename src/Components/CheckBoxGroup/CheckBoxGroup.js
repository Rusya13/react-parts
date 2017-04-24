/* @flow */
import { CheckBox } from "../CheckBox/CheckBox";
import React from "react";
import PropTypes from "prop-types";

export class CheckBoxGroup extends React.Component {

    props: {
        direction: ?("vertical" | "horizontal"),
        readOnly: ?boolean,
        required: ?boolean,
        options: Array<any>,
        onChange: () => void,
        checked: ?Array<any>,
        label: ?string,
        type: ?string
    };

    onChange( o: Object ) {

        this.props.onChange( o )
    }

    isChecked( value: number | string ) {
        return this.props.checked && this.props.checked.some( item => item === value )
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
                type={this.props.type}
            />
        } )
    }

    getChecked() {
        let arr = [];
        this.props.options.filter( item => item.checked ).forEach( option => {
            if ( arr.length > 0 ) arr.push( ", " );
            arr.push( option.label )
        } );
        return arr
    }

    render() {
        let className = "reactParts__checkbox-group";
        return (
            <div className={"reactParts__checkbox-group-wrap " +
            ((this.props.type === "button") ? " button" : "") +
            ((this.props.direction === "vertical" && this.props.type !== "button") ? " vertical " : "")

            }>
                {this.props.label &&
                <label className={"reactParts__label"+((this.props.required && !this.props.readOnly)?" required":"")}>{this.props.label}</label>}
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

CheckBoxGroup.propTypes = {
    direction: PropTypes.oneOf( [ "vertical", "horizontal" ] ),
    readOnly:  PropTypes.bool,
    required:  PropTypes.bool,
    label:     PropTypes.string,
    options:   PropTypes.array.isRequired,
    onChange:  PropTypes.func.isRequired,
    checked:   PropTypes.array,
    type:      PropTypes.oneOf( [ "normal", "button" ] )
};