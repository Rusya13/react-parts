/* @flow */
import React from "react";
import { Button, Input, MultiSelect, Select } from "../dist";
import {Model} from './Model/Model';


class Auth extends Model {

    constructor(props){
        super(props);

    }

    attributes = {
        email:"",
        password:"",
        editMode:true,
    };

    observable = {
        password:"",
        editMode:true,
    };

    computed={
        fullEmail:()=>{
            return this.get("email") + "@gmail.com"
        }
    }



}


export class AuthForm extends React.Component {

    static state: {
        email: string,
        password: string,
        editMode: boolean,
    };

    model:Model;

    constructor( props: any ) {
        super( props );
        window.form = this;
        this.model = new Auth();
        this.model.observeAttributes();
        this.model.observe(['password', 'editMode', 'fullEmail'], ()=>this.forceUpdate())
        this.model.observe(['email'], null)
    }


    onChangeHandler( obj: Object ) {
        //console.log( "onChange", obj );
        this.model.set(obj);
        //console.log("AuthForm onChangeHandler", this.model);
    }

    submitHandler() {
        this.model.set({editMode:false})
    }

    cancelHandler() {
        this.model.set({editMode:true})
    }

    onAddControlsClickHandler(name:string){
        console.log("AuthForm onAddControlsClickHandler", name);
    }

    render() {
        console.log("AuthForm render", this.model);
        return (
            <div className="row center-xs middle-xs">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="reactParts__form">
                        <div className="row center-xs">
                            <div className="col-xs-12" >
                                <Input
                                    addControls={()=>[
                                        {
                                            title:"Registration",
                                            name:"registration",
                                            onClickHandler:this.onAddControlsClickHandler
                                        }]}
                                    type="text"
                                    autoFocus={true}
                                    value={this.model.get("email")}
                                    name="email"
                                    placeholder="Type something.."
                                    readOnly={!this.model.get("editMode")}
                                    valid={false}
                                    label="Email"
                                    onChange={this.onChangeHandler.bind( this )}
                                />
                            </div>
                        </div>
                        <div className="row center-xs">
                            <div className="col-xs-12">
                                <Input
                                    addControls={()=>[
                                        {
                                            title:"Forgot password",
                                            name:"forgot",
                                            onClickHandler:this.onAddControlsClickHandler
                                        }
                                    ]}
                                    type="password"
                                    value={this.model.get("password")}
                                    name="password"
                                    placeholder="password"

                                    label="Password"
                                    valid={true}
                                    readOnly={!this.model.get("editMode")}
                                    onChange={this.onChangeHandler.bind( this )}
                                />
                            </div>
                        </div>
                        <div className="row center-xs">
                            <div className="col-xs-12">
                                <Input
                                    value={this.model.get("fullEmail")}
                                    name="fullEmail"
                                    label="Full Email"
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <div className="row end-xs">
                            <div className="col-xs-12 reactParts__form-footer">
                                <Button caption="Cancel" brand="default" onClick={this.cancelHandler.bind( this )}/>
                                <Button disabled={this.model.isAttributesChanged()} caption="Submit" brand="primary" onClick={this.submitHandler.bind( this )}/>
                            </div>
                        </div>
                    </div>



                </div>
            </div>

        )
    }
}