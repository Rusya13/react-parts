/* @flow */
import React from "react";


//TODO close list on global click
//TODO remove Icon dependency


interface ReturnObject {
    [key: string]: Selected;
}

type OnChangeReturnObject = ReturnObject | number | string;

interface ListObject {
    value: string | number;
    key: string;
}

type Selected = Array<string | number>;


class MultiSelectProps {

    readOnly: boolean;
    cancel: boolean;
    onChange: (o:OnChangeReturnObject) => void;
    disabled: boolean;
    placeholder: string;
    name: string;
    list: Array<ListObject>;
    selected: Selected;
    label: string;
}

export class MultiSelect extends React.Component {

    props: MultiSelectProps;
    closeList: ()=> void;
    state:{
        stateList: boolean;
    };

    constructor(props: MultiSelectProps) {
        super(props);
        this.closeList = this.closeList.bind(this);
        this.state = {
            stateList:false
        };
    }

    _createReturnObject(name:string, value:Selected) : ReturnObject{
        let object:Object = {};
        object[name] = value;
        return object
    }


    selectItem(item: ListObject) {

        if (this.props.selected instanceof Array) {
            let newSelected:Selected =this.props.selected.slice();
            newSelected.push(item.key);
            let c: OnChangeReturnObject = this._createReturnObject(this.props.name, newSelected);
            this.props.onChange && this.props.onChange(c);
        }
    };

    removeItem(item:string | number) {
        //console.log("Select removeItem", item, this.props.selected);
        if (this.props.selected instanceof Array){
            let newSelected = this.props.selected.filter(selItem => selItem !== item);
            let c:OnChangeReturnObject = this._createReturnObject(this.props.name, newSelected);
            this.props.onChange && this.props.onChange(c);
        }

    };

    onGlobalClick(e:any) {
        console.log("Select onGlobalClick", e);
        if (this.state.stateList) {
            this.closeList();
        }
    };

    toggleList(event:any) {
        console.log("Select toggleList");
        if (event.target.classList.contains("break") || event.target.parentNode.classList.contains("break")) return;
        if (this.props.disabled) return;

        document.addEventListener("click", this.closeList, false);
        this.setState({stateList: !this.state.stateList});

    };

    closeList(event:any) {
        console.log("MultiSelect closeList", event.target);
        if (event.target.classList && event.target.classList.contains("break") || event.target.parentNode.classList && event.target.parentNode.classList.contains("break")) return;
        console.log("Select closeList");
        this.setState({stateList: false});
        document.removeEventListener("click", this.closeList, false);
    };

    cancelSelected() {
        let newSelected = [];
        let c:OnChangeReturnObject = this._createReturnObject(this.props.name, newSelected);
        this.props.onChange && this.props.onChange(c);
    };

    renderList() {
        let list:Array<ListObject> = this.props.list;
        let newList:Array<any> = [];
        list.forEach(item => {
            if (this.props.selected instanceof Array){
                let check = this.props.selected.some(i => {
                    return i === item.key
                });

                if (!check) {
                    newList.push(
                        <li key={item.key}
                            className="reactParts__multi-select-list-item break"
                            onClick={this.selectItem.bind(this, item)}>
                            {item.value}
                        </li> )
                }
            }
        });

        return (newList.length !== 0) ? newList :
            <li className="reactParts__multi-select-list-item empty" key="empty"> Empty list</li>
    }

    renderItems() {
        if (this.props.selected instanceof Array) {
            //console.log("Select renderItems this.props.multiSelect", this.props.multiSelect);

            if (this.props.selected.length === 0) {
                return null
            }
            return this.props.selected.map((selKey:string | number, i: number) => {

                let selItem = this.props.list.filter(ij => ij.key === selKey)[0];
                return (
                    <div className="reactParts__multi-select-box-item" key={i}>
                        {selItem.value}
                        <svg onClick={this.removeItem.bind(this, selKey)} width="16" height="16" viewBox="0 0 24 24" className="reactParts__multi-select-box-item-remove break">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z">
                            </path>
                        </svg>
                    </div>
                )
            });
        }
    }

    render() {
        let selectClassName = 'reactParts__multi-select';
        let arrowIconName = 'keyboard_arrow_down';
        if (this.props.readOnly) {
            selectClassName += " disabled";
        }
        let placeholder, list, cancel;

        if (!this.props.selected ||
            (this.props.selected instanceof Array &&
            this.props.selected.length === 0 )) {
            placeholder = <div className="reactParts__multi-select-placeholder">{this.props.placeholder}</div>
        } else {
            cancel = this.props.cancel &&
                <svg onClick={this.cancelSelected.bind(this)} width="18" height="18" viewBox="0 0 24 24" className="reactParts__multi-select__cancel">
                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
                    </path>
                </svg>;
        }
        if (this.state.stateList) {
            list = <ul className="reactParts__multi-select-list">{this.renderList()}</ul>;
        }

        return (
            <div className="reactParts__multi-select-wrap">
                {this.props.label &&
                <label className="reactParts__multi-select-label" htmlFor={this.props.name}>{this.props.label}</label>}
                {(this.props.readOnly) ?
                    <div className={selectClassName}>{this.renderItems()}</div>:
                    <div className={selectClassName} onClick={this.toggleList.bind(this)}>
                        {placeholder} {this.renderItems()} {cancel}
                        <svg width="24" height="24" viewBox="0 0 24 24" className="icon reactParts__multi-select__arrow">
                            <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z">
                            </path>
                        </svg>
                    </div>
                }
                {list}
            </div>
        )
    };
}