import React from "react";
import { Icon } from '../dist/Components/Icon/Icon';


export class IconsController extends React.Component {
    constructor( props ) {
        super( props );
    }



    render() {
        return (
            <div className="Icon-wrapper">
                <div key={Math.random()} className="Icon-box"><Icon width={24} height={24} name="star"/><div>star</div></div>
            </div>

        )
    }
}