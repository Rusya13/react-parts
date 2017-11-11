import React from "react";
import { Button } from '../dist/Components/Button/Button';

export class ButtonController extends React.Component {

    constructor( props ) {
        super( props );
    }

    onClickHandler = () => {
        console.log('Button onClickHandler');
    };

    render() {
        return (
            <div className="buttons-line">
                <div className="button-wrapper">
                  <Button onClick={this.onClickHandler} brand="default">
                    <div>Test</div>
                  </Button>
                </div>
                <div className="button-wrapper">
                    <Button onClick={this.onClickHandler} brand="success" caption="Success button"/>
                </div>
                <div className="button-wrapper">
                    <Button onClick={this.onClickHandler} brand="danger" caption="Danger button"/>
                </div>
                <div className="button-wrapper">
                    <Button onClick={this.onClickHandler} brand="warning" caption="Warning button"/>
                </div>
                <div className="button-wrapper">
                    <Button onClick={this.onClickHandler} brand="primary" caption="Primary button"/>
                </div>
                <div className="button-wrapper">
                    <Button onClick={this.onClickHandler} brand="light" caption="Light button"/>
                </div>
                <div className="button-wrapper">
                    <Button onClick={this.onClickHandler} size="large" brand="light" caption="Large button"/>
                    <Button onClick={this.onClickHandler} brand="light" caption="Default button"/>
                    <Button onClick={this.onClickHandler} size="small" brand="light" caption="Small button"/>
                    <Button onClick={this.onClickHandler} size="mini" brand="light" caption="Mini button"/>
                </div>
            </div>
        )
    }
}
