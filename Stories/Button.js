import React from "react";
import { Button } from '../dist/Components/Button/Button';

export class ButtonController extends React.Component {

    constructor( props ) {
        super( props );
    }

    onClickHandler(){
        console.log("Button onClickHandler");
    }

    render() {
        return (
            <div className="buttons-line">
                <div className="button-wrapper"><Button onClick={this.onClickHandler.bind(this)} brand="default" caption="Default button"/></div>
                <div className="button-wrapper"><Button onClick={this.onClickHandler.bind(this)} brand="success" caption="success button"/></div>
                <div className="button-wrapper"><Button onClick={this.onClickHandler.bind(this)} brand="danger" caption="danger button"/></div>
                <div className="button-wrapper"><Button onClick={this.onClickHandler.bind(this)} brand="warning" caption="warning button"/></div>
                <div className="button-wrapper"><Button onClick={this.onClickHandler.bind(this)} brand="primary" caption="primary button"/></div>
                <div className="button-wrapper"><Button onClick={this.onClickHandler.bind(this)} brand="light" caption="light button"/></div>
            </div>
        )
    }
}