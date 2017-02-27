/* @flow */

import  React from "react";


export type InputValue = string | number;

interface ReturnObject {
    [key: string]: string | number;
}

interface ListObject {
    value: string | number;
    key: string;
}

type OnChangeReturnObject = ReturnObject | number | string;

 class InputProps {
    suggest: Array<ListObject>;
    onChange: (o: OnChangeReturnObject) => void;
    onKeyUp: (e:any) => void;
    onFocus: () => void;
    onBlur: () => void;
    keypress: () => void;
    name: string;
    placeholder: string;
    autoFocus: boolean ;
    readOnly: boolean ;
    disabled: boolean ;
    type: string ;
    valid: boolean;
    limit: number;
    className: string;
    value: InputValue;
    castTo: string;
    label: string;
}





interface InputState{
    isSuggestOpen:boolean;
    selected:string | number;
}


export class Input extends React.Component {

    input:HTMLInputElement;
    props: InputProps;
    state:{
        isSuggestOpen: boolean,
        selected:string | number
    };

    constructor(props: InputProps) {
        super(props);

        this.state = {
            isSuggestOpen: false,
            selected:""
        };
    }

    onKeyUp(e:any) {
        if (this.props.onKeyUp) this.props.onKeyUp(e);
    };


    _createReturnObject(name:string, value:string | number) : ReturnObject{
        let object:Object = {};
        object[name] = value;
        return object
    }

    onChangeHandler() {

        let value:string|number = this.input.value;
        if (this.props.limit && (typeof value === "string" && value.length) && this.props.limit > this.props.limit) {
            value = (typeof value === "string")?value.slice(0, this.props.limit): value;
        }
        let obj: OnChangeReturnObject;
        switch (this.props.castTo) {
            case 'number':
                value = Number(value);
                break;
        }
        let name = this.props.name;
        if (name) {
            obj = this._createReturnObject(name, value);
        } else {
            obj = value;
        }
        if (this.props.onChange) this.props.onChange(obj);
        if (this.state.selected !== value && this.props.suggest){
            this.setState({isSuggestOpen:true})
        }
    };

    focusOn(e:any) {
        console.log("focus", this.state.selected);
        if (this.props.suggest){
            if (this.input){
                this.setState({isSuggestOpen:true});
            }


        }
        if (this.props.onFocus) this.props.onFocus();
    };

    focusOff(e:any) {

        console.log("cancel focus",this.input);

        if (this.props.onBlur) this.props.onBlur();
        this.setState({selected:"", isSuggestOpen:false});

    };

     selectFromSuggestions(item:ListObject){
        this.input.focus();
        console.log("select", item);
        let obj: OnChangeReturnObject;
        let name = this.props.name;

        if (name) {
            obj = this._createReturnObject(name, item.value)
        } else {
            obj = item.value;
        }
        if (this.props.onChange) this.props.onChange(obj);
        this.setState({isSuggestOpen:false, selected:item.value});
    }

    renderSuggestionsList(suggest:Array<ListObject>){

        let list:Array<any> = suggest.map(item=>{
            return   <li key={item.key} onClick={this.selectFromSuggestions.bind(this, item)} className="reactParts__input-suggest-list-item">
                {item.value}
            </li>
        });
        list.unshift(<li key="pop" className="reactParts__input-suggest-list-system-item">
            Выберите элемент или продолжите ввод
        </li>);
        return list;
    }

    render() {
        let InputSimpleClassName = "reactParts__input";
        let valid = this.props.valid;

        console.log("Input render", this.props.suggest);
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
                    [
                        <input className={InputSimpleClassName}
                           key="input"
                           id={this.props.name}
                           type={this.props.type}
                           autoFocus={this.props.autoFocus}
                           disabled={this.props.disabled}
                           placeholder={this.props.placeholder}
                           onChange={this.onChangeHandler.bind(this)}
                           onKeyUp={this.onKeyUp.bind(this)}
                           value={this.props.value}
                           onFocus={this.focusOn.bind(this)}
                           onBlur={this.focusOff.bind(this)}
                           ref={(input) => {this.input = input;}}
                        />,
                        this.state.isSuggestOpen && this.props.suggest && <ul key="suggest" className="reactParts__input-suggest-list">
                            {this.renderSuggestionsList(this.props.suggest)}
                        </ul>
                    ]

                }
            </div>
        );
    };
}

Input.propTypes = {
    suggest: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired,
    onKeyUp: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    keypress: React.PropTypes.func,
    name: React.PropTypes.string.isRequired,
    placeholder:React.PropTypes.string,
    autoFocus: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    type: React.PropTypes.string,
    valid: React.PropTypes.bool,
    limit: React.PropTypes.number,
    className: React.PropTypes.string,
    value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    castTo: React.PropTypes.string,
    label: React.PropTypes.string,
};