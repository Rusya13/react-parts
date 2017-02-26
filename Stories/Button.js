import React from "react";
import { Button } from '../dist/Components/Button/Button';

export class ButtonController extends React.Component {

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="buttons-line">
                <div className="button-wrapper"><Button brand="default" caption="Default button"/></div>
                <div className="button-wrapper"><Button brand="success" caption="success button"/></div>
                <div className="button-wrapper"><Button brand="danger" caption="danger button"/></div>
                <div className="button-wrapper"><Button brand="warning" caption="warning button"/></div>
                <div className="button-wrapper"><Button brand="primary" caption="primary button"/></div>
                <div className="button-wrapper"><Button brand="light" caption="light button"/></div>
            </div>
        )
    }
}