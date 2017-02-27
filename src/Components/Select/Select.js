/* @flow */
import * as React from "react";


//TODO close list on global click
//TODO remove Icon dependency


interface ReturnObject {
    [key: string]: Selected | null;
}

type OnChangeReturnObject = ReturnObject | number | string;

interface ListObject {
    value: string | number;
    key: string;
}

type Selected = string | number | null;


class SelectProps {
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

export class Select extends React.Component {

    props: SelectProps;
    input:Element;

    state:{
        stateList: boolean;
    };

    closeList: ()=> void;

    constructor(props: SelectProps) {
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
        let newSelected:Selected;
        newSelected = item.key;
        let c: OnChangeReturnObject = this._createReturnObject(this.props.name, newSelected);
        this.props.onChange && this.props.onChange(c);
    };

    onGlobalClick(e:any) {
        console.log("Select onGlobalClick", e);
        if (this.state.stateList) {
            this.closeList();
        }
    };

    toggleList(event:any) {
        console.log("Select toggleList");

        if (this.props.disabled) return;
         //if (event.target.classList.contains("break") || event.target.parentNode.classList.contains("break")) return;

        this.setState({stateList: true});
        document.addEventListener("click", this.closeList);
    };

    closeList() {
        console.log("Select closeList");
        document.removeEventListener("click", this.closeList);
        this.setState({stateList: false});
        console.log("Select closeList2");
    };

    cancelSelected() {
        let newSelected = null;
        let c:OnChangeReturnObject = this._createReturnObject(this.props.name, newSelected);
        this.props.onChange && this.props.onChange(c);
    };

    renderList() {
        let list:Array<ListObject> = this.props.list;

        let newList:Array<any> = list.map(selItem => {
            console.log("Select ", selItem, this.props.selected);
            if (selItem.key === this.props.selected) {
                return <li key={selItem.key}
                           className="reactParts__select-list-item selected"
                           onClick={this.selectItem.bind(this, selItem)}>
                    {selItem.value}
                </li>
            } else {
                return <li key={selItem.key}
                           className="reactParts__select-list-item"
                           onClick={this.selectItem.bind(this, selItem)}>
                    {selItem.value}
                </li>
            }
        });

        return (newList.length !== 0) ? newList :
            <li className="reactParts__select-list-item empty" key="empty"> Empty list</li>
    }

    renderItems() {
        if (!this.props.selected) {
            return null
        }
        let selItem = this.props.list.filter(i => i.key === this.props.selected)[0];
        return <div className="reactParts__select-selected">{selItem.value}</div>

    }

    render() {
        let selectClassName = 'reactParts__select';
        if (this.props.readOnly) {
            selectClassName += " disabled";
        }
        let placeholder, list, cancel;

        if (!this.props.selected) {
            placeholder = <div className="reactParts__select-placeholder">{this.props.placeholder}</div>
        } else {
            cancel = this.props.cancel &&
                <svg onClick={this.cancelSelected.bind(this)} width="18" height="18" viewBox="0 0 24 24" className="icon reactParts__select__cancel">
                    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
                    </path>
                </svg>;
        }
        if (this.state.stateList) {
            list = <ul className="reactParts__select-list">{this.renderList()}</ul>;
        }

        return (
            <div ref={(input)=>{this.input = input;}} className="reactParts__select-wrap">
                {this.props.label &&
                <label className="reactParts__label" htmlFor={this.props.name}>{this.props.label}</label>}
                {(this.props.readOnly) ?
                    <div className={selectClassName}>{this.renderItems()}</div>:
                    <div className={selectClassName} onClick={this.toggleList.bind(this)}>
                        {placeholder} {this.renderItems()} {cancel}
                        <svg width="24" height="24" viewBox="0 0 24 24" className="icon reactParts__select__arrow">
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