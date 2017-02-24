import React from "react";
import { Icon } from "./Icon";

//TODO close list on global click
//TODO remove Icon dependency




export class Select extends React.Component {

    constructor( props ) {
        super( props );
        this.selectItem     = this.selectItem.bind( this );
        this.removeItem     = this.removeItem.bind( this );
        this.onGlobalClick  = this.onGlobalClick.bind( this );
        this.toggleList     = this.toggleList.bind( this );
        this.closeList      = this.closeList.bind( this );
        this.cancelSelected = this.cancelSelected.bind( this );

        this.state = {
            selected: [],
            list:     []
        };
    }

    selectItem( item ) {
        let newSelected = this.props.selected.slice();
        if (!this.props.multiSelect){
            if (item.key === this.props.selected[0]){

            } else {
                newSelected[0] = item.key;
            }
            this.setState({stateList:false})
        } else {
            newSelected.push(item.key);
        }
        let c={};
        c[this.props.name] = newSelected;
        this.props.onChange && this.props.onChange(c);
    };

    removeItem( item ) {
        console.log("Select removeItem", item, this.props.selected);
        let newSelected = this.props.selected.filter(selItem=>selItem !== item);
        let c ={};
        c[this.props.name] = newSelected;
        this.props.onChange && this.props.onChange(c);

    };

    onGlobalClick( e ) {
        console.log( "Select onGlobalClick", e );
        if ( this.state.stateList ) {
            this.closeList();
        }
    };

    toggleList( event ) {
        if ( this.props.disabled ) return;
        if ( event.target.classList.contains( "break" ) || event.target.parentNode.classList.contains( "break" ) ) return;

        this.setState( { stateList: !this.state.stateList } );
    };

    closeList() {
        this.setState( { stateList: false } );
    };

    cancelSelected() {
        let newSelected = [];
        let c ={};
        c[this.props.name] = newSelected;
        this.props.onChange && this.props.onChange(c);
    };

    renderList(){
        let list = this.props.list;

        let newList=[];
        if (this.props.multiSelect){
            list.forEach(item=>{
                let check = this.props.selected.some(i=>{
                    return i === item.key
                });
                console.log("Select check", check);
                if (!check){
                    newList.push(
                        <li key={item.key}
                            className="control-dropdown__item"
                            onClick={this.selectItem.bind( this, item )}>
                            {item.value}
                        </li>)
                }
            })
        } else {
            newList = list.map(selItem =>{
                console.log("Select ", selItem, this.props.selected);
                if (selItem.key === this.props.selected[0]){
                    return  <li key={selItem.key}
                                className="control-dropdown__item--selected"
                                onClick={this.selectItem.bind( this, selItem )}>
                        {selItem.value}
                    </li>
                } else {
                    return   <li key={selItem.key}
                                 className="control-dropdown__item"
                                 onClick={this.selectItem.bind( this, selItem )}>
                        {selItem.value}
                    </li>
                }
            })
        }
        return (newList.length !== 0)? newList: <li key="empty"> Empty list</li>
    }

    renderItems(){
        if (this.props.selected.length===0){
            return null
        }
        if ( this.props.multiSelect ) {
            return this.props.selected.map( ( selKey, i ) => {

                let selItem = this.props.list.filter(ij=>ij.key === selKey)[0];
                return (
                    <div className="control-select-box__item" key={i}>
                        {selItem.value} <Icon name="remove_circle" size={16}
                                              className="control-select-box__item-remove break"
                                              onClick={this.removeItem.bind( this, selKey)}/>
                    </div>
                )
            } );
        }   else {
                let selItem = this.props.list.filter(i=>i.key === this.props.selected[0])[0];
                return  <div className="control-select-box__selected">{selItem.value}</div>
        }
    }

    render() {
        let selectClassName         = 'control-select';
        let arrowIconName           = 'keyboard_arrow_down';
        let placeholder, list, cancel;

        if ( !this.props.selected || !this.props.selected.length ) {
            placeholder = <div className="control-select-box__placeholder">{this.props.placeholder}</div>
        } else {
            cancel = this.props.cancel && <Icon name="cancel" className="control-select-box__cancel break" size={18}
                                                    onClick={this.cancelSelected}/>;
        }
        if ( this.state.stateList ) {
            list          = <ul className="control-dropdown">{this.renderList()}</ul>;
            arrowIconName = 'keyboard_arrow_up';
        }

        return (
            <div className={selectClassName}>
                <div className="control-select-box" onClick={this.toggleList}>
                    {placeholder} {this.renderItems()} {cancel} <Icon name={arrowIconName} className="control-select-box__arrow"
                                                            size={24}/>
                </div>
                {list}
            </div>
        )
    };
}

Select.propTypes = {
    cancel:      React.PropTypes.bool,
    onChange:   React.PropTypes.func,
    disabled:    React.PropTypes.any,
    placeholder: React.PropTypes.string,
    name:        React.PropTypes.string,
    multiSelect: React.PropTypes.bool,
    list:        React.PropTypes.oneOfType( [ React.PropTypes.array, React.PropTypes.object ] ),
    selected:    React.PropTypes.array
};

Select.defaultProps = {
    multiSelect: false,
    stateList:   false,
    placeholder: 'Выберите из списка',
    cancel:      true,
    selected: []
};