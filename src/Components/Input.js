/* @flow */
import React from "react";

//TODO input with suggest

export class Input extends React.Component{

    constructor( props ) {
        super( props );
        this.cancelFocus = this.cancelFocus.bind( this );
        this.takeFocus   = this.takeFocus.bind( this );
        this.onKeyUp     = this.onKeyUp.bind( this );
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


    onKeyUp( e: Event ) {
        if ( this.props.onKeyUp ) this.props.onKeyUp( e );
    };


    change( e:Event ) {
        let value = e.target.value;
        if ( value.length > this.props.limit ) {
            value = value.slice( 0, this.props.limit );
        }
        let obj;
        switch ( this.props.castTo ) {
            case 'number':
                value = Number( value );
                break;
        }

        if ( this.props.name ) {
            obj                    = {};
            obj[ this.props.name ] = value;
        } else {
            obj = value;
        }
        if ( this.props.onChange ) this.props.onChange( obj );

    };

    focusOn() {
        if ( this.props.onFocus ) this.props.onFocus();
    };

    focusOff() {

        if ( this.props.onBlur ) this.props.onBlur();
    };

    //componentWillReceiveProps( newProps ) {
    //    //this.setState( { defaultValue: newProps.value } );
    //};

    render() {

        let valid = this.props.valid;
        console.log("Input render", valid);
        let validLabel=null;
        if (valid !== undefined && valid !== null){
            if (valid){
                validLabel = <div className="reactParts__input-valid"></div>;
            } else {
                validLabel = <div className="reactParts__input-valid false"></div>;
            }
        }


        let InputSimpleClassName = "reactParts__input";
        if ( this.props.className ) InputSimpleClassName += ` ${this.props.className}`;
        return (
            <div className="reactParts__input-wrap">
                {this.props.label && <label className="reactParts__label" htmlFor={this.props.name}>{this.props.label}</label>}
			    <input className={InputSimpleClassName}
                       id={this.props.name}
                       type={this.props.type}
                       autoFocus={this.props.autoFocus}
                       disabled={!!this.props.disabled}
                       placeholder={this.props.placeholder}
                       onChange={this.change}
                       onKeyUp={this.onKeyUp}
                       value={this.props.value}
                       defaultValue={this.props.defaultValue}
                       onFocus={this.focusOn}
                       onBlur={this.focusOff}
                       readOnly={!!this.props.readOnly}
                       ref='inp'
                />
                {validLabel}
			</div>
        );
    };
}

Input.propTypes = {
    onChange:    React.PropTypes.func,
    onKeyUp:     React.PropTypes.func,
    onFocus:     React.PropTypes.func,
    onBlur:      React.PropTypes.func,
    keypress:    React.PropTypes.func,
    name:        React.PropTypes.string.isRequired,
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
    label:React.PropTypes.string,
    valid:React.PropTypes.bool
};

Input.defaultProps = {
    disabled: false,
    valid:    null,
    readonly: false,
    validate: true,
    limit:    50,
    type:     'text',
    label: null
};