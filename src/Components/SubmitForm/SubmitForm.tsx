import * as  React from "react";
import {Button, ButtonBrand} from "../Button/Button";
import {ReactChild} from "react";

export class SubmitFormProps {
    onSubmit?: () => void;
    onCancel?: ()=> void;
    submitLabel: string = "Сохранить";
    body: any;
    submitBrand: ButtonBrand = "warning";
}

interface SubmitFormState {
    error?: string | null;
}

export class SubmitForm extends React.Component <SubmitFormProps, SubmitFormState> {

    constructor(props: SubmitFormProps) {
        super(props);
        this.state = {
            error: null
        };

    }


    async onSubmit() {
        try {
            this.props.onSubmit && await this.props.onSubmit();
        }
        catch (e) {
            console.log("error in submit form", e);
            this.setState({error: e.message})
        }
    }

    onCancelHandler(e:React.SyntheticEvent<any>) {
        console.log("SubmitForm onCancelHandler", e);
        this.props.onCancel && this.props.onCancel();
    }

    render() {

        return (
            <div className="modal-container__body">
                { this.state.error &&
                <div className="modal-container__error">
                    {this.state.error}
                </div>
                }
                <div>{this.props.children}</div>
                <div className="modal-container__footer">
                    <Button brand="default" onClick={this.onCancelHandler.bind(this)} caption="Отменить"/>
                    <Button brand={this.props.submitBrand} onClick={this.onSubmit.bind(this)}
                            caption={this.props.submitLabel}/>
                </div>
            </div>
        )
    }
}