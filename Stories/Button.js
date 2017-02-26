import React from "react";
import { Button, ButtonProps } from '../dist/Components/Button/Button';

export class ButtonController extends React.Component {

    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className="buttons-line">
                <div className="button-wrapper"><Button brand="default"/></div>
            </div>
        )
    }
}