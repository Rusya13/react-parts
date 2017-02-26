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
        let newSelected;
        if ( !this.props.multiSelect ) {
            newSelected = item.key;
            this.setState( { stateList: false } )
        } else {

            newSelected = this.props.selected.slice();
            newSelected.push( item.key );
        }
        let c                = {};
        c[ this.props.name ] = newSelected;
        this.props.onChange && this.props.onChange( c );
    };

    removeItem( item ) {
        //console.log("Select removeItem", item, this.props.selected);
        let newSelected      = this.props.selected.filter( selItem => selItem !== item );
        let c                = {};
        c[ this.props.name ] = newSelected;
        this.props.onChange && this.props.onChange( c );

    };

    onGlobalClick( e ) {
        console.log( "Select onGlobalClick", e );
        if ( this.state.stateList ) {
            this.closeList();
        }
    };

    toggleList( event ) {
        console.log( "Select toggleList" );
        document.addEventListener("click", this.closeList, false);
        if ( this.props.disabled ) return;
        if ( event.target.classList.contains( "break" ) || event.target.parentNode.classList.contains( "break" ) ) return;

        this.setState( { stateList: !this.state.stateList } );

    };

    closeList() {
        console.log("Select closeList");

        this.setState( { stateList: false } );
        document.removeEventListener( "click", this.closeList, false);
    };

    cancelSelected() {
        let newSelected = null;
        if ( this.props.multiSelect ) {
            newSelected = [];
        }

        let c                = {};
        c[ this.props.name ] = newSelected;
        this.props.onChange && this.props.onChange( c );
    };

    renderList() {
        let list = this.props.list;

        let newList = [];
        if ( this.props.multiSelect ) {

            list.forEach( item => {
                let check = this.props.selected.some( i => {
                    return i === item.key
                } );

                if ( !check ) {
                    newList.push(
                        <li key={item.key}
                            className="reactParts__select-list-item"
                            onClick={this.selectItem.bind( this, item )}>
                            {item.value}
                        </li> )
                }
            } )
        } else {
            newList = list.map( selItem => {
                console.log( "Select ", selItem, this.props.selected );
                if ( selItem.key === this.props.selected ) {
                    return <li key={selItem.key}
                               className="reactParts__select-list-item selected"
                               onClick={this.selectItem.bind( this, selItem )}>
                        {selItem.value}
                    </li>
                } else {
                    return <li key={selItem.key}
                               className="reactParts__select-list-item"
                               onClick={this.selectItem.bind( this, selItem )}>
                        {selItem.value}
                    </li>
                }
            } )
        }
        return (newList.length !== 0) ? newList :
            <li className="reactParts__select-list-item empty" key="empty"> Empty list</li>
    }

    renderItems() {

        if ( this.props.multiSelect ) {
            //console.log("Select renderItems this.props.multiSelect", this.props.multiSelect);
            if ( this.props.selected.length === 0 ) {
                return null
            }
            return this.props.selected.map( ( selKey, i ) => {

                let selItem = this.props.list.filter( ij => ij.key === selKey )[ 0 ];
                return (
                    <div className="reactParts__select-box-item" key={i}>
                        {selItem.value} <Icon name="remove_circle" size={16}
                                              className="control-select-box__item-remove break"
                                              onClick={this.removeItem.bind( this, selKey )}/>
                    </div>
                )
            } );
        } else {

            if ( !this.props.selected ) {
                return null
            }
            let selItem = this.props.list.filter( i => i.key === this.props.selected )[ 0 ];

            return <div className="reactParts__select-selected">{selItem.value}</div>
        }
    }

    render() {
        let selectClassName = (this.props.multiSelect) ? 'reactParts__select multi' : 'reactParts__select';
        let arrowIconName   = 'keyboard_arrow_down';
        if ( this.props.disabled ) {
            selectClassName += " disabled";
        }
        let placeholder, list, cancel;

        if ( !this.props.selected ||
            (this.props.multiSelect &&
            this.props.selected.length === 0 ) ) {
            placeholder = <div className="reactParts__select-placeholder">{this.props.placeholder}</div>
        } else {
            cancel = this.props.cancel && <Icon name="cancel" className="reactParts__select__cancel" size={18}
                                                onClick={this.cancelSelected}/>;
        }
        if ( this.state.stateList ) {
            list          = <ul className="reactParts__select-list">{this.renderList()}</ul>;
            arrowIconName = 'keyboard_arrow_up';
        }

        return (
            <div className="reactParts__select-wrap">
                {this.props.label &&
                <label className="reactParts__label" htmlFor={this.props.name}>{this.props.label}</label>}
                <div className={selectClassName} onClick={this.toggleList}>
                    {placeholder} {this.renderItems()} {cancel} <Icon name={arrowIconName}
                                                                      className="reactParts__select__arrow"
                                                                      size={24}/>
                </div>
                {list}
            </div>
        )
    };
}

Select.propTypes = {
    cancel:      React.PropTypes.bool,
    onChange:    React.PropTypes.func,
    disabled:    React.PropTypes.any,
    placeholder: React.PropTypes.string,
    name:        React.PropTypes.string,
    multiSelect: React.PropTypes.bool,
    list:        React.PropTypes.oneOfType( [ React.PropTypes.array, React.PropTypes.object ] ),
    selected:    React.PropTypes.oneOfType( [ React.PropTypes.array, React.PropTypes.string, React.PropTypes.number ] )
};

Select.defaultProps = {
    multiSelect: false,
    stateList:   false,
    placeholder: 'Выберите из списка',
    cancel:      true,
    selected:    []
};