import * as React from "react";

import {Icon} from "../Icon/Icon";


export type ButtonBrand = 'success' | 'warning' | 'danger' | 'primary' | 'default' | 'light';
export type ButtonType = 'button' | 'submit';

export class ButtonProps {
    brand?: ButtonBrand = 'primary';
    type?: ButtonType = 'button';
    caption: string;
    onClick: (id?: string) => void;
    disabled?: boolean = false;
    hidden?: boolean = false;
    id?: string;
    size?: string;
    iconFill?: string;
    className?: string;
    iconName?: string;
    iconWidth?: number;
    iconHeight?: number;
}


export class Button extends React.Component<ButtonProps, {}> {


    onClick(e: Event) {
        if (this.props.onClick) this.props.onClick(this.props.id);
    };

    render() {
        if (this.props.hidden) return null;

        let className = 'btn', isIconExist = this.props.iconName;
        if (this.props.brand) className += ` btn-${this.props.brand}`;
        if (this.props.size) className += ` btn-${this.props.size}`;
        if (this.props.className) className += ` ${this.props.className}`;
        if (this.props.iconName || isIconExist) className += ` btn-icon`;

        let icon = isIconExist ?
            <Icon
                name={this.props.iconName}
                width={this.props.iconWidth}
                height={this.props.iconHeight}
                fill={this.props.iconFill}
            /> : null;

        return (
            <button type={this.props.type}
                    className={className}
                    onClick={this.onClick.bind(this)}
                    disabled={this.props.disabled}
                    id={this.props.id}>
                {icon}{this.props.caption}
            </button>
        )
    };
}