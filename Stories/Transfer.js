import React from "react";
import { Transfer } from "../dist";

export class TransferController extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            source:[{id:1, value:"first"}, {id:2, value:"second"}],
            target:[]
        }
    }


    onChange=(e)=>{
        console.log("Transfer onChange", e);
        this.setState({target:e.test})


    }

    render(){
        return(
            <Transfer
                source={this.state.source}
                target={this.state.target}
                onChange={this.onChange}
                name="test"
                sourceName = "Список прав"
                targetName = "Права группы"
            />
        )
    }

}