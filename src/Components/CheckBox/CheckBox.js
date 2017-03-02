/* @flow */

import React from "react";

export class CheckBox extends React.Component{

    input:any;

    onClickHandler(e:Event){

        this.props.onClickHandler(this.props.value)
    }


    render(){
        return (
            <label className="reactParts__checkbox-wrap">

                    <input
                        type="checkbox"
                        checked={this.props.checked}
                        ref={(input) => {this.input = input}}
                        disabled={this.props.disabled}
                        className={"reactParts__checkbox-input "+ ((this.props.checked)?"checked":"")}
                        value={this.props.value}
                        onChange={this.onClickHandler.bind(this)}
                    />
                <div className="reactParts__radio-input-label">{this.props.label}</div>
            </label>
        )
    }
}

CheckBox.propTypes ={
    value:React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    label:React.PropTypes.string,
    checked:React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onClickHandler: React.PropTypes.func.isRequired
};