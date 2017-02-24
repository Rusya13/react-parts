import React from "react";
import { Button } from '../dist';

export class ButtonController extends React.Component {

    constructor( props ) {
        super( props );
    }

    buttonsByBrand(){
        let buttons=[];
        for (let brand in Button.brands){
            buttons.push(<div className="button-wrapper"><Button caption={brand} brand={brand}/></div>);
        }
        return buttons
    }

    render() {
        return (
            <div className="buttons-line">
                {this.buttonsByBrand()}
            </div>
        )
    }
}