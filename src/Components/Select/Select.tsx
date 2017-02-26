import * as React from "react";
import {Icon} from "../Icon/Icon";

//TODO close list on global click
//TODO remove Icon dependency


export interface ReturnObject {
    [key: string]: Selected | null;
}

export type OnChangeReturnObject = ReturnObject | number | string;

export interface ListObject {
    value: string | number;
    key: string;
}

export type Selected = Array<string | number> | string | number;


export class SelectProps {

    readOnly?: boolean;
    cancel?: boolean = true;
    onChange: (o:OnChangeReturnObject) => void;
    disabled?: boolean;
    placeholder?: string= 'Выберите из списка';
    name: string;
    multiSelect: boolean;
    list: Array<ListObject>;
    selected?: Selected;
    label?: string;

}

export interface SelectState {
    stateList: boolean
}


export class Select extends React.Component<SelectProps,SelectState> {

    constructor(props: SelectProps) {
        super(props);
        this.selectItem = this.selectItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.onGlobalClick = this.onGlobalClick.bind(this);
        this.toggleList = this.toggleList.bind(this);
        this.closeList = this.closeList.bind(this);
        this.cancelSelected = this.cancelSelected.bind(this);

        this.state = {
            stateList:false
        };
    }

    selectItem(item: ListObject) {
        let newSelected:Selected;
        newSelected = item.key;
        if (this.props.multiSelect) {
            if (this.props.selected instanceof Array) {
                newSelected = this.props.selected.slice();
                newSelected.push(item.key);
            }
        }
        let c: OnChangeReturnObject = {};
        c[this.props.name] = newSelected;
        this.props.onChange && this.props.onChange(c);
    };

    removeItem(item:Selected) {
        //console.log("Select removeItem", item, this.props.selected);
        if (this.props.selected instanceof Array){
            let newSelected = this.props.selected.filter(selItem => selItem !== item);
            let c:OnChangeReturnObject = {};
            c[this.props.name] = newSelected;
            this.props.onChange && this.props.onChange(c);
        }


    };

    onGlobalClick(e:React.SyntheticEvent<any>) {
        console.log("Select onGlobalClick", e);
        if (this.state.stateList) {
            this.closeList();
        }
    };

    toggleList(event:React.SyntheticEvent<HTMLDivElement>) {
        console.log("Select toggleList");
        document.addEventListener("click", this.closeList, false);
        if (this.props.disabled) return;
        // if (event.target.classList.contains("break") || event.target.parentNode.classList.contains("break")) return;

        this.setState({stateList: !this.state.stateList});

    };

    closeList() {
        console.log("Select closeList");
        this.setState({stateList: false});
        document.removeEventListener("click", this.closeList, false);
    };

    cancelSelected() {
        let newSelected = null;
        if (this.props.multiSelect) {
            newSelected = [];
        }

        let c:OnChangeReturnObject = {};
        c[this.props.name] = newSelected;
        this.props.onChange && this.props.onChange(c);
    };

    renderList() {
        let list:Array<ListObject> = this.props.list;

        let newList:Array<JSX.Element> = [];
        if (this.props.multiSelect) {

            list.forEach(item => {
                if (this.props.selected instanceof Array){
                    let check = this.props.selected.some(i => {
                        return i === item.key
                    });

                    if (!check) {
                        newList.push(
                            <li key={item.key}
                                className="reactParts__select-list-item"
                                onClick={this.selectItem.bind(this, item)}>
                                {item.value}
                            </li> )
                    }
                }

            })
        } else {
            newList = list.map(selItem => {
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
            })
        }
        return (newList.length !== 0) ? newList :
            <li className="reactParts__select-list-item empty" key="empty"> Empty list</li>
    }

    renderItems() {

        if (this.props.multiSelect && this.props.selected instanceof Array) {
            //console.log("Select renderItems this.props.multiSelect", this.props.multiSelect);

            if (this.props.selected.length === 0) {
                return null
            }
            return this.props.selected.map((selKey, i) => {

                let selItem = this.props.list.filter(ij => ij.key === selKey)[0];
                return (
                    <div className="reactParts__select-box-item" key={i}>
                        {selItem.value} <Icon name="remove_circle" width={16}
                                              height={16}
                                              className="control-select-box__item-remove break"
                                              onClick={this.removeItem.bind(this, selKey)}/>
                    </div>
                )
            });
        } else {

            if (!this.props.selected) {
                return null
            }
            let selItem = this.props.list.filter(i => i.key === this.props.selected)[0];

            return <div className="reactParts__select-selected">{selItem.value}</div>
        }
    }

    render() {
        let selectClassName = (this.props.multiSelect) ? 'reactParts__select multi' : 'reactParts__select';
        let arrowIconName = 'keyboard_arrow_down';
        if (this.props.readOnly) {
            selectClassName += " disabled";
        }
        let placeholder, list, cancel;

        if (!this.props.selected ||
            (this.props.multiSelect &&
            this.props.selected instanceof Array &&
            this.props.selected.length === 0 )) {
            placeholder = <div className="reactParts__select-placeholder">{this.props.placeholder}</div>
        } else {
            cancel = this.props.cancel && <Icon name="cancel" className="reactParts__select__cancel" width={18}
                                                height={18}
                                                onClick={this.cancelSelected}/>;
        }
        if (this.state.stateList) {
            list = <ul className="reactParts__select-list">{this.renderList()}</ul>;
            arrowIconName = 'keyboard_arrow_up';
        }

        return (
            <div className="reactParts__select-wrap">
                {this.props.label &&
                <label className="reactParts__label" htmlFor={this.props.name}>{this.props.label}</label>}
                {(this.props.readOnly) ?
                    <div className={selectClassName}>{this.renderItems()}</div>:
                    <div className={selectClassName} onClick={this.toggleList}>
                        {placeholder} {this.renderItems()} {cancel} <Icon name={arrowIconName}
                                                                          className="reactParts__select__arrow"
                                                                          width={24}
                                                                          height={24}/>
                    </div>
                }
                {list}
            </div>
        )
    };
}