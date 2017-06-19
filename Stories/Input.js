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


    onChangeHandler( obj: Object, item ) {
        this.setState( obj )
    }

    submitHandler() {
        this.setState( { editMode: false } )
    }

    cancelHandler() {
        this.setState( { editMode: true } )
    }


    async requestDadataProvider( value: string ) {
        if ( value.length > 1 ) {
            try {
                let res = await this.suggestDadataProvider.request( value );
                //console.log( "Input suggestProvider", res.suggestions );
                return res.suggestions

            } catch (e){
                return undefined
            }

        } else {
            return undefined
        }
    }


    customSuggestItemRender(item, i, list){
        return <div>
            {item.value} test
        </div>
    }

    selectFromSuggest(o, item){

    }


    render() {

        return (
            <div className="reactParts__form">
                <div className="reactParts__form-group-label">
                    Address
                </div>

                <div className="row">
                    <div className="col-xs-3" >
                        <Input
                            value={this.state.email}
                            name="email"
                            placeholder="Type something.."
                            readOnly={!this.state.editMode}
                            valid={false}
                            prefix="From"
                            onChange={this.onChangeHandler.bind( this )}
                            tabIndex={3}
                        />
                    </div>
                </div>

                <div className="reactParts__form-row">
                    <div className="col" >
                        <Input
                            type="text"
                            //autoFocus={true}
                            required
                            value={this.state.email}
                            name="email"
                            placeholder="Type something.."
                            readOnly={!this.state.editMode}
                            valid={false}
                            label="Email"
                            //autocomplete={true}
                            onChange={this.onChangeHandler.bind( this )}
                            tabIndex={2}
                        />
                    </div>
                </div>

                <div className="reactParts__form-row">
                    <div className="col" >
                        <Input
                            type="text"
                            required
                            value={this.state.address}
                            name="address"
                            placeholder="Type something.."
                            readOnly={!this.state.editMode}
                            valid={false}
                            label="Address (with async suggest Russian only)"
                            suggest={this.requestDadataProvider.bind( this )}
                            onChange={this.onChangeHandler.bind( this )}
                            suggestText="Select address or continue typing"
                            tabIndex={1}
                            listItemRender={this.customSuggestItemRender.bind(this)}
                            cancel={true}
                            onSelectFromSuggest={this.selectFromSuggest.bind(this)}
                        />
                    </div>
                </div>

                <div className="reactParts__form-row">
                    <div className="col" >
                        <Input
                            size="small"
                            value={this.state.email}
                            name="email"
                            placeholder="Type something.."
                            readOnly={!this.state.editMode}
                            valid={false}
                            onChange={this.onChangeHandler.bind( this )}
                            tabIndex={3}
                        />
                        <Input
                            size="mini"
                            value={this.state.email}
                            name="email"
                            placeholder="Type something.."
                            readOnly={!this.state.editMode}
                            valid={false}
                            onChange={this.onChangeHandler.bind( this )}
                            tabIndex={3}
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