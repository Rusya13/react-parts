import React from "react";

import { Icon } from "./Icon";


export class Button extends React.Component {


    onClick() {
        if ( this.props.onClick ) this.props.onClick( this.props.id );
    };

    render() {
        if ( this.props.hidden ) return null;

        let className = 'btn', isIconExist = this.props.icon && this.props.icon.name;
        if ( this.props.brand ) className += ` btn-${this.props.brand}`;
        if ( this.props.size ) className += ` btn-${this.props.size}`;
        if ( this.props.className ) className += ` ${this.props.className}`;
        if ( this.props.iconName || isIconExist ) className += ` btn-icon`;

        let icon = isIconExist ?
            <Icon
                name={this.props.icon.name || this.props.iconName}
                size={this.props.icon.size || this.props.iconSize}
                viewBox={this.props.icon.box || this.props.iconViewBox}
                fill={this.props.icon.fill || this.props.iconFill}
            /> : null;

        return (
            <button type={this.props.button}
                    className={className}
                    onClick={this.onClick.bind( this )}
                    disabled={this.props.disabled ? true : false}
                    id={this.props.id}>
                {icon}{this.props.caption}
            </button>
        )
    };
}

Button.propTypes = {
    brand:       React.PropTypes.oneOf( [ 'success', 'warning', 'danger', 'primary', 'default', 'light' ] ),
    type:        React.PropTypes.oneOf( [ 'button', 'submit' ] ),
    caption:     React.PropTypes.string,
    onClick:     React.PropTypes.func,
    disabled:    React.PropTypes.oneOfType( [ React.PropTypes.bool, React.PropTypes.func ] ),
    hidden:      React.PropTypes.bool,
    id:          React.PropTypes.any,
    size:        React.PropTypes.string,
    iconFill:    React.PropTypes.string,
    className:   React.PropTypes.string,
    iconName:    React.PropTypes.string,
    iconViewBox: React.PropTypes.string,
    iconSize:    React.PropTypes.number,
    icon:        React.PropTypes.object
};

Button.defaultProps = {
    hidden:   false,
    disabled: false,
    type:     'button'
};

Button.brands={
    success:"success",
    warning:"warning",
    danger:"danger",
    primary:"primary",
    default:"default",
    light:"light"
};
Button.types = {
    button:"button",
    submit:"submit"
};