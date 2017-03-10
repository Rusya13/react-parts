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
    inputRender: ( obj: Object) => any;
    noResultsText:?string
}

export class Select extends React.Component {

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
            showInput:   false,
            list:        (Array.isArray( props.list )) ? props.list : [],
            pointSelect: -1
        };
    }

    _createReturnObject( name: string, value: Selected ): ReturnObject {
        let object: Object = {};
        object[ name ]     = value;
        return object
    }


    selectItem( item: ListObject ) {
        this.setState( { stateList: false } );


        //let newSelected: Selected = item.key;


        let c: OnChangeReturnObject = this._createReturnObject( this.props.name, item );
        this.props.onChange && this.props.onChange( c );
    };

    onGlobalClick( e: any ) {
        console.log( "Select onGlobalClick", e );
        if ( this.state.stateList ) {
            this.closeList();
        }
    };

    openList( event: any ) {
        console.log( "Select openList" );
        if ( this.props.disabled ) return;
        if ( !Array.isArray( this.props.list ) ) {
            this.props.list().then( res => {
                console.log( "Select res", res );
                this.setState( { list: res } )
            } )
        }
        this.setState( { stateList: true } );
        document.addEventListener( "click", this.closeList );
    };

    closeList() {
        console.log( "Select closeList" );
        document.removeEventListener( "click", this.closeList );
        this.setState( { stateList: false } );
    };

    cancelSelected() {
        let newSelected             = null;
        let c: OnChangeReturnObject = this._createReturnObject( this.props.name, newSelected );
        this.props.onChange && this.props.onChange( c );
    };

    renderList() {
        let list = this.state.list;
        //console.log( "Select renderList", list );

        if ( Array.isArray( this.props.list ) && this.searchInput ) {
            list = list.filter( item => {
                return item[ this.props.labelKey ].includes( this.searchInput.value )
            } )
        }

        let newList = list.map( ( selItem, i, list ) => {
            //console.log( "Select selItem", selItem, selItem[this.props.uniqueKey], this.props.selected && this.props.selected[ this.props.uniqueKey ]);


            return <li key={selItem[ this.props.uniqueKey ]}
                       className={"reactParts__select-list-item" + (( selItem[ this.props.uniqueKey ] === (this.props.selected && this.props.selected[ this.props.uniqueKey ] )) ? " selected" : "")
                       + ((i === this.state.pointSelect) ? " pointed" : "")
                       }
                       onClick={this.selectItem.bind( this, selItem )}>
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
            //console.log("Input setNewPosition down");
            if ( currentPosition === this.state.list.length - 1 ) {
                newPosition = 0;
            } else {
                newPosition = currentPosition + 1;
            }
        }
        if ( key === 'ArrowUp' ) {
            //console.log("Input setNewPosition up");
            if ( currentPosition === 0 ) {
                newPosition = this.state.list.length - 1;
            } else {
                newPosition = currentPosition - 1;
            }
        }

        this.setState( { pointSelect: newPosition } )
    }

    onKeyDown( e: KeyboardEvent ) {

        //console.log("Input onKeyDown", startPos);
        let list = this.state.list;

        switch ( e.key ) {
            case 'ArrowDown':
            case 'ArrowUp':
                //this.input.selectionStart = startPos;
                this.setNewPosition( e.key );
                break;
            case 'Enter':
                let item               = this.state.list[ this.state.pointSelect ];
                this.state.pointSelect = -1;
                this.selectItem( item );
                this.closeList();
                break;
            case 'Escape':
                this.closeList();
                break;
            default:
        }
    }


    renderInput() {
        let selItem = this.props.selected;




        let input = <input autoFocus={true} ref={( input ) => {this.searchInput = input;}}
                           onKeyDown={this.onKeyDown.bind( this )}
                           className="reactParts__select-input" onChange={this.onChangeInputSearch.bind( this )}/>;


        return <div
            className="reactParts__select-selected">{
                (this.searchInput && this.searchInput.value)
                    ? null
                    :(
                        (this.props.inputRender)
                            ? this.props.inputRender(selItem)
                            :(selItem && selItem[ this.props.labelKey ])
                ) } {(this.state.stateList) ? input : null}</div>
    }

    onChangeInputSearch( e ) {
        console.log( "Select onChangeInputSearch", this.searchInput.value );
        if ( !Array.isArray( this.props.list ) ) {
            this.props.list( this.searchInput.value ).then( res => {
                console.log( "Select onChangeInputSearch", res );
                this.setState( { list: res } )
            } )

        }
        this.setState( { showInput: true } )

    }


    render() {
        let selectClassName = 'reactParts__select';
        if ( this.state.stateList ) {
            selectClassName += ' focus';
        }
        let placeholder, list, cancel;

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
            list = <ul className="reactParts__select-list">{this.renderList()}</ul>;
        }

        return (
            <div ref={( input ) => {this.input = input;}} className="reactParts__select-wrap">
                {this.props.label &&
                <label className="reactParts__label" htmlFor={this.props.name}>{this.props.label}</label>}
                {(this.props.readOnly) ?
                    <div className="reactParts__select-selected">{this.props.selected[ this.props.labelKey ]}</div> :
                    <div className={selectClassName} onClick={this.openList.bind( this )}>
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

Select.propTypes = {
    readOnly:       React.PropTypes.bool,
    cancel:         React.PropTypes.bool,
    onChange:       React.PropTypes.func,
    disabled:       React.PropTypes.bool,
    placeholder:    React.PropTypes.string,
    name:           React.PropTypes.string,
    list:           React.PropTypes.oneOfType( [ React.PropTypes.array, React.PropTypes.func ] ).isRequired,
    selected:       React.PropTypes.oneOfType( [ React.PropTypes.number, React.PropTypes.string, React.PropTypes.object ] ),
    label:          React.PropTypes.string,
    uniqueKey:      React.PropTypes.string,
    labelKey:       React.PropTypes.string,
    listItemRender: React.PropTypes.func,
    inputRender:    React.PropTypes.func,
    noResultsText: React.PropTypes.string
}

Select.defaultProps = {
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
    noResultsText: "Nothing to show"
}