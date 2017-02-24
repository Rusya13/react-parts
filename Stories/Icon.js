import React from "react";
import { Icon } from '../dist';


export class IconsController extends React.Component {
    constructor( props ) {
        super( props );
    }

    names(){
        let names = [];
        for (let name in Icon.names){
            names.push(<div key={name} className="Icon-box"><Icon name={name} key={name}/><div>{name}</div></div>);
        }
        return names
    }

    render() {
        return (
            <div className="Icon-wrapper">
                { this.names()}
            </div>

        )
    }
}