/* @flow */
import React from "react";


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
    onChange: ( o: OnChangeReturnObject ) => void;
    disabled: boolean;
    placeholder: string;
    name: string;
    list: Array<ListObject>;
    selected: Selected;
    label: string;
    tabIndex: ?boolean;
    onKeyDown: ( e: KeyboardEvent ) => void;
    labelKey: ?string;
    uniqueKey: ?string;
    addControls:()=>Array<any>;
    listItemRender: ( obj: Object, i: number, list: Array<any> ) => any;
}

export class MultiSelect extends React.Component {

    props: MultiSelectProps;
    closeList: () => void;
    state: {
        stateList: boolean;
        pointSelect: -1
    };

    constructor( props: MultiSelectProps ) {
        super( props );
        this.closeList   = this.closeList.bind( this );
        this.clearedList = this.clearedList.bind( this );
        this.state       = {
            stateList:   false,
            list:        (Array.isArray( props.list )) ? props.list : [],
            pointSelect: -1
        };
    }

    _createReturnObject( name: string, value: Selected ): ReturnObject {
        let object: Object = {};
        object[ name ]     = value;
        return object
    }


    renderControls(){
        return this.props.addControls().map(item=>{
            return <div className="reactParts__multi-select-addControls-item" onClick={item.onClickHandler && item.onClickHandler.bind(this, item.name)} key={Math.random()}>{item.title}</div>
        })
    }

    selectItem( item: ListObject ) {

        if ( this.props.selected instanceof Array ) {
            let newSelected: Selected = this.props.selected.slice();
            newSelected.push( item );
            let c: OnChangeReturnObject = this._createReturnObject( this.props.name, newSelected );
            console.log( "MultiSelect selectItem", c );
            this.props.onChange && this.props.onChange( c );
        }
    };

    removeItem( item: Object ) {
        //console.log("Select removeItem", item, this.props.selected);
        if ( this.props.selected instanceof Array ) {
            let newSelected             = this.props.selected.filter( selItem => selItem[ this.props.uniqueKey ] !== item[ this.props.uniqueKey ] );
            let c: OnChangeReturnObject = this._createReturnObject( this.props.name, newSelected );
            this.props.onChange && this.props.onChange( c );
        }

    };

    onGlobalClick( e: any ) {
        console.log( "Select onGlobalClick", e );
        if ( this.state.stateList ) {
            this.closeList();
        }
    };

    openList( event: any ) {
        console.log( "Select openList" );
        if ( event && event.target && (event.target.classList.contains( "break" ) || event.target.parentNode.classList.contains( "break" ) ) ) return;
        if ( this.props.disabled ) return;

        //document.addEventListener( "click", this.closeList, false );
        this.setState( { stateList: !this.state.stateList } );

    };

    closeList( event: any ) {
        console.log( "MultiSelect closeList", event && event.target );
        if ( event && event.target && event.target.classList && (event.target.classList.contains( "break" ) || event.target.parentNode && event.target.parentNode.classList && event.target.parentNode.classList.contains( "break" )) ) return;
        console.log( "Select closeList" );
        this.searchInput.blur();
        this.setState( { stateList: false } );
        //document.removeEventListener( "click", this.closeList, false );
    };

    cancelSelected() {
        let newSelected             = [];
        let c: OnChangeReturnObject = this._createReturnObject( this.props.name, newSelected );
        this.props.onChange && this.props.onChange( c );
    };

    renderList() {
        let clearedList   = this.clearedList();
        let matchesFilter = new RegExp( this.searchInput.value, "i" );

        if ( Array.isArray( this.props.list ) && this.searchInput ) {
            clearedList = clearedList.filter( item => {
                return !this.searchInput.value || matchesFilter.test( item[ this.props.labelKey ] )
            } )
        }

        let newList = clearedList.map( ( listItem, index ) => {
            return (
                <li key={listItem.key}
                    className={"reactParts__multi-select-list-item break" + ((index === this.state.pointSelect) ? " pointed" : "")}
                    onMouseDown={this.selectItem.bind( this, listItem )}>
                    {(this.props.listItemRender) ? this.props.listItemRender( listItem, index, clearedList ) : listItem[ this.props.labelKey ]}
                </li>
            )
        } );

        return (newList.length !== 0) ? newList :
            <li className="reactParts__multi-select-list-item empty" key="empty"> Empty list</li>
    }

    renderItems() {
        if ( this.props.selected instanceof Array ) {
            //console.log("Select renderItems this.props.multiSelect", this.props.multiSelect);

            if ( this.props.selected.length === 0 ) {
                return null
            }
            return this.props.selected.map( ( selItem: Object, i: number ) => {
                return (
                    <div className="reactParts__multi-select-box-item" key={i}>
                        {selItem[ this.props.labelKey ]}
                        <svg onClick={this.removeItem.bind( this, selItem )} width="16" height="16" viewBox="0 0 24 24"
                             className="reactParts__multi-select-box-item-remove break">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z">
                            </path>
                        </svg>
                    </div>
                )
            } );
        }
    }

