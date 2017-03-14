/* @flow */
import * as React from "react";

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
    onChange: ( o: OnChangeReturnObject ) => void;
    disabled: boolean;
    placeholder: string;
    name: string;
    list: Array<ListObject>;
    selected: Selected;
    label: string;
    uniqueKey: string;
    labelKey: string;
    listItemRender: ( obj: Object, i: number, list: Array<any> ) => any;
    inputRender: ( obj: Object ) => any;
    noResultsText: ?string;
    onKeyDown: ( e: KeyboardEvent, value: string ) => void;
    tabIndex: ?number;
    addControls:()=>Array<any>;
}

export class SelectAsync extends React.Component {

    props: SelectProps;
    input: Element;

    state: {
        stateList: boolean;
    };

    closeList: () => void;

    constructor( props: SelectProps ) {
        super( props );
        this.closeList = this.closeList.bind( this );


        this.state = {
            stateList:   false,
            list:        [],
            pointSelect: -1
        };
    }

    _createReturnObject( name: string, value: Selected ): ReturnObject {
        let object: Object = {};
        object[ name ]     = value;
        return object
    }


    selectItem( item: ListObject ) {
        //console.log("Select selectItem", item);
        this.setState( { stateList: false } );


        //let newSelected: Selected = item.key;


        let c: OnChangeReturnObject = this._createReturnObject( this.props.name, item );
        this.props.onChange && this.props.onChange( c );
    };

    onClickHandler() {
        this.searchInput.focus()
    }


    renderControls(){
        return this.props.addControls().map(item=>{
            return <div className="reactParts__select-addControls-item" onClick={item.onClickHandler && item.onClickHandler.bind(this, item.name)} key={Math.random()}>{item.title}</div>
        })
    }

    openList() {
        if ( this.state.stateList ) return;
        if ( this.props.disabled ) return;


        this.props.list().then( res => {
            console.log("SelectAsync res", res);
            this.setState( { list: res } )
        } );

        this.setState( { stateList: true } );

    };


    closeList() {

        if ( this.searchInput ) this.searchInput.value = "";
        this.searchInput.blur();
        this.setState( { stateList: false } );
    };

    cancelSelected() {
        let newSelected             = null;
        let c: OnChangeReturnObject = this._createReturnObject( this.props.name, newSelected );
        this.props.onChange && this.props.onChange( c );
    };

    renderList() {
        let list          = this.state.list;

        let newList = list.map( ( selItem, i, list ) => {
            return <li key={selItem[ this.props.uniqueKey ]}
                       className={"reactParts__select-list-item" + (( selItem[ this.props.uniqueKey ] === (this.props.selected && this.props.selected[ this.props.uniqueKey ] )) ? " selected" : "")
                       + ((i === this.state.pointSelect) ? " pointed" : "")
                       }
                       onMouseDown={this.selectItem.bind( this, selItem )}>
                {(this.props.listItemRender) ? this.props.listItemRender( selItem, i, list ) : selItem[ this.props.labelKey ]}
            </li>
        } );
        return (newList.length !== 0) ? newList :
            <li className="reactParts__select-list-item empty" key="empty">{this.props.noResultsText}</li>
    }


