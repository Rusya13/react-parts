/* @flow */

import React from "react";
import PropTypes from "prop-types";

export class CheckBox extends React.Component {

    input: any;
    props: {
        name: string,
        onClickHandler: () => void,
        checked: boolean,
        disabled: boolean,
        type: ?string,
        label: ? string
    }

    onClickHandler( e: Event ) {
        let o: Object        = {};
        o[ this.props.name ] = this.input.checked;
        this.props.onClickHandler( o )
    }

    render() {
        //console.log("CheckBox render", this.props.type);
        return (
            <label
                className={"reactParts__checkbox-wrap " + ((this.props.checked) ? " checked " : "") + ((this.props.type === "button") ? " button" : "") + ((this.props.disabled) ? " disabled" : "")}>
                <div className={"reactParts__checkbox-input-new" }>
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        ref={( input ) => {this.input = input}}
                        disabled={this.props.disabled}
                        className="reactParts__checkbox-input"
                        onChange={this.onClickHandler.bind( this )}
                    />
                </div>


                <div className="reactParts__checkbox-label">{this.props.label}</div>
            </label>
        )
    }
}
CheckBox.propTypes = {
    name:           PropTypes.oneOfType( [ React.PropTypes.string, React.PropTypes.number ] ),
    label:          PropTypes.string,
    checked:        PropTypes.bool,
    disabled:       PropTypes.bool,
    onClickHandler: PropTypes.func.isRequired,
    type:           PropTypes.oneOf( [ "normal", "button" ] )
};