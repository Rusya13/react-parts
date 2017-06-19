import React from "react";
import { Badge } from '../dist/index';


export class BadgeController extends React.Component {

    constructor( props ) {
        super( props );
    }



    render() {
        return (
            <div>
                <Badge
                    count={5}
                    maxCount={5}
                    ofCount={30}
                    showZero={false}
                />

                <div>
                    <span className="badge-example">
                        Little red dot
                        <Badge isDot isFixed/>
                    </span>
                </div>
            </div>
        )
    }
}