/* @flow */

import React from "react";
import PropTypes from "prop-types";

export type ButtonBrand = 'success' | 'warning' | 'danger' | 'primary' | 'default' | 'light';
export type ButtonType = 'button' | 'submit';

export interface ButtonProps {
    brand?: ButtonBrand;
    type?: ButtonType;
    caption: string;
    onClick: ( id?: string ) => void;
    disabled?: boolean;
    hidden?: boolean;
    id?: string;
    size?: string;
    className?: string;
}


export class Button extends React.Component {

    props: ButtonProps;

    constructor( props: ButtonProps ) {
        super( props )

    }

    onClick( e: Event ) {
        if ( this.props.onClick ) this.props.onClick( this.props.id );
    };

    render() {
        let props: ButtonProps = this.props;
        if ( props.hidden ) return null;
        let className = 'btn';
        if ( props.brand ) className += ` btn-${props.brand}`;
        if ( props.size ) className += ` btn-${props.size}`;
        if ( props.className ) className += ` ${props.className}`;

        return (
            <button type={this.props.type}
                    className={className}
                    onClick={this.onClick.bind( this )}
                    disabled={props.disabled}
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
    className: PropTypes.string,
}