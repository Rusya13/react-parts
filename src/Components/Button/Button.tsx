import * as React from "react";

import {Icon} from "../Icon/Icon";


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
    iconFill?: string;
    className?: string;
    iconName?: string;
    iconWidth?: number;
    iconHeight?: number;
}


export class Button extends React.Component<ButtonProps, {}> {

    constructor(props:ButtonProps){
        super(props)

    }

    onClick(e: Event) {
        if (this.props.onClick) this.props.onClick(this.props.id);
    };

    render() {
        let props:ButtonProps = this.props;

        if (props.hidden) return null;

        let className = 'btn', isIconExist = props.iconName;
        if (props.brand) className += ` btn-${props.brand}`;
        if (props.size) className += ` btn-${props.size}`;
        if (props.className) className += ` ${props.className}`;
        if (props.iconName || isIconExist) className += ` btn-icon`;

        let icon = isIconExist ?
            <Icon
                name={props.iconName}
                width={props.iconWidth}
                height={props.iconHeight}
                fill={props.iconFill}
            /> : null;

        return (
            <button type={this.props.type}
                    className={className}
                    onClick={this.onClick.bind(this)}
                    disabled={props.disabled}
                    id={props.id}>
                {icon}{props.caption}
            </button>
        )
    };
}