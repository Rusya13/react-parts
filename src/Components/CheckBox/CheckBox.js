/* @flow */

import React from "react";

export class CheckBox extends React.Component{

    input:any;

    onClickHandler(e:Event){
        let o:Object={};
        o[this.props.name] = this.input.checked;
        this.props.onClickHandler(o)
    }

    render(){
        return (
            <label className={"reactParts__checkbox-wrap "+ ((this.props.disabled)?"disabled":"")} >
                <div className={"reactParts__checkbox-input-new "+ ((this.props.checked)?"checked":"")}>
                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        ref={(input) => {this.input = input}}
                        disabled={this.props.disabled}
                        className="reactParts__checkbox-input"
                        onChange={this.onClickHandler.bind(this)}
                    />
                </div>


                <div className="reactParts__checkbox-label">{this.props.label}</div>
            </label>
        )
    }
}

CheckBox.propTypes ={
    name: React.PropTypes.string,
    label:React.PropTypes.string,
    checked:React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onClickHandler: React.PropTypes.func.isRequired
};