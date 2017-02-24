import React from "react";
import { Input } from '../dist';

export class InputController extends React.Component {

    constructor( props ) {
        super( props );
    }



    render() {
        return (
            <div className="buttons-line">
                <Input
                    type="password"
                    //limit={10}
                    //autoFocus={true}
                    name="test"
                    placeholder="Type something.."
                    readOnly={false}
                    //disabled={true}
                    size="small"
                    icon={{name:"group"}}

                />
            </div>
        )
    }
}