    setNewPosition( key: string ) {
        let currentPosition: number = this.state.pointSelect;
        let newPosition: number     = -1;

        if ( key === 'ArrowDown' ) {
            if ( currentPosition === this.state.list.length - 1 ) {
                newPosition = 0;
            } else {
                newPosition = currentPosition + 1;
            }
        }
        if ( key === 'ArrowUp' ) {
            if ( currentPosition === 0 || currentPosition === -1 ) {
                newPosition = this.state.list.length - 1;
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
        this.setState( { pointSelect: newPosition } )
    }

    onKeyDown( e: KeyboardEvent ) {
        if ( this.props.onKeyDown ) this.props.onKeyDown( e, this.searchInput.value );
        switch ( e.key ) {
            case 'ArrowDown':
            case 'ArrowUp':
                this.setNewPosition( e.key );
                break;
            case 'Enter':
                if ( this.state.pointSelect !== -1 ) {
                    let item               = this.state.list[ this.state.pointSelect ];
                    this.state.pointSelect = -1;
                    this.selectItem( item );

                }
                this.closeList();
                break;
            case 'Escape':
                this.closeList();
                break;
            default:
        }
    }


    onInputBlur() {

        this.closeList()
    }

    onInputFocus( e: Event ) {
        if ( this.state.stateList ) return
        this.openList()
    }

    renderInput() {
        let selItem = this.props.selected;

        let input = <input ref={( input ) => {this.searchInput = input;}}
                           tabIndex={this.props.tabIndex}
                           onKeyDown={this.onKeyDown.bind( this )}
                           onBlur={this.onInputBlur.bind( this )}
                           onFocus={this.onInputFocus.bind( this )}
                           className="reactParts__select-input" onChange={this.onChangeInputSearch.bind( this )}/>;

        return <div
            className="reactParts__select-selected">{
            (this.searchInput && this.searchInput.value)
                ? null
                : (
                (this.props.inputRender)
                    ? this.props.inputRender( selItem )
                    : (selItem && selItem[ this.props.labelKey ])
            ) }
            {input}
            {/*{(this.state.stateList) ? input : null}*/}
        </div>
    }

    onChangeInputSearch( e ) {
        //console.log( "Select onChangeInputSearch", this.searchInput.value );
        this.props.list( this.searchInput.value ).then( res => {
            //console.log( "Select onChangeInputSearch", res );
            this.setState( { list: res } )
        } )

    }


    render() {


        let selectClassName = 'reactParts__select';
        if ( this.state.stateList ) {
            selectClassName += ' focus';
        }
        let placeholder, list, cancel, addControls;

        if (this.props.addControls && (this.props.addControls().length> 0) ){
            addControls = <div key="addControls" className="reactParts__select-addControls">{this.renderControls()}</div>;
        }


        if ( !this.props.selected && (!this.searchInput || (this.searchInput && this.searchInput.value.length === 0 )) ) {
            placeholder = <div className="reactParts__select-placeholder">{this.props.placeholder}</div>
        }

        if ( this.props.selected ) {
            cancel = this.props.cancel &&
                <svg onClick={this.cancelSelected.bind( this )} width="18" height="18" viewBox="0 0 24 24"
                     className="icon reactParts__select__cancel">
                    <path
                        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
                    </path>
                </svg>;
        }
        if ( this.state.stateList ) {
            list = <ul ref={( ul ) => {this.ul = ul}} className="reactParts__select-list">{this.renderList()}</ul>;
        }

        return (
            <div ref={( input ) => {this.input = input;}} className="reactParts__select-wrap">
                {addControls}
                {this.props.label &&
                <label className="reactParts__label" htmlFor={this.props.name}>{this.props.label}</label>}
                {(this.props.readOnly) ?
                    <div className="reactParts__select-selected">{this.props.selected[ this.props.labelKey ]}</div> :
                    <div className={selectClassName} onClick={this.onClickHandler.bind( this )}>
                        {placeholder}
                        {this.renderInput()}
                        {cancel}

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

SelectAsync.propTypes = {
    readOnly:       React.PropTypes.bool,
    cancel:         React.PropTypes.bool,
    onChange:       React.PropTypes.func,
    disabled:       React.PropTypes.bool,
    placeholder:    React.PropTypes.string,
    name:           React.PropTypes.string,
    list:           React.PropTypes.func.isRequired,
    selected:       React.PropTypes.object,
    label:          React.PropTypes.string,
    uniqueKey:      React.PropTypes.string,
    labelKey:       React.PropTypes.string,
    listItemRender: React.PropTypes.func,
    inputRender:    React.PropTypes.func,
    noResultsText:  React.PropTypes.string,
    onKeyDown:      React.PropTypes.func,
    tabIndex:       React.PropTypes.number,
    addControls:    React.PropTypes.func,
}

SelectAsync.defaultProps = {
    readOnly:       false,
    cancel:         true,
    onChange:       null,
    disabled:       false,
    placeholder:    "",
    name:           null,
    list:           null,
    selected:       null,
    label:          null,
    uniqueKey:      "id",
    labelKey:       "value",
    listItemRender: null,
    inputRender:    null,
    noResultsText:  "Nothing to show",
    onKeyDown:      null,
    addControls:    null,
}