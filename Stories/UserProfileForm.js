/* @flow */
import React from "react";
import { Button, Input, MultiSelect, RadioGroup, CheckBoxGroup } from "../dist";
import {Model} from './Model/Model';

export class UserProfileForm extends React.Component {

    state: {
        email: string,
        address: string,
        name: string,
        last_name: string,
        gender: string,
        languages: Array<number>,
        editMode: boolean,
    };

    model:Model;
    constructor( props: any ) {
        super( props );
        this.model= new Model({
            email:     "",
            address:   "",
            name:      "John",
            last_name: "Smith",
            gender:    "Male",
            languages: [],
            editMode:  true,
            school:false,
            university:true,
            college: false
        }, true);
        this.model.observe(
            ['email', 'address', 'name', 'last_name','gender', 'languages', 'editMode', 'school', 'university', 'college'],
            ()=>this.forceUpdate())
    }


    onChangeHandler( obj: Object ) {
        console.log( "onChange", obj );
        this.model.set( obj )
    }

    submitHandler() {
        this.model.set({editMode: false})
    }

    cancelHandler() {
        this.model.set( { editMode: true } )
    }


    render() {
        let genderList = [
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" }
        ];

        let langList = [
            { key: 1, value: "JavaScript" },
            { key: 2, value: "Python" },
            { key: 3, value: "Swift" },
            { key: 4, value: "Java" },
            { key: 5, value: "Ruby" },
            { key: 6, value: "PHP" },
        ];

        return (
            <div className="row center-xs">
                <div className="col-xs-12 col-sm-9 col-md-7 col-lg-5">
                    <div className="reactParts__form">
                        <div className="row">
                            <div className="col-xs-12 reactParts__form-group-label">
                                Autentification Form
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <Input
                                    type="text"
                                    autoFocus={true}
                                    value={this.model.get("email")}
                                    name="email"
                                    placeholder="Type something.."
                                    readOnly={!this.model.get("editMode")}
                                    valid={false}
                                    label="Email"
                                    onChange={this.onChangeHandler.bind( this )}
                                    cancel={true}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <Input
                                    type="text"
                                    autoFocus={true}
                                    value={this.model.get("address")}
                                    name="address"
                                    placeholder="Type something.."
                                    readOnly={!this.model.get("editMode")}
                                    valid={false}
                                    label="Address"
                                    onChange={this.onChangeHandler.bind( this )}
                                    cancel={true}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 reactParts__form-group-label">
                                User information
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-xs-12 col-sm-4">
                                <RadioGroup
                                    direction="horizontal"
                                    onChange={this.onChangeHandler.bind( this )}
                                    options={genderList}
                                    name="gender" label="Gender" checked={this.model.get("gender")}
                                    readOnly={!this.model.get("editMode")}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <CheckBoxGroup label="Education"
                                               readOnly={!this.model.get("editMode")}
                                               options={[
                                                   {label:"School",
                                                       name:"school",
                                                       checked:this.model.get("school"),
                                                       disabled:false},
                                                   {label:"College",
                                                       name:"college",
                                                       checked:this.model.get("college"),
                                                       disabled:false},
                                                   {label:"University",
                                                       name:"university",
                                                       checked:this.model.get("university"),
                                                       disabled:false}]}
                                                onChange={this.onChangeHandler.bind(this)}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-4">
                                <MultiSelect
                                    list={langList}
                                    placeholder="select"
                                    name="languages"
                                    cancel={true}
                                    label="Languages"
                                    uniqueKey="key"
                                    readOnly={!this.model.get("editMode")}
                                    selected={this.model.get("languages")}
                                    onChange={this.onChangeHandler.bind( this )}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <Input
                                    type="text"
                                    autoFocus={true}
                                    value={this.model.get("name")}
                                    name="name"
                                    placeholder="Type something.."
                                    readOnly={!this.model.get("editMode")}
                                    valid={null}
                                    label="Name"
                                    onChange={this.onChangeHandler.bind( this )}

                                />
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <Input
                                    type="text"
                                    value={this.model.get("last_name")}
                                    name="last_name"
                                    placeholder="Type something.."
                                    readOnly={!this.model.get("editMode")}
                                    valid={null}
                                    label="Last name"
                                    onChange={this.onChangeHandler.bind( this )}

                                />
                            </div>
                        </div>
                        <div className="row end-xs">
                            <div className="col-xs-12 reactParts__form-footer">
                                <Button caption="Cancel" brand="default" onClick={this.cancelHandler.bind( this )}/>
                                <Button caption="Submit" brand="primary" onClick={this.submitHandler.bind( this )}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        )
    }
}