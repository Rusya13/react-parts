/* @flow */

import React from "react";
import PropTypes from "prop-types";

export class Radio extends React.Component {

    input: any;

    onClickHandler( e: Event ) {
        //console.log("Radio onClickHandler", this.input);
        this.props.onClickHandler( this.props.value )
    }


    render() {
        //console.log("Radio render", this.props);
        return (
            <label className="reactParts__radio-wrap">
                <div className={"reactParts__radio-input-wrapper " + ((this.props.checked) ? "checked" : "")}>
                    <input
                        type="radio"
                        checked={this.props.checked}
                        ref={( input ) => {this.input = input}}
                        disabled={this.props.disabled}
                        className="reactParts__radio-input"
                        value={this.props.value}
                        onChange={this.onClickHandler.bind( this )}
                    />
                    <span className="reactParts__radio-outer-circle">
                        </span>
                    <span className="reactParts__radio-inner-circle">
                        </span>
                </div>
                <div className="reactParts__radio-input-label">{this.props.label}</div>
            </label>
        )
    }
}

Radio.propTypes = {
    value:          PropTypes.oneOfType( [ React.PropTypes.number, React.PropTypes.string ] ),
    label:          PropTypes.string,
    checked:        PropTypes.bool,
    disabled:       PropTypes.bool,
    onClickHandler: PropTypes.func
};