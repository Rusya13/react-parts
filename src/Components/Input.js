import React from "react";
import { Icon } from "./Icon";


//TODO input with suggest

export class Input extends React.Component {

    constructor( props ) {
        super( props );
        this.cancelFocus = this.cancelFocus.bind( this );
        this.takeFocus   = this.takeFocus.bind( this );
        this.onKeyUp     = this.onKeyUp.bind( this );
        this.keypress    = this.keypress.bind( this );
        this.change      = this.change.bind( this );
        this.focusOn     = this.focusOn.bind( this );
        this.focusOff    = this.focusOff.bind( this );
        this.state       = {
            defaultValue:     this.props.value,
            focus:            this.props.autoFocus,
            freeSpaceCounter: null,
            isValidated:      true
        };

    }

    takeFocus() {
        if ( this.refs.inp ) this.refs.inp.focus();
    };

    cancelFocus() {
        if ( this.refs.inp ) this.refs.inp.blur();
    };


    onKeyUp( e ) {
        if ( this.props.onKeyUp ) this.props.onKeyUp( e );
    };

    keypress( e ) {
        // max length check
        if ( this.props.maxLength && e.target.value.length + 1 > this.props.maxLength ) {
            e.returnValue = false;
            if ( e.preventDefault ) e.preventDefault();
        }
        if ( !this.props.validation || !this.props.validation.typing )
            return this.props.keypress ? this.props.keypress( e ) : null;
        if ( this.props.keypress ) this.props.keypress( e );
        this.props.validation.typing( e );
    };

    change( e ) {
        //this.caret = e.target.selectionStart + 1 - (e.target.value.length-this.props.value.length);

        if ( e.target.value.length > this.props.limit ) {
            e.target.value = e.target.value.slice( 0, this.props.limit );
        }

        this.state.freeSpaceCounter =
            e.target.value.length > this.props.limit / 2
                ? this.props.limit - e.target.value.length
                : null;

        this.setState( { value: e.target.value } );
        let v = e.target.value,
            obj;

        switch ( this.props.castTo ) {
            case 'number':
                v = Number( v );
                break;
        }

        if ( this.props.name ) {
            obj                    = {};
            obj[ this.props.name ] = v;

        } else {
            obj = v;
        }

        if ( this.props.onChange ) this.props.onChange( obj, { validate: this.props.validate, name: this.props.name } );
        this.render();
    };

    focusOn() {
        this.setState( { focus: true } );
        if ( this.refs[ 'inp' ] ) this.refs[ 'inp' ].focus();
        if ( this.props.onFocus ) this.props.onFocus();
    };

    focusOff() {
        this.setState( { focus: false } );
        if ( this.props.onBlur ) this.props.onBlur();
    };

    componentWillReceiveProps( newProps ) {
        this.setState( { defaultValue: newProps.value } );
    };

    render() {
        let InputSimpleClassName = "control-input",
            value                = 'value' in this.props ? this.props.value : this.state.value,
            dataState            = (this.state.focus) ? 'active' : 'fade';


        if ( this.props.className ) InputSimpleClassName += ` ${this.props.className}`;
        if ( this.props.size ) InputSimpleClassName += ` control-input--${this.props.size}`;

        if ( this.props.valid === false ) dataState = 'not-valid';
        if ( this.props.valid === true ) dataState = 'valid';


        //if(this.refs['inp']) this.refs['inp'].setSelectionRange(this.caret,this.caret);

        return (
            <span className="control-input-wrap">
			    <input className={InputSimpleClassName}
                       data-state={dataState}
                       type={this.props.type}
                       autoFocus={this.props.autoFocus}
                       disabled={!!this.props.disabled}
                       placeholder={this.props.placeholder}
                       onChange={this.change}
                       onKeyUp={this.onKeyUp}
                       onKeyPress={this.keypress}
                       value={value}
                       defaultValue={this.props.defaultValue}
                       onFocus={this.focusOn}
                       onBlur={this.focusOff}
                       readOnly={!!this.props.readOnly}
                       ref='inp'
                />
                {this.state.freeSpaceCounter !== null &&
                <span className="control-input-free-counter">
					    {this.state.freeSpaceCounter}
				    </span>
                }
			</span>
        );
    };
}

Input.propTypes = {
    onChange:    React.PropTypes.func,
    onKeyUp:     React.PropTypes.func,
    onFocus:     React.PropTypes.func,
    onBlur:      React.PropTypes.func,
    keypress:    React.PropTypes.func,
    name:        React.PropTypes.string,
    placeholder: React.PropTypes.string,
    autoFocus:   React.PropTypes.bool,
    readOnly:    React.PropTypes.any,
    disabled:    React.PropTypes.any,
    type:        React.PropTypes.string,
    valid:       React.PropTypes.bool,
    limit:       React.PropTypes.number,
    className:   React.PropTypes.string,
    value:       React.PropTypes.oneOfType( [
        React.PropTypes.string,
        React.PropTypes.number
    ] ),
    castTo: React.PropTypes.oneOf(["number"]),
    size:        React.PropTypes.oneOf( [ 'small' ] )
};

Input.defaultProps = {
    disabled: false,
    valid:    null,
    readonly: false,
    validate: true,
    limit:    50,
    type:     'text'

};