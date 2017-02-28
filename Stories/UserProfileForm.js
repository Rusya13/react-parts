/* @flow */
import React from "react";
import { Button, Input, MultiSelect, Select } from "../dist";

export class UserProfileForm extends React.Component {

    state: {
        email: string,
        address: string,
        name: string,
        last_name: string,
        gender: number,
        languages: Array<number>,
        editMode: boolean,
    };



    constructor( props: any ) {
        super( props );
        this.state = {
            email:     "",
            address:   "",
            name:      "Ruslan",
            last_name: "Osipov",
            gender:    1,
            languages: [],
            editMode:  true
        }

    }


    onChangeHandler( obj: Object ) {
        console.log( "onChange", obj );
        this.setState( obj )
    }

    submitHandler() {
        this.setState( { editMode: false } )
    }

    cancelHandler() {
        this.setState( { editMode: true } )
    }


    render() {
        let genderList = [
            { key: 1, value: "Male" },
            { key: 2, value: "Female" }
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
                            <div className="col-xs-12 col-sm-6" >
                                <Input
                                    type="text"
                                    autoFocus={true}
                                    value={this.state.email}
                                    name="email"
                                    placeholder="Type something.."
                                    readOnly={!this.state.editMode}
                                    valid={false}
                                    label="Email"
                                    onChange={this.onChangeHandler.bind( this )}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6" >
                                <Input
                                    type="text"
                                    autoFocus={true}
                                    value={this.state.address}
                                    name="address"
                                    placeholder="Type something.."
                                    readOnly={!this.state.editMode}
                                    valid={false}
                                    label="Address"
                                    //autocomplete={true}
                                    onChange={this.onChangeHandler.bind( this )}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 reactParts__form-group-label">
                                User information
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <Select
                                    list={genderList}
                                    placeholder="select"
                                    name="gender"
                                    cancel={true}
                                    label="Gender"
                                    readOnly={!this.state.editMode}
                                    selected={this.state.gender}
                                    onChange={this.onChangeHandler.bind( this )}

                                />
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <MultiSelect
                                    list={langList}
                                    placeholder="select"
                                    name="languages"
                                    cancel={true}
                                    label="Languages"
                                    readOnly={!this.state.editMode}
                                    selected={this.state.languages}
                                    onChange={this.onChangeHandler.bind( this )}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-sm-6">
                                <Input
                                    type="text"
                                    autoFocus={true}
                                    value={this.state.name}
                                    name="name"
                                    placeholder="Type something.."
                                    readOnly={!this.state.editMode}
                                    valid={null}
                                    label="Name"
                                    onChange={this.onChangeHandler.bind( this )}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-6">
                                <Input
                                    type="text"
                                    value={this.state.last_name}
                                    name="last_name"
                                    placeholder="Type something.."
                                    readOnly={!this.state.editMode}
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