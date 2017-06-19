/* @flow */

import React from "react";
import PropTypes from "prop-types";

export type ButtonBrand = 'success' | 'warning' | 'danger' | 'primary' | 'default' | 'light';
export type ButtonType = 'button' | 'submit';
export type ButtonSize = 'large' | 'default' | 'small' | 'mini';

export interface ButtonProps {
    brand: ?ButtonBrand;
    type: ?ButtonType;
    size: ?ButtonSize;
    caption: string;
    onClick: ( id: ?string ) => void;
    disabled: ?boolean;
    hidden: ?boolean;
    id: ?string;
    size: ?string;
    className: ?string;
}


export class Button extends React.Component {

    props: ButtonProps;

    constructor( props: ButtonProps ) {
        super( props )

    }

    onClick( e: Event ) {
        if ( this.props.onClick ) this.props.onClick( this.props.id );
    };

    blur=()=>{
        this.button.blur()
    };

    focus=()=>{
        this.button.focus()
    };

    render() {
        let props: ButtonProps = this.props;
        if ( props.hidden ) return null;

        let className = 'rp-btn';
        if(props.brand) className += ` rp-btn--${props.brand}`;
        if(props.className) className += ` ${props.className}`;
        if(props.size) className += ` rp-btn--${props.size}`;

        return (
            <button
                ref={(button)=>this.button=button} type={this.props.type}
                onClick={this.onClick.bind( this )}
                disabled={props.disabled}
                className={className}
                id={props.id}>
                {props.caption}
            </button>
        )
    };
}

Button.propTypes = {
    brand:     PropTypes.string,
    type:      PropTypes.string,
    caption:   PropTypes.string.isRequired,
    onClick:   PropTypes.func.isRequired,
    disabled:  PropTypes.bool,
    hidden:    PropTypes.bool,
    id:        PropTypes.string,
    size:      PropTypes.string,
    className: PropTypes.string
}