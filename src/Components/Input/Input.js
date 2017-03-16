/* @flow */


// TODO add Cancel input


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

interface InputProps {
    addControls: () => Array<any>;
    suggest: (value:string | number) => Promise<any>;
    onChange: ?(o: OnChangeReturnObject) => void;
    onKeyUp: (e:any) => void;
    onKeyDown: (e:any) => void;
    onFocus: () => void;
    onBlur: () => void;
    keypress: () => void;
    name: string;
    placeholder: string;
    autoFocus: boolean ;
    readOnly: boolean ;
    disabled: boolean ;
    type: string;
    valid: boolean;
    limit: number;
    className: string;
    value: InputValue;
    castTo: string;
    label: string;
    autocomplete:boolean;
    tabIndex:?number;
    cancel:?boolean;
    prefix:?string;
}







export class Input extends React.Component {

    input:HTMLInputElement;
    props: InputProps;
    _OnGlobalClickHandler:()=>void;
    state:{
        isSuggestOpen: boolean,
        pointSelect:number,
        suggest:Array<any>
    };
    constructor(props: InputProps) {
        super(props);
        this._OnGlobalClickHandler = this._OnGlobalClickHandler.bind(this);
        this.state = {
            suggest: [],
            isSuggestOpen: false,
            pointSelect:-1
        };
    }

    componentDidMount(){
        if (this.props.suggest){
            document.addEventListener("click", this._OnGlobalClickHandler);
        }

    }


    componentWillUnmount(){
        if (this.props.suggest){
            document.removeEventListener("click", this._OnGlobalClickHandler);
        }
    }

    onKeyUp(e:any) {
        if (this.props.onKeyUp) this.props.onKeyUp(e);
    };

    setNewPosition(key:string){
        let currentPosition:number = this.state.pointSelect;
        let newPosition:number = -1;
        if (key === 'ArrowDown'){
            //console.log("Input setNewPosition down");
            if (currentPosition === this.state.suggest.length-1){
                newPosition = 0;
            } else {
                newPosition = currentPosition + 1;
            }
        }
        if (key === 'ArrowUp'){
            //console.log("Input setNewPosition up");
            if ( currentPosition === 0 || currentPosition === -1 ){
                newPosition = this.state.suggest.length-1;
            } else {
                newPosition = currentPosition - 1;
            }
        }

        let ul: Element = this.ul;
        let pointed;
        if ( ul.children && ul.children.length > 0 ) {
            pointed = ul.children[ newPosition ];
            if ( pointed.offsetTop >= (ul.offsetHeight + ul.scrollTop) ) {
                ul.scrollTop = pointed.offsetTop - ul.offsetHeight + pointed.offsetHeight
            }
            if ( pointed.offsetTop <= ul.scrollTop ) {
                ul.scrollTop = pointed.offsetTop;
            }
        }


        this.setState({pointSelect:newPosition})
    }

