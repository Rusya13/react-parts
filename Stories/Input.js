/* @flow */
import React from "react";
import { Button, Input, MultiSelect, Select } from "../dist";
import {DadataProvider} from './DadataProvider';





export class InputController extends React.Component {
    state: {
        email: string,
        address: string,
        password: string,
        name: string,
        last_name: string,
        gender: number,
        languages: Array<number>,
        editMode: boolean,
    };


    suggestDadataProvider: Object;


    constructor( props: any ) {
        super( props );
        this.state = {
            email:     "",
            address:   "",
            password:  "",
            name:      "Ruslan",
            last_name: "Osipov",
            gender:    1,
            languages: [],
            editMode:  true
        }

        this.suggestDadataProvider = new DadataProvider();

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


    async requestDadataProvider( value: string ) {
        if ( value.length > 2 ) {
            try {
                let res = await this.suggestDadataProvider.request( value );
                console.log( "Input suggestProvider", res.suggestions );
                return res.suggestions

            } catch (e){
                return undefined
            }

        } else {
            return undefined
        }
    }



    render() {

        return (
            <div className="reactParts__form">
                <div className="reactParts__form-group-label">
                    Autentification
                </div>

                <div className="reactParts__form-row">
                    <div className="col" style={{ flex: "0 1 50%" }}>
                        <Input
                            type="text"
                            autoFocus={true}
                            value={this.state.email}
                            name="email"
                            placeholder="Type something.."
                            readOnly={!this.state.editMode}
                            valid={false}
                            label="Email"
                            //autocomplete={true}
                            onChange={this.onChangeHandler.bind( this )}
                        />
                    </div>
                </div>

                <div className="reactParts__form-row">
                    <div className="col" style={{ flex: "0 1 50%" }}>
                        <Input
                            type="text"
                            autoFocus={true}
                            value={this.state.address}
                            name="address"
                            placeholder="Type something.."
                            readOnly={!this.state.editMode}
                            valid={false}
                            label="Address"
                            suggest={this.requestDadataProvider.bind( this )}
                            //autocomplete={true}
                            onChange={this.onChangeHandler.bind( this )}
                        />
                    </div>
                </div>

                <div className="reactParts__form-footer">

                    <Button caption="Cancel" brand="default" onClick={this.cancelHandler.bind( this )}/>


                    <Button caption="Submit" brand="primary" onClick={this.submitHandler.bind( this )}/>


                </div>
            </div>
        )
    }
}