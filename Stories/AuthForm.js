/* @flow */
import React from "react";
import { Button, Input, MultiSelect, Select } from "../dist";
import {Model} from './Model/Model';


class Auth extends Model {

}


export class AuthForm extends React.Component {

    state: {
        email: string,
        password: string,
        editMode: boolean,
    };

    model:Model;

    constructor( props: any ) {
        super( props );
        window.form = this;
        this.model = new Auth();

        //this.model.setAttributes();
        this.model.observeAttributes({email:"", password:"", editMode:true});
        //this.model.makeReactive("email");
        this.model.observe(['email', 'password', 'editMode'], ()=>this.forceUpdate())
    }


    onChangeHandler( obj: Object ) {
        console.log( "onChange", obj );
        this.model.set(obj);
        console.log("AuthForm onChangeHandler", this.model);
    }

    submitHandler() {
        this.model.set({editMode:false})
    }

    cancelHandler() {
        this.model.set({editMode:true})
    }

    getForm (){
        return [
            {el:"col", class:"center-xs", children:[
                {
                    el:Input,
                    wrapClass:"col-xs-12",
                    props:{
                        type:"text",
                        autoFocus:true,
                        value:this.model.get("email"),
                        name:"email",
                        placeholder:"Type something..",
                        readOnly:!this.model.get("editMode"),
                        valid:false,
                        label:"Email",
                        onChange:this.onChangeHandler.bind( this ),
                    }
                },
                {
                    el:Input,
                    wrapClass:"col-xs-12",
                    visible:true,
                    props:{
                        type:"password",
                        value:this.model.get("password"),
                        name:"password",
                        placeholder:"Type something..",
                        readOnly:!this.model.get("editMode"),
                        valid:false,
                        label:"Password",
                        onChange:this.onChangeHandler.bind( this ),
                    }
                }
            ] }
        ];
    }


    render() {
        console.log("AuthForm render", this.model.isAttributesChanged(), this.model.attributes, this.model.defaultAttributes);
        return (
            <div className="row center-xs middle-xs">
                <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="reactParts__form">
                        <div className="row center-xs">
                            <div className="col-xs-12" >
                                <Input
                                    addControls={()=>[{title:"Свободный режим"}, {title:"Добавить"}]}
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
                                    type="password"
                                    value={this.model.get("password")}
                                    name="password"
                                    placeholder="password"
                                    size="small"
                                    label="Password"
                                    valid={true}
                                    readOnly={!this.model.get("editMode")}
                                    onChange={this.onChangeHandler.bind( this )}
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