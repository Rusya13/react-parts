import React from "react";
import PropTypes from "prop-types";

import { Button } from "../Button/Button";


export class Upload extends React.Component {

    constructor( props ) {
        super( props )
    }

    _onChangeHandler = () => {
        if ( this.props.onChange ) {
            this.props.onChange( (this.props.multiple) ? this.fileInput.files : this.fileInput.files[ 0 ] )
        }
        this.uploadButton.blur();
        this.forceUpdate()
    };

    _onClick = () => {
        this.fileInput.click()
    };

    _renderFilesList = () => {

        if ( this.fileInput && this.fileInput.files.length > 0 ) {
            let list = [];
            for ( let i = 0; i < this.fileInput.files.length; i++ ) {
                list.push( <div className="reactParts__upload--file" key={i}>
                    <svg className="reactParts__upload--file-icon" xmlns="http://www.w3.org/2000/svg" fill="#000000"
                         height="15" viewBox="0 0 24 24" width="15">
                        <path
                            d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                    <span className="reactParts__upload--file-name">{this.fileInput.files[ i ].name}</span>
                </div> )
            }
            return list
        }

    };

    render() {
        return (
            <div>
                <Button ref={( button ) => this.uploadButton = button} caption={this.props.caption}
                        brand={this.props.brand} onClick={this._onClick}/>
                <input
                    style={{ display: "none" }}
                    ref={( input ) => this.fileInput = input}
                    type="file"
                    name={this.props.name}
                    onChange={this._onChangeHandler}
                    accept={this.props.accept}
                    multiple={this.props.multiple}
                />
                <div className="reactParts__upload--fileList">
                    {this._renderFilesList()}
                </div>

            </div>
        )
    }
}

Upload.defaultProps = {
    caption:  "Upload file",
    multiple: false,
    brand:    "primary"
};

Upload.propTypes = {
    accept:   PropTypes.string,
    onChange: PropTypes.func,
    name:     PropTypes.string,
    caption:  PropTypes.string,
    multiple: PropTypes.bool,
    brand:    PropTypes.string
};