import * as React from "react";
import {EventHandler, SyntheticEvent} from "react";


export type InputValue = string | number;

interface ReturnObject {
    [key: string]: string | number;
}

export type OnCHangeReturnObject = ReturnObject | number | string;

export class InputProps {
    onChange?: (o: OnCHangeReturnObject) => void;
    onKeyUp?: (e:React.KeyboardEvent<any>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    keypress?: () => void;
    name: string;
    placeholder?: string;
    autoFocus?: boolean = false;
    readOnly?: boolean = false;
    disabled?: boolean = false;
    type?: string = "text";
    valid?: boolean;
    limit?: number = 100;
    className?: string;
    value: InputValue;
    castTo: string;
    label?: string;
}


export class Input extends React.Component<InputProps, {}> {
    input:HTMLInputElement;

    constructor(props: InputProps) {
        super(props);
        this.cancelFocus = this.cancelFocus.bind(this);
        this.takeFocus = this.takeFocus.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.change = this.change.bind(this);
        this.focusOff = this.focusOff.bind(this);

        this.state = {
            defaultValue: this.props.value,
            focus: this.props.autoFocus,
            freeSpaceCounter: null,
            isValidated: true
        };

    }

    takeFocus() {
        if (this.refs.inp) this.input.focus();
    };

    cancelFocus() {
        if (this.refs.inp) this.input.blur();
    };


    onKeyUp(e:React.KeyboardEvent<any>) {
        if (this.props.onKeyUp) this.props.onKeyUp(e);
    };


    change() {

        let value:string|number = this.input.value;
        if (this.props.limit && value.length > this.props.limit) {
            value = value.slice(0, this.props.limit);
        }
        let obj: OnCHangeReturnObject;
        switch (this.props.castTo) {
            case 'number':
                value = Number(value);
                break;
        }

        if (this.props.name) {
            obj = {};
            obj[this.props.name] = value;
        } else {
            obj = value;
        }
        if (this.props.onChange) this.props.onChange(obj);

    };

    focusOn() {
        if (this.props.onFocus) this.props.onFocus();
    };

    focusOff() {

        if (this.props.onBlur) this.props.onBlur();
    };

    //componentWillReceiveProps( newProps ) {
    //    //this.setState( { defaultValue: newProps.value } );
    //};

    render() {
        let InputSimpleClassName = "reactParts__input";
        let valid = this.props.valid;
        console.log("Input render", valid);
        if (valid !== undefined && valid !== null) {
            if (valid) {
                InputSimpleClassName += " valid"
            } else {
                InputSimpleClassName += " invalid"
            }
        }


        if (this.props.className) InputSimpleClassName += ` ${this.props.className}`;
        return (
            <div className="reactParts__input-wrap">
                {this.props.label &&
                <label className="reactParts__label" htmlFor={this.props.name}>{this.props.label}</label>}
                {(this.props.readOnly) ?
                    this.props.value :
                    <input className={InputSimpleClassName}
                           id={this.props.name}
                           type={this.props.type}
                           autoFocus={this.props.autoFocus}
                           disabled={!!this.props.disabled}
                           placeholder={this.props.placeholder}
                           onChange={this.change}
                           onKeyUp={this.onKeyUp}
                           value={this.props.value}
                           onFocus={this.focusOn.bind(this)}
                           onBlur={this.focusOff}
                           readOnly={!!this.props.readOnly}
                           ref={(input) => {this.input = input;}}
                    />
                }


            </div>
        );
    };
}