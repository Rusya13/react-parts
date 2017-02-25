import React from "react";
import { Input, Button, Select } from '../dist';

export class InputController extends React.Component {

    constructor( props ) {
        super( props );
        this.state={
            email:"rusya13@gmail.com",
            password:"",
            name:"Ruslan",
            last_name:"Osipov",
            gender:1,
            languages:[],
            editMode:true
        }
    }


    onChangeHandler(obj){
        this.setState(obj)
    }

    submitHandler(){
        this.setState({editMode:false})
    }

    cancelHandler(){
        this.setState({editMode:true})
    }


    render() {
        let genderList = [
            {key:1, value:"Male"},
            {key:2, value:"Female"}

        ];

        let langList=[
            {key:1, value:"JavaScript"},
            {key:2, value:"Python"},
            {key:3, value:"Swift"},
            {key:4, value:"Java"},
            {key:5, value:"Ruby"},
            {key:6, value:"PHP"},
        ];

        return (
            <div className="reactParts__form">

                <div className="reactParts__form-group-label">
                    Autentification
                </div>

                <div className="reactParts__form-row">
                    <div className="col" style={{flex:"0 1 50%"}}>
                        <Input
                            type="text"
                            autoFocus={true}
                            value={this.state.email}
                            name="email"
                            placeholder="Type something.."
                            disabled={!this.state.editMode}
                            valid={null}
                            label="Email"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </div>
                </div>
                <div className="reactParts__form-row">
                    <div className="col" style={{flex:"0 1 50%"}}>
                        <Input
                            type="password"
                            value={this.state.password}
                            name="password"
                            placeholder="password"
                            size="small"
                            label="Password"
                            //valid={false}
                            disabled={!this.state.editMode}
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </div>
                </div>


                <div className="reactParts__form-group-label">
                    User information
                </div>

                <div className="reactParts__form-row">
                    <div className="col">
                        <Select
                            list={genderList}
                            placeholder="select"
                            name="gender"
                            cancel={true}
                            label="Gender"
                            disabled={!this.state.editMode}
                            multiSelect={false}
                            selected={this.state.gender}
                            onChange={this.onChangeHandler.bind(this)}

                        />
                    </div>
                    <div className="col">
                        <Select
                            list={langList}
                            placeholder="select"
                            name="languages"
                            cancel={true}
                            label="Languages"
                            disabled={!this.state.editMode}
                            multiSelect={true}
                            selected={this.state.languages}
                            onChange={this.onChangeHandler.bind(this)}

                        />
                    </div>
                </div>

                <div className="reactParts__form-row">
                    <div className="col">
                        <Input
                            type="text"
                            autoFocus={true}
                            value={this.state.name}
                            name="name"
                            placeholder="Type something.."
                            disabled={!this.state.editMode}
                            valid={null}
                            label="Name"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </div>
                    <div className="col">
                        <Input
                            type="text"
                            autoFocus={true}
                            value={this.state.last_name}
                            name="last_name"
                            placeholder="Type something.."
                            disabled={!this.state.editMode}
                            valid={null}
                            label="Last name"
                            onChange={this.onChangeHandler.bind(this)}
                        />
                    </div>
                </div>
                <div className="reactParts__form-footer">

                        <Button caption="Cancel" brand={Button.brands.default} onClick={this.cancelHandler.bind(this)}/>


                        <Button caption="Submit" brand={Button.brands.primary} onClick={this.submitHandler.bind(this)}/>


                </div>
            </div>
        )
    }
}