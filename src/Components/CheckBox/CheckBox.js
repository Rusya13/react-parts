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
        const { checked, type, disabled, label, size } = this.props;

        let className = 'rp-checkbox reactParts__checkbox-wrap';

        if(type === 'button') className += ' button';
        if(checked) className += ' checked';
        if(disabled) className += ' disabled';
        if(size) className += ` rp-checkbox--${size}`;

        return (
            <label className={className}>
                <div className={"reactParts__checkbox-input-new" }>
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        ref={( input ) => {this.input = input}}
                        disabled={this.props.disabled}
                        className="reactParts__checkbox-input"
                        onChange={this.onClickHandler.bind(this)}
                    />
                </div>
                <div className="reactParts__checkbox-label">{label}</div>
            </label>
        )
    }
}
CheckBox.propTypes = {
    name:           PropTypes.oneOfType( [ React.PropTypes.string, React.PropTypes.number ] ),
    label:          PropTypes.string,
    size:           PropTypes.string,
    checked:        PropTypes.bool,
    disabled:       PropTypes.bool,
    onClickHandler: PropTypes.func,
    type:           PropTypes.oneOf( [ "normal", "button" ] )
};