    onKeyDown(e:any){
        //let startPos = this.input.selectionStart;

        //console.log("Input onKeyDown", startPos);
        let suggest = this.state.suggest;
        if (e.key==='ArrowDown'
            && !this.state.isSuggestOpen
            && suggest
            && suggest.length >0){
            this.setState({isSuggestOpen:true});
        }
        if (this.state.isSuggestOpen){
            switch(e.key){
                case 'ArrowDown':
                case 'ArrowUp':
                    //this.input.selectionStart = startPos;
                    this.setNewPosition(e.key);
                    break;
                case 'Enter':
                    let item = this.state.suggest[this.state.pointSelect];
                    this.state.pointSelect = -1;
                    this.selectFromSuggestions(item);
                    break;
                case 'Escape':
                    this.setState({isSuggestOpen:false});
                    break;
                default:

            }
        }

        this.props.onKeyDown && this.props.onKeyDown(e);
    }

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
        if (this.props.suggest) this.updateSuggest(value)
    };

    updateSuggest(value:string | number){
        this.props.suggest(value).then(res=>{
            if (res){
                this.setState({suggest:res})
            }

        })
    }




    focusOn(e:any) {
        if (this.props.suggest && this.props.suggest(this.input && this.input.value || "")){
            if (this.input){
                this.setState({isSuggestOpen:true});
            }
        }
        if (this.props.onFocus) this.props.onFocus();
    };

    focusOff(e:any) {
        if (this.props.onBlur) this.props.onBlur();
    };

    _OnGlobalClickHandler(e:any){
        let target = e.target;
        if(this.state.isSuggestOpen){
            if(this.input !== target) this.setState({isSuggestOpen:false});
        }
    }

     selectFromSuggestions(item:ListObject){

        console.log("select", item);
        let obj: OnChangeReturnObject;
        let name = this.props.name;

        if (name) {
            obj = this._createReturnObject(name, item.value)
        } else {
            obj = item.value;
        }
        if (this.props.onChange) this.props.onChange(obj);
         //this.input.focus();
        this.setState({isSuggestOpen:false});
        this.updateSuggest(item.value)
         //this.input.blur();
    }

    renderSuggestionsList(){
        let suggest = this.state.suggest;
        let className="reactParts__input-suggest-list-item";
        //console.log("Input renderSuggestionsList", suggest);

        if (suggest instanceof Array !== true) return null;
        let list:Array<any> = suggest.map((item:ListObject, i:number)=>{
            return   <li
                key={i}
                onClick={this.selectFromSuggestions.bind(this, item)}
                className={className + ((i === this.state.pointSelect)?" selected":"")}
            >
                {item.value}
            </li>
        });

        return list;
    }

    renderControls(){
        return this.props.addControls().map(item=>{
            return <div className="reactParts__input-addControls-item" onClick={item.onClickHandler && item.onClickHandler.bind(this, item.name)} key={Math.random()}>{item.title}</div>
        })
    }
    cancelSelected() {
        let newSelected             = "";
        this.state.suggest = [];
        let c: OnChangeReturnObject = this._createReturnObject( this.props.name, newSelected );
        this.props.onChange && this.props.onChange( c );
    };

    render() {
        let InputSimpleClassName = "reactParts__input";
        if (this.props.cancel) InputSimpleClassName += " cancel";

        let valid = this.props.valid;

        //console.log("Input render", this.props.type);
        if (valid !== undefined && valid !== null) {
            if (valid) {
                InputSimpleClassName += " valid"
            } else {
                InputSimpleClassName += " invalid"
            }
        }
        let cancel = this.props.cancel &&
            <svg onClick={this.cancelSelected.bind( this )} width="18" height="18" viewBox="0 0 24 24"
                 className="icon reactParts__input__cancel" key="cancel">
                <path
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
                </path>
            </svg>;

        if (this.props.className) InputSimpleClassName += ` ${this.props.className}`;
        if (this.props.prefix) InputSimpleClassName += ` prefix`;
        return (
            <div className={"reactParts__input-wrap"+((this.props.prefix)?" prefix":"")}>

                {this.props.label &&
                <label className="reactParts__label" htmlFor={this.props.name}>{this.props.label}</label>}
                {(this.props.readOnly) ?
                    this.props.value :
                    [
                        (this.props.prefix)?<div className="reactParts__input-prefix">{this.props.prefix}</div>:null,
                        <input className={InputSimpleClassName}
                           key="input"
                           autoComplete={(this.props.suggest)?"off":(this.props.autocomplete)?"on":"off"}
                           id={this.props.name}
                           type={this.props.type}
                           autoFocus={this.props.autoFocus}
                           disabled={this.props.disabled}
                           placeholder={this.props.placeholder}
                           onChange={this.onChangeHandler.bind(this)}
                           onKeyUp={this.onKeyUp.bind(this)}
                           onKeyDown={this.onKeyDown.bind(this)}
                           value={this.props.value}
                           onFocus={this.focusOn.bind(this)}
                           onBlur={this.focusOff.bind(this)}
                           ref={(input) => {this.input = input;}}
                           tabIndex={this.props.tabIndex}
                        />,
                        cancel,
                        this.props.addControls && (this.props.addControls().length> 0) &&
                            <div key="addControls" className="reactParts__input-addControls">{this.renderControls()}</div>,
                        this.state.isSuggestOpen && (this.state.suggest.length>0) && <ul ref={( ul ) => {this.ul = ul}} key="suggest" className="reactParts__input-suggest-list">
                            {this.renderSuggestionsList()}
                        </ul>
                    ]

                }
            </div>
        );
    };
}

Input.defaultProps={
    type:"string"

};

Input.propTypes = {
    addControls: React.PropTypes.func,
    suggest: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onKeyUp: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
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
    autocomplete:React.PropTypes.bool,
    tabIndex:React.PropTypes.number,
    cancel: React.PropTypes.bool,
    prefix:React.PropTypes.string
};