    onChangeInputSearch() {
        if ( !Array.isArray( this.props.list ) ) {
            this.props.list( this.searchInput.value ).then( res => {
                //console.log( "Select onChangeInputSearch", res );
                this.setState( { list: res } )
            } )

        } else {
            this.forceUpdate()
        }
    }


    setNewPosition( key: string ) {
        let currentPosition: number = this.state.pointSelect;
        let newPosition: number     = -1;

        if ( key === 'ArrowDown' ) {
            if ( currentPosition === this.clearedList().length - 1 ) {
                newPosition = 0;
            } else {
                newPosition = currentPosition + 1;
            }
        }
        if ( key === 'ArrowUp' ) {
            if ( currentPosition === 0 || currentPosition === -1 ) {
                newPosition = this.clearedList().length - 1;
            } else {
                newPosition = currentPosition - 1;
            }
        }
        let ul: Element = this.ul;
        //console.log("MultiSelect setNewPosition", ul);
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
                    let item               = this.clearedList()[ this.state.pointSelect ];
                    this.state.pointSelect = -1;
                    this.selectItem( item );

                }
                //this.closeList();
                break;
            case 'Escape':
                this.closeList();
                break;
            case 'Backspace':
                this.removeLastSelected();
                break;
            default:
        }
    }

    removeLastSelected() {
        if ( Array.isArray( this.props.selected ) ) {
            let newSelected = this.props.selected.slice();
            newSelected.pop();
            let c: OnChangeReturnObject = this._createReturnObject( this.props.name, newSelected );
            this.props.onChange && this.props.onChange( c );
        }
    }


    onClickHandler() {
        this.searchInput.focus()
    }

    onInputBlur() {
        this.closeList()
    }


    onInputFocus() {
        if ( this.state.stateList ) return;
        this.openList()
    }


    clearedList() {
        let list: Array<ListObject> = this.state.list;
        return list.filter( item => {
            if ( Array.isArray( this.props.selected ) ) {
                return this.props.selected.every( i => {
                    return i[ this.props.uniqueKey ] !== item[ this.props.uniqueKey ]
                } )
            } else {
                return true
            }

        } )
    }

    render() {
        let selectClassName = 'reactParts__multi-select';

        if ( this.state.stateList ) {
            selectClassName += ' focus';
        }

        let arrowIconName = 'keyboard_arrow_down';
        if ( this.props.readOnly ) {
            selectClassName += " disabled";
        }
        let placeholder, list, cancel, addControls;

        if (this.props.addControls && (this.props.addControls().length> 0) ){
            addControls = <div key="addControls" className="reactParts__multi-select-addControls">{this.renderControls()}</div>;
        }

        let input = <input ref={( input ) => {this.searchInput = input;}}
                           tabIndex={this.props.tabIndex}
                           placeholder={this.props.placeholder}
                           onKeyDown={this.onKeyDown.bind( this )}
                           onBlur={this.onInputBlur.bind( this )}
                           onFocus={this.onInputFocus.bind( this )}
                           className="reactParts__multi-select-input"
                           onChange={this.onChangeInputSearch.bind( this )}/>;

        if ( !this.props.selected ||
            (this.props.selected instanceof Array &&
            this.props.selected.length === 0 ) ) {
            //placeholder = <div className="reactParts__multi-select-placeholder">{this.props.placeholder}</div>
        } else {
            cancel = this.props.cancel &&
                <svg onClick={this.cancelSelected.bind( this )} width="18" height="18" viewBox="0 0 24 24"
                     className="reactParts__multi-select__cancel">
                    <path
                        d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z">
                    </path>
                </svg>;
        }
        if ( this.state.stateList ) {
            list =
                <ul ref={( ul ) => {this.ul = ul}} className="reactParts__multi-select-list">{this.renderList()}</ul>;
        }

        return (
            <div className="reactParts__multi-select-wrap">
                {addControls}
                {this.props.label &&
                <label className="reactParts__multi-select-label" htmlFor={this.props.name}>{this.props.label}</label>}
                {(this.props.readOnly) ?
                    <div className={selectClassName}>{this.renderItems()}</div> :
                    <div className={selectClassName} onClick={this.onClickHandler.bind( this )}>

                        {this.renderItems()}
                        {input}
                        {cancel}
                        <svg width="24" height="24" viewBox="0 0 24 24"
                             className="icon reactParts__multi-select__arrow">
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


MultiSelect.propTypes = {
    readOnly:    React.PropTypes.bool,
    cancel:      React.PropTypes.bool,
    onChange:    React.PropTypes.func,
    disabled:    React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    name:        React.PropTypes.string,
    list:        React.PropTypes.array,
    selected:    React.PropTypes.array,
    label:       React.PropTypes.string,
    tabIndex:    React.PropTypes.bool,
    onKeyDown:   React.PropTypes.func,
    uniqueKey:   React.PropTypes.string,
    labelKey:    React.PropTypes.string,
    addControls: React.PropTypes.func,
    listItemRender: React.PropTypes.func,
};

MultiSelect.defaultProps = {
    uniqueKey: "id",
    labelKey:  "value",
}