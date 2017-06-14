import React from "react";
import PropTypes from "prop-types";
import { CheckBox } from "../CheckBox/CheckBox";
import { Badge } from "../Badge/Badge";
import {Button} from "../Button/Button";

export class Transfer extends React.Component {

    constructor( props ) {
        super( props );
        this.state = {
            sSource: [],
            sTarget: []
        }
    }

    onChangeHandler = ( value ) => {
        if (typeof this.props.onChange === "function") this.props.onChange(value)
    };

    selectAllSourses = () => {
        const sourses = this.props.source.filter( s => this.props.target.every( t => t !== s ) ).map( s => s.id );
        this.setState( { sSource: sourses.every( s => this.state.sSource.some( ss => ss === s ) ) ? [] : sourses } )
    };

    selectAllTargets = () => {
        const target = this.props.target;
        this.setState( { sTarget: target.every( t => this.state.sTarget.some( st => st === t ) ) ? [] : target } )
    };

    selectSourceHandler = id => {
        const source = this.state.sSource;
        this.setState({ sSource: source.some(s => s === id) ? source.filter(s => s !== id) : source.concat([id])} )
    };

    selectTargetHandler = id => {
        const target = this.state.sTarget;
        this.setState({ sTarget: target.some(t => t === id) ? target.filter(t => t !== id) : target.concat([id]) })
    };

    transferToTargetHandler = () => {
        const value = (this.props.target || []).concat( this.state.sSource );
        this.onChangeHandler( this.props.name ? { [this.props.name]: value } : value );
        this.state.sSource = []
    };

    transferToSourceHandler = () => {
        const value = (this.props.target || []).filter( t => this.state.sTarget.every( s => s !== t ) );
        this.onChangeHandler( this.props.name ? { [this.props.name]: value } : value );
        this.state.sTarget = []
    };

    sourceRender = () => {
        const { source, target } = this.props;
        return source.filter( s => target.every( t => s.id !== t ) ).map( ( item, i ) => {
            const checked = this.state.sSource.some( s => s === item.id )
            return this.singleCheckboxRender( this.selectSourceHandler.bind( this, item.id ), checked, item, i )
        } )
    };

    targetRender = () => {
        const { source, target } = this.props;
        return source.filter( s => target.some( t => s.id === t ) ).map( ( item, i ) => {
            const checked = this.state.sTarget.some( t => t === item.id )
            return this.singleCheckboxRender( this.selectTargetHandler.bind( this, item.id ), checked, item, i )
        } )
    };

    singleCheckboxRender = ( onChangeHandler, checked, item, i ) => {
        const { customRecordRenderer } = this.props;

        if (typeof customRecordRenderer === "function") {
            return customRecordRenderer(onChangeHandler, checked, item, i)
        } else {
            return <div style={{margin: "5px 0px"}}>
                <CheckBox checked={checked} onClickHandler={onChangeHandler} label={item.value} key={i}/>
            </div>
        }
    };

    isSourceNotEmpty = () => {
        return this.state.sSource.length
    };

    isTargetNotEmpty = () => {
        return this.state.sTarget.length
    };

    render() {
        const { source, target, direction }  = this.props;
        const sourceWithoutTarget = source.filter( s => target.every( t => s.id !== t ) );

        const targetCheckbox = (this.props.target || []).every(t => this.state.sTarget.some(st => st === t));
        const sourceCheckbox = (sourceWithoutTarget || []).every(s => this.state.sSource.some(ss => ss === s.id));

        return (
            <div className={`reactParts__transfer--wrap ${direction}`}>
                <div className={`reactParts__transfer--box reactParts__transfer--box-${direction}`}>
                    <div className="reactParts__transfer--header">
                        <CheckBox
                            label          = {this.props.sourceName}
                            checked        = {sourceCheckbox}
                            disabled       = {sourceWithoutTarget.length === 0}
                            onClickHandler = {this.selectAllSourses}
                        />

                        <Badge
                            count    = {this.state.sSource.length}
                            ofCount  = {sourceWithoutTarget.length}
                            showZero = {true}
                        />
                    </div>

                    <div className={`reactParts__transfer--list reactParts__transfer--list-${direction}`}>
                        {this.sourceRender()}
                    </div>
                </div>

                <div className={`reactParts__transfer--middle-box reactParts__transfer--middle-box-${direction}`}>
                    {/*<div*/}
                        {/*onClick={this.transferToTargetHandler}*/}
                        {/*className={"reactParts__transfer--middle-box-right" + ((this.isSourceNotEmpty() ? " not-empty" : ""))}>*/}
                        {/*{">>"}*/}
                    {/*</div>*/}

                    <div className="reactParts__transfer--middle-box-button">
                        <Button
                            brand    = "primary"
                            caption  = {direction === "horizontal" ? "⮞" : "⮟"}
                            onClick  = {this.transferToTargetHandler}
                            disabled = {!this.isSourceNotEmpty()}
                        />
                    </div>

                    <div className="reactParts__transfer--middle-box-button">
                        <Button
                            brand    = "primary"
                            caption  = {direction === "horizontal" ? "⮜" : "⮝"}
                            onClick  = {this.transferToSourceHandler}
                            disabled = {!this.isTargetNotEmpty()}
                        />
                    </div>
                </div>

                <div className={`reactParts__transfer--box reactParts__transfer--box-${direction}`}>
                    <div className="reactParts__transfer--header">
                        <CheckBox
                            label          = {this.props.targetName}
                            checked        = {targetCheckbox}
                            disabled       = {target.length === 0}
                            onClickHandler = {this.selectAllTargets}
                        />

                        <Badge
                            count    = {this.state.sTarget.length}
                            ofCount  = {target.length}
                            showZero = {true}
                        />
                    </div>

                    <div className={`reactParts__transfer--list reactParts__transfer--list-${direction}`}>
                        {this.targetRender()}
                    </div>
                </div>
            </div>
        )
    }
}

Transfer.propTypes = {
    customRecordRenderer : PropTypes.func,
    targetName           : PropTypes.string,
    direction            : PropTypes.oneOf(["vertical", "horizontal"]),
    onChange             : PropTypes.func,
    target               : PropTypes.array,
    source               : PropTypes.array,
    name                 : PropTypes.string
};


Transfer.defaultProps = {
    source: [],
    target: [],
};

