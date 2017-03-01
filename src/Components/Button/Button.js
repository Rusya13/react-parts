/* @flow */

import React from "react";


export type ButtonBrand = 'success' | 'warning' | 'danger' | 'primary' | 'default' | 'light';
export type ButtonType = 'button' | 'submit';

export interface ButtonProps {
    brand?: ButtonBrand;
    type?: ButtonType;
    caption: string;
    onClick: (id?: string) => void;
    disabled?: boolean;
    hidden?: boolean;
    id?: string;
    size?: string;
    className?: string;
}


export class Button extends React.Component {

    props:ButtonProps;

    constructor(props:ButtonProps){
        super(props)

    }

    onClick(e: Event) {
        if (this.props.onClick) this.props.onClick(this.props.id);
    };

    render() {
        let props:ButtonProps = this.props;
        if (props.hidden) return null;
        let className = 'btn';
        if (props.brand) className += ` btn-${props.brand}`;
        if (props.size) className += ` btn-${props.size}`;
        if (props.className) className += ` ${props.className}`;

        return (
            <button type={this.props.type}
                    className={className}
                    onClick={this.onClick.bind(this)}
                    disabled={props.disabled}
                    id={props.id}>
                {props.caption}
            </button>
        )
    };
}

Button.propTypes ={
    brand: React.PropTypes.string,
    type: React.PropTypes.string,
    caption: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    id: React.PropTypes.string,
    size: React.PropTypes.string,
    className: React.PropTypes.string,